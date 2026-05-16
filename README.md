# AGORA — Web App

> The open database of the world's communities.
> Built by Stark Technologies.

This is the public-facing Next.js application for AGORA. It is designed
to run **entirely on free tiers** — Vercel free, Neon free, Resend free.

---

## Local development

```bash
npm install
npm run dev
# open http://localhost:3000
```

No environment variables required for local development.

---

## Deploy to Vercel (zero cost)

Sir, this section is for you. Three steps, ~10 minutes, $0.

### 1. Create a GitHub repository

```bash
cd "/path/to/CLAUDE/stark_technologies/agora/web"
git init
git add .
git commit -m "Initial commit: AGORA Coming Soon"
gh repo create agora-network --public --source=. --remote=origin --push
```

Or via the GitHub web UI: <https://github.com/new>

### 2. Deploy on Vercel

1. Open <https://vercel.com/new>
2. Choose the `agora-network` repository
3. Framework: **Next.js** (auto-detected)
4. Root Directory: leave at the repo root
5. Click **Deploy**

Vercel will assign a free URL like
`agora-network-xxxxx.vercel.app`.

### 3. (Optional) Configure free-tier services

For the waitlist email notifications, in **Vercel → Project → Settings →
Environment Variables** add:

| Variable | Value | Where to get it |
|----------|-------|-----------------|
| `RESEND_API_KEY` | `re_xxx` | <https://resend.com/api-keys> (free 100/day) |
| `RESEND_FROM_EMAIL` | `AGORA <hello@yourdomain.com>` | Resend verified sender |
| `NEXT_PUBLIC_URL` | `https://your-vercel-url.vercel.app` | Vercel-assigned URL |

Without these, the waitlist API still works — signups are logged to
Vercel's stdout (visible under Project → Logs).

---

## What's in the box

```
web/
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── vercel.json
├── public/
│   ├── logo.svg
│   ├── favicon.svg
│   └── og-image.svg
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx                  ← Landing / Coming Soon
    │   ├── manifesto/page.tsx        ← Philosophy declaration
    │   ├── preview/page.tsx          ← Static search demo
    │   ├── api/waitlist/route.ts     ← POST endpoint
    │   └── globals.css
    ├── components/
    │   ├── Logo.tsx
    │   ├── WaitlistForm.tsx
    │   ├── Constellation.tsx          ← background visualization
    │   └── SearchDemo.tsx
    └── lib/
        ├── types.ts
        └── seed-data.ts               ← 50 example communities
```

---

## Stack (zero infrastructure cost)

| Concern | Choice | Plan | Cost |
|---------|--------|------|------|
| Framework | Next.js 14 (App Router) | OSS | $0 |
| Styles | Tailwind CSS | OSS | $0 |
| Hosting | Vercel | Hobby | $0 |
| Email | Resend | Free | $0 (100/day) |
| Database (future) | Neon Postgres | Free | $0 (0.5 GB) |
| Graph (future) | Neo4j AuraDB | Free | $0 |
| Analytics | Vercel Analytics | Free | $0 |

Total: **$0/month** at launch.

We commit to staying on free tiers until **MRR ¥100k** is achieved.

---

## Brand assets

| Asset | Path | Note |
|-------|------|------|
| Logo (wordmark) | `public/logo.svg` | Cormorant Garamond + 7-point symbol |
| Favicon | `public/favicon.svg` | 32×32, dark bg |
| OG image | `public/og-image.svg` | 1200×630, for X / FB / LinkedIn |
| Color palette | `tailwind.config.ts` | `olive-black` `marble-white` `athena-bronze` |

For brand-system details see `../08_brand/brand_identity_v0.md`.

---

## Editorial principles

This is not a typical landing page — every word has been screened against
the AGORA brand guide:

- Tone is **凛として / 開かれた / 思想的 / 静謐**
- No emojis, no exclamations, no hype words
- Bilingual JP/EN content where it matters
- One claim per sentence; short sentences stack into rhythm

If you add copy, please read `../08_brand/brand_identity_v0.md` first.

---

## Roadmap

This is a **Stage 0** scaffold — Coming Soon + manifesto + static preview.

Next stages:

- **Stage 1** (after deployment): public URL, waitlist live
- **Stage 2** (2026-06 — 09): note-series traffic, growing waitlist
- **Stage 3** (2026-10): closed beta with real DB (Neon) + auth (NextAuth)
- **Stage 4** (2026-12): public launch with billing (Stripe)
- **Stage 5** (2027-03): first ¥1M MRR

See `../FREE_LAUNCH_PLAYBOOK.md` for the full plan.

---

## Contact

- Founder: Yushun Ohtatsume (Sir) — @yusun_otatsume
- Org: Stark Technologies, Tokyo
- Issues / suggestions: open a GitHub Issue on the repo
- Press: press@agora.network (forwarding to Sir until domain is acquired)

― Stark Technologies / 2026
