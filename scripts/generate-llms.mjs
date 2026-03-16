import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { createMarkdownFromOpenApi } from '@scalar/openapi-to-markdown'
import { parse } from 'yaml'

const spec = readFileSync('openapi.yaml', 'utf-8')
const doc = parse(spec)
const docsRoot = path.join(process.cwd(), 'src/content/docs')
const publicRoot = path.join(process.cwd(), 'public')
const localeDirs = [
  { locale: 'he', suffix: '.he' },
  { locale: 'zh', suffix: '.zh' },
]

const docOrder = [
  '',
  'guides',
  'getting-started',
  'guides/ai-agent-experiment-tracking',
  'installation',
  'installation/claude-code',
  'installation/claude-desktop-cowork',
  'installation/cursor',
  'installation/openclaw',
  'installation/openai-codex',
  'reference/tracker-js',
  'reference/bot-traffic',
  'reference/authentication',
  'reference/cli-mcp-api',
  'reference/rate-limits',
  'reference/error-format',
]

const docGroups = [
  {
    title: 'Guides',
    slugs: ['guides', 'getting-started', 'guides/ai-agent-experiment-tracking'],
  },
  {
    title: 'Installation',
    slugs: ['installation', 'installation/claude-code', 'installation/claude-desktop-cowork', 'installation/cursor', 'installation/openclaw', 'installation/openai-codex'],
  },
  {
    title: 'Reference',
    slugs: ['reference/tracker-js', 'reference/bot-traffic', 'reference/authentication', 'reference/cli-mcp-api', 'reference/rate-limits', 'reference/error-format'],
  },
]

function walkDocs(dir) {
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...walkDocs(filePath))
      continue
    }
    if (!/\.(md|mdx)$/.test(entry.name)) continue
    files.push(filePath)
  }
  return files
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!match) return { data: {}, body: raw }
  return {
    data: parse(match[1]) || {},
    body: raw.slice(match[0].length),
  }
}

function cleanMarkdown(content) {
  return content
    .replace(/^import\s.+$/gm, '')
    .replace(/<CardGrid[\s\S]*?<\/CardGrid>/g, '')
    .replace(/<Card[\s\S]*?<\/Card>/g, '')
    .replace(/<LinkCard[\s\S]*?<\/LinkCard>/g, '')
    .replace(/<\/?[A-Z][^>]*>/g, '')
    .replace(/<a\s+href="([^"]+)">([^<]+)<\/a>/g, '$2 ($1)')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function toSlug(filePath) {
  const rel = path.relative(docsRoot, filePath).replace(/\\/g, '/')
  const withoutExt = rel.replace(/\.(md|mdx)$/, '')
  if (withoutExt === 'index') return ''
  if (withoutExt.endsWith('/index')) return withoutExt.slice(0, -'/index'.length)
  return withoutExt
}

function toUrl(slug) {
  return slug ? `https://docs.agentanalytics.sh/${slug}/` : 'https://docs.agentanalytics.sh/'
}

function loadDocs() {
  const all = walkDocs(docsRoot).map((filePath) => {
    const raw = readFileSync(filePath, 'utf-8')
    const { data, body } = parseFrontmatter(raw)
    const slug = toSlug(filePath)
    return {
      slug,
      title: data.title || slug || 'Agent Analytics Docs',
      description: data.description || '',
      content: cleanMarkdown(body),
      url: toUrl(slug),
    }
  })

  const bySlug = new Map(all.map((page) => [page.slug, page]))
  return docOrder.map((slug) => bySlug.get(slug)).filter(Boolean)
}

