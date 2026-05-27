# Tabla Comparativa: index.html vs movil.html

## Aspecto General

| Aspecto | index.html | movil.html | Notas |
|---------|------------|-----------|-------|
| **Líneas de código** | 1368 | 400+ | Mobile es más conciso |
| **Función** | Versión Desktop | Versión Mobile | Detección automática |
| **Viewport** | max-width: 1300px | 100% ancho | Responsive diferente |
| **User Agent** | Grandes pantallas | Móvil/tablets | Detectado en línea 9 de index.html |
| **Breakpoint CSS** | @media 768px+ | Inline | Mobile-first approach |
| **Redirección** | Redirige a movil.html | No redirige | Unidireccional |

---

## Estructura HTML (IDÉNTICA)

| Elemento | Uso |
|----------|-----|
| `<header>` | Logo + subtítulo |
| `.barra-superior` | Tabs: 2eso, 3eso, 4eso, 1bach, 2bachF, 2bachQ, objetos, publicaciones |
| `.contenedor-grande` | Panel principal (uno activo a la vez) |
| `.contenedor-grande--curso` | Panel de un curso específico |
| `.contenedor-grande--objetos` | Panel de objetos de clase |
| `.contenedor-grande--publicaciones` | Panel de libros/publicaciones |
| `.barra-interna` | Controles internos (filtros, paginación) |
| `.curso-sidebar` | Botones de navegación de unidades |
| `.temas-grid / .unidades-grid` | Grid con fichas de temas |
| `.objeto-ficha` | Ficha individual de objeto |
| `.publicacion-ficha` | Ficha individual de publicación |
| `.modal-overlay` | Overlay oscuro para modales |
| `.modal` | Modal con detalles de tema |

---

## CSS: Tamaños y Espacios

| Elemento | index.html | movil.html | Diferencia |
|----------|-----------|-----------|-----------|
| **Header logo** | clamp(1.4rem, 3.5vw, 2.2rem) | 1.6rem | Fluido vs fijo |
| **Barra superior** | 1300px | 100% | Fija vs adaptativa |
| **Barra superior gap** | 0.4rem | 0.25rem | 1.6x vs 1x |
| **Sidebar ancho** | 160px (vertical) | 100% (grid) | Vertical vs horizontal |
| **Unidad icono** | 130×130px | 85×85px | 34% más grande en desktop |
| **Unidad fichas altura** | 220px | 165px | 33% más alto en desktop |
| **Grid unidades cols** | 5 columnas | 4 columnas | 5 vs 4 |
| **Grid unidades height** | 450px (fijo) | auto | Dinámico en mobile |
| **Objeto icono** | 130×130px | 90×90px | Desktop vs mobile |
| **Objetos grid cols** | 5 columnas | 3 columnas | Más compacto en mobile |
| **Sidebar btn ancho** | 75px | 50px | Más estrecho en mobile |
| **Sidebar btn altura** | 75px | 50px | Más compacto en mobile |

---

## CSS: Posicionamiento

| Propiedad | index.html | movil.html | Notas |
|-----------|-----------|-----------|-------|
| **barra-interna height** | 40px (fijo) | 28px min | Flexible en mobile |
| **barra-interna position** | relative | relative (flex-wrap) | Desktop: control-group absolute |
| **control-group position** | absolute left:Xpx | static | Desktop fija posiciones |
| **curso-sidebar flex** | flex-direction: column | grid 1fr\|1px\|1fr | Vertical vs horizontal |
| **contenedor-grande width** | 1300px | 100% | Fija vs adaptativa |
| **main max-width** | 1300px | 100% | Mismo patrón |

---

## Tipografía (IDÉNTICA)

| Familia | Pesos | Uso |
|---------|-------|-----|
| **Saira** | 400, 500, 600, 700, 800 | Títulos, números, etiquetas |
| **Syne** | 400, 500, 600, 700, 800 | Logo principal |
| **Roboto Condensed** | 400, 500, 600, 700 | Cuerpo, descripciones |
| **Patrick Hand SC** | 400 | Subtítulo (manuscript) |

---

## Variables CSS (IDÉNTICAS)

