# Saltobo Systems (saltobo.com)

> Production engineering platform and technical portfolio for **Ron Ronalds** — Systems Architect, Low-Level Infrastructure Engineer, and Distributed Systems Researcher.

---

## ⚡ Architecture & Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Toolchain**: [Vite 6](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Audio Synthesizer**: Pure Web Audio API procedural oscillator engine
- **Rendering**: Hardware-accelerated 2D Canvas with `content-visibility: auto` lifecycle pausing
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Dispatch**: FormSubmit AJAX with automatic client-side mailto fallback

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Launch development server
npm run dev

# Compile TypeScript and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment to saltobo.com

### Option A: Cloudflare Pages (Recommended)
1. Link this repository to **Cloudflare Pages**.
2. **Framework preset**: `Vite`
3. **Build command**: `npm run build`
4. **Build output directory**: `dist`
5. Point your custom domain `saltobo.com` to the Cloudflare Pages deployment.
*(SPA routing and immutable caching headers are already pre-configured in `public/_redirects` and `public/_headers`)*.

### Option B: Vercel
1. Import repository into **Vercel**.
2. Root directory: `./`
3. Preset will auto-detect Vite via [vercel.json](file:///home/ron/my-website/vercel.json).
4. Add domain `saltobo.com` in project settings.

### Option C: GitHub Pages
Automated deployment is already wired via GitHub Actions in [.github/workflows/deploy.yml](file:///home/ron/my-website/.github/workflows/deploy.yml). Enable GitHub Pages in your repo settings (Source: GitHub Actions).

---

## 📬 Contact & Signals
- **Direct Dispatch**: `ronronalds@saltobo.com`
- **Domain**: `https://saltobo.com`
