#!/usr/bin/env python3
"""
Script para reorganizar objetos:
1. Intercambiar tema y objeto (objeto pasa a ser el nombre principal)
2. Ordenar alfabéticamente por nombre
3. Actualizar OBJETO_EXTENSIONS con las nuevas claves
"""

import os
import re
from pathlib import Path

script_dir = Path(__file__).parent
index_file = script_dir / "index.html"

print("📝 Leyendo HTML...")
with open(index_file, 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# ===== 1. EXTRAER ARRAY OBJETOS ACTUAL =====
print("🔍 Extrayendo OBJETOS array...")

# Buscar el array OBJETOS
objetos_match = re.search(r'const OBJETOS = \[(.*?)\]\.sort', html, re.DOTALL)
if not objetos_match:
    print("❌ No se encontró el array OBJETOS")
    exit(1)

objetos_text = objetos_match.group(1)

# Parsear cada objeto
objetos = []
object_pattern = r'\{\s*tema:"([^"]+)",\s*objeto:"([^"]+)",\s*icono:"([^"]+)"\s*\}'
for match in re.finditer(object_pattern, objetos_text):
    tema, objeto, icono = match.groups()
    objetos.append({
        "tema": tema,
        "objeto": objeto,
        "icono": icono
    })

print(f"✅ {len(objetos)} objetos extraídos")

# ===== 2. INTERCAMBIAR TEMA Y OBJETO, Y REORDENAR =====
print("🔄 Intercambiando tema y objeto...")

for obj in objetos:
    obj["tema"], obj["objeto"] = obj["objeto"], obj["tema"]

# Ordenar por nombre (que ahora es tema, el objeto original)
objetos.sort(key=lambda x: x["tema"].lower())

print(f"✅ Objetos reordenados alfabéticamente")

# ===== 3. GENERAR NUEVO ARRAY OBJETOS =====
print("🛠️ Generando nuevo array...")

nuevo_objetos = "const OBJETOS = [\n"
for obj in objetos:
    nuevo_objetos += f'  {{ tema:"{obj["tema"]}", objeto:"{obj["objeto"]}", icono:"{obj["icono"]}" }},\n'
nuevo_objetos += "].sort((a,b) => a.tema.localeCompare(b.tema));"

# ===== 4. GENERAR NUEVO OBJETO_EXTENSIONS =====
print("🔗 Actualizando OBJETO_EXTENSIONS...")

nuevo_extensions = "const OBJETO_EXTENSIONS = {\n"
for obj in objetos:
    # Buscar la extensión en el OBJETO_EXTENSIONS actual
    key_actual = f"{obj['objeto']} - {obj['tema']}"  # La clave anterior (antes de intercambiar)
    key_nueva = f"{obj['tema']} - {obj['objeto']}"    # La nueva clave

    # Buscar en el HTML actual
    ext_match = re.search(rf'"{re.escape(key_actual)}":\s*\{{\s*A:\s*"([^"]+)",\s*B:\s*"([^"]+)",\s*C:\s*"([^"]+)"\s*\}}', html)

    if ext_match:
        ext_a, ext_b, ext_c = ext_match.groups()
    else:
        # Si no encuentra, usar valores por defecto
        ext_a, ext_b, ext_c = ".png", ".jpeg", ".jpeg"

    nuevo_extensions += f'  "{key_nueva}": {{ A: "{ext_a}", B: "{ext_b}", C: "{ext_c}" }},\n'

nuevo_extensions += "};"

# ===== 5. REEMPLAZAR EN HTML =====
print("✏️ Reemplazando en HTML...")

# Reemplazar OBJETOS array
pattern_objetos = r'const OBJETOS = \[.*?\]\.sort\(\(a,b\) => a\.tema\.localeCompare\(b\.tema\)\);'
html = re.sub(pattern_objetos, nuevo_objetos, html, flags=re.DOTALL)

# Reemplazar OBJETO_EXTENSIONS
pattern_extensions = r'const OBJETO_EXTENSIONS = \{.*?\};'
html = re.sub(pattern_extensions, nuevo_extensions, html, flags=re.DOTALL)

# ===== 6. ACTUALIZAR LA FUNCIÓN abrirObjetoDetalle =====
print("🔧 Actualizando función abrirObjetoDetalle...")

nueva_funcion = '''function abrirObjetoDetalle(obj) {
  const exts = OBJETO_EXTENSIONS[obj.tema + " - " + obj.objeto] || { A: ".png", B: ".jpeg", C: ".jpeg" };
  const extensiones = [exts.B, ".png", ".jpeg", ".jpg"];

  // Función para buscar imagen con extensiones múltiples
  function buscarImagen(nombreBase, extensiones) {
    return new Promise((resolve) => {
      let idx = 0;

      function probar() {
        if (idx >= extensiones.length) {
          resolve(null);
          return;
        }

        const ruta = nombreBase + extensiones[idx];
        const img = new Image();
        img.onload = () => resolve(ruta);
        img.onerror = () => {
          idx++;
          probar();
        };
        img.src = ruta;
      }

      probar();
    });
  }

  const base = `imagenes/objetos/${obj.tema} - ${obj.objeto}`;
  const videoV = `imagenes/objetos/${obj.tema} - ${obj.objeto} - V.png`;

  const imgB = document.getElementById('objeto-detail-img-a');
  buscarImagen(`${base} - B`, extensiones).then(ruta => {
    if (ruta) {
      imgB.src = ruta;
    } else {
      imgB.src = 'imagenes/menu/no disponible.png';
    }
  });

  const imgC = document.getElementById('objeto-detail-img-b');
  buscarImagen(`${base} - C`, extensiones).then(ruta => {
    if (ruta) {
      imgC.src = ruta;
    } else {
      imgC.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    }
  });

  const videoContainer = document.getElementById('objeto-detail-video');
  videoContainer.innerHTML = '';

  buscarImagen(`${base} - V`, [".png", ".jpeg", ".jpg"]).then(ruta => {
    if (ruta) {
      videoContainer.innerHTML = `<a href="${ruta}" target="_blank" rel="noopener"><img src="imagenes/menu/Video temario.png" alt="Ver vídeo"><span>Ver vídeo</span></a>`;
    }
  });

  document.getElementById('objeto-detail-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}'''

pattern_funcion = r'function abrirObjetoDetalle\(obj\) \{.*?\n\}'
html = re.sub(pattern_funcion, nueva_funcion, html, flags=re.DOTALL)

# ===== 7. GUARDAR =====
print("💾 Guardando HTML actualizado...")
with open(index_file, 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ ¡HTML actualizado exitosamente!")
print(f"✅ {len(objetos)} objetos reorganizados y ordenados alfabéticamente")
print("\nPrimer objeto (orden alfabético):", objetos[0]["tema"])
print("Último objeto (orden alfabético):", objetos[-1]["tema"])
