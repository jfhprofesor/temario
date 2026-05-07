#!/usr/bin/env python3
import os, re
from pathlib import Path

script_dir = Path(__file__).parent
index_file = script_dir / "index.html"
objetos_dir = script_dir / "imagenes" / "objetos"
bach_dir = script_dir / "imagenes" / "1BACH"

# Escanear objetos
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

objetos_ordenados = sorted(objetos_dict.items(), key=lambda x: x[1]["objeto"].lower())

# Escanear 1BACH
bach_dict = {}
for archivo in sorted(os.listdir(bach_dir)):
    if '_-_A.' not in archivo:
        continue
    match = re.match(r'(UD\d+)_-_(.+?)_-_A\.', archivo)
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

# Buscar fondos B
for ud in list(bach_dict.keys()):
    tema = bach_dict[ud]["nombre"].replace(' ', '_')
    for archivo in os.listdir(bach_dir):
        if f"{ud}_-_{tema}_-_B." in archivo:
            bach_dict[ud]["fondo"] = f"imagenes/1BACH/{archivo}"
            break

# Generar arrays
objetos_js = "const OBJETOS = [\n"
for _, obj in objetos_ordenados:
    objetos_js += f'  {{ tema:"{obj["tema"]}", objeto:"{obj["objeto"]}", icono:"{obj["icono"]}" }},\n'
objetos_js += "].sort((a,b) => a.objeto.localeCompare(b.objeto));\n"

bach_1_js = "const BACH_1 = [\n"
for ud in sorted(bach_dict.keys()):
    d = bach_dict[ud]
    fondo = d["fondo"] if d["fondo"] else "imagenes/menu/no disponible.png"
    bach_1_js += f'  {{ nombre:"{d["nombre"]}", icono:"{d["icono"]}", fondo:"{fondo}", enlaces:[] }},\n'
bach_1_js += "];\n"

# Actualizar HTML
with open(index_file, 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

html = re.sub(r'const OBJETOS = \[.*?\];', objetos_js.rstrip(), html, flags=re.DOTALL)
html = re.sub(r'const BACH_1 = \[.*?\];', bach_1_js.rstrip(), html, flags=re.DOTALL)

# Invertir visualizacion
html = html.replace('temaDiv.textContent = obj.tema;', 'temaDiv.textContent = obj.objeto;')
html = html.replace('nombreDiv.textContent = obj.objeto;', 'nombreDiv.textContent = obj.tema;')
html = html.replace(
    'btn.appendChild(iconDiv);\n      btn.appendChild(temaDiv);\n      btn.appendChild(nombreDiv);',
    'btn.appendChild(iconDiv);\n      btn.appendChild(nombreDiv);\n      btn.appendChild(temaDiv);'
)

with open(index_file, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"✅ Objetos: {len(objetos_ordenados)}")
print(f"✅ 1º Bto: {len(bach_dict)}")
print(f"✅ Actualizadas visualizaciones y paths")
