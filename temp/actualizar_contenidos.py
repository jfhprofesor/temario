#!/usr/bin/env python3
"""
Script para:
1. Escanear carpeta de objetos dinámicamente
2. Generar array OBJETOS con orden alfabético por nombre del objeto
3. Actualizar paths de imágenes
4. Generar BACH_1 desde carpeta 1BACH
5. Invertir orden de visualización (Objeto arriba, Tema abajo)
"""

import os
import re
from pathlib import Path
from collections import defaultdict

script_dir = Path(__file__).parent
index_file = script_dir / "index.html"
objetos_dir = script_dir / "imagenes" / "objetos"
bach_dir = script_dir / "imagenes" / "1BACH"

print("=" * 60)
print("ESCANEANDO CONTENIDOS")
print("=" * 60)

# ===== 1. ESCANEAR OBJETOS =====
print("\n📁 Escaneando objetos...")

objetos_dict = defaultdict(lambda: {"tema": "", "objeto": "", "icono": ""})

for archivo in os.listdir(objetos_dir):
    if ' - A.' not in archivo:
        continue

    # Parsear: Tema - Objeto - A.ext
    match = re.match(r'(.+?)\s-\s(.+?)\s-\s[ABC]\.', archivo)
    if match:
        tema, objeto = match.groups()
        key = f"{objeto}_{tema}"
        objetos_dict[key]["tema"] = tema
        objetos_dict[key]["objeto"] = objeto
        objetos_dict[key]["icono"] = f"imagenes/objetos/{archivo}"

# Ordenar alfabéticamente por nombre del objeto
objetos_ordenados = sorted(objetos_dict.items(), key=lambda x: x[1]["objeto"].lower())

print(f"✅ {len(objetos_ordenados)} objetos encontrados")

# ===== 2. ESCANEAR 1BACH =====
print("\n📁 Escaneando 1º Bachillerato...")

bach_dict = {}

for archivo in os.listdir(bach_dir):
    if '_-_' not in archivo:
        continue

    # Parsear: UD##_-_Tema_-_A.ext
    match = re.match(r'(UD\d+)_-_(.+?)_-_[AB]\.', archivo)
    if match:
        ud, tema = match.groups()
        tema = tema.replace('_', ' ')

        # Buscar icono (A) y fondo (B)
        icono = f"imagenes/1BACH/{archivo}"

        # Buscar B
        fondo = None
        for f in os.listdir(bach_dir):
            if f.startswith(f"{ud}_-_") and ' - B.' in f:
                fondo = f"imagenes/1BACH/{f}"
                break

        if fondo:
            bach_dict[ud] = {
                "nombre": tema,
                "icono": icono,
                "fondo": fondo,
                "enlaces": []
            }

print(f"✅ {len(bach_dict)} unidades de 1º Bto encontradas")

# ===== 3. GENERAR JAVASCRIPT =====
print("\n⚙️ Generando código JavaScript...")

# Array OBJETOS
objetos_js = "const OBJETOS = [\n"
for _, obj_data in objetos_ordenados:
    tema = obj_data["tema"]
    objeto = obj_data["objeto"]
    icono = obj_data["icono"]
    objetos_js += f'  {{ tema:"{tema}", objeto:"{objeto}", icono:"{icono}" }},\n'
objetos_js += "].sort((a,b) => a.objeto.localeCompare(b.objeto));\n"

# Array BACH_1
bach_1_js = "const BACH_1 = [\n"
for ud in sorted(bach_dict.keys()):
    data = bach_dict[ud]
    bach_1_js += f'  {{ nombre:"{data["nombre"]}", icono:"{data["icono"]}", fondo:"{data["fondo"]}", enlaces:[] }},\n'
bach_1_js += "];\n"

# ===== 4. ACTUALIZAR HTML =====
print("\n📝 Actualizando HTML...")

with open(index_file, 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Reemplazar OBJETOS
patron_objetos = r'const OBJETOS = \[.*?\]\.sort\(\(a,b\) => a\.tema\.localeCompare\(b\.tema\)\);'
html = re.sub(patron_objetos, objetos_js.rstrip('\n') + ';', html, flags=re.DOTALL)

# Reemplazar BACH_1
patron_bach = r'const BACH_1 = \[.*?\];'
html = re.sub(patron_bach, bach_1_js.rstrip('\n'), html, flags=re.DOTALL)

# ===== 5. INVERTIR VISUALIZACIÓN (Objeto arriba, Tema abajo) =====
print("\n🔄 Invirtiendo orden de visualización...")

# En la función buildObjetosGrid, cambiar:
# temaDiv.textContent = obj.tema; nombreDiv.textContent = obj.objeto;
# Por:
# temaDiv.textContent = obj.objeto; nombreDiv.textContent = obj.tema;

# Y cambiar el orden de appendChild:
# btn.appendChild(iconDiv); btn.appendChild(temaDiv); btn.appendChild(nombreDiv);
# Por:
# btn.appendChild(iconDiv); btn.appendChild(nombreDiv); btn.appendChild(temaDiv);

html = html.replace(
    'temaDiv.textContent = obj.tema;',
    'temaDiv.textContent = obj.objeto;'
)
html = html.replace(
    'nombreDiv.textContent = obj.objeto;',
    'nombreDiv.textContent = obj.tema;'
)

# Cambiar orden de appendChild
html = html.replace(
    'btn.appendChild(iconDiv);\n      btn.appendChild(temaDiv);\n      btn.appendChild(nombreDiv);',
    'btn.appendChild(iconDiv);\n      btn.appendChild(nombreDiv);\n      btn.appendChild(temaDiv);'
)

# ===== 6. GUARDAR =====
print("\n💾 Guardando cambios...")

with open(index_file, 'w', encoding='utf-8') as f:
    f.write(html)

print("\n" + "=" * 60)
print("✅ ACTUALIZACIÓN COMPLETADA")
print("=" * 60)
print(f"📊 Resumen:")
print(f"  • Objetos: {len(objetos_ordenados)} (ordenados alfabéticamente)")
print(f"  • 1º Bachillerato: {len(bach_dict)} unidades")
print(f"  • Visualización: Objeto arriba, Tema abajo")
print(f"  • Archivo guardado: {index_file.name}")
