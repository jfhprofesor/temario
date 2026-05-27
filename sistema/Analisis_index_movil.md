# Análisis de Arquitectura: index.html, movil.html y Sistema de Archivos

## 1. FLUJO DE DETECCIÓN Y REDIRECCIÓN

### Punto de entrada: index.html (líneas 7-16)
```javascript
(function() {
  var mobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || window.innerWidth <= 768;
  var params = new URLSearchParams(window.location.search);
  if (mobile && params.get('desktop') !== '1') {
    window.location.replace('movil.html');
  }
})();
```

**Lógica:**
- Detecta dispositivo móvil por User Agent o ancho ≤ 768px
- Si es móvil y NO hay `?desktop=1` → redirige a `movil.html`
- Si hay `?desktop=1` → fuerza ver versión desktop en móvil

**movil.html (línea 8):**
- Comentario: "Esta es la versión móvil. No redirigir."
- No contiene lógica de redirección inversa

---

## 2. ARQUITECTURA DE DATOS

### Origen de datos
1. **temario.js** (línea 119-200+): Define constantes `CURSOS`, `JUEGOS`, `ICONOS`
2. **objetos-data.js**: Genera automáticamente con `node generate-objetos.js`
   - Contiene array `OBJETOS` con tema, objeto, categoría, icono

### Estructura: CURSOS object
```
CURSOS = {
  "2eso": { 
    label: "2º ESO - Física y Química",
    temas: [
      { 
        nombre: "El método científico",
        cat: "metodo",              // "metodo", "quimica", "fisica"
        icono: "imagenes/2ESO/01A - Icono.webp",
        fondo: "imagenes/2ESO/01C - Imagen.webp",
        enlaces: [
          { label: "...", tipo: "presentacion_online", url: "..." },
          { label: "...", tipo: "kahoot_grupo", url: "..." },
          ...
        ]
      },
      ...
    ]
  },
  "3eso": { ... },
  "4eso": { ... },
  "1bach": { ... },
  "2bachF": { ... },
  "2bachQ": { ... }
}
```

---

## 3. COMPONENTES VISUALES COMPARTIDOS

### HTML/CSS comunes
| Elemento | Responsabilidad |
|----------|-----------------|
| `header` | Logo + subtítulo (MISMO en ambos) |
| `.barra-superior` | Tabs de cursos (grid 4 cols en móvil) |
| `.contenedor-grande` | Panel principal (active=visible) |
| `.curso-layout` | Flexbox que contiene sidebar + grids |
| `.curso-sidebar` | Barra de unidades (horizontal en móvil) |
| `.unidades-grid` / `.temas-grid` | Grid de unidades (4 cols en móvil) |
| `.publicaciones-grid` | Grid de publicaciones (4 cols en móvil) |
| `.objetos-grid` | Grid de objetos (3 cols en móvil) |

### Fuentes (IDÉNTICAS)
```
Saira: 400, 500, 600, 700, 800
Syne: 400, 500, 600, 700, 800
Roboto Condensed: 400, 500, 600, 700
Patrick Hand SC: 400
```

### Colores temáticos
```
--accent: #38bdf8 (azul celeste)
--bg: #2d2d2d
--surface: #1a1a1a
--text: #ffffff
--muted: #bbbbbb
--border: #444444

Cursos:
2eso    → #33ccaa (turquesa)
3eso    → #66dd44 (verde)
4eso    → #4488ff (azul)
1bach   → #ff4444 (rojo)
2bachF  → #ff9933 (naranja)
2bachQ  → #bb44dd (púrpura)
```

---

## 4. DIFERENCIAS ENTRE index.html Y movil.html

### DISEÑO

**index.html (Desktop)**
- Header: max 1300px, centrado, padding 20px
- Barra superior: overflow-x:auto, width 1300px
- Logo: clamp(1.4rem, 3.5vw, 2.2rem)
- Sidebar: 160px ancho, vertical, border-right
- Grid unidades: 5 columnas, height 450px fijo
- Iconos: 130×130px
- Padding: 15px

**movil.html (Mobile)**
- Header: 100% ancho, padding 12px 1rem 8px
- Barra superior: grid 4×1 (4 tabs), gap 0.25rem
- Logo: 1.6rem fijo
- Sidebar: 100% ancho, grid 1fr|1px|1fr (horizontal)
- Grid unidades: 4 columnas, height auto
- Iconos: 85×85px
- Padding: 10px

