# nico.ar Blog

A minimalist personal blog built with Astro + Bootstrap that consumes content from WordPress via REST API.

## 🛠️ Tech Stack

- **[Astro](https://astro.build/)** - Frontend framework with TypeScript
- **[Bootstrap 5](https://getbootstrap.com/)** - Responsive grid system and utilities
- **WordPress REST API** - Headless CMS for content management
- **Modular CSS** - Design tokens, typography, and organized components
- **GitHub Actions** - Automated CI/CD with PR previews and production deployment

## ✨ Features

- **Editorial Design**: Fraunces + Figtree typography with consistent hierarchy
- **Spacing Scale**: Coherent system (16–24–32–48–64–80px)
- **Article Cards**: With title, metadata, tags, and excerpt
- **Article Pages**: Complete layout with sections, images, and useful links
- **Unified Footer**: Editorial navigation + brand identity
- **Responsive**: Optimized for desktop, tablet, and mobile
- **Featured Images**: Support for WordPress featured media with lazy loading
- **HTML Sanitization**: Safe rendering of WordPress content
- **Pagination**: Real pagination using WordPress API headers

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nico.ar-astro
```

2. Install dependencies:
```bash
npm install
```

3. Configure WordPress API:
   - Copy `.env.example` to `.env`
   - Set `PUBLIC_WP_BASE` to your WordPress site's REST API URL (e.g., `https://yoursite.com/wp-json/wp/v2`)

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:4321](http://localhost:4321) in your browser.

## 🔧 Configuration

### Environment Variables

- `PUBLIC_WP_BASE`: WordPress REST API base URL. If not set, the site will use mock data for development.

### WordPress Setup

Your WordPress site should have:
- REST API enabled (default in modern WordPress)
- Featured images support
- Categories configured
- Posts with proper content structure

The blog automatically fetches:
- Post title, content, excerpt, date
- Featured images from `_embedded['wp:featuredmedia']`
- Categories from `_embedded['wp:term']`
- Author information from `_embedded['author']`
- Pagination info from `X-WP-TotalPages` header

## 📝 Content Guidelines

### Useful Links
The blog automatically detects and preserves "Useful links" sections that exist within your WordPress post content. It does not add fabricated links.

### HTML Content
All WordPress content is sanitized for security, allowing only safe HTML tags:
- Text formatting: `p`, `h1-h6`, `strong`, `em`, `br`
- Links: `a` (with `href`, `target`, `rel` attributes)
- Images: `img` (with `src`, `alt`, `loading`, `decoding` attributes)
- Lists: `ul`, `ol`, `li`
- Code: `pre`, `code`
- Other: `blockquote`, `hr`

## 🚀 Build & Deploy

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### GitHub Actions
The repository includes CI/CD workflows that are currently disabled for manual control:
- **Deploy workflow**: Builds and deploys to GitHub Pages (manual trigger only)
- **Preview workflow**: Builds PR previews (manual trigger only)

To re-enable automatic deployment, uncomment the `push` and `pull_request` triggers in the workflow files.

## 🎨 Design System

### Typography
- **Headings**: Fraunces Black #21346A
- **Body**: Figtree Regular #577284
- **Card excerpts**: 16px with 24px line-height
- **Article body**: 22px with 36px line-height

### Colors
- Primary: #21346A (heading color)
- Body text: #577284
- Muted text: #6C8096
- Pills background: Custom pill-bg variable

### Spacing
Uses a consistent scale: 8, 12, 16, 24, 32, 48, 64, 80px

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

[Add your license here]bash
# Clonar el repositorio
git clone <tu-repo-url>
cd nico.ar-astro

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tu URL de WordPress
```

### Variables de Entorno

Crear un archivo `.env` con:

```env
PUBLIC_WP_BASE=https://tu-wordpress-site.com/wp-json/wp/v2
```

**Nota**: Si no tienes WordPress configurado, el proyecto funciona con datos mock para desarrollo.

### Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint

# Formateo de código
npm run format
```

## 📁 Estructura del Proyecto

```
src/
├── assets/
│   ├── images/
│   └── styles/
│       ├── tokens.css      # Variables CSS (colores, tipografía, espaciado)
│       ├── base.css        # Reset y base styles
│       ├── typography.css  # Configuración tipográfica
│       ├── layout.css      # Layouts y estructura
│       ├── components.css  # Estilos de componentes
│       └── main.css        # Importa todos los estilos
├── components/
│   ├── Header.astro        # Cabecera con logo y navegación
│   ├── Footer.astro        # Footer con enlaces y social
│   ├── PostCard.astro      # Card de artículo para home
│   ├── Paginator.astro     # Navegación de páginas
│   └── Pills.astro         # Tags/categorías
├── data/
│   └── wp.ts               # Helpers para WordPress REST API
├── layouts/
│   └── BaseLayout.astro    # Layout base con meta, CSS y JS
└── pages/
    ├── index.astro         # Página principal con grid de posts
    └── posts/[slug].astro  # Página individual de artículo
```

## 🎨 Tokens de Diseño

### Colores

- **Heading**: `#21346A` (Fraunces Black)
- **Body**: `#577284` (Figtree Regular)
- **Links**: `#0391E3`
- **Background**: `#FFFFFF`
- **Muted**: `#ECEFF3`

### Tipografía

- **Headings**: Fraunces Black (900)
- **Body**: Figtree Regular (400)
- **Tamaños**: 32px, 24px, 22px, 20px, 16px, 14px

### Espaciado

- **Escala**: 8px, 12px, 16px, 24px, 32px, 40px, 48px, 64px, 80px
- **Container**: 1120px max-width

## 🔗 Conexión con WordPress

El proyecto consume datos via WordPress REST API v2. Las interfaces TypeScript están definidas en `src/data/wp.ts`.

### Endpoints utilizados:

- `/posts` - Lista de artículos con paginación
- `/posts?slug=xxx` - Artículo específico por slug
- `/categories` - Lista de categorías

### Datos mock

Si no tienes WordPress disponible, el proyecto incluye datos mock para desarrollo que puedes encontrar en `src/data/wp.ts`.

## 🚀 Deployment

### GitHub Actions

El proyecto incluye dos workflows:

1. **Preview** (`.github/workflows/preview.yml`)
   - Se ejecuta en cada PR a `main`
   - Construye el proyecto y sube un artifact

2. **Deploy** (`.github/workflows/deploy.yml`)
   - Se ejecuta al hacer merge a `main` o push de tag `v*`
   - Despliega automáticamente a GitHub Pages

### Configuración GitHub Pages

1. Ve a Settings → Pages en tu repositorio
2. Selecciona "GitHub Actions" como source
3. El primer deploy se activará al hacer push a `main`

### Deploy manual

```bash
# Build local
npm run build

# El directorio `dist/` contiene los archivos estáticos
# Subir a tu hosting preferido (Vercel, Netlify, etc.)
```

## 🔧 Customización

### Agregar nuevos colores

Edita `src/assets/styles/tokens.css` y agrega variables CSS.

### Modificar tipografía

Las fuentes se importan en `src/assets/styles/main.css`. Para cambiar fuentes:

1. Instala nueva fuente: `npm install @fontsource/nueva-fuente`
2. Importa en `main.css`
3. Actualiza variables en `tokens.css`

### Nuevos componentes

Crea archivos `.astro` en `src/components/` y añade estilos en `components.css`.

## 📝 Contribuir

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Add nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

© 1999-2026 Argensonix Multimedia  
Made in Buenos Aires
