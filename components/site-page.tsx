'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

type SitePageProps = { bodyClass: string; html: string; styles: string[] };

type StyleManifest = Record<string, string[]>;

let styleManifestPromise: Promise<StyleManifest> | undefined;
const routeStylePreloads = new Map<string, Promise<string[]>>();

function canonicalRoute(pathname: string) {
  if (pathname === '/') return pathname;
  return `${pathname.replace(/\/+$/, '')}/`;
}

function isTypographyStylesheet(href: string) {
  return href.includes('fonts.googleapis.com/css') || /^\/fonts\/[^/]+\.css(?:\?|$)/.test(href);
}

function findLink(href: string, rel: string) {
  const absoluteHref = new URL(href, window.location.href).href;
  return Array.from(document.querySelectorAll<HTMLLinkElement>(`link[rel="${rel}"]`))
    .find((link) => link.href === absoluteHref);
}

function findPersistentStyle(href: string) {
  const absoluteHref = new URL(href, window.location.href).href;
  return Array.from(document.querySelectorAll<HTMLLinkElement>('link[data-persistent-route-style]'))
    .find((link) => link.href === absoluteHref);
}

function waitForLink(link: HTMLLinkElement, timeout = 4000) {
  return new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    link.addEventListener('load', finish, { once: true });
    link.addEventListener('error', finish, { once: true });
    window.setTimeout(finish, timeout);
  });
}

async function preloadRouteStyles(pathname: string) {
  const route = canonicalRoute(pathname);
  const existing = routeStylePreloads.get(route);
  if (existing) return existing;

  const preload = (async () => {
    styleManifestPromise ??= fetch('/route-styles.json', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() as Promise<StyleManifest> : {});
    const manifest = await styleManifestPromise;
    const styles = (manifest[route] ?? []).filter((href) => !isTypographyStylesheet(href));
    await Promise.all(styles.map((href) => {
      if (findLink(href, 'stylesheet') || findLink(href, 'preload')) return Promise.resolve();
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.dataset.routeStylePreload = route;
      document.head.appendChild(link);
      return waitForLink(link);
    }));
    return styles;
  })();

  routeStylePreloads.set(route, preload);
  return preload;
}

async function activateRouteStyles(pathname: string) {
  const route = canonicalRoute(pathname);
  const styles = await preloadRouteStyles(route);
  await Promise.all(styles.map((href) => {
    const persistent = findPersistentStyle(href);
    if (persistent) {
      document.head.appendChild(persistent);
      return Promise.resolve();
    }
    const preload = findLink(href, 'preload');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.persistentRouteStyle = route;
    document.head.appendChild(link);
    preload?.remove();
    return waitForLink(link, 2000);
  }));
}

