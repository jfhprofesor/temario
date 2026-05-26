#!/usr/bin/env node

/**
 * Script para generar dinámicamente el array OBJETOS
 * a partir de los archivos en imagenes/objetos/
 *
 * Uso: node generate-objetos.js
 */

const fs = require('fs');
const path = require('path');

// Configuración
const OBJETOS_DIR = path.join(__dirname, 'imagenes', 'objetos');
const CONFIG_FILE = path.join(__dirname, 'config-objetos.json');
const OUTPUT_FILE = path.join(__dirname, 'objetos-data.js');

// Cargar configuración
let config = { categoriasPorObjeto: {} };
if (fs.existsSync(CONFIG_FILE)) {
  try {
    config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  } catch (e) {
    console.warn('⚠️  No se pudo leer config-objetos.json, usando defaults');
  }
}

/**
 * Extrae tema y objeto del nombre del archivo
 * Formato: "Tema - Objeto - A.ext"
 */
function parseFileName(filename) {
  // Remover extensión
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');

  // Dividir por " - "
  const parts = nameWithoutExt.split(' - ');

  if (parts.length < 3) return null;

  // El último "- A" se descarta
  // Tema: primer elemento
  // Objeto: segundo elemento hasta la última parte " - A"
  const tema = parts[0];
  const objeto = parts.slice(1, -1).join(' - '); // En caso de temas con " - "

  return { tema, objeto };
}

/**
 * Obtiene la categoría de un objeto
 */
function getCategoria(tema, objeto) {
  const key = `${tema}|${objeto}`;

  // Intentar coincidencia exacta
  if (config.categoriasPorObjeto[key]) {
    return config.categoriasPorObjeto[key];
  }

  // Intentar coincidencia parcial (solo tema)
  const temaKeys = Object.keys(config.categoriasPorObjeto)
    .filter(k => k.startsWith(tema + '|'));

  if (temaKeys.length > 0) {
    // Retornar la categoría más común para ese tema
    const categorias = temaKeys.map(k => config.categoriasPorObjeto[k]);
    const fisicaCount = categorias.filter(c => c === 'Física').length;
    const quimicaCount = categorias.filter(c => c === 'Química').length;
    const metodoCount = categorias.filter(c => c === 'Método científico').length;

    if (fisicaCount >= quimicaCount && fisicaCount >= metodoCount) return 'Física';
    if (quimicaCount >= metodoCount) return 'Química';
    return 'Método científico';
  }

  // Default
  return 'Física';
}

/**
 * Lee los archivos y genera el array OBJETOS
 */
function generateObjetos() {
  if (!fs.existsSync(OBJETOS_DIR)) {
    console.error(`❌ La carpeta ${OBJETOS_DIR} no existe`);
    process.exit(1);
  }

  const files = fs.readdirSync(OBJETOS_DIR)
    .filter(f => f.endsWith(' - A.png') || f.endsWith(' - A.jpg') || f.endsWith(' - A.jpeg'))
    .sort();

  const objetos = [];
  const errores = [];

  console.log(`📂 Encontrados ${files.length} archivos con patrón "- A.*"\n`);

  files.forEach(filename => {
    const parsed = parseFileName(filename);

    if (!parsed) {
      errores.push(`⚠️  No se pudo parsear: ${filename}`);
      return;
    }

    const { tema, objeto } = parsed;
    const categoria = getCategoria(tema, objeto);
    const icono = `imagenes/objetos/${filename}`;

    objetos.push({
      tema,
      objeto,
      categoria,
      icono
    });

    console.log(`✓ ${tema} > ${objeto} [${categoria}]`);
  });

  // Mostrar errores si hay
  if (errores.length > 0) {
    console.log('\n' + errores.join('\n'));
  }

  console.log(`\n✅ Total de objetos: ${objetos.length}`);

  // Ordenar alfabéticamente por objeto
  objetos.sort((a, b) => a.objeto.localeCompare(b.objeto));

  // Generar código JavaScript
  const jsCode = `// Auto-generado por generate-objetos.js
// NO EDITAR MANUALMENTE - Los cambios se perderán

const OBJETOS = ${JSON.stringify(objetos, null, 2)}.sort((a,b) => a.objeto.localeCompare(b.objeto));

console.log('✓ OBJETOS cargado: ${objetos.length} objetos');
`;

  // Guardar archivo
  fs.writeFileSync(OUTPUT_FILE, jsCode, 'utf8');

  console.log(`\n📄 Archivo generado: ${OUTPUT_FILE}`);
  console.log('\n📌 Para usar en HTML, reemplaza:');
  console.log('   const OBJETOS = [ ... ];');
  console.log('   Por:');
  console.log('   <script src="objetos-data.js"><\/script>');
}

// Ejecutar
generateObjetos();
