#!/usr/bin/env python3
"""
Script para reorganizar los archivos de 1º Bachillerato
Cambia el formato de: "UD01 - A - Icono.png" a "UD01 - Método científico - A.png"
Ejecutar: python3 reorganizar_1bach.py
"""

import os
import re
from pathlib import Path

# Mapeo de UDs a nombres temáticos
UD_NOMBRES = {
    "UD01": "Método científico",
    "UD02": "Formulación inorgánica",
    "UD03": "Formulación orgánica",
    "UD04": "Estructura de la materia",
    "UD05": "Gases y disoluciones",
    "UD06": "Reacciones químicas",
    "UD07": "Termodinámica",
    "UD08": "Química del carbono",
    "UD09": "Cinética",
    "UD10": "Dinámica",
    "UD11": "Gravedad y electrostática",
    "UD12": "Energía mecánica",
}

def reorganizar_1bach():
    script_dir = Path(__file__).parent
    bach_dir = script_dir / "imagenes" / "1BACH"

    if not bach_dir.exists():
        print(f"❌ Error: carpeta '{bach_dir}' no encontrada")
        return False

    # Leer archivos
    archivos = sorted(os.listdir(bach_dir))

    cambios = 0

    for archivo in archivos:
        # Buscar patrón: "UD01 - A - Icono.png" o "UD01 - B - Imagen - ....jpg"
        match = re.match(r'(UD\d+)\s*-\s*([AB])\s*-\s*(?:Icono|Imagen\s*-\s*)?(.+)$', archivo)

        if not match:
            print(f"⚠️  No se puede parsear: {archivo}")
            continue

        ud = match.group(1)
        tipo = match.group(2)  # A o B
        extension = Path(archivo).suffix

        if ud not in UD_NOMBRES:
            print(f"⚠️  UD desconocida: {ud}")
            continue

        nombre_tema = UD_NOMBRES[ud]
        nuevo_nombre = f"{ud} - {nombre_tema} - {tipo}{extension}"

        ruta_vieja = bach_dir / archivo
        ruta_nueva = bach_dir / nuevo_nombre

        if ruta_vieja != ruta_nueva:
            try:
                os.rename(ruta_vieja, ruta_nueva)
                print(f"✅ {archivo}")
                print(f"   → {nuevo_nombre}")
                cambios += 1
            except Exception as e:
                print(f"❌ Error al renombrar {archivo}: {e}")
        else:
            print(f"⏭️  Ya está correctamente nombrado: {archivo}")

    print(f"\n✅ Reorganización completada: {cambios} archivos renombrados")
    return True

if __name__ == "__main__":
    reorganizar_1bach()
