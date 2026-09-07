'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type SitePageProps = { bodyClass: string; html: string; styles: string[] };

export function SitePage({ bodyClass, html, styles }: SitePageProps) {
  const router = useRouter();
  useEffect(() => {
    document.body.className = bodyClass;
    return () => { document.body.className = ''; };
  }, [bodyClass]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const menuButton = target?.closest<HTMLButtonElement>('.menu-toggle');
      if (menuButton) {
        const navigation = menuButton.closest<HTMLElement>('nav, .main-navigation');
        const expanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!expanded));
        navigation?.classList.toggle('toggled', !expanded);
        return;
      }
      const link = target?.closest<HTMLAnchorElement>('a[href]');
      if (!link || link.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || /\.(?:pdf|jpe?g|png|gif|webp|svg|mp4)$/i.test(url.pathname)) return;
      event.preventDefault();
      router.push(`${url.pathname}${url.search}${url.hash}`);
    };
    const onSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement;
      if (!form.matches('[data-static-contact="true"]')) return;
      event.preventDefault();
      if (!form.reportValidity()) return;
      const lines: string[] = [];
      new FormData(form).forEach((value, key) => {
        if (typeof value === 'string' && value.trim()) lines.push(`${key}: ${value.trim()}`);
      });
      window.location.href = `mailto:info@rvcleans.com?subject=${encodeURIComponent('Website inquiry')}&body=${encodeURIComponent(lines.join('\n\n'))}`;
    };
    document.addEventListener('click', onClick);
    document.addEventListener('submit', onSubmit);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('submit', onSubmit);
    };
  }, [router]);

  return <>{styles.map((href) => <link key={href} rel="stylesheet" href={href} />)}<div className="react-site-root" dangerouslySetInnerHTML={{ __html: html }} /></>;
}
