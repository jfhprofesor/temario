#!/usr/bin/env python3
"""
Script para actualizar los paths de iconos en el array OBJETOS
Intercambia tema y objeto en los paths de imagenes/objetos/
"""

import re
from pathlib import Path

script_dir = Path(__file__).parent
index_file = script_dir / "index.html"

print("📝 Leyendo HTML...")
with open(index_file, 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

print("🔄 Actualizando paths de iconos...")

# Patrón para encontrar y reemplazar: "imagenes/objetos/Tema - Objeto - A.png"
# Necesitamos extraer el tema y objeto, intercambiarlos, y luego reemplazar

def intercambiar_ruta(match):
    """Intercambia tema y objeto en una ruta de imagen"""
    ruta = match.group(0)

    # Extraer: imagenes/objetos/Tema - Objeto - X.ext
    patron = r'"(imagenes/objetos/)([^"]+?)(\s-\s[ABC]\.[^"]+)"'
    sub_match = re.match(patron.replace('imagenes/objetos/', ''), ruta)

    if not sub_match:
        return ruta

    # Buscar dentro del archivo especifico
    ruta_match = re.search(r'imagenes/objetos/(.+?)\s-\s(.+?)\s-\s([ABC]\.[\w]+)', ruta)
    if not ruta_match:
        return ruta

    tema, objeto, tipo = ruta_match.groups()

    # Crear nueva ruta intercambiada
    nueva_ruta = ruta.replace(
        f"imagenes/objetos/{tema} - {objeto} - {tipo}",
        f"imagenes/objetos/{objeto} - {tema} - {tipo}"
    )

    return nueva_ruta

# Buscar todos los iconos en el array OBJETOS
objeto_pattern = r'\{\s*tema:"([^"]+)",\s*objeto:"([^"]+)",\s*icono:"imagenes/objetos/([^"]+)"\s*\}'

contador = 0
for match in re.finditer(objeto_pattern, html):
    tema, objeto, ruta_imagen = match.groups()

    # Extraer tema y objeto del nombre de imagen original
    imagen_match = re.match(r'(.+?)\s-\s(.+?)\s-\s([ABC]\.[\w]+)', ruta_imagen)
    if imagen_match:
        tema_img, objeto_img, tipo = imagen_match.groups()

        # Crear nueva ruta intercambiada
        nueva_ruta = f"imagenes/objetos/{objeto_img} - {tema_img} - {tipo}"

        # Reemplazar en el HTML
        ruta_antigua = f'imagenes/objetos/{tema_img} - {objeto_img} - {tipo}'

        if ruta_antigua in html and nueva_ruta != ruta_antigua:
            # Solo reemplazar si es diferente
            html = html.replace(
                f'icono:"{ruta_antigua}"',
                f'icono:"{nueva_ruta}"',
                1
            )
            contador += 1
            print(f"✅ {tema_img} → {objeto_img}")

print(f"\n✅ {contador} iconos actualizados")

# Guardar
print("💾 Guardando HTML...")
with open(index_file, 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ ¡Completado!")
