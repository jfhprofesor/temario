#!/usr/bin/env python3
"""
Script para generar arrays de OBJETOS y BACH_1 escaneando carpetas
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
print("GENERANDO CONTENIDOS")
print("=" * 60)

# ===== ESCANEAR OBJETOS =====
print("\nEscaneando objetos...")

objetos_dict = {}

for archivo in sorted(os.listdir(objetos_dir)):
    if ' - A.' not in archivo:
        continue

    match = re.match(r'(.+?)\s-\s(.+?)\s-\s[ABC]\.', archivo)
    if match:
        tema, objeto = match.groups()
        key = f"{objeto}_{tema}"
        if key not in objetos_dict:
            objetos_dict[key] = {
                "tema": tema,
                "objeto": objeto,
                "icono": f"imagenes/objetos/{archivo}"
            }

print(f"  Encontrados: {len(objetos_dict)} objetos")

# Ordenar alfabeticamente por objeto
objetos_ordenados = sorted(objetos_dict.items(), key=lambda x: x[1]["objeto"].lower())

# ===== ESCANEAR 1BACH =====
print("\nEscaneando 1º Bachillerato...")

bach_dict = {}

for archivo in sorted(os.listdir(bach_dir)):
    if '_-_' not in archivo:
        continue

    # Solo procesar archivos A (iconos)
    if '_-_A.' not in archivo:
        continue

    match = re.match(r'(UD\d+)_-_(.+?)_-_[AB]\.', archivo)
    if match:
        ud, tema = match.groups()
        tema_limpio = tema.replace('_', ' ')

        if ud not in bach_dict:
            bach_dict[ud] = {
                "nombre": tema_limpio,
                "icono": f"imagenes/1BACH/{archivo}",
                "fondo": None,
                "enlaces": []
            }

# Buscar fondos (B)
for ud in list(bach_dict.keys()):
    tema = bach_dict[ud]["nombre"].replace(' ', '_')
    for archivo in os.listdir(bach_dir):
        if f"{ud}_-_{tema}_-_B." in archivo:
            bach_dict[ud]["fondo"] = f"imagenes/1BACH/{archivo}"
            break

print(f"  Encontradas: {len(bach_dict)} unidades")

# ===== GENERAR JAVASCRIPT =====
print("\nGenerando codigo...")

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
    icono = data["icono"]
    fondo = data["fondo"] if data["fondo"] else "imagenes/menu/no disponible.png"
    nombre = data["nombre"]
    bach_1_js += f'  {{ nombre:"{nombre}", icono:"{icono}", fondo:"{fondo}", enlaces:[] }},\n'
bach_1_js += "];\n"

# ===== ACTUALIZAR HTML =====
print("\nActualizando HTML...")

with open(index_file, 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Reemplazar OBJETOS
patron_objetos = r'const OBJETOS = \[.*?\];'
html = re.sub(patron_objetos, objetos_js.rstrip(), html, flags=re.DOTALL)

# Reemplazar BACH_1
patron_bach = r'const BACH_1 = \[.*?\];'
html = re.sub(patron_bach, bach_1_js.rstrip(), html, flags=re.DOTALL)

# Invertir visualizacion: Objeto arriba, Tema abajo
html = html.replace('temaDiv.textContent = obj.tema;', 'temaDiv.textContent = obj.objeto;')
html = html.replace('nombreDiv.textContent = obj.objeto;', 'nombreDiv.textContent = obj.tema;')

html = html.replace(
    'btn.appendChild(iconDiv);\n      btn.appendChild(temaDiv);\n      btn.appendChild(nombreDiv);',
    'btn.appendChild(iconDiv);\n      btn.appendChild(nombreDiv);\n      btn.appendChild(temaDiv);'
)

# ===== GUARDAR =====
with open(index_file, 'w', encoding='utf-8') as f:
    f.write(html)

print("\n" + "=" * 60)
print("COMPLETADO")
print("=" * 60)
print(f"Objetos: {len(objetos_ordenados)}")
print(f"1º Bto: {len(bach_dict)}")
print(f"Visualizacion: Objeto arriba, Tema abajo")
