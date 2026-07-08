@echo off
chcp 65001 >nul
echo Convirtiendo PNG a WebP...
echo.

python -c "
import os, re, sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    os.system('pip install pillow -q')
    from PIL import Image

BASE = Path(r'%~dp0')
OBJETOS_DIR = BASE / 'imagenes' / 'objetos'
TEMARIO_JS  = BASE / 'sistema' / 'temario.js'
OBJETOS_DATA = BASE / 'sistema' / 'objetos-data.js'

pngs = sorted(OBJETOS_DIR.glob('*.png'))
print(f'Encontrados {len(pngs)} archivos .png')
print()

converted, errors = [], []
for src in pngs:
    dst = src.with_suffix('.webp')
    try:
        img = Image.open(src)
        img.save(dst, 'WEBP', quality=90)
        src.unlink()
        converted.append(src.name)
        print(f'  OK  {src.name}')
    except Exception as e:
        errors.append(f'{src.name}: {e}')
        print(f'  ERROR  {src.name}: {e}')

print()
print(f'Convertidos: {len(converted)}   Errores: {len(errors)}')
print()

# Actualizar EXTENSION_MAP en temario.js
print('Actualizando temario.js...')
with open(TEMARIO_JS, 'rb') as f:
    content = f.read()
pattern = rb'(const EXTENSION_MAP = \{)(.+?)(\};)'
def fix_map(m):
    return m.group(1) + m.group(2).replace(b':\"png\"', b':\"webp\"') + m.group(3)
import re as _re
new_content, n = _re.subn(pattern, fix_map, content, flags=_re.DOTALL)
with open(TEMARIO_JS, 'wb') as f:
    f.write(new_content)
print(f'  OK  EXTENSION_MAP actualizado')

# Actualizar objetos-data.js
print('Actualizando objetos-data.js...')
with open(OBJETOS_DATA, 'r', encoding='utf-8') as f:
    text = f.read()
new_text = _re.sub(r'(imagenes/objetos/[^\".]+)\.png', r'\1.webp', text)
with open(OBJETOS_DATA, 'w', encoding='utf-8') as f:
    f.write(new_text)
print(f'  OK  objetos-data.js actualizado')

print()
print('Todo listo.')
"

echo.
pause
