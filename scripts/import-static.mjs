import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourceRoot = path.resolve('../rvcleans-conversion/html');
const outputFile = path.resolve('app/_data/pages.json');
const requestedLiveRoutes = process.env.LIVE_ROUTES
  ? new Set(process.env.LIVE_ROUTES.split(',').map((route) => route.trim()))
  : null;
const archiveOnlyRoutes = new Set([
  '/about-us/',
]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(file)));
    else if (entry.name === 'index.html') files.push(file);
  }
  return files;
}

function cleanRoute(file) {
  const relative = path.relative(sourceRoot, path.dirname(file)).replaceAll('\\', '/');
  return relative === '' ? '/' : `/${relative}/`;
}

function normalizeUrl(value, route) {
  if (!value || /^(?:data:|mailto:|tel:|javascript:|#)/i.test(value)) return value;
  if (/^https?:\/\//i.test(value)) {
    const absolute = new URL(value);
    if (!['rvcleans.com', 'www.rvcleans.com'].includes(absolute.hostname)) return value;
    if (/^\/wp-(?:content|includes)\//i.test(absolute.pathname)) return value;
    return `${absolute.pathname.replace(/\/index\.html$/i, '/')}${absolute.search}${absolute.hash}`;
  }
  const [pathnameAndQuery, hash = ''] = value.split('#');
  const [pathname, query = ''] = pathnameAndQuery.split('?');
  if (!pathname) return value;
  let normalized = pathname.startsWith('/')
    ? path.posix.normalize(pathname)
    : path.posix.normalize(path.posix.join(route, pathname));
  if (!normalized.startsWith('/')) normalized = `/${normalized}`;
  normalized = normalized.replace(/\/index\.html$/i, '/');
  return `${normalized}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
}

function extract(html, pattern, fallback = '') {
  return html.match(pattern)?.[1]?.trim() || fallback;
}

function stripTags(value) {
  return decodeEntities(value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function decodeEntities(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#039;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

const pages = [];
for (const file of await walk(sourceRoot)) {
  const route = cleanRoute(file);
  let html = await readFile(file, 'utf8');
  let source = 'archive';
  if (!archiveOnlyRoutes.has(route) && (!requestedLiveRoutes || requestedLiveRoutes.has(route))) {
    try {
      const response = await fetch(`https://rvcleans.com${route}`, {
        headers: { 'user-agent': 'Mozilla/5.0 (compatible; RVCS-React-Migration/1.0)' },
        redirect: 'follow',
      });
      const liveHtml = await response.text();
      if (response.ok && /<\/html>/i.test(liveHtml) && !/<body[^>]+error404/i.test(liveHtml)) {
        html = liveHtml;
        source = 'live';
      }
    } catch (error) {
      console.warn(`Using archived fallback for ${route}: ${error.message}`);
    }
  }
  const title = stripTags(extract(html, /<title[^>]*>([\s\S]*?)<\/title>/i, 'RV-Cleanroom'));
  const description = decodeEntities(extract(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i, 'Cleanroom design, manufacturing, installation and validation services.'));
  const bodyClass = extract(html, /<body[^>]*class=["']([^"']*)["'][^>]*>/i);
  const head = extract(html, /<head[^>]*>([\s\S]*?)<\/head>/i);
  const headStyles = [...head.matchAll(/<style\b[^>]*>[\s\S]*?<\/style>/gi)]
    .map((match) => match[0])
    .join('');
  const styles = [...html.matchAll(/<link\b[^>]*>/gi)]
    .filter((match) => /\brel=["'][^"']*stylesheet[^"']*["']/i.test(match[0]))
    .map((match) => match[0].match(/\bhref=["']([^"']+)["']/i)?.[1])
    .filter(Boolean)
    .map((href) => normalizeUrl(href.replaceAll('&#038;', '&'), route))
    .filter((value, index, array) => value && array.indexOf(value) === index);

  html = `${headStyles}${extract(html, /<body[^>]*>([\s\S]*?)<\/body>/i)}`;
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, '');
  html = html.replace(/<link\b[^>]*>/gi, '');
  html = html.replace(/\sdata-static-root=["'][^"']*["']/gi, '');
  html = html.replace(/\b(href|src|poster|data-src|data-lazy-src)=["']([^"']+)["']/gi, (whole, name, value) => `${name}="${normalizeUrl(value, route)}"`);
  html = html.replace(/\bsrcset=["']([^"']+)["']/gi, (whole, value) => {
    const normalized = value.split(',').map((item) => {
      const [url, descriptor] = item.trim().split(/\s+/, 2);
      return `${normalizeUrl(url, route)}${descriptor ? ` ${descriptor}` : ''}`;
    }).join(', ');
    return `srcset="${normalized}"`;
  });
  html = html.replace(/\baction=["'][^"']*["']/gi, 'action="#"');
  html = html.replace(/url\((['"]?)(\/wp-(?:content|includes)\/[^)'"\s]+)\1\)/gi, 'url($1https://rvcleans.com$2$1)');
  html = html.replace(/(?:^|>)\s*(?:mobile|desktop)\s*(?=<|$)/gi, '>');
  pages.push({ route, title, description, bodyClass, styles, html, source });
}

pages.sort((a, b) => a.route.localeCompare(b.route));
await mkdir(path.dirname(outputFile), { recursive: true });
await writeFile(outputFile, `${JSON.stringify(pages)}\n`, 'utf8');
const liveCount = pages.filter((page) => page.source === 'live').length;
console.log(`Imported ${pages.length} routed pages (${liveCount} live, ${pages.length - liveCount} archived fallbacks) into ${outputFile}`);