| Variable | Valor | Uso |
|----------|-------|-----|
| `--bg` | #2d2d2d | Fondo general |
| `--surface` | #1a1a1a | Superficie cards |
| `--card` | #1a1a1a | Cartas |
| `--border` | #444444 | Bordes |
| `--text` | #ffffff | Texto principal |
| `--muted` | #bbbbbb | Texto secundario |
| `--accent` | #38bdf8 | Azul celeste (botones activos) |

---

## Colores Temáticos (IDÉNTICOS)

| Curso | Color | Hex | Uso |
|-------|-------|-----|-----|
| **2º ESO** | Turquesa | #33ccaa | Borde, fondo, hover |
| **3º ESO** | Verde | #66dd44 | Borde, fondo, hover |
| **4º ESO** | Azul** | #4488ff | Borde, fondo, hover |
| **1º Bach** | Rojo | #ff4444 | Borde, fondo, hover |
| **2º Bach F** | Naranja | #ff9933 | Borde, fondo, hover |
| **2º Bach Q** | Púrpura | #bb44dd | Borde, fondo, hover |
| **Objetos** | Dorado | #d4b84a | Borde, fondo, hover |
| **Publicaciones** | Gris azulado | #c0cce0 | Borde, fondo, hover |

---

## Responsividad y Media Queries

### index.html
```css
@media(max-width: 1024px) {
  max-width: 100% (no fijo)
}

@media(max-width: 768px) {
  .curso-layout { flex-direction: column }
  .curso-sidebar { flex-direction: row; border-bottom }
  .temas-grid { flex-wrap: wrap; 4 columnas }
  .unidad-ficha { width: 25%; max-width: 90px }
  .unidad-icono { width: 80px; height: 80px }
}

@media(max-width: 400px) {
  .unidad-ficha { width: 25%; max-width: 80px }
  .unidad-icono { width: 70px; height: 70px }
}
```

### movil.html
```css
No hay media queries para pantallas grandes
(Diseño completamente mobile-first)
```

---

## JavaScript: Datos Compartidos

| Constante | Ubicación | Contenido | Acceso |
|-----------|-----------|-----------|--------|
| **CURSOS** | temario.js | 6 cursos × 8 temas | window.CURSOS["2eso"].temas |
| **JUEGOS** | temario.js | Kahoots + Pasapalabra | window.JUEGOS["2eso"] |
| **ICONOS** | temario.js | 15 tipos de enlace | window.ICONOS.kahoot_grupo |
| **OBJETOS** | objetos-data.js (auto) | 50+ objetos | window.OBJETOS |

---

## Estructura de Datos (temario.js)

```javascript
CURSOS = {
  "2eso": {
    label: "2º ESO - Física y Química",
    temas: [
      {
        nombre: "El método científico",
        cat: "metodo",  // "metodo", "quimica", "fisica"
        icono: "imagenes/2ESO/01A - Icono.webp",
        fondo: "imagenes/2ESO/01C - Imagen.webp",
        enlaces: [
          {
            label: "Ver presentación online",
            tipo: "presentacion_online",
            url: "https://1drv.ms/..."
          },
          // ... más enlaces
        ]
      },
      // ... más temas (8 por curso)
    ]
  },
  // ... más cursos (2eso, 3eso, 4eso, 1bach, 2bachF, 2bachQ)
}
```

---

## Estructura de Datos (objetos-data.js - Auto-generado)

```javascript
const OBJETOS = [
  {
    "tema": "Energía",
    "objeto": "Anillo termocrómico",
    "categoria": "Física",
    "icono": "imagenes/objetos/Energía - Anillo termocrómico - A.webp"
  },
  // ... 50+ objetos más
]
```

---

## Redirección Automática (index.html líneas 7-16)

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

| Condición | Resultado |
|-----------|-----------|
| User Agent móvil | → movil.html |
| Ancho <= 768px | → movil.html |
| ?desktop=1 en URL | → index.html (fuerza desktop) |

---

## Dependencias de Archivos

