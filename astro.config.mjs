import { readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';

const SITE_ORIGIN = 'https://docs.agentanalytics.sh';
const LOCALE_PREFIXES = ['/he/', '/zh/'];
const projectRoot = dirname(fileURLToPath(import.meta.url));
const docsContentDir = join(projectRoot, 'src', 'content', 'docs');
const docsPagesDir = join(projectRoot, 'src', 'pages');
const sitemapLastmodByPath = buildSitemapLastmodByPath();

function walkFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      return walkFiles(fullPath);
    }

    return [fullPath];
  });
}

function normalizeRoute(pathname) {
  return pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`;
}

function fallbackRouteForLocale(pathname) {
  for (const prefix of LOCALE_PREFIXES) {
    if (!pathname.startsWith(prefix)) {
      continue;
    }

    const remainder = pathname.slice(prefix.length);

    return normalizeRoute(remainder ? `/${remainder}` : '/');
  }

  return pathname;
}

function contentRouteForFile(filePath) {
  const relativePath = relative(docsContentDir, filePath).split(sep).join('/');

  if (!/\.(md|mdx|astro)$/.test(relativePath)) {
    return null;
  }

  const slug = relativePath.replace(/\.(md|mdx|astro)$/, '');

  if (slug === 'index') {
    return '/';
  }

  return normalizeRoute(`/${slug.replace(/\/index$/, '')}`);
}

function pageRouteForFile(filePath) {
  const relativePath = relative(docsPagesDir, filePath).split(sep).join('/');

  if (!relativePath.endsWith('/index.astro')) {
    return null;
  }

  return normalizeRoute(`/${relativePath.replace(/\/index\.astro$/, '')}`);
}

function buildSitemapLastmodByPath() {
  const lastmodByPath = new Map();

  for (const filePath of walkFiles(docsContentDir)) {
    const route = contentRouteForFile(filePath);

    if (route) {
      lastmodByPath.set(route, statSync(filePath).mtime.toISOString());
    }
  }

  for (const filePath of walkFiles(docsPagesDir)) {
    const route = pageRouteForFile(filePath);

    if (route) {
      lastmodByPath.set(route, statSync(filePath).mtime.toISOString());
    }
  }

  return lastmodByPath;
}

export default defineConfig({
  site: SITE_ORIGIN,
  integrations: [
    sitemap({
      serialize(item) {
        const pathname = normalizeRoute(new URL(item.url, SITE_ORIGIN).pathname);
        const lastmod =
          sitemapLastmodByPath.get(pathname) ??
          sitemapLastmodByPath.get(fallbackRouteForLocale(pathname));

        return lastmod ? { ...item, lastmod } : item;
      },
    }),
    starlight({
      title: 'Agent Analytics',
      description: 'Guides, installation paths, and API reference for the web analytics MCP and analytics API your AI agent can run.',
      tagline: 'Agent-first docs for the web analytics MCP and analytics API in Claude Code, Cursor, OpenClaw, Codex, and other AI tools.',
      locales: {
        root: { label: 'English', lang: 'en' },
        he: { label: 'עברית', lang: 'he', dir: 'rtl' },
        zh: { label: '简体中文', lang: 'zh-CN' },
      },
      defaultLocale: 'root',
      logo: {
        src: './src/assets/logo-v2.png',
        alt: '',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/Agent-Analytics' },
      ],
      editLink: {
        baseUrl: 'https://github.com/Agent-Analytics/docs/blob/main/',
      },
      components: {
        Footer: './src/components/Footer.astro',
      },
      customCss: ['./src/styles/starlight.css'],
      favicon: '/favicon.png',
      lastUpdated: false,
      credits: false,
      sidebar: [
        {
          label: 'Guides',
          translations: {
            he: 'מדריכים',
            'zh-CN': '指南',
          },
          items: [
            { slug: 'guides' },
            { slug: 'getting-started' },
            {
              label: 'Paperclip',
              translations: {
                he: 'Paperclip',
                'zh-CN': 'Paperclip',
              },
              items: [
                { slug: 'guides/paperclip' },
                { slug: 'reference/paperclip-live-plugin' },
              ],
            },
            { slug: 'guides/first-project-in-5-minutes' },
            { slug: 'guides/ai-agent-experiment-tracking' },
          ],
        },
        {
          label: 'Installation',
          translations: {
            he: 'התקנה',
            'zh-CN': '安装',
          },
          items: [
            { slug: 'installation' },
            { slug: 'installation/claude-code' },
            { slug: 'installation/claude-desktop-cowork' },
            { slug: 'installation/cursor' },
            { slug: 'installation/openclaw' },
            { slug: 'installation/openai-codex' },
          ],
        },
        {
          label: 'Reference',
          translations: {
            he: 'עיון',
            'zh-CN': '参考',
          },
          items: [
            { slug: 'reference/tracker-js' },
            { slug: 'reference/bot-traffic' },
            { slug: 'reference/authentication' },
            { slug: 'reference/cli' },
            { slug: 'reference/cli-mcp-api' },
            { slug: 'reference/rate-limits' },
            { slug: 'reference/error-format' },
            {
              label: 'API Reference',
              translations: {
                he: 'עיון ב-API',
                'zh-CN': 'API 参考',
              },
              link: '/api/',
            },
          ],
        },
      ],
      head: [
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/favicon.png' } },
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' } },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Bitter:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Outfit:wght@300;400;500;600;700&display=swap',
          },
        },
        { tag: 'link', attrs: { rel: 'help', type: 'text/plain', href: '/llms.txt', title: 'LLM-friendly docs index' } },
        { tag: 'link', attrs: { rel: 'help', type: 'text/plain', href: '/llms-full.txt', title: 'LLM-friendly full docs and API reference' } },
        {
          tag: 'script',
          attrs: {
            src: 'https://api.agentanalytics.sh/tracker.js',
            defer: true,
            'data-project': 'agentanalytics-landing',
            'data-token': 'aat_51da22cdcab084ae1cdb50fd4841c642f0dafdb1d9adfa6b',
            'data-link-domains': 'agentanalytics.sh',
            'data-track-outgoing': true,
            'data-heartbeat': '15',
            'data-track-errors': true,
            'data-track-performance': true,
            'data-track-clicks': true,
            'data-track-vitals': true,
            'data-track-scroll-depth': true,
          },
        },
        {
          tag: 'script',
          children: `(function () {
            if (window.location.pathname !== '/') return;
            if (document.cookie.split(';').map((part) => part.trim()).some((part) => part.startsWith('aa_locale='))) return;
            var languages = navigator.languages || [navigator.language];
            var preferred = 'en';
            for (var index = 0; index < languages.length; index += 1) {
              var value = String(languages[index] || '').toLowerCase();
              if (value.startsWith('he') || value.startsWith('iw')) { preferred = 'he'; break; }
              if (value.startsWith('zh')) { preferred = 'zh'; break; }
            }
            if (preferred === 'en') return;
            var secure = window.location.protocol === 'https:' ? '; Secure' : '';
            var domain = window.location.hostname === 'docs.agentanalytics.sh' || window.location.hostname.endsWith('.agentanalytics.sh')
              ? '; Domain=.agentanalytics.sh'
              : '';
            document.cookie = 'aa_locale=' + preferred + '; Path=/; Max-Age=31536000; SameSite=Lax' + domain + secure;
            window.location.replace(preferred === 'he' ? '/he/' : '/zh/');
          })();`,
        },
      ],
    }),
  ],
});
