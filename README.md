# Teresia Mwaura — Premium Portfolio Website

A premium, award-calibre portfolio built with vanilla HTML, CSS, and JavaScript.

## 🎨 Design System

| Token | Value |
|---|---|
| Primary Blue | `#2563EB` |
| Orange Accent | `#F97316` |
| Background | `#FFFFFF` |
| Surface | `#F8FAFC` |
| Text Primary | `#0F172A` |
| Text Secondary | `#475569` |

**Fonts:** Space Grotesk (headings) · Inter (body)

## 📁 Project Structure

```
terri-portfolio/
├── index.html        # Main HTML
├── style.css         # Premium stylesheet
├── main.js           # GSAP + Lenis + interactions
├── images/           # Add terri-portrait.jpg here
└── README.md
```

## 🚀 Getting Started

1. **Add portrait photo:**
   Place `terri-portrait.jpg` inside the `images/` folder.
   Ideal size: ~800×1000px, vertical crop.

2. **Open locally:**
   Simply double-click `index.html` in your browser.
   Or use a local server for best results:
   ```bash
   npx -y serve . -p 3000
   ```

3. **Update your details:**
   - `index.html` lines ~237–248: update email, phone, social links
   - `index.html`: replace placeholder portfolio descriptions with your actual projects
   - Add real project images inside `images/` and reference them in the work cards

## ✨ Features

- **Lenis Smooth Scroll** — buttery smooth native-feeling scroll
- **GSAP + ScrollTrigger** — scroll-triggered reveals, counters, parallax
- **Hero entrance animation** — staggered title reveal with orb effects
- **Portfolio filter** — animated category filtering (All / Design / Photography / Video / Comms)
- **Skill bars** — animated progress bars that trigger on scroll
- **3D image tilt** — mouse parallax on the About photo
- **Floating cards** — subtle CSS animation on About section decoratives
- **Contact form** — client-side validation with simulated submission feedback
- **Mobile menu** — full-screen blue overlay with smooth slide-in
- **Progress bar** — scroll progress indicator at the top
- **Active nav links** — tracks current section automatically

## 🎯 Customisation Checklist

- [ ] Add your portrait photo to `images/terri-portrait.jpg`
- [ ] Update email address (search `teresia.mwaura@email.com`)
- [ ] Update phone number
- [ ] Add LinkedIn, Instagram, Twitter/X, Behance URLs to social buttons
- [ ] Replace placeholder work cards with actual project images
- [ ] Add your CV/resume file and link the Download CV button
- [ ] Update stats (years experience, projects, etc.)
- [ ] Connect form to a backend (Formspree / EmailJS / Netlify Forms)
