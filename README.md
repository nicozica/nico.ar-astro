# nico.ar Blog

Un blog personal minimalista construido con Astro + Bootstrap que consume contenido desde WordPress via REST API.

## 🛠️ Stack Tecnológico

- **[Astro](https://astro.build/)** - Framework frontend principal con TypeScript
- **[Bootstrap 5](https://getbootstrap.com/)** - Sistema de grid y utilidades responsive
- **WordPress REST API** - CMS headless para gestión de contenido
- **CSS Modular** - Tokens de diseño, tipografía y componentes organizados
- **GitHub Actions** - CI/CD automático con preview en PRs y deploy a producción

## ✨ Características

- **Diseño Editorial**: Tipografía Fraunces + Figtree con jerarquía consistente
- **Escala de Espaciado**: Sistema coherente (16–24–32–48–64–80px)
- **Cards de Artículos**: Con título, metadatos, tags y excerpt
- **Páginas de Artículo**: Layout completo con secciones, imágenes y enlaces útiles
- **Footer Unificado**: Navegación editorial + identidad de marca
- **Responsive**: Optimizado para desktop, tablet y móvil

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
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

© 1999-2025 Argensonix Multimedia  
Made in Buenos Aires
