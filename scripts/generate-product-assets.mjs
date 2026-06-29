/**
 * Scans public/assets and generates data/productAssetManifest.ts
 * Run: node scripts/generate-product-assets.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const ASSETS_ROOT = path.join(ROOT, 'public', 'assets');
const OUTPUT = path.join(ROOT, 'data', 'productAssetManifest.ts');

const SERIES_FOLDER_MAP = {
  'AG - VEIL': 'Veil',
  'CM - ORBIT': 'Orbit',
  'DU - TWIN': 'Twin',
  'FR - LATCH': 'Latch',
  'GN - LUXE': 'Luxe',
  'HW - FORTE': 'Forte',
  'LH - SLATE': 'Slate',
  'LL - SHARD': 'Shard',
  'SF - CY - TORRE': 'Torre',
  'SF - DO - DUO': 'Duo',
  'SF - HG - DRAPE': 'Drape',
  'SF - LZ - BLADE': 'Blade',
  'SF - MV - FLEX': 'Flex',
  'SF - RM - SHEER': 'Sheer',
  'SF - SW - MURAL': 'Mural',
  'SN - FINO': 'Fino',
  'TL - FLUSH': 'Flush',
  'WW - FRESCO': 'Fresco',
};

const SKIP_FOLDERS = new Set(['Unsorted', 'OLD COB Fittings', 'Downlight & Panel', 'NanoLuminaDown']);

function normalizeWattage(value) {
  return value.replace(/\s+/g, '').toUpperCase();
}

function extractWattageFromFolder(folderName) {
  const xMatch = folderName.match(/(\d+)\s*[xX]\s*(\d+)/);
  if (xMatch) return `${xMatch[1]}X${xMatch[2]}`;

  const parenMatch = folderName.match(/(\d+)\s*\(W\)/i);
  if (parenMatch) return `${parenMatch[1]}W`;

  const wattMatch = folderName.match(/(\d+)\s*W\b/i);
  if (wattMatch) return `${wattMatch[1]}W`;

  const ordinalWatt = folderName.match(/(?:\d+(?:ND|TH|ST|RD)\s*-\s*)(\d+)\s*W/i);
  if (ordinalWatt) return `${ordinalWatt[1]}W`;

  const ampMatch = folderName.match(/(\d+(?:&\d+)+)/);
  if (ampMatch) return ampMatch[1];

  return null;
}

function findThumbnailForBase(files, baseName) {
  const candidates = [
    `${baseName}-thumbnail.png`,
    `${baseName} -thumbnail.png`,
    `${baseName}- thumbnail.png`,
  ];
  for (const candidate of candidates) {
    if (files.includes(candidate)) return candidate;
  }
  const loose = files.find(
    (f) => f.includes('thumbnail') && f.replace(/-?\s*thumbnail\.png$/i, '').replace(/\.png$/i, '') === baseName,
  );
  return loose ?? null;
}

function parseImageDir(absDir) {
  const files = fs.readdirSync(absDir).filter((f) => f.toLowerCase().endsWith('.png'));
  const fullImages = files.filter((f) => !f.toLowerCase().includes('thumbnail'));

  const pairs = fullImages.map((fullFile) => {
    const baseName = fullFile.replace(/\.png$/i, '');
    const thumbFile = findThumbnailForBase(files, baseName);
    const toUrl = (file) => `/assets/${path.relative(ASSETS_ROOT, path.join(absDir, file)).split(path.sep).join('/')}`;
    return {
      thumbnail: toUrl(thumbFile ?? fullFile),
      full: toUrl(fullFile),
    };
  });

  pairs.sort((a, b) => {
    const numA = parseInt(path.basename(a.full), 10);
    const numB = parseInt(path.basename(b.full), 10);
    if (!Number.isNaN(numA) && !Number.isNaN(numB)) return numA - numB;
    return a.full.localeCompare(b.full);
  });

  return pairs;
}

function findImageDirs(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const hasPng = entries.some((e) => e.isFile() && e.name.toLowerCase().endsWith('.png'));
  if (hasPng) return [dir];

  let dirs = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      dirs = dirs.concat(findImageDirs(path.join(dir, entry.name)));
    }
  }
  return dirs;
}

function scoreWattFolder(folderName, wattage) {
  const extracted = extractWattageFromFolder(folderName);
  if (!extracted) return 0;
  if (normalizeWattage(extracted) === normalizeWattage(wattage)) {
    // Prefer explicit "12W" over "12 - W+W"
    return folderName.match(/\d+\s*W\b/i) ? 10 : 5;
  }
  return 0;
}

function assignWattLabels(variantDirs, productWattages) {
  const assignments = variantDirs.map((dir) => {
    const folderName = path.basename(dir);
    const extracted = extractWattageFromFolder(folderName);
    return { dir, folderName, extracted, wattage: null, matched: false };
  });

  const usedDirs = new Set();

  if (productWattages.length > 0) {
    for (const wattage of productWattages) {
      let best = null;
      let bestScore = 0;
      for (const item of assignments) {
        if (usedDirs.has(item.dir)) continue;
        const score = scoreWattFolder(item.folderName, wattage);
        if (score > bestScore) {
          bestScore = score;
          best = item;
        }
      }
      if (best && bestScore > 0) {
        best.wattage = wattage;
        best.matched = true;
        usedDirs.add(best.dir);
      }
    }

    const remainingWatts = productWattages.filter(
      (w) => !assignments.some((a) => a.wattage && normalizeWattage(a.wattage) === normalizeWattage(w)),
    );
    const orphanDirs = assignments.filter((a) => !a.wattage);

    if (remainingWatts.length > 0 && orphanDirs.length === remainingWatts.length) {
      orphanDirs.sort((a, b) => a.folderName.localeCompare(b.folderName));
      remainingWatts.forEach((wattage, i) => {
        orphanDirs[i].wattage = wattage;
        orphanDirs[i].matched = true;
        usedDirs.add(orphanDirs[i].dir);
      });
    }
  }

  for (const item of assignments) {
    if (!item.wattage) {
      item.wattage = item.extracted ?? item.folderName;
    }
  }

  const variants = assignments
    .filter((a) => a.matched && parseImageDir(a.dir).length > 0)
    .map((a) => ({
      wattage: a.wattage,
      label: a.wattage,
      images: parseImageDir(a.dir),
    }));

  if (variants.length === 0) {
    return assignments
      .filter((a) => parseImageDir(a.dir).length > 0)
      .map((a) => ({
        wattage: a.wattage,
        label: a.wattage,
        images: parseImageDir(a.dir),
      }));
  }

  if (productWattages.length > 0) {
    variants.sort((a, b) => {
      const ai = productWattages.findIndex((w) => normalizeWattage(w) === normalizeWattage(a.wattage));
      const bi = productWattages.findIndex((w) => normalizeWattage(w) === normalizeWattage(b.wattage));
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
  }

  return variants;
}

// Load product index from data files via simple regex parse
function parseConstants(content) {
  const constants = {};
  for (const m of content.matchAll(/const\s+(\w+)\s*=\s*'([^']+)'/g)) {
    constants[m[1]] = m[2];
  }
  return constants;
}

function resolveFieldValue(raw, constants) {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (trimmed.startsWith("'")) return trimmed.slice(1, -1);
  return constants[trimmed] ?? trimmed;
}

function loadProductIndex() {
  const dataDir = path.join(ROOT, 'data');
  const seriesFiles = fs.readdirSync(dataDir).filter((f) => f.endsWith('Series.ts') || f === 'antiglareProducts.ts');
  const products = [];

  for (const file of seriesFiles) {
    const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
    const constants = parseConstants(content);
    const blocks = content.split(/\{\s*\n\s*id:/).slice(1);
    for (const block of blocks) {
      const id = block.match(/^ '([^']+)'/)?.[1];
      const slug = block.match(/slug:\s*'([^']+)'/)?.[1];
      const name = block.match(/name:\s*'([^']+)'/)?.[1];
      const seriesRaw = block.match(/seriesName:\s*([^,\n]+)/)?.[1];
      const seriesName = resolveFieldValue(seriesRaw, constants);
      const wattages = [...block.matchAll(/wattage:\s*'([^']+)'/g)].map((m) => m[1]);
      if (id && slug && name && seriesName) {
        products.push({ id, slug, name, seriesName, wattages });
      }
    }
  }
  return products;
}

function resolveSeriesName(seriesFolder) {
  return SERIES_FOLDER_MAP[seriesFolder] ?? null;
}

function main() {
  const productIndex = loadProductIndex();
  const manifest = {};
  let matched = 0;

  for (const seriesFolder of fs.readdirSync(ASSETS_ROOT)) {
    if (SKIP_FOLDERS.has(seriesFolder)) continue;
    const seriesPath = path.join(ASSETS_ROOT, seriesFolder);
    if (!fs.statSync(seriesPath).isDirectory()) continue;

    const seriesName = resolveSeriesName(seriesFolder);
    if (!seriesName) {
      console.warn(`No series mapping for folder: ${seriesFolder}`);
      continue;
    }

    for (const productFolder of fs.readdirSync(seriesPath)) {
      const productPath = path.join(seriesPath, productFolder);
      if (!fs.statSync(productPath).isDirectory()) continue;

      const product = productIndex.find(
        (p) => p.seriesName === seriesName && p.name.toLowerCase() === productFolder.toLowerCase(),
      );
      if (!product) {
        console.warn(`No product match: ${seriesName}/${productFolder}`);
        continue;
      }

      const imageDirs = findImageDirs(productPath);
      if (imageDirs.length === 0) continue;

      const wattVariants = assignWattLabels(imageDirs, product.wattages);
      if (wattVariants.length === 0) continue;

      const primaryVariant =
        wattVariants.find((v) => product.wattages[0] && normalizeWattage(v.wattage) === normalizeWattage(product.wattages[0])) ??
        wattVariants[0];
      const firstImages = primaryVariant.images;
      manifest[product.slug] = {
        listingThumbnail: firstImages[0]?.thumbnail ?? firstImages[0]?.full ?? '',
        wattVariants,
      };
      matched++;
    }
  }

  const output = `// Auto-generated by scripts/generate-product-assets.mjs — do not edit manually
export interface ProductImagePair {
  thumbnail: string;
  full: string;
}

export interface ProductWattVariant {
  wattage: string;
  label: string;
  images: ProductImagePair[];
}

export interface ProductAssetEntry {
  listingThumbnail: string;
  wattVariants: ProductWattVariant[];
}

export const PRODUCT_ASSET_MANIFEST: Record<string, ProductAssetEntry> = ${JSON.stringify(manifest, null, 2)};
`;

  fs.writeFileSync(OUTPUT, output, 'utf8');
  console.log(`Generated manifest for ${matched} products → ${OUTPUT}`);
}

main();
