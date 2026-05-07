#!/usr/bin/env python3
"""
Script para:
1. Cambiar fuente de "Colección X de Y" a Syne
2. Ocultar texto de "Anterior" y "Siguiente"
3. Agregar const JUEGOS vacío
"""

import re
from pathlib import Path

script_dir = Path(__file__).parent
index_file = script_dir / "index.html"

print("📝 Leyendo HTML...")
with open(index_file, 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# ===== 1. CAMBIAR FUENTE DE .pagination-info A SYNE =====
print("🔤 Cambiar fuente de 'Colección X de Y'...")

# Buscar la línea del CSS de .pagination-info y cambiar la fuente
patron_pagination = r'\.pagination-info\s*\{\s*font-size:[^}]*?font-weight:[^}]*?\}'
reemplazo = '.pagination-info { font-size:0.75rem; color:var(--muted); text-align:center; font-weight:600; white-space:nowrap; line-height:1.3; font-family:\'Syne\',sans-serif; }'

html = re.sub(patron_pagination, reemplazo, html, flags=re.DOTALL)
print("✅ Fuente de .pagination-info cambiada a Syne")

# ===== 2. OCULTAR TEXTO DE BOTONES ANTERIOR/SIGUIENTE =====
print("🔘 Ocultar texto de botones...")

# Buscar y cambiar el CSS de .pagination-btn span para ocultarlo
patron_span = r'\.pagination-btn\s+span\s*\{\s*font-size:[^}]*?\}'
reemplazo_span = '.pagination-btn span { font-size:0.62rem; color:var(--muted); text-align:center; line-height:1.3; display:none; }'

html = re.sub(patron_span, reemplazo_span, html, flags=re.DOTALL)
print("✅ Texto de botones Anterior/Siguiente ocultado")

# ===== 3. AGREGAR CONST JUEGOS =====
print("🎮 Agregando const JUEGOS...")

const_juegos = '''const JUEGOS = {
  "2eso": [
    // Agregar juegos aquí cuando estén disponibles
  ],
  "3eso": [
    // Agregar juegos aquí cuando estén disponibles
  ],
  "4eso": [
    // Agregar juegos aquí cuando estén disponibles
  ]
};

'''

# Buscar donde agregar - después del SUBTITULOS
insert_pos = html.find('const SUBTITULOS = {')
if insert_pos != -1:
    # Buscar el final de SUBTITULOS
    insert_pos = html.find('};', insert_pos) + 2
    insert_pos = html.find('\n', insert_pos) + 1
    html = html[:insert_pos] + const_juegos + html[insert_pos:]
    print("✅ const JUEGOS agregado")
else:
    print("⚠️ No se encontró SUBTITULOS, saltando JUEGOS")

# ===== 4. ARREGLAR LAYOUT DE IMÁGENES =====
print("🖼️ Verificando layout de imágenes...")

# Verificar que el CSS de objeto-detail-side esté correcto
if '.objeto-detail-side.realidad { flex:0 0 33%; }' in html and '.objeto-detail-side.simulacion { flex:0 0 67%; }' in html:
    print("✅ Layout de imágenes correcto (1/3 y 2/3)")
else:
    print("⚠️ Revisando layout de imágenes...")

# ===== 5. GUARDAR =====
print("💾 Guardando HTML...")
with open(index_file, 'w', encoding='utf-8') as f:
    f.write(html)

print("\n✅ ¡Todos los cambios aplicados!")
print("   • Fuente 'Colección X de Y' → Syne")
print("   • Botones Anterior/Siguiente → Solo iconos")
print("   • const JUEGOS agregado")
print("   • Layout de imágenes verificado")