### RESPONSIVE BREAKPOINTS

**index.html:**
- `@media(max-width:768px)`: Ajusta sidebar a horizontal
- `@media(max-width:1024px)`: Anula max-width de contenedores

**movil.html:**
- Totalmente diseñado para móvil (sin breakpoints grandes)
- CSS optimizado para pantallas pequeñas

### BARRA INTERNA (controles)

**index.html:**
```css
.barra-interna {
  height: 40px; 
  min-height: 40px; 
  max-height: 40px;
  .control-group { position: absolute; left: Xpx; }
}
```

**movil.html:**
```css
.barra-interna {
  flex-wrap: wrap;
  min-height: 28px;
  .control-group { position: static; left: auto; }
  
  /* Reordenamiento por order */
  #panel-objetos { order: 1,2,3,4,10 (distribuye en 2 filas) }
}
```

---

## 5. DEPENDENCIAS DE ARCHIVOS

```
index.html (1368 líneas)
├── fuentes/*.woff2 (5 fuentes, 25 archivos)
├── imagenes/menu/*.webp (iconos, desplegados en JS)
├── imagenes/[2-4]ESO/*.webp (UI curso)
├── imagenes/1bach,2bachF,2bachQ/*.webp
├── sistema/temario.js (COMPARTIDO)
│   ├── CURSOS constant (6 cursos × 8 temas = 48 temas)
│   ├── JUEGOS constant (eventos, Kahoots)
│   └── ICONOS constant (15 tipos de enlace)
└── sistema/objetos-data.js (AUTO-GENERADO)
    └── OBJETOS array (50+ objetos)

movil.html (400+ líneas, incompleto en lectura)
├── fuentes/*.woff2 (MISMO)
├── imagenes/menu/*.webp (MISMO)
├── imagenes/[2-4]ESO/*.webp (MISMO)
└── sistema/temario.js (MISMO ARCHIVO)
    └── objetos-data.js (MISMO)
```

---

## 6. FLUJO DE DATOS EN RUNTIME

### Carga inicial
1. Navegador → index.html (o movil.html si es móvil)
2. CSS inline carga y aplica variables CSS
3. Fuentes @font-face cargan (swap = mostrar fallback primero)
4. `<script>` temario.js se ejecuta
5. DOM está listo, JS populan panels

### Interacción típica: Usuario clickea tab de curso
1. JS listener en `.curso-tab`
2. Busca en `CURSOS["2eso"].temas`
3. Genera HTML dinámico para grid
4. Inyecta fichas (`.unidad-ficha`)
5. Cada ficha contiene:
   - Icono (img)
   - Número (color temático)
   - Nombre del tema
   - Clase `.selected` cuando activo

### Modal de tema (cuando clickea unidad)
1. JS extrae tema de `CURSOS[curso].temas[idx]`
2. Genera `.modal` con:
   - Imagen de fondo
   - Icono + título
   - Enlaces del `enlaces` array
3. Modal overlay abre con transición (opacity, transform)

### Publicaciones
1. `#panel-publicaciones` contiene `.publicaciones-grid`
2. Genera fichas de publicación (libros, pdf, etc.)
3. Filtro por tipo (tipo de publicación)

### Objetos en clase
1. Panel `.objetos-container` con sidebar de navegación
2. Grid `.objetos-grid` (3 cols móvil, 5 desktop)
3. Paginación con flechas
4. Click en objeto → abre modal con foto y details

---

## 7. PATRONES DE ESTADO

### Clases de estado (CSS)
| Clase | Efecto |
|-------|--------|
| `.active` | Elemento seleccionado (color tema, fondo) |
| `.selected` | Unidad/tema activo (ring glow) |
| `.tema-gris` | Tema no activo (grayscale, opacidad 0.3) |
| `.en-unidad` | Body flag cuando estás dentro de un tema |
| `[data-filter="metodo/fisica/quimica"]` | Categoría de tema |
| `.open` | Modal abierto |

### Inline styles del JS
- `position: absolute; left: Xpx;` (barra-interna en desktop)
- `--d: N` (delay de animación de entrada)
- `--dur: Nms, --delay: Nms` (partículas portada)

