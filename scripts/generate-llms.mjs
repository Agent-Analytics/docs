import { readFileSync, writeFileSync } from 'node:fs'
import { createMarkdownFromOpenApi } from '@scalar/openapi-to-markdown'
import { parse } from 'yaml'

const spec = readFileSync('openapi.yaml', 'utf-8')

// --- llms-full.txt (existing) ---
const markdown = await createMarkdownFromOpenApi(spec)
writeFileSync('llms-full.txt', markdown)
console.log('Generated llms-full.txt (%d bytes)', Buffer.byteLength(markdown))

// --- llms.txt (auto-generated from openapi.yaml) ---
const doc = parse(spec)

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

> Web analytics platform with an HTTP API that AI agents can query.

API base URL: ${doc.servers?.[0]?.url || 'https://api.agentanalytics.sh'}

## Docs

- [Full API Reference (LLM-friendly)](https://docs.agentanalytics.sh/llms-full.txt): Complete endpoint documentation
- [OpenAPI Spec](https://docs.agentanalytics.sh/openapi.yaml): Machine-readable OpenAPI 3.1 spec
- [Interactive Docs](https://docs.agentanalytics.sh): Scalar-rendered API reference

## MCP Server

URL: https://mcp.agentanalytics.sh/mcp (Streamable HTTP transport)

Add to Claude Code:
\`\`\`
claude mcp add agent-analytics --transport http https://mcp.agentanalytics.sh/mcp
\`\`\`

Tools: \`list_projects\`, \`create_project\`, \`analytics_overview\`, \`analytics_insights\`, \`analytics_breakdown\`, \`analytics_pages\`, \`analytics_sessions\`, \`analytics_heatmap\`, \`analytics_funnel\`, \`analytics_retention\`, \`properties\`, \`properties_received\`, \`sessions\`, \`list_experiments\`, \`create_experiment\`, \`get_experiment\`, \`update_experiment\`, \`delete_experiment\`, \`live_now\`, \`query\`

## Agent Skill

Install as an agent skill (works with Claude Code, Codex, and other Agent Skills-compatible tools):
\`\`\`
npx skills add Agent-Analytics/agent-analytics-mcp
\`\`\`

## Quick Start

1. Sign up at https://app.agentanalytics.sh and get your API key
2. Create a project: \`POST /projects\` with \`X-API-Key\` header
3. Add the tracking snippet (returned in project creation response)
4. Query stats: \`GET /stats?project=my-site\` with \`X-API-Key\` header

## Authentication

- **API Key** (\`aak_*\`): Secret key for reading data and project management. Pass via \`X-API-Key\` header or \`?key=\` query param.
- **Project Token** (\`aat_*\`): Public token for event ingestion. Passed in request body.

## Endpoints

${endpointSection.trimEnd()}

## Rate Limits

| Tier | Requests/min | Event Limit | Data Retention |
|------|-------------|-------------|----------------|
| Free | 10 | 1,000 lifetime | 7 days |
| Pro  | 1,000 | Unlimited | 365 days |
`

writeFileSync('llms.txt', llmsTxt)
console.log('Generated llms.txt (%d bytes)', Buffer.byteLength(llmsTxt))
