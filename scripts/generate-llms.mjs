import { readFileSync, writeFileSync } from 'node:fs'
import { createMarkdownFromOpenApi } from '@scalar/openapi-to-markdown'

const spec = readFileSync('openapi.yaml', 'utf-8')
const markdown = await createMarkdownFromOpenApi(spec)
writeFileSync('llms-full.txt', markdown)
console.log('Generated llms-full.txt (%d bytes)', Buffer.byteLength(markdown))
