'use client';
/* oxlint-disable next/no-html-link-for-pages -- native links remain reliable in the vinext production runtime */

import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/about-us/', label: 'About Us' },
  { href: '/manufacturing/', label: 'Manufacturing' },
  { href: '/services/', label: 'Services' },
  { href: '/products/', label: 'Products' },
  { href: '/cleanroom-project/', label: 'Projects' },
];

function normalizedPath(pathname: string) {
  if (pathname === '/') return pathname;
  return `${pathname.replace(/\/+$/, '')}/`;
}

export function SiteHeader() {
  const pathname = normalizedPath(usePathname());
  const [open, setOpen] = useState(false);

  return (
    <header className="rvcs-header" data-rvcs-header>
      <div className="rvcs-header__inner">
        <a className="rvcs-header__brand" href="/" aria-label="RV Cleanroom Systems home">
          <Image src="/wp-content/uploads/2018/07/Untitled-1.png" alt="RV Cleanroom Systems" width={338} height={182} priority />
          <span>RV Cleanroom Systems</span>
        </a>
        <button
          className="rvcs-header__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="site-navigation" className={open ? 'rvcs-header__nav rvcs-header__nav--open' : 'rvcs-header__nav'} aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} aria-current={(item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)) ? 'page' : undefined}>{item.label}</a>
          ))}
          <a className="rvcs-header__cta" href="/contact/" aria-current={pathname === '/contact/' ? 'page' : undefined}>Request a Quote</a>
        </nav>
      </div>
    </header>
  );
}
