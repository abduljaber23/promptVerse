/**
 * Seeder de démonstration PromptVerse.
 *
 * Deux modes :
 *
 *  • Ajout (par défaut, utilisable en PROD) : n'efface et ne modifie RIEN
 *    d'existant. Chaque donnée de démo a un identifiant stable (email, nom,
 *    slug `…-demo`, session Stripe `cs_demo_seed_…`) : si elle existe déjà,
 *    elle est ignorée. Le script peut donc être relancé sans risque.
 *      dev  : npm run seed            | make seed
 *      prod : docker compose -f docker-compose.prod.yml exec \
 *               -e SEED_DEMO_PASSWORD='…' api npm run seed:prod
 *
 *  • Reset (`--reset`, DEV uniquement) : vide toutes les tables métier puis
 *    réinsère tout. Refusé si NODE_ENV=production, sans exception.
 *      npm run seed -- --reset     | make seed-reset
 *
 * En production :
 *  - les comptes ADMIN / SUPER_ADMIN de démo ne sont PAS créés (les vrais
 *    comptes admin existent déjà, on ne publie pas un admin au mot de passe
 *    connu) ;
 *  - le mot de passe des comptes de démo vient de SEED_DEMO_PASSWORD
 *    (obligatoire), jamais du mot de passe par défaut versionné.
 *
 * Les images (couvertures, aperçus, avatars) sont générées en SVG dans
 * `uploads/` (préfixe `seed-`) et servies par StorageController comme un
 * upload classique : compatible avec la CSP `img-src 'self'` de la prod.
 */
import 'reflect-metadata';
import { promises as fs } from 'fs';
import { join } from 'path';
import { DataSource, EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import slugify from 'slugify';

import { dataSourceOptions } from '../data-source';
import { User } from '../../modules/users/entities/user.entity';
import { UserProfile } from '../../modules/users/entities/user-profile.entity';
import { SocialLink } from '../../modules/users/entities/social-link.entity';
import { Category } from '../../modules/categories/entities/category.entity';
import { AiTool } from '../../modules/ai-tools/entities/ai-tool.entity';
import { Prompt } from '../../modules/prompts/entities/prompt.entity';
import { PreviewImage } from '../../modules/prompts/entities/preview-image.entity';
import { Purchase } from '../../modules/purchases/entities/purchase.entity';
import { UserRoles, UserStatus } from '../../common/enums/user.enum';
import { PromptStatus } from '../../common/enums/prompt.enum';
import { PurchaseStatus } from '../../common/enums/purchase.enum';
import { StorageFolder } from '../../common/enums/storage-folder.enum';
import {
  AI_TOOLS,
  CATEGORIES,
  DEMO_PASSWORD,
  PROMPTS,
  PURCHASES,
  USERS,
} from './seed-data';

const IS_PROD = process.env.NODE_ENV === 'production';
const RESET = process.argv.includes('--reset');
const UPLOADS_DIR = join(process.cwd(), 'uploads');

const slug = (s: string) => slugify(s, { lower: true, strict: true });
const demoSlug = (title: string) => `${slug(title)}-demo`;
const daysAgo = (n: number) => new Date(Date.now() - n * 24 * 3600 * 1000);
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const log = (msg: string) => console.log(`[seed] ${msg}`);
const warn = (msg: string) => console.warn(`[seed] ⚠️  ${msg}`);

const stats = { created: 0, skipped: 0 };

// ───────────────────────────── Images SVG ─────────────────────────────

function wrap(text: string, max: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(' ')) {
    if ((line + ' ' + word).trim().length > max) {
      lines.push(line.trim());
      line = word;
    } else line += ' ' + word;
  }
  if (line.trim()) lines.push(line.trim());
  return lines.slice(0, 4);
}

