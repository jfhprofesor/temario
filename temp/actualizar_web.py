#!/usr/bin/env python3
"""
Script para actualizar el HTML con:
1. Datos de 1º Bachillerato (1BACH)
2. Extensiones correctas para imágenes de objetos
"""

import os
import re
from collections import defaultdict
from pathlib import Path

script_dir = Path(__file__).parent
index_file = script_dir / "index.html"
bach_dir = script_dir / "imagenes" / "1BACH"
objetos_dir = script_dir / "imagenes" / "objetos"

# ===== 1. GENERAR DATOS DE 1º BACHILLERATO =====
print("📚 Generando datos de 1º Bachillerato...")

bach_files = {}
for archivo in sorted(os.listdir(bach_dir)):
    if archivo.endswith(('.png', '.jpg', '.jpeg')):
        # Parsear: UD01_-_Método_científico_-_A.png
        match = re.match(r'(UD\d+)_-_(.+)_-_([AB])\.', archivo)
        if match:
            ud, tema, tipo = match.groups()
            tema = tema.replace('_', ' ')
            key = f"{ud}_{tema}"

            if key not in bach_files:
                bach_files[key] = {"ud": ud, "tema": tema, "A": None, "B": None}

            ext = Path(archivo).suffix
            bach_files[key][tipo] = f"imagenes/1BACH/{archivo}"

# Generar array JavaScript
bach_array = "const BACH_1 = [\n"
for key, data in sorted(bach_files.items()):
    if data['A'] and data['B']:
        nombre = data['tema']
        icono = data['A']
        fondo = data['B']
        bach_array += f'  {{ nombre:"{nombre}", icono:"{icono}", fondo:"{fondo}", enlaces:[] }},\n'

bach_array += "];\n"

# ===== 2. GENERAR MAPEO DE EXTENSIONES PARA OBJETOS =====
print("🎯 Mapeando extensiones de objetos...")

objeto_exts = defaultdict(lambda: {})
for archivo in os.listdir(objetos_dir):
    if archivo.endswith(('.png', '.jpg', '.jpeg')):
        for tipo in ['A', 'B', 'C']:
            if f" - {tipo}." in archivo:
                nombre_base = archivo.split(f" - {tipo}.")[0]
                ext = Path(archivo).suffix
                objeto_exts[nombre_base][tipo] = ext
                break

# Generar JavaScript con mapeo de extensiones
exts_js = "const OBJETO_EXTENSIONS = {\n"
for nombre_base, tipos in sorted(objeto_exts.items()):
    exts_js += f'  "{nombre_base}": {{ A: "{tipos.get("A", ".png")}", B: "{tipos.get("B", ".jpeg")}", C: "{tipos.get("C", ".jpeg")}" }},\n'
exts_js += "};\n"

# ===== 3. LEER HTML Y ACTUALIZAR =====
print("📝 Actualizando HTML...")

with open(index_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Agregar mapeo de extensiones después del array OBJETOS
insert_pos = html.find("].sort((a,b) => a.tema.localeCompare(b.tema));")
if insert_pos != -1:
    insert_pos = html.find("\n", insert_pos) + 1
    html = html[:insert_pos] + "\n" + exts_js + "\n" + html[insert_pos:]

# Agregar datos de 1BACH
insert_pos = html.find("// CONTENIDOS POR CURSO")
if insert_pos != -1:
    html = html[:insert_pos] + bach_array + "\n" + html[insert_pos:]

# Actualizar función abrirObjetoDetalle para usar extensiones dinámicamente
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

# Reemplazar la función abrirObjetoDetalle
pattern = r'function abrirObjetoDetalle\(obj\) \{.*?\n\}'
html = re.sub(pattern, nueva_funcion, html, flags=re.DOTALL)

# Guardar HTML actualizado
with open(index_file, 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ HTML actualizado exitosamente")
print(f"✅ {len(bach_files)} UDs de 1º Bachillerato agregadas")
print(f"✅ {len(objeto_exts)} objetos mapeados con extensiones")