### Críticas (Web no funciona sin)
| Archivo | Líneas de referencia | Contenido |
|---------|---------------------|-----------|
| temario.js | Línea 200+ | CURSOS, JUEGOS, ICONOS |
| imagenes/2ESO/*.webp | Dinámico | Iconos de unidades 2º ESO |
| imagenes/3ESO/*.webp | Dinámico | Iconos de unidades 3º ESO |
| imagenes/4ESO/*.webp | Dinámico | Iconos de unidades 4º ESO |
| imagenes/1bach/*.webp | Dinámico | Iconos de unidades 1º Bach |
| imagenes/2bachF/*.webp | Dinámico | Iconos de unidades 2º Bach F |
| imagenes/2bachQ/*.webp | Dinámico | Iconos de unidades 2º Bach Q |
| imagenes/menu/*.webp | Línea 73-80 | Iconos de tipos de enlace |

### Importantes (Experiencia degradada)
| Archivo | Razón |
|---------|-------|
| objetos-data.js | Panel de objetos vacío sin esto |
| imagenes/objetos/*.webp | Objetos sin imagen |
| fuentes/*.woff2 | Fallback a Arial/sans-serif |

---

## Animaciones (IDÉNTICAS)

| Animación | Duración | Uso |
|-----------|----------|-----|
| `textShine` | 0.8s | Brillo en texto |
| `bgShift` | 18s (infinito) | Movimiento fondo gradiente |
| `bgPulse` | 9s (infinito) | Pulso de opacidad |
| `fadeInUp` | 0.3s | Entrada de elementos |
| `popIn` | 0.6s | Aparición de fichas |
| `panelFadeIn` | 0.22s | Fade de panel |
| `btnActivePulse` | 0.4s | Pulse de botón |
| `btnActivePulseBlack` | 0.4s | Pulse botón negro |

---

## Estado y Clases CSS

| Clase | Efecto | Aplicada a |
|-------|--------|-----------|
| `.active` | Color tema activo | .curso-tab |
| `.selected` | Ring glow + brillo | .unidad-ficha |
| `.tema-gris` | grayscale(100%) | .unidad-ficha inactiva |
| `.open` | opacity:1, pointer-events:all | .modal-overlay |
| `.en-unidad` | Cambia layout sidebar | body |
| `.tab-press` | Pulse animation | .curso-tab |
| `.panel-enter` | Fade in | .contenedor-grande |
| `.anim-entrada` | Fade in + delay | .sidebar-btn |

---

## Resumen de Mantenimiento

### ✅ Editar en AMBOS archivos
- Estructura HTML base (`<header>`, `<main>`)
- Variables CSS root
- Animaciones `@keyframes`

### ✅ Editar SOLO en index.html
- Media queries desktop
- Posicionamiento `.control-group` (absolute)
- Tamaños variables (1300px, 160px, 130px)

### ✅ Editar SOLO en movil.html
- Media queries móvil (si las hubiera)
- Posicionamiento `.control-group` (static)
- Tamaños compactos (85px, 80px, 3 cols)

### ✅ Editar SOLO en temario.js
- CURSOS constant
- JUEGOS constant
- ICONOS constant

### ✅ Editar SOLO en carpetas
- Agregar/eliminar temas → CURSOS en temario.js
- Agregar objeto → imagen a imagenes/objetos/
- Ejecutar `node sistema/generate-objetos.js`
- **NUNCA** editar objetos-data.js a mano

---

## Checklist de Coherencia

### Después de cambiar index.html
- [ ] Sincronizar cambios HTML a movil.html
- [ ] Probar en >768px
- [ ] Probar en <768px (debe redirigir a movil.html)

### Después de cambiar movil.html
- [ ] Probar en <768px
- [ ] Verificar que no redirige (es la versión móvil)

### Después de cambiar temario.js
- [ ] Recargar ambas versiones (Ctrl+F5)
- [ ] Verificar datos en ambas vistas

### Después de agregar objeto
- [ ] Guardar imagen como `{Tema} - {Objeto} - A.webp` en imagenes/objetos/
- [ ] Ejecutar `node sistema/generate-objetos.js`
- [ ] Verificar que aparece en panel de objetos
- [ ] Comprobar filtro por tema/categoría

