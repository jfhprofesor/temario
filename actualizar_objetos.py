#!/usr/bin/env python3
"""
Script para regenerar objetos.json automáticamente leyendo la carpeta objetos/
Ejecutar: python3 actualizar_objetos.py
"""

import os
import json
from collections import defaultdict
from pathlib import Path

def generar_objetos_json():
    script_dir = Path(__file__).parent
    objetos_dir = script_dir / "objetos"
    
    if not objetos_dir.exists():
        print(f"❌ Error: carpeta '{objetos_dir}' no encontrada")
        return False
    
    # Leer archivos
    archivos = os.listdir(objetos_dir)
    
    # Agrupar por tema y objeto
    objetos_dict = defaultdict(lambda: {"tema": "", "objeto": "", "imagenes": set()})
    
    for archivo in archivos:
        if not archivo.endswith(('.png', '.jpeg', '.jpg')):
            continue
        
        # Parsear: "Tema - Objeto - X.ext"
        for tipo in ['A', 'B', 'C', 'V']:
            patron = f" - {tipo}."
            if patron in archivo:
                # Extraer tema y objeto
                nombre_sin_tipo = archivo.split(f" - {tipo}.")[0]
                
                # El nombre ya contiene "Tema - Objeto"
                partes = nombre_sin_tipo.rsplit(" - ", 1)
                if len(partes) == 2:
                    tema, objeto = partes
                    key = f"{tema}|{objeto}"
                    objetos_dict[key]["tema"] = tema
                    objetos_dict[key]["objeto"] = objeto
                    objetos_dict[key]["imagenes"].add(tipo)
                break
    
    # Convertir a lista
    objetos_lista = []
    for key, data in objetos_dict.items():
        # Mostrar solo si tiene al menos una imagen
        if data["imagenes"]:
            obj = {
                "tema": data["tema"],
                "objeto": data["objeto"],
                "icono": f"objetos/{data['tema']} - {data['objeto']} - A.png",
                "imagenes": sorted(list(data["imagenes"]))
            }
            objetos_lista.append(obj)
    
    # Ordenar por tema
    objetos_lista.sort(key=lambda x: x["tema"])
    
    # Guardar como JSON
    output_file = script_dir / "objetos.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(objetos_lista, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Generado objetos.json con {len(objetos_lista)} objetos")
    print(f"\nObjetos por tema:")
    temas = {}
    for obj in objetos_lista:
        tema = obj['tema']
        temas[tema] = temas.get(tema, 0) + 1
    
    for tema in sorted(temas.keys()):
        print(f"  • {tema}: {temas[tema]} objeto(s)")
    
    return True

if __name__ == "__main__":
    generar_objetos_json()
