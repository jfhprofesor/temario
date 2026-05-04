#!/usr/bin/env python3
"""
Script para escanear la carpeta 'imagenes/objetos/' y regenerar el array de objetos en index.html
Ejecutar: python3 generar_objetos.py
"""

import os
import re
from collections import defaultdict
from pathlib import Path

def generar_array_objetos():
    script_dir = Path(__file__).parent
    objetos_dir = script_dir / "imagenes" / "objetos"
    index_file = script_dir / "index.html"

    if not objetos_dir.exists():
        print(f"❌ Error: carpeta '{objetos_dir}' no encontrada")
        return False

    if not index_file.exists():
        print(f"❌ Error: archivo '{index_file}' no encontrado")
        return False

    # Leer archivos
    archivos = os.listdir(objetos_dir)

    # Agrupar por tema y objeto
    objetos_dict = defaultdict(lambda: {"tema": "", "objeto": ""})

    for archivo in archivos:
        if not archivo.endswith(('.png', '.jpeg', '.jpg')):
            continue

        # Parsear: "Tema - Objeto - X.ext"
        for tipo in ['A', 'B', 'C', 'V']:
            patron = f" - {tipo}."
            if patron in archivo:
                nombre_sin_tipo = archivo.split(f" - {tipo}.")[0]
                partes = nombre_sin_tipo.rsplit(" - ", 1)
                if len(partes) == 2:
                    tema, objeto = partes
                    key = f"{tema}|{objeto}"
                    objetos_dict[key]["tema"] = tema
                    objetos_dict[key]["objeto"] = objeto
                break

    # Convertir a lista y ordenar
    objetos_lista = [v for v in objetos_dict.values() if v["tema"]]
    objetos_lista.sort(key=lambda x: x["tema"])

    # Generar código JavaScript
    js_lines = ["const OBJETOS = ["]

    if objetos_lista:
        for obj in objetos_lista:
            js_lines.append(f'  {{ tema:"{obj["tema"]}", objeto:"{obj["objeto"]}", icono:"imagenes/objetos/{obj["tema"]} - {obj["objeto"]} - A.png" }},')
    else:
        js_lines.append("  // Agrega imágenes a la carpeta 'imagenes/objetos/' con nombres: 'Tema - Objeto - A.png'")

    js_lines.append("].sort((a,b) => a.tema.localeCompare(b.tema));")

    objetos_js = "\n".join(js_lines)

    # Leer el archivo HTML actual
    with open(index_file, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Buscar y reemplazar el bloque OBJETOS
    pattern = r'const OBJETOS = \[.*?\]\.sort\(\(a,b\) => a\.tema\.localeCompare\(b\.tema\)\);'

    if re.search(pattern, html_content, re.DOTALL):
        new_html = re.sub(pattern, objetos_js, html_content, flags=re.DOTALL)
    else:
        print("❌ No se encontró el bloque OBJETOS en index.html")
        return False

    # Escribir el HTML actualizado
    with open(index_file, 'w', encoding='utf-8') as f:
        f.write(new_html)

    print(f"✅ Array de objetos regenerado")
    print(f"✅ Total de objetos: {len(objetos_lista)}")

    if objetos_lista:
        print(f"\nObjetos encontrados por tema:")
        temas = {}
        for obj in objetos_lista:
            tema = obj['tema']
            temas[tema] = temas.get(tema, 0) + 1

        for tema in sorted(temas.keys()):
            print(f"  • {tema}: {temas[tema]} objeto(s)")
    else:
        print("\n⚠️  No hay objetos. Agrega imágenes a la carpeta 'imagenes/objetos/'")
        print("   Formato: 'Tema - Objeto - A.png'")

    return True

if __name__ == "__main__":
    generar_array_objetos()
