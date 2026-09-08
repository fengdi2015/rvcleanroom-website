/* oxlint-disable next/no-html-link-for-pages -- native links remain reliable in the vinext production runtime */
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="rvcs-footer">
      <div className="rvcs-footer__inner">
        <div className="rvcs-footer__brand">
          <a href="/" aria-label="RV Cleanroom Systems home"><Image src="/wp-content/uploads/2018/07/Untitled-1.png" alt="RV Cleanroom Systems" width={338} height={182} /></a>
          <p>Cleanroom engineering and manufacturing for controlled industrial environments. Serving global projects since 1999.</p>
        </div>
        <div><h2>Company</h2><a href="/about-us/">About Us</a><a href="/manufacturing/">Manufacturing</a><a href="/cleanroom-project/">Projects</a><a href="/contact/">Contact</a></div>
        <div><h2>Capabilities</h2><a href="/services/">Cleanroom Services</a><a href="/products/">Products & Equipment</a><a href="/solutions/gmp-cleanrooms/">GMP Cleanrooms</a><a href="/solutions/semiconductor-cleanrooms/">Semiconductor Cleanrooms</a></div>
        <div className="rvcs-footer__contact"><h2>Contact</h2><a href="tel:+862151097860"><Phone size={15} /> +86 21 5109 7860</a><a href="mailto:sales@rvcleans.com"><Mail size={15} /> sales@rvcleans.com</a><p><MapPin size={15} /> Shanghai project office<br />Suzhou manufacturing factory</p></div>
      </div>
      <div className="rvcs-footer__bottom"><span>© 2026 RV-Cleanroom System Co., Ltd.</span><a href="/sitemap/">Sitemap</a></div>
    </footer>
  );
}
