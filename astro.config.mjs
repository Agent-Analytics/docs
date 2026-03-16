import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.agentanalytics.sh',
  integrations: [
    sitemap(),
    starlight({
      title: 'Agent Analytics',
      description: 'Guides, installation paths, and API reference for Agent Analytics.',
      tagline: 'Guide-first docs for agent-native analytics in Claude, Cursor, OpenClaw, Codex, and other AI tools.',
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
