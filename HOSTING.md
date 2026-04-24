# Hosting I DO TAXI on GitHub Pages — 100% Free, No Ads

Your site is built and ready to deploy to GitHub Pages with your custom domain `idotaxi.net`.
GitHub Pages is free forever, has no ads, supports unlimited bandwidth for normal traffic,
gives you a free SSL certificate, and works perfectly with your Squarespace-registered domain.

This repo is already wired up to auto-deploy on every push. You just need to do the one-time
setup below.

---

## One-time setup (about 15 minutes)

### 1. Create a free GitHub account

Go to https://github.com/signup and create an account if you don't already have one. Free tier is fine.

### 2. Create a new repository

- Go to https://github.com/new
- Repository name: `idotaxi` (any name works)
- Set it to **Public** (private repos require a paid plan for Pages with custom domains)
- Do NOT initialize with a README, .gitignore, or license — leave it empty
- Click **Create repository**

You'll see a page with setup instructions. Keep it open.

### 3. Push this project to GitHub

GitHub repo: **https://github.com/jpjasj-IDO/idotaxi**

In Replit, open the **Shell** tab (bottom of the screen) and run these commands one at a time.

```bash
git init
git add .
git commit -m "Initial commit: I DO TAXI website"
git branch -M main
git remote add origin https://github.com/jpjasj-IDO/idotaxi.git
git push -u origin main
```

When git asks for credentials:
- **Username:** `jpjasj-IDO`
- **Password:** a Personal Access Token (NOT your GitHub password). Create one at
  https://github.com/settings/tokens — click "Generate new token (classic)", give it the
  `repo` and `workflow` scopes, copy the token, and paste it as the password.

### 4. Turn on GitHub Pages

- In your new GitHub repository, click the **Settings** tab (top right).
- In the left sidebar, click **Pages**.
- Under **Build and deployment** → **Source**, select **GitHub Actions**.

That's it. The deploy workflow at `.github/workflows/deploy.yml` will now run automatically on
every push to `main`. The first build takes about 2 minutes.

You can watch progress under the **Actions** tab. When it finishes green, your site is live at:
`https://YOUR-USERNAME.github.io/idotaxi/`

### 5. Point your custom domain `idotaxi.net` at GitHub Pages

The repo already contains `artifacts/idotaxi/public/CNAME` with the domain `idotaxi.net`,
so GitHub Pages knows you want to use that domain.

Now you need to update DNS on Squarespace so `idotaxi.net` points to GitHub.

**On Squarespace:**

1. Sign in at https://account.squarespace.com/domains
2. Click on **idotaxi.net**
3. Click **DNS** (or **DNS Settings**)
4. **Delete** any existing A records for the apex (`@`) domain and any existing CNAME for `www`
   that point to Squarespace's parking page.
5. Add these four **A records** for the apex (`@`) host, all pointing to GitHub's IPs:

   | Type | Host | Value           |
   |------|------|-----------------|
   | A    | @    | 185.199.108.153 |
   | A    | @    | 185.199.109.153 |
   | A    | @    | 185.199.110.153 |
   | A    | @    | 185.199.111.153 |

6. Add **one CNAME record** so `www.idotaxi.net` redirects to the apex:

   | Type  | Host | Value                       |
   |-------|------|-----------------------------|
   | CNAME | www  | jpjasj-ido.github.io.       |

   (Note the trailing dot. The hostname is lowercase.)

7. Save. DNS changes can take anywhere from 10 minutes to a few hours to take effect worldwide.

**Back on GitHub:**

1. Repo → **Settings** → **Pages**
2. Under **Custom domain**, type `idotaxi.net` and click **Save**
3. Wait a couple minutes — GitHub will check your DNS and then a green check appears
4. Tick the **Enforce HTTPS** checkbox (it appears once GitHub finishes provisioning the SSL cert)

Your site is now live at `https://idotaxi.net` with a free SSL certificate that auto-renews
forever.

---

## Updating the site later

Any time you want to change something:

1. Edit the files (in Replit or anywhere else)
2. Run in the Shell:
   ```bash
   git add .
   git commit -m "describe what you changed"
   git push
   ```
3. GitHub will automatically rebuild and re-deploy in about 2 minutes.

---

## Where things live

- **Hero section copy/buttons** → `artifacts/idotaxi/src/components/Hero.tsx`
- **Why Choose Us cards** → `artifacts/idotaxi/src/components/WhyUs.tsx`
- **Services list** → `artifacts/idotaxi/src/components/Services.tsx`
- **Fleet (vehicle classes)** → `artifacts/idotaxi/src/components/Fleet.tsx`
- **Service areas (cities)** → `artifacts/idotaxi/src/components/ServiceAreas.tsx`
- **How it works steps** → `artifacts/idotaxi/src/components/HowItWorks.tsx`
- **Testimonials** → `artifacts/idotaxi/src/components/Testimonials.tsx`
- **FAQ** → `artifacts/idotaxi/src/components/FAQ.tsx`
- **CTA banner** → `artifacts/idotaxi/src/components/CTA.tsx`
- **Footer** → `artifacts/idotaxi/src/components/Footer.tsx`
- **Top navigation** → `artifacts/idotaxi/src/components/Navbar.tsx`
- **Phone numbers, links, SEO meta** → `artifacts/idotaxi/index.html` and individual components
- **Custom domain config** → `artifacts/idotaxi/public/CNAME`

---

## Why GitHub Pages is the right choice for you

- **Free forever** with no ads, no upsells, no expiring trials
- **Free SSL certificate** that auto-renews
- **Fast global CDN** — your site loads quickly worldwide
- **Custom domain support** built in
- **Unlimited traffic** for normal site usage
- **You keep full ownership** — the source is in your GitHub repo, never locked into a vendor

Other free options that work the same way if you ever want to switch:
- **Cloudflare Pages** — also free with no ads, slightly faster CDN, also supports the same auto-deploy from GitHub
- **Netlify** — free tier with no ads (100 GB bandwidth/month, plenty for a taxi site)

The build output (`artifacts/idotaxi/dist/public/`) is plain static HTML/CSS/JS, so it works
on any of these without changes.