function coverSvg(
  title: string,
  tool: string,
  category: string,
  c: readonly string[],
) {
  const lines = wrap(title, 22);
  const startY = 330 - (lines.length - 1) * 30;
  const tspans = lines
    .map((l, i) => `<tspan x="60" y="${startY + i * 62}">${esc(l)}</tspan>`)
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient></defs>
<rect width="800" height="600" fill="url(#g)"/>
<circle cx="690" cy="110" r="190" fill="#fff" opacity=".10"/>
<circle cx="760" cy="560" r="140" fill="#fff" opacity=".08"/>
<rect x="60" y="60" rx="22" width="${tool.length * 17 + 48}" height="44" fill="#fff" opacity=".92"/>
<text x="84" y="90" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="${c[0]}">${esc(tool)}</text>
<text font-family="Segoe UI, Arial, sans-serif" font-size="50" font-weight="800" fill="#fff">${tspans}</text>
<text x="60" y="545" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#fff" opacity=".85">${esc(category)} · PromptVerse</text>
</svg>`;
}

function previewSvg(c: readonly string[], seed: number) {
  const shapes = Array.from({ length: 7 }, (_, i) => {
    const x = (seed * 97 + i * 131) % 800;
    const y = (seed * 53 + i * 89) % 600;
    const r = 60 + (((seed + i) * 37) % 140);
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${i % 2 ? c[0] : '#ffffff'}" opacity="${0.12 + (i % 3) * 0.08}"/>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
<defs><radialGradient id="r" cx=".3" cy=".3" r="1"><stop offset="0" stop-color="${c[1]}"/><stop offset="1" stop-color="#0f172a"/></radialGradient></defs>
<rect width="800" height="600" fill="url(#r)"/>${shapes}
<text x="30" y="575" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#fff" opacity=".7">Aperçu du résultat #${seed}</text>
</svg>`;
}

function avatarSvg(username: string, color: string) {
  const initials = username
    .replace(/_/g, ' ')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
<rect width="256" height="256" fill="${color}"/>
<text x="128" y="128" dy=".35em" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="104" font-weight="700" fill="#fff">${esc(initials)}</text>
</svg>`;
}

async function writeAsset(folder: StorageFolder, name: string, svg: string) {
  await fs.mkdir(join(UPLOADS_DIR, folder), { recursive: true });
  await fs.writeFile(join(UPLOADS_DIR, folder, name), svg, 'utf8');
  return `${folder}/${name}`; // clé stockée en base, comme pour un vrai upload
}

async function cleanSeedAssets() {
  for (const folder of Object.values(StorageFolder)) {
    const dir = join(UPLOADS_DIR, folder);
    const files = await fs.readdir(dir).catch(() => [] as string[]);
    await Promise.all(
      files
        .filter((f) => f.startsWith('seed-'))
        .map((f) => fs.unlink(join(dir, f))),
    );
  }
}

// ───────────────────────────── Étapes ─────────────────────────────

async function reset(ds: DataSource) {
  await ds.transaction(async (m) => {
    // Ordre inverse des clés étrangères.
    for (const table of [
      'purchases',
      'preview_images',
      'prompts',
      'social_links',
      'user_profiles',
      'users',
      'categories',
      'ai_tools',
    ]) {
      await m.query(`DELETE FROM \`${table}\``);
    }
  });
  await cleanSeedAssets();
  log('tables vidées (--reset)');
}

/**
 * Catégorie / outil IA : réutilise la ligne existante (même nom ou même slug,
 * ex. créée par un admin). Une ligne supprimée (soft delete) par un admin
 * n'est pas restaurée : les prompts de démo qui en dépendent sont ignorés.
 */
async function upsertCatalogItem<T extends Category | AiTool>(
  m: EntityManager,
  entity: new () => T,
  name: string,
): Promise<T | null> {
  const repo = m.getRepository<Category | AiTool>(entity);
  const existing = await repo.findOne({
    where: [{ name }, { slug: slug(name) }],
    withDeleted: true,
  });
  if (existing) {
    stats.skipped++;
    if (existing.deletedAt) {
      warn(
        `"${name}" a été supprimé(e) par un admin, prompts associés ignorés`,
      );
      return null;
    }
    return existing as T;
  }
  stats.created++;
  return (await repo.save(
    repo.create({ name, slug: slug(name), iconUrl: null }),
  )) as T;
}