function collectMultiResponseExamples(openapiDoc) {
  const entries = []

  for (const [path, pathItem] of Object.entries(openapiDoc.paths || {})) {
    for (const [method, operation] of Object.entries(pathItem || {})) {
      if (typeof operation !== 'object' || !operation) continue

      const methodUpper = method.toUpperCase()
      const responses = operation.responses || {}
      for (const [status, response] of Object.entries(responses)) {
        const content = response?.content || {}
        for (const [contentType, media] of Object.entries(content)) {
          const examples = media?.examples
          if (!examples || typeof examples !== 'object') continue

          const namedExamples = Object.entries(examples)
            .filter(([, ex]) => ex && typeof ex === 'object' && Object.prototype.hasOwnProperty.call(ex, 'value'))
            .map(([name, ex]) => ({
              name,
              summary: ex.summary || '',
              value: ex.value,
            }))

          if (namedExamples.length < 2) continue

          entries.push({
            method: methodUpper,
            path,
            status,
            contentType,
            namedExamples,
          })
        }
      }
    }
  }

  return entries
}

function buildAdditionalExamplesSection(entries) {
  if (entries.length === 0) return ''

  let out = '## Additional Response Examples\n\n'
  for (const entry of entries) {
    out += `### \`${entry.method} ${entry.path}\`\n\n`
    out += `Status: \`${entry.status}\` · Content-Type: \`${entry.contentType}\`\n\n`

    for (const ex of entry.namedExamples) {
      const title = ex.summary ? `${ex.name} — ${ex.summary}` : ex.name
      out += `#### ${title}\n\n`
      out += `\`\`\`json\n${JSON.stringify(ex.value, null, 2)}\n\`\`\`\n\n`
    }
  }

  return out.trimEnd()
}

function buildDocsIndexSection(pages) {
  let out = '## Docs\n\n'
  out += '- [Docs Home](https://docs.agentanalytics.sh): Guide-first docs homepage\n'
  out += '- [API Reference](https://docs.agentanalytics.sh/api/): Interactive Scalar API reference\n'
  out += '- [OpenAPI Spec](https://docs.agentanalytics.sh/openapi.yaml): Machine-readable OpenAPI 3.1 spec\n'
  out += '- [Full Docs + API Reference](https://docs.agentanalytics.sh/llms-full.txt): LLM-friendly complete export\n\n'

  const pageMap = new Map(pages.map((page) => [page.slug, page]))
  for (const group of docGroups) {
    out += `### ${group.title}\n`
    for (const slug of group.slugs) {
      const page = pageMap.get(slug)
      if (!page) continue
      out += `- [${page.title}](${page.url})`
      if (page.description) out += `: ${page.description}`
      out += '\n'
    }
    out += '\n'
  }

  return out.trimEnd()
}

function buildDocsFullSection(pages) {
  let out = '# Agent Analytics Docs\n\n'
  out += '> Guides, installation pages, reference pages, and the full API reference for Agent Analytics.\n\n'

  for (const page of pages) {
    if (!page.slug) continue
    out += `## ${page.title}\n\n`
    out += `URL: ${page.url}\n\n`
    if (page.description) out += `${page.description}\n\n`
    if (page.content) out += `${page.content}\n\n`
  }

  return out.trimEnd()
}

const docsPages = loadDocs()

// --- llms-full.txt ---
const markdown = await createMarkdownFromOpenApi(spec)
const additionalExamples = buildAdditionalExamplesSection(collectMultiResponseExamples(doc))
let llmsFull = `${buildDocsFullSection(docsPages)}\n\n## API Reference\n\n${markdown.trimEnd()}`
if (additionalExamples) llmsFull += `\n\n${additionalExamples}`
llmsFull += '\n'
writeFileSync('llms-full.txt', llmsFull)
console.log('Generated llms-full.txt (%d bytes)', Buffer.byteLength(llmsFull))

// --- llms.txt ---
// Group paths by first tag
const tagOrder = (doc.tags || []).map(t => t.name)
const groups = new Map()
for (const tag of tagOrder) groups.set(tag, [])

for (const [path, methods] of Object.entries(doc.paths || {})) {
  for (const [method, op] of Object.entries(methods)) {
    if (!op.summary) continue
    const tag = op.tags?.[0] || 'Other'
    if (!groups.has(tag)) groups.set(tag, [])
    groups.get(tag).push(`- \`${method.toUpperCase()} ${path}\` — ${op.summary}`)
  }
}

