#!/usr/bin/env python3
"""
Script para renombrar imágenes de objetos intercambiando tema y objeto.
De: "Tema - Objeto - X.ext"
A: "Objeto - Tema - X.ext"
"""

import os
import re
from pathlib import Path

script_dir = Path(__file__).parent
objetos_dir = script_dir / "imagenes" / "objetos"

print("🔄 Renombrando imágenes de objetos...")
print(f"📁 Directorio: {objetos_dir}")

if not objetos_dir.exists():
    print("❌ Directorio no encontrado")
    exit(1)

renombrados = 0
errores = 0

# Patrón: "Tema - Objeto - X.ext"
pattern = r'^(.+)\s-\s(.+)\s-\s([ABC])\.(.+)$'

for archivo in sorted(os.listdir(objetos_dir)):
    ruta_original = objetos_dir / archivo

    # Solo procesar archivos
    if not ruta_original.is_file():
        continue

    # Intentar parsear el nombre
    match = re.match(pattern, archivo)
    if not match:
        print(f"⚠️ No coincide patrón: {archivo}")
        continue

    tema, objeto, tipo, ext = match.groups()

    # Intercambiar: "Objeto - Tema - X.ext"
    nuevo_nombre = f"{objeto} - {tema} - {tipo}.{ext}"
    ruta_nueva = objetos_dir / nuevo_nombre

    # Renombrar
    try:
        ruta_original.rename(ruta_nueva)
        print(f"✅ {archivo}")
        print(f"   → {nuevo_nombre}")
        renombrados += 1
    except Exception as e:
        print(f"❌ Error: {archivo}")
        print(f"   {str(e)}")
        errores += 1

print(f"\n📊 Resumen:")
print(f"   ✅ Renombrados: {renombrados}")
print(f"   ❌ Errores: {errores}")
print(f"\n✅ ¡Proceso completado!")
