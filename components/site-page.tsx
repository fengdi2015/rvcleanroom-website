'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

type SitePageProps = { bodyClass: string; html: string; styles: string[] };

export function SitePage({ bodyClass, html, styles }: SitePageProps) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.body.className = bodyClass;
    return () => { document.body.className = ''; };
  }, [bodyClass]);

  useEffect(() => {
    rootRef.current?.querySelectorAll<HTMLElement>('[data-image]').forEach((element) => {
      const image = element.dataset.image;
      if (!image) return;
      element.style.backgroundImage = `url("${image.replaceAll('"', '%22')}")`;
      if (element.dataset.color) element.style.backgroundColor = element.dataset.color;
      if (element.dataset.repeat) element.style.backgroundRepeat = element.dataset.repeat;
      if (element.dataset.position) element.style.backgroundPosition = element.dataset.position;
      if (element.dataset.attachment) element.style.backgroundAttachment = element.dataset.attachment;
      if (element.dataset.size) element.style.backgroundSize = element.dataset.size;
    });
  }, [html]);

  useEffect(() => {
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

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
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

      const link = target?.closest<HTMLAnchorElement>('a[href]');
      if (!link || link.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || /\.(?:pdf|jpe?g|png|gif|webp|svg|mp4)$/i.test(url.pathname)) return;
      event.preventDefault();
      closeNavigation();
      router.push(`${url.pathname}${url.search}${url.hash}`);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as Element | null;
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
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('submit', onSubmit);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('submit', onSubmit);
    };
  }, [router]);

  return <>{styles.map((href) => <link key={href} rel="stylesheet" href={href} />)}<div ref={rootRef} className="react-site-root" dangerouslySetInnerHTML={{ __html: html }} /></>;
}
