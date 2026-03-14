import { access, copyFile, mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const localSharedUiDist = path.resolve(repoRoot, '../agent-analytics-shared-ui/dist');
const require = createRequire(import.meta.url);

const files = [
  ['variables.css', path.join(repoRoot, 'src/styles/generated/shared-ui-variables.css')],
  ['recipes.css', path.join(repoRoot, 'src/styles/generated/shared-ui-recipes.css')],
  ['astro/Footer.astro', path.join(repoRoot, 'src/components/generated/SharedFooter.astro')],
];

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function resolveSharedUiAsset(sourceName) {
  const localPath = path.join(localSharedUiDist, sourceName);
  if (await exists(localPath)) return localPath;
  try {
    return require.resolve(`@agent-analytics/shared-ui/${sourceName}`);
  } catch {
    throw new Error(`Missing installed shared UI asset ${sourceName}`);
  }
}

for (const [sourceName, targetPath] of files) {
  const sourcePath = await resolveSharedUiAsset(sourceName);
  await mkdir(path.dirname(targetPath), { recursive: true });
  await copyFile(sourcePath, targetPath);
}
