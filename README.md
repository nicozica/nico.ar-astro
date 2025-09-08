# nico.ar Blog

## 📖 Overview
This project implements **nico.ar**, a personal blog embedded within the portfolio site **argensonix.com**.  
The design is based on Figma mockups, with a **minimalist, editorial and consistent** approach to typography, spacing, and hierarchy.

The blog provides:
- **Home view** with article cards, pagination, and categories.  
- **Article view** with long-form content, images, sections, and useful links.  
- **Unified header** with logo, tagline, and “About me” CTA.  
- **Mixed footer** with latest articles, categories, social links, and copyright.  

## 🛠️ Stack
- [Astro](https://astro.build/) as the main frontend framework.  
- [Bootstrap 5](https://getbootstrap.com/) for grid system and responsive utilities.  
- **WordPress Headless CMS**: content is retrieved via the **WordPress REST API**.  
- **Deployment**: static hosting (e.g. Vercel, Netlify, or self-hosted with Apache/Nginx).  

## ✨ Features
- Editorial typography design (Figtree + Fraunces).  
- Consistent spacing scale (16–24–32–48–64–80px).  
- Article cards with title, metadata, tags, and excerpt.  
- Full article pages with sections, images, and useful links.  
- Common footer for both blog and portfolio with editorial navigation + brand identity.  

## 🚀 Next Steps
- Implement Astro components (Header, Footer, Article, Card, Paginator).  
- Connect to WordPress API for dynamic posts.  
- Configure Bootstrap base styles and design tokens (typography, colors, spacing).  
- Automate build & deployment with GitHub Actions.  