let endpointSection = ''
for (const [tag, endpoints] of groups) {
  if (endpoints.length === 0) continue
  endpointSection += `### ${tag}\n${endpoints.join('\n')}\n\n`
}

const llmsTxt = `# Agent Analytics

> Installation guides plus API reference for the analytics platform AI agents can query.

API base URL: ${doc.servers?.[0]?.url || 'https://api.agentanalytics.sh'}

${buildDocsIndexSection(docsPages)}

## MCP Server

URL: https://mcp.agentanalytics.sh/mcp (Streamable HTTP transport)

Add to Claude Code:
\`\`\`
claude mcp add agent-analytics --transport http https://mcp.agentanalytics.sh/mcp
\`\`\`

Tools: \`list_projects\`, \`create_project\`, \`all_sites_overview\`, \`analytics_overview\`, \`bot_traffic_overview\`, \`all_sites_bot_traffic\`, \`analytics_insights\`, \`analytics_breakdown\`, \`analytics_pages\`, \`analytics_sessions\`, \`analytics_heatmap\`, \`analytics_funnel\`, \`analytics_retention\`, \`properties\`, \`properties_received\`, \`sessions\`, \`list_experiments\`, \`create_experiment\`, \`get_experiment\`, \`update_experiment\`, \`delete_experiment\`, \`live_now\`, \`query\`

Hosted free accounts can use MCP for \`list_projects\`, \`create_project\`, \`all_sites_overview\`, \`analytics_overview\`, \`bot_traffic_overview\`, and \`all_sites_bot_traffic\`. The rest of the MCP tool surface requires a paid account.

## Agent Skill

Install as an agent skill (works with Claude Code, Codex, and other Agent Skills-compatible tools):
\`\`\`
npx skills add Agent-Analytics/agent-analytics-mcp
\`\`\`

## Quick Start

1. Sign up at https://app.agentanalytics.sh and get your API key
2. Pick an install path from https://docs.agentanalytics.sh/installation/
3. Create a project: \`POST /projects\` with \`X-API-Key\` header
4. Add the tracking snippet (returned in project creation response)
   - If using Astro, add \`is:inline\` to the tracker \`<script>\` tag.
5. Query stats: \`GET /stats?project=my-site\` with \`X-API-Key\` header

## Authentication

- **API Key** (\`aak_*\`): Secret key for reading data and project management. Pass via \`X-API-Key\` header or \`?key=\` query param.
- **Project Token** (\`aat_*\`): Public token for event ingestion. Passed in request body.

## Endpoints

${endpointSection.trimEnd()}

## Rate Limits

| Tier | Requests/min | Event Limit | Data Retention |
|------|-------------|-------------|----------------|
| Free | 10 | 100,000 / month | 90 days |
| Pro  | 1,000 | Unlimited | 365 days |

Hosted free also includes 2 projects and 500 agent/API read actions per month. Paid starts at $1 per 10,000 events and unlocks the full API, CLI, and MCP surface.
`

writeFileSync('llms.txt', llmsTxt)
console.log('Generated llms.txt (%d bytes)', Buffer.byteLength(llmsTxt))

mkdirSync(publicRoot, { recursive: true })
copyFileSync('openapi.yaml', path.join(publicRoot, 'openapi.yaml'))
copyFileSync('llms.txt', path.join(publicRoot, 'llms.txt'))
copyFileSync('llms-full.txt', path.join(publicRoot, 'llms-full.txt'))

for (const { locale, suffix } of localeDirs) {
  mkdirSync(path.join(publicRoot, locale), { recursive: true })
  copyFileSync('openapi.yaml', path.join(publicRoot, `openapi${suffix}.yaml`))
  copyFileSync('llms.txt', path.join(publicRoot, locale, 'llms.txt'))
  copyFileSync('llms-full.txt', path.join(publicRoot, locale, 'llms-full.txt'))
}
console.log('Synced docs artifacts to public/')