export function SitePage({ bodyClass, html, styles }: SitePageProps) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    document.body.className = bodyClass;
    styles.filter((href) => !isTypographyStylesheet(href)).forEach((href) => {
      const persistent = findPersistentStyle(href);
      if (persistent) {
        document.head.appendChild(persistent);
        return;
      }
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.dataset.persistentRouteStyle = canonicalRoute(window.location.pathname);
      document.head.appendChild(link);
    });
    return () => { document.body.className = ''; };
  }, [bodyClass, styles]);

  useEffect(() => {
    const root = rootRef.current;
    root?.querySelectorAll<HTMLElement>('[data-image]').forEach((element) => {
      const image = element.dataset.image;
      if (!image) return;
      element.style.backgroundImage = `url("${image.replaceAll('"', '%22')}")`;
      if (element.dataset.color) element.style.backgroundColor = element.dataset.color;
      if (element.dataset.repeat) element.style.backgroundRepeat = element.dataset.repeat;
      if (element.dataset.position) element.style.backgroundPosition = element.dataset.position;
      if (element.dataset.attachment) element.style.backgroundAttachment = element.dataset.attachment;
      if (element.dataset.size) element.style.backgroundSize = element.dataset.size;
    });

    const sectionAnchors = new Map([
      ['MEDIA CENTER', 'media-center'],
      ['OUR CLIENTS', 'our-clients'],
    ]);
    root?.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6').forEach((heading) => {
      const id = sectionAnchors.get(heading.textContent?.trim().toUpperCase() ?? '');
      if (id) heading.closest<HTMLElement>('section')?.setAttribute('id', id);
    });

    root?.querySelectorAll<HTMLElement>('[data-to-value]').forEach((counter) => {
      const value = Number(counter.dataset.toValue);
      if (!Number.isFinite(value)) return;
      counter.textContent = counter.dataset.delimiter
        ? value.toLocaleString('en-US')
        : String(value);
    });

    root?.querySelectorAll<HTMLElement>('.eael-filter-gallery-control').forEach((controlGroup) => {
      controlGroup.setAttribute('role', 'tablist');
      controlGroup.setAttribute('aria-label', 'Product categories');
      controlGroup.querySelectorAll<HTMLElement>('.control').forEach((control, index) => {
        const active = control.classList.contains('active');
        control.setAttribute('role', 'tab');
        control.setAttribute('tabindex', active || index === 0 ? '0' : '-1');
        control.setAttribute('aria-selected', String(active));
      });
    });
  }, [html]);

  useEffect(() => {
    const playHostedVideo = (overlay: HTMLElement) => {
      const wrapper = overlay.closest<HTMLElement>('.elementor-wrapper');
      if (!wrapper || wrapper.querySelector('video')) return;

      let source = '/wp-content/uploads/2022/03/cleanroom_video.mp4';
      const settings = overlay.dataset.elementorLightbox;
      if (settings) {
        try {
          const parsed = JSON.parse(settings) as { url?: string };
          if (parsed.url) source = new URL(parsed.url, window.location.href).pathname;
        } catch {
          // The local recovered video is the safe fallback for malformed legacy data.
        }
      }

      const poster = overlay.querySelector<HTMLImageElement>('img')?.src;
      const video = document.createElement('video');
      video.className = 'react-hosted-video';
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.src = source;
      if (poster) video.poster = poster;
      video.setAttribute('aria-label', 'RV Cleanroom project video');
      overlay.replaceWith(video);
      video.focus();
      void video.play().catch(() => undefined);
    };

    const filterGallery = (control: HTMLElement) => {
      const wrapper = control.closest<HTMLElement>('.eael-filter-gallery-wrapper');
      if (!wrapper) return;
      const filter = control.dataset.filter ?? '*';

      wrapper.querySelectorAll<HTMLElement>('.eael-filter-gallery-control .control').forEach((item) => {
        const active = item === control;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
        item.setAttribute('tabindex', active ? '0' : '-1');
      });

      wrapper.querySelectorAll<HTMLElement>('.eael-filterable-gallery-item-wrap').forEach((item) => {
        item.hidden = filter !== '*' && !item.matches(filter);
      });
    };

    const toggleNavigation = (menuButton: HTMLElement) => {
      const navigation = menuButton.nextElementSibling instanceof HTMLElement
        ? menuButton.nextElementSibling
        : menuButton.parentElement?.querySelector<HTMLElement>('nav');
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      menuButton.classList.toggle('hfe-active-menu', !expanded);
      navigation?.classList.toggle('menu-is-active', !expanded);
      navigation?.classList.toggle('toggled', !expanded);
    };

    const closeNavigation = () => {
      document.querySelectorAll<HTMLElement>('.hfe-nav-menu__toggle.hfe-active-menu, .menu-toggle[aria-expanded="true"]').forEach((button) => {
        button.setAttribute('aria-expanded', 'false');
        button.classList.remove('hfe-active-menu');
        const navigation = button.nextElementSibling instanceof HTMLElement
          ? button.nextElementSibling
          : button.parentElement?.querySelector<HTMLElement>('nav');
        navigation?.classList.remove('menu-is-active', 'toggled');
      });
    };

    const internalUrl = (target: Element | null) => {
      const link = target?.closest<HTMLAnchorElement>('a[href]');
      if (!link || link.target === '_blank') return null;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || /\.(?:pdf|jpe?g|png|gif|webp|svg|mp4)$/i.test(url.pathname)) return null;
      return { link, url };
    };

    const onNavigationIntent = (event: PointerEvent | FocusEvent) => {
      const destination = internalUrl(event.target as Element | null);
      if (destination) void preloadRouteStyles(destination.url.pathname);
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const videoOverlay = target?.closest<HTMLElement>('.elementor-custom-embed-image-overlay[data-elementor-lightbox]');
      if (videoOverlay) {
        event.preventDefault();
        playHostedVideo(videoOverlay);
        return;
      }

      const galleryControl = target?.closest<HTMLElement>('.eael-filter-gallery-control .control');
      if (galleryControl) {
        event.preventDefault();
        filterGallery(galleryControl);
        return;
      }

      const menuButton = target?.closest<HTMLElement>('.hfe-nav-menu__toggle, .menu-toggle');
      if (menuButton) {
        event.preventDefault();
        toggleNavigation(menuButton);
        return;
      }

      const submenuButton = target?.closest<HTMLElement>('.hfe-has-submenu-container');
      if (submenuButton && window.matchMedia('(max-width: 1024px)').matches) {
        const submenu = Array.from(submenuButton.parentElement?.children ?? [])
          .find((child): child is HTMLElement => child instanceof HTMLElement && child.classList.contains('sub-menu'));
        if (submenu) {
          event.preventDefault();
          const expanded = submenuButton.classList.toggle('sub-menu-active');
          submenu.classList.toggle('sub-menu-open', expanded);
          submenu.style.position = 'relative';
          submenu.style.visibility = expanded ? 'visible' : 'hidden';
          submenu.style.opacity = expanded ? '1' : '0';
          submenu.style.height = expanded ? 'auto' : '0';
          submenuButton.querySelector('a')?.setAttribute('aria-expanded', String(expanded));
          return;
        }
      }

      const destination = internalUrl(target);
      if (!destination || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const { url } = destination;
      event.preventDefault();
      closeNavigation();
      void activateRouteStyles(url.pathname)
        .catch(() => undefined)
        .then(() => router.push(`${url.pathname}${url.search}${url.hash}`));
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as Element | null;
      const videoOverlay = target?.closest<HTMLElement>('.elementor-custom-embed-image-overlay[data-elementor-lightbox]');
      if (videoOverlay && (event.key === 'Enter' || event.key === ' ' || event.key === 'Space')) {
        event.preventDefault();
        playHostedVideo(videoOverlay);
        return;
      }

      const galleryControl = target?.closest<HTMLElement>('.eael-filter-gallery-control .control');
      if (galleryControl && (event.key === 'Enter' || event.key === ' ' || event.key === 'Space')) {
        event.preventDefault();
        filterGallery(galleryControl);
        return;
      }
      if (galleryControl && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        event.preventDefault();
        const controls = Array.from(galleryControl.parentElement?.querySelectorAll<HTMLElement>('.control') ?? []);
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const next = controls[(controls.indexOf(galleryControl) + direction + controls.length) % controls.length];
        next?.focus();
        if (next) filterGallery(next);
        return;
      }
      const menuButton = target?.closest<HTMLElement>('.hfe-nav-menu__toggle, .menu-toggle');
      if (menuButton && (event.key === 'Enter' || event.key === ' ' || event.key === 'Space')) {
        event.preventDefault();
        toggleNavigation(menuButton);
      } else if (event.key === 'Escape') {
        closeNavigation();
      }
    };

    const onSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement;
      if (!form.matches('[data-static-contact="true"], .wpcf7-form')) return;
      event.preventDefault();
      if (!form.reportValidity()) return;
      const lines: string[] = [];
      new FormData(form).forEach((value, key) => {
        if (typeof value === 'string' && value.trim()) lines.push(`${key}: ${value.trim()}`);
      });
      window.location.href = `mailto:info@rvcleans.com?subject=${encodeURIComponent('Website inquiry')}&body=${encodeURIComponent(lines.join('\n\n'))}`;
    };
    document.addEventListener('pointerover', onNavigationIntent);
    document.addEventListener('focusin', onNavigationIntent);
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('submit', onSubmit);
    return () => {
      document.removeEventListener('pointerover', onNavigationIntent);
      document.removeEventListener('focusin', onNavigationIntent);
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('submit', onSubmit);
    };
  }, [router]);

  const routeStyles = styles.filter((href) => !isTypographyStylesheet(href));
  return <>{routeStyles.map((href) => <link key={href} rel="stylesheet" href={href} />)}<div ref={rootRef} className="react-site-root" dangerouslySetInnerHTML={{ __html: html }} /></>;
}
