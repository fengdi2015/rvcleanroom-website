import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourceRoot = path.resolve('../rvcleans-conversion/html');
const outputFile = path.resolve('app/_data/pages.json');

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
  if (!value || /^(?:data:|mailto:|tel:|javascript:|#|https?:\/\/)/i.test(value)) return value;
  const [pathnameAndQuery, hash = ''] = value.split('#');
  const [pathname, query = ''] = pathnameAndQuery.split('?');
  if (!pathname) return value;
  let normalized = path.posix.normalize(path.posix.join(route, pathname));
  if (!normalized.startsWith('/')) normalized = `/${normalized}`;
  normalized = normalized.replace(/\/index\.html$/i, '/');
  return `${normalized}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
}

function extract(html, pattern, fallback = '') {
  return html.match(pattern)?.[1]?.trim() || fallback;
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

const pages = [];
for (const file of await walk(sourceRoot)) {
  const route = cleanRoute(file);
  let html = await readFile(file, 'utf8');
  const title = stripTags(extract(html, /<title[^>]*>([\s\S]*?)<\/title>/i, 'RV-Cleanroom'));
  const description = extract(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i, 'Cleanroom design, manufacturing, installation and validation services.');
  const bodyClass = extract(html, /<body[^>]*class=["']([^"']*)["'][^>]*>/i);
  const styles = [...html.matchAll(/<link[^>]+rel=["'][^"']*stylesheet[^"']*["'][^>]+href=["']([^"']+)["'][^>]*>/gi)]
    .map((match) => normalizeUrl(match[1].replaceAll('&#038;', '&'), route))
    .filter((value, index, array) => value && array.indexOf(value) === index);

  html = extract(html, /<body[^>]*>([\s\S]*?)<\/body>/i);
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
  html = html.replace(/(?:^|>)\s*mobile\s*(?=<|$)/gi, '>');
  pages.push({ route, title, description, bodyClass, styles, html });
}

pages.sort((a, b) => a.route.localeCompare(b.route));
await mkdir(path.dirname(outputFile), { recursive: true });
await writeFile(outputFile, `${JSON.stringify(pages)}\n`, 'utf8');
console.log(`Imported ${pages.length} routed pages into ${outputFile}`);