async function seedUsers(m: EntityManager) {
  const password = IS_PROD
    ? process.env.SEED_DEMO_PASSWORD!
    : (process.env.SEED_DEMO_PASSWORD ?? DEMO_PASSWORD);
  const hash = await bcrypt.hash(password, 10);
  const users = new Map<string, User>();

  for (const [i, u] of USERS.entries()) {
    if (IS_PROD && u.role !== UserRoles.USER) {
      log(`compte ${u.role} de démo non créé en production (${u.email})`);
      continue;
    }

    const byEmail = await m.findOne(User, {
      where: { email: u.email },
      withDeleted: true,
    });
    if (byEmail) {
      stats.skipped++;
      if (byEmail.deletedAt) warn(`${u.email} a été supprimé, ignoré`);
      else users.set(u.key, byEmail); // existe déjà : on ne touche à rien
      continue;
    }
    const usernameTaken = await m.exists(User, {
      where: { username: u.username },
      withDeleted: true,
    });
    if (usernameTaken) {
      warn(`pseudo "${u.username}" déjà pris par un vrai compte, ignoré`);
      stats.skipped++;
      continue;
    }

    const user = await m.save(
      m.create(User, {
        email: u.email,
        username: u.username,
        password: hash,
        role: u.role,
        status: UserStatus.ACTIVE,
        isEmailVerified: true,
        emailVerifiedAt: daysAgo(100 - i),
        balance: 0,
        createdAt: daysAgo(100 - i),
      }),
    );
    const avatar = await writeAsset(
      StorageFolder.AVATARS,
      `seed-${u.username}.svg`,
      avatarSvg(u.username, u.color),
    );
    await m.save(
      m.create(UserProfile, {
        user,
        avatar,
        bio: u.bio,
        socialLinks: (u.socials ?? []).map((s) => m.create(SocialLink, s)),
      }),
    );
    users.set(u.key, user);
    stats.created++;
  }
  return users;
}

async function seedPrompts(
  m: EntityManager,
  users: Map<string, User>,
  categories: Map<string, Category | null>,
  aiTools: Map<string, AiTool | null>,
) {
  const prompts = new Map<string, Prompt>();

  for (const [index, p] of PROMPTS.entries()) {
    const promptSlug = demoSlug(p.title);
    const existing = await m.findOne(Prompt, {
      where: { slug: promptSlug },
      withDeleted: true,
    });
    if (existing) {
      stats.skipped++;
      if (!existing.deletedAt) prompts.set(p.title, existing);
      continue;
    }

    const seller = users.get(p.seller);
    const category = categories.get(p.category);
    const aiTool = aiTools.get(p.aiTool);
    if (!seller || !category || !aiTool) {
      warn(`prompt "${p.title}" ignoré (vendeur/catégorie/outil indisponible)`);
      stats.skipped++;
      continue;
    }

    const cat = CATEGORIES.find((c) => c.key === p.category)!;
    const tool = AI_TOOLS.find((t) => t.key === p.aiTool)!;
    const coverImage = await writeAsset(
      StorageFolder.PROMPT_COVERS,
      `seed-${promptSlug}.svg`,
      coverSvg(p.title, tool.name, cat.name, cat.color),
    );
    const previewImages: PreviewImage[] = [];
    for (let k = 1; k <= (p.previews ?? 0); k++) {
      const url = await writeAsset(
        StorageFolder.PROMPT_PREVIEWS,
        `seed-${promptSlug}-${k}.svg`,
        previewSvg(cat.color, index * 3 + k),
      );
      previewImages.push(m.create(PreviewImage, { url, sortOrder: k }));
    }

    const prompt = await m.save(
      m.create(Prompt, {
        title: p.title,
        slug: promptSlug,
        promptContent: p.promptContent,
        previewResult: p.previewResult,
        coverImage,
        price: p.price,
        salesCount: p.sales,
        viewsCount: p.views,
        favoritesCount: p.favorites,
        averageRating: p.rating,
        isFeatured: p.featured ?? false,
        status: p.status ?? PromptStatus.PUBLISHED,
        seller,
        category,
        aiTool,
        previewImages,
        createdAt: daysAgo(p.daysAgo),
      }),
    );
    prompts.set(p.title, prompt);
    stats.created++;
  }
  return prompts;
}