---

## 8. HERENCIA Y CONSISTENCIA

### Qué es IDÉNTICO
✅ Fuentes (5 familias, 20+ pesos)
✅ Colores CSS root variables
✅ Iconografía (imagenes/menu/)
✅ Constantes JS (CURSOS, JUEGOS, OBJETOS)
✅ Estructura HTML (header, main, modals)
✅ Animaciones (@keyframes)

### Qué es DIFERENTE
❌ Layout (Desktop: 1300px ancho, Mobile: 100%)
❌ Tamaños (Iconos 130px vs 85px)
❌ Grid columnas (5 vs 4)
❌ Sidebar (vertical vs horizontal)
❌ Media queries (Desktop amplias, Mobile inline)
❌ Posicionamiento .barra-interna (absolute vs static)

---

## 9. GENERACIÓN AUTOMÁTICA

### generate-objetos.js
```
Entrada: Carpeta imagenes/objetos/
Pattern: "{Tema} - {Objeto} - A.webp"

Salida: objetos-data.js
{
  tema: "...",
  objeto: "...",
  categoria: "...",
  icono: "..."
}
```

**Ejecución:**
```bash
node sistema/generate-objetos.js
```

**Nota:** El archivo JS contiene `// Auto-generado` y `// NO EDITAR MANUALMENTE`

---

## 10. DIAGRAMA DE RELACIONES

```
                 ┌─────────────────┐
                 │  Navegador      │
                 │  (User Agent)   │
                 └────────┬────────┘
                          │ Detecta
                          ▼
                 ┌─────────────────┐
          ┌──→  │  index.html     │  ◄──┐
          │     │  (Desktop UI)   │     │
    Mobile│     └────────┬────────┘     │Desktop
          │              │               │
          │              ▼               │
          │     ┌─────────────────┐     │
          └──── │  movil.html     │ ────┘
                │  (Mobile UI)    │
                └────────┬────────┘
                         │ Carga
                         ▼
                ┌─────────────────┐
                │ sistema/        │
                │ temario.js      │
                │ (DATOS)         │
                └────────┬────────┘
                         │ Imports
                         ▼
            ┌────────────────────────┐
            │ sistema/               │
            │ objetos-data.js        │
            │ (AUTO-GENERADO)        │
            └────────────────────────┘

            ┌────────────────────────┐
            │ imagenes/              │
            │ ├─ 2ESO,3ESO,etc       │
            │ ├─ menu (iconos)       │
            │ └─ objetos             │
            └────────────────────────┘

            ┌────────────────────────┐
            │ fuentes/               │
            │ (5 familias × 5 pesos) │
            └────────────────────────┘
```

---

## 11. PUNTOS CRÍTICOS DE MANTENIMIENTO

### Zona de edición única (compartida)
- `sistema/temario.js`: Definición de `CURSOS`, `JUEGOS`, `ICONOS`
- Cambios aquí afectan AMBAS versiones

### Zonas de edición separadas
- `index.html`: CSS/HTML desktop específico
- `movil.html`: CSS/HTML mobile específico
- Si cambias estructura HTML, actualizar AMBOS

### Flujo de generación
- Agregar imagen a `imagenes/objetos/` (formato: `{Tema} - {Objeto} - A.webp`)
- Ejecutar `node sistema/generate-objetos.js`
- Archivo `objetos-data.js` se regenera automáticamente

### Regla de oro
✅ NUNCA editar `objetos-data.js` a mano
✅ SIEMPRE editar `temario.js` para datos estáticos
✅ Mantener CSS sincronizados en variables raíz
✅ Probar cambios en AMBAS vistas (desktop + móvil)

---

## 12. NOTAS SOBRE RESPONSIVE

### Desktop
- Contenido dentro de max-width: 1300px
- Media query 768px+ para ajustes menores
- Sidebar vertical por defecto

### Mobile
- CSS completamente lineal (sin columnas fijas)
- Grid dinámico: 4 columnas, alto auto
- Sidebar horizontal con separador central
- Barra interna con flex-wrap

### Punto crítico: 768px
- En index.html: Activa media query
- En movil.html: Ignorada (ya está optimizado para <768px)
- El `window.innerWidth <= 768` en index.html coincide con CSS breakpoint

