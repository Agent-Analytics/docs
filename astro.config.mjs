import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.agentanalytics.sh',
  integrations: [
    sitemap(),
    starlight({
      title: 'Agent Analytics',
      description: 'Installation guides and API reference for Agent Analytics.',
      tagline: 'Install Agent Analytics in Claude, Cursor, OpenClaw, Codex, and other AI tools.',
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
      customCss: ['./src/styles/starlight.css'],
      favicon: '/favicon.png',
      lastUpdated: false,
      credits: false,
      sidebar: [
        {
          label: 'Introduction',
          items: [
            { slug: 'getting-started' },
          ],
        },
        {
          label: 'Installation',
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
          items: [
            { slug: 'reference/tracker-js' },
            { slug: 'reference/authentication' },
            { slug: 'reference/cli-mcp-api' },
            { slug: 'reference/rate-limits' },
            { slug: 'reference/error-format' },
            {
              label: 'API Reference',
              link: '/api/',
            },
          ],
        },
      ],
      head: [
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
      ],
    }),
  ],
});