async function seedPurchases(
  m: EntityManager,
  users: Map<string, User>,
  prompts: Map<string, Prompt>,
) {
  for (const [i, a] of PURCHASES.entries()) {
    const sessionId = `cs_demo_seed_${String(i + 1).padStart(3, '0')}`;
    if (
      await m.exists(Purchase, {
        where: { stripeCheckoutSessionId: sessionId },
      })
    ) {
      stats.skipped++;
      continue;
    }
    const prompt = prompts.get(a.prompt);
    const buyer = users.get(a.buyer);
    if (!prompt || !buyer || buyer.id === prompt.sellerId) {
      stats.skipped++;
      continue;
    }

    await m.save(
      m.create(Purchase, {
        buyerId: buyer.id,
        promptId: prompt.id,
        sellerId: prompt.sellerId,
        amount: prompt.price,
        stripeCheckoutSessionId: sessionId,
        stripePaymentIntentId: `pi_demo_seed_${String(i + 1).padStart(3, '0')}`,
        status: PurchaseStatus.COMPLETED,
        createdAt: daysAgo(a.daysAgo),
      }),
    );
    // Uniquement pour un achat réellement créé : garde compteurs et soldes
    // cohérents même si le script est relancé.
    await m.increment(Prompt, { id: prompt.id }, 'salesCount', 1);
    await m.increment(
      User,
      { id: prompt.sellerId },
      'balance',
      Number(prompt.price),
    );
    stats.created++;
  }
}

// ───────────────────────────── Main ─────────────────────────────

async function run() {
  if (IS_PROD && RESET) {
    throw new Error(
      '--reset est interdit en production (efface les vrais comptes).',
    );
  }
  if (IS_PROD && (process.env.SEED_DEMO_PASSWORD ?? '').length < 8) {
    throw new Error(
      'SEED_DEMO_PASSWORD (8 caractères min.) est obligatoire en production.',
    );
  }

  const ds = new DataSource({
    ...dataSourceOptions,
    entities: [
      User,
      UserProfile,
      SocialLink,
      Category,
      AiTool,
      Prompt,
      PreviewImage,
      Purchase,
    ],
    migrations: [],
    logging: false,
  });
  await ds.initialize();
  log(
    `connecté à ${String(dataSourceOptions.database)} ` +
      `(${IS_PROD ? 'PRODUCTION' : 'dev'}, mode ${RESET ? 'reset' : 'ajout sans effacement'})`,
  );

  if (RESET) await reset(ds);

  await ds.transaction(async (m) => {
    const categories = new Map<string, Category | null>();
    for (const c of CATEGORIES) {
      categories.set(c.key, await upsertCatalogItem(m, Category, c.name));
    }
    const aiTools = new Map<string, AiTool | null>();
    for (const t of AI_TOOLS) {
      aiTools.set(t.key, await upsertCatalogItem(m, AiTool, t.name));
    }
    const users = await seedUsers(m);
    const prompts = await seedPrompts(m, users, categories, aiTools);
    await seedPurchases(m, users, prompts);
  });

  await ds.destroy();

  log(
    `✅ terminé : ${stats.created} créé(s), ${stats.skipped} déjà présent(s)/ignoré(s)`,
  );
  console.table(
    USERS.filter((u) => !IS_PROD || u.role === UserRoles.USER).map((u) => ({
      email: u.email,
      role: u.role,
    })),
  );
  log(
    IS_PROD
      ? 'mot de passe des comptes de démo : valeur de SEED_DEMO_PASSWORD'
      : `mot de passe des comptes de démo : ${process.env.SEED_DEMO_PASSWORD ?? DEMO_PASSWORD}`,
  );
}

run().catch((err) => {
  console.error('[seed] ❌', err instanceof Error ? err.message : err);
  process.exit(1);
});
