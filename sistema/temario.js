// ═══════════════════════════════════════════
// PIN MODAL
// ═══════════════════════════════════════════
(function() {
  const PINES_VALIDOS = ['0123', '9445'];
  const overlay = document.getElementById('pinOverlay');
  const btn = document.getElementById('pinBtn');
  const digits = [0,1,2,3].map(i => document.getElementById('pin' + i));

  function getPIN() { return digits.map(d => d.value).join(''); }

  function bambalear(el, color, onDone) {
    el.style.background = color;
    const shake = [8,-8,6,-6,4,-4,0];
    let i = 0;
    const interval = setInterval(() => {
      el.style.transform = `translateX(${shake[i]}px)`;
      i++;
      if (i >= shake.length) {
        clearInterval(interval);
        el.style.transform = '';
        if (onDone) onDone();
      }
    }, 60);
  }

  function intentarAcceso() {
    const pin = getPIN();
    if (PINES_VALIDOS.includes(pin)) {
      digits.forEach(d => d.style.borderColor = '#44cc88');
      const esUniversal = pin === '9445';
      bambalear(btn, '#44cc88', () => {
        btn.style.background = '';
        overlay.style.transition = 'opacity 0.4s';
        overlay.style.opacity = '0';
        setTimeout(() => { overlay.style.display = 'none'; }, 400);
        if (esUniversal) {
          const btnSala = document.getElementById('btn-sala-control');
          if (btnSala) btnSala.style.display = '';
        }
      });
    } else {
      digits.forEach(d => { d.value = ''; d.style.borderColor = '#ff6666'; });
      bambalear(btn, '#ff6666', () => {
        btn.style.background = '';
        digits[0].focus();
        setTimeout(() => digits.forEach(d => d.style.borderColor = ''), 600);
      });
    }
  }

  digits.forEach((d, i) => {
    d.addEventListener('input', () => {
      d.value = d.value.replace(/\D/g, '').slice(-1);
      if (d.value && i < 3) digits[i + 1].focus();
      if (getPIN().length === 4) intentarAcceso();
    });
    d.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !d.value && i > 0) digits[i - 1].focus();
    });
  });

  btn.addEventListener('click', intentarAcceso);
  setTimeout(() => digits[0].focus(), 100);
})();

// ═══════════════════════════════════════════
// ICONOS DE ENLACE — carpeta imagenes/menu/
// ═══════════════════════════════════════════
const ICONOS = {
  online:        'imagenes/menu/Ver apuntes online.webp',
  presentacion_online: 'imagenes/menu/Ver presentacion online.webp',
  pdf:           '',
  google:        'imagenes/menu/Cuestionario Google.webp',
  formulacion:   'imagenes/menu/Cuaderno.webp',
  kahoot_grupo:  'imagenes/menu/Kahoot Grupo.webp',
  kahoot_solo:   'imagenes/menu/Kahoot Individual.webp',
  pasapalabra:    'imagenes/menu/Pasapalabra.webp',
  formulario:     'imagenes/menu/Formulario.webp',
};


// ═══════════════════════════════════════════
// OBJETOS EN CLASE
// ═══════════════════════════════════════════
// OBJETOS se carga desde objetos-data.js
// Este archivo se genera automáticamente con: node generate-objetos.js

const JUEGOS = {
  "2eso": [
    { nombre:'Día mundial ciencia', enlaces:[
      { label:'Kahoot en grupo', tipo:'kahoot_grupo', url:'https://play.kahoot.it/v2/?quizId=67b9fe53-3307-480a-aa55-c98b99f0e912', editUrl:'https://create.kahoot.it/creator/67b9fe53-3307-480a-aa55-c98b99f0e912' },
      { label:'Kahoot en solitario', tipo:'kahoot_solo', url:'https://kahoot.it/solo?quizId=67b9fe53-3307-480a-aa55-c98b99f0e912&gameMode=nano' },
    ]},
    { nombre:'Día de Europa', enlaces:[
      { label:'Kahoot en grupo', tipo:'kahoot_grupo', url:'https://play.kahoot.it/v2/?quizId=3fbdb453-385e-422c-9ba7-e37d3718b3a3', editUrl:'https://create.kahoot.it/creator/3fbdb453-385e-422c-9ba7-e37d3718b3a3' },
      { label:'Kahoot en solitario', tipo:'kahoot_solo', url:'https://kahoot.it/solo?quizId=3fbdb453-385e-422c-9ba7-e37d3718b3a3&gameMode=nano' },
    ]},
    { nombre:'Pasapalabra 1', enlaces:[
      { label:'Pasapalabra 1', tipo:'pasapalabra', url:'https://onedrive.live.com/:p:/g/personal/5E49627FE7EEC215/IQDq8wi4uDdYSqJu4FqyvamaAbMcRLeI-6j1XsUP5fKICQA?resid=5E49627FE7EEC215!sb808f3ea37b84a58a26ee05ab2bda99a&ithint=file%2Cpptx&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3AvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRRHE4d2k0dURkWVNxSnU0RnF5dmFtYUFiTWNSTGVJLTZqMVhzVVA1ZktJQ1FB' },
    ]},
    { nombre:'Pasapalabra 2', enlaces:[
      { label:'Pasapalabra 2', tipo:'pasapalabra', url:'https://onedrive.live.com/:p:/g/personal/5E49627FE7EEC215/IQDAgLXu_BM4ToLe4y5c9v5iAe8iSncLBknBAjej9LXphh4?resid=5E49627FE7EEC215!seeb580c013fc4e3882dee32e5cf6fe62&ithint=file%2Cpptx&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3AvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRREFnTFh1X0JNNFRvTGU0eTVjOXY1aUFlOGlTbmNMQmtuQkFqZWo5TFhwaGg0' },
    ]},
  ],
  "3eso": [
    { nombre:'Cultural week', enlaces:[
      { label:'Kahoot en grupo', tipo:'kahoot_grupo', url:'https://play.kahoot.it/v2/?quizId=adde3149-801e-4c9a-9767-2f3a6158eeae', editUrl:'https://create.kahoot.it/creator/adde3149-801e-4c9a-9767-2f3a6158eeae' },
      { label:'Kahoot en solitario', tipo:'kahoot_solo', url:'https://kahoot.it/solo?quizId=adde3149-801e-4c9a-9767-2f3a6158eeae&gameMode=nano' },
    ]},
  ],
};

// ═══════════════════════════════════════════
// DATOS
// ═══════════════════════════════════════════
const CURSOS = {

  "2eso": { label:"2º ESO - Física y Química", temas:[
    { nombre:"El método científico",        cat:"metodo", icono:"imagenes/2ESO/01A - Icono.webp", fondo:"imagenes/2ESO/01C - Imagen.webp", enlaces:[
      { label:"Ver presentación online", tipo:"presentacion_online", url:"https://1drv.ms/p/c/5e49627fe7eec215/ERXC7ud_YkkggF4KCwAAAAABZHM1iA85X0jqZIeS4Ptd0w" },
      { label:"Kahoot en grupo",    tipo:"kahoot_grupo", url:"https://play.kahoot.it/#/?quizId=ddf78bd7-baa9-476a-847d-310a3ed6691e" },
      { label:"Kahoot en solitario",tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=ddf78bd7-baa9-476a-847d-310a3ed6691e&gameMode=nano" },
    ]},
    { nombre:"La materia",                  cat:"quimica", icono:"imagenes/2ESO/02A - Icono.webp", fondo:"imagenes/2ESO/02C - Imagen.webp", enlaces:[
      { label:"Ver presentación online", tipo:"presentacion_online", url:"https://1drv.ms/p/c/5e49627fe7eec215/ERXC7ud_YkkggF4LCwAAAAABqyQnd9780Pkc2aIueyI98A" },
      { label:"Kahoot en grupo",    tipo:"kahoot_grupo", url:"https://play.kahoot.it/#/?quizId=e34c6ad0-1434-472d-b3c1-01e7bd94b9f4" },
      { label:"Kahoot en solitario",tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=e34c6ad0-1434-472d-b3c1-01e7bd94b9f4&gameMode=nano" },
    ]},
    { nombre:"Los estados de agregación",   cat:"quimica", icono:"imagenes/2ESO/03A - Icono.webp", fondo:"imagenes/2ESO/03C - Imagen.webp", enlaces:[
      { label:"Ver presentación online", tipo:"presentacion_online", url:"https://1drv.ms/p/c/5e49627fe7eec215/ERXC7ud_YkkggF4MCwAAAAABFJBwdJ_57V3x8yRZI8UQ-Q" },
      { label:"Kahoot en grupo",    tipo:"kahoot_grupo", url:"https://play.kahoot.it/#/?quizId=039d60f8-808e-41c2-b574-f0eacf15cc03" },
      { label:"Kahoot en solitario",tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=039d60f8-808e-41c2-b574-f0eacf15cc03&gameMode=nano" },
    ]},
    { nombre:"Las reacciones químicas",     cat:"quimica", icono:"imagenes/2ESO/04A - Icono.webp", fondo:"imagenes/2ESO/04C - Imagen.webp", enlaces:[
      { label:"Ver presentación online", tipo:"presentacion_online", url:"https://1drv.ms/p/c/5e49627fe7eec215/ERXC7ud_YkkggF4NCwAAAAABQYmpajT0CxlXAuZ73dxylA" },
      { label:"Kahoot en grupo",    tipo:"kahoot_grupo", url:"https://play.kahoot.it/#/?quizId=7f91a71c-90fa-4d8e-bfc5-f132fe9ac26c" },
      { label:"Kahoot en solitario",tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=7f91a71c-90fa-4d8e-bfc5-f132fe9ac26c&gameMode=nano" },
    ]},
    { nombre:"Las fuerzas y el movimiento", cat:"fisica", icono:"imagenes/2ESO/05A - Icono.webp", fondo:"imagenes/2ESO/05C - Imagen.webp", enlaces:[
      { label:"Ver presentación online", tipo:"presentacion_online", url:"https://1drv.ms/p/c/5e49627fe7eec215/ERXC7ud_YkkggF4OCwAAAAABxnZ5gDz49Tpr9LYSw5NsPQ" },
      { label:"Kahoot en grupo",    tipo:"kahoot_grupo", url:"https://play.kahoot.it/#/?quizId=15df15da-b97b-4c03-88a4-783b1d9490a6" },
      { label:"Kahoot en solitario",tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=15df15da-b97b-4c03-88a4-783b1d9490a6&gameMode=nano" },
    ]},
    { nombre:"La energía",                  cat:"fisica", icono:"imagenes/2ESO/06A - Icono.webp", fondo:"imagenes/2ESO/06C - Imagen.webp", enlaces:[
      { label:"Ver presentación online", tipo:"presentacion_online", url:"https://1drv.ms/p/c/5e49627fe7eec215/ERXC7ud_YkkggF4RCwAAAAABZ_2hWOYKPOyV-EpH0ECNsA" },
      { label:"Kahoot en grupo",    tipo:"kahoot_grupo", url:"https://play.kahoot.it/#/?quizId=a513b1bc-f4ce-4ce9-94c4-4ab2a33541b0" },
      { label:"Kahoot en solitario",tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=a513b1bc-f4ce-4ce9-94c4-4ab2a33541b0&gameMode=nano" },
    ]},
    { nombre:"La energía térmica",          cat:"fisica", icono:"imagenes/2ESO/07A - Icono.webp", fondo:"imagenes/2ESO/07C - Imagen.webp", enlaces:[
      { label:"Ver presentación online", tipo:"presentacion_online", url:"https://1drv.ms/p/c/5e49627fe7eec215/ERXC7ud_YkkggF4PCwAAAAAB-MoEE48qShfTsWPt0nlSPQ" },
      { label:"Kahoot en grupo",    tipo:"kahoot_grupo", url:"https://play.kahoot.it/#/?quizId=1aa8dd2b-dadc-4ddb-aa9b-020af1606b2f" },
      { label:"Kahoot en solitario",tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=1aa8dd2b-dadc-4ddb-aa9b-020af1606b2f&gameMode=nano" },
    ]},
    { nombre:"El sonido y la luz",          cat:"fisica", icono:"imagenes/2ESO/08A - Icono.webp", fondo:"imagenes/2ESO/08C - Imagen.webp", enlaces:[
      { label:"Ver presentación online", tipo:"presentacion_online", url:"https://1drv.ms/p/c/5e49627fe7eec215/ERXC7ud_YkkggF4QCwAAAAABKEVdmS-ZkdCOlC4W5Nfy3Q" },
      { label:"Kahoot en grupo",    tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/lobby?quizId=3fbdb453-385e-422c-9ba7-e37d3718b3a3" },
      { label:"Kahoot en solitario",tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=3fbdb453-385e-422c-9ba7-e37d3718b3a3&gameMode=nano" },
    ]},
  ]},

  "3eso": { label:"3º ESO - Física y Química", temas:[
    { nombre:"Método científico",                   cat:"metodo", icono:"imagenes/3ESO/01A - Icono.webp", fondo:"imagenes/3ESO/01C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/ERurym9684hLveySW0eOPK4BJYqAMZi4c6pSTzawdvsIhQ?e=AQRomU" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQkxrNGhpM2g2ZFQ3cFhNZTZjc0lFR0FUQ0lQaHVSUUxuc09XYmI1RzBEUDBR&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s6288934b1ede4f9dba5731ee9cb08106&parId=5E49627FE7EEC215%21sc09c414909a1435e810243744d9c16c1&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSdfK7uM_oZEwHM6czNNvkPtLTe5hha8gqeqG4QBAOqK9egaNw/viewform", editUrl:"https://docs.google.com/forms/d/1_Gm-fvIKValuT36BIpcurW84ld_eW5UxPsy-DdItZ08/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/lobby?quizId=27224ca0-40f9-405a-a42a-c82a9f931dbf" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=27224ca0-40f9-405a-a42a-c82a9f931dbf&gameMode=nano" },
    ]},
    { nombre:"El átomo y la tabla periódica",       cat:"quimica", icono:"imagenes/3ESO/02A - Icono.webp", fondo:"imagenes/3ESO/02C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EcBmhM8wR9RLo92ha0l75AUBS240dCL4Lv9iNqACtGsx2g?e=w5TGtD" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQ2dVMWpQQzg5UlRJaXhJTE5xUnNFTUFVVl95VlFteUFuXzBzWElXcU5WU0xJ&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21scf5853a0cf0b4c5188b120b36a46c10c&parId=5E49627FE7EEC215%21sc09c414909a1435e810243744d9c16c1&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSearJteCmFxsdzGQ-OkVlYB3Dt2thbaz5mqWrdILmDzNHRRAA/viewform", editUrl:"https://docs.google.com/forms/d/1_wazDxZcn2l4bM3wBTyT1m_PY009-KivAu6YW2c_9H4/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/lobby?quizId=39098528-17e6-4bfb-8825-ac6b40f8938c" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=39098528-17e6-4bfb-8825-ac6b40f8938c&gameMode=nano" },
    ]},
    { nombre:"Sistemas materiales",                 cat:"quimica", icono:"imagenes/3ESO/03A - Icono.webp", fondo:"imagenes/3ESO/03C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EaTN54yYK5pFraUhvaxrhpkBq6obJ5GCFcoP_hgyZrakNQ?e=CogGKX" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQV9kRkpzOV9pY1NKc0lUbS1mSXhVd0FZQ3J6TS1qb2tYeFhnYWVhTWc2RGJr&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s6c52743ff8f7489c9b084e6f9f231530&parId=5E49627FE7EEC215%21sc09c414909a1435e810243744d9c16c1&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSfoav7o-yRqbsWs6gsg3-o2-Uev1Wvh8UO1OSiZRTGILyAhlQ/viewform", editUrl:"https://docs.google.com/forms/d/1Yeq4s8ZlXTV2G9OIzjIqePI_EfFIZBwnA2LhuiEuDWE/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/lobby?quizId=5dcd9c42-6a35-476f-b564-b604f3b56cb6" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=5dcd9c42-6a35-476f-b564-b604f3b56cb6&gameMode=nano" },
    ]},
    { nombre:"Formulación inorgánica",              cat:"quimica", icono:"imagenes/3ESO/04A - Icono.webp", fondo:"imagenes/3ESO/04C - Imagen.webp", enlaces:[
      { label:"Presentación online",    tipo:"online",      url:"https://1drv.ms/b/c/5e49627fe7eec215/EfLb61AqpNJOgv3xqNTAxBYBJPhAUjDjk4_y-uuYMaRj_w?e=lXQPw7" },
      { label:"Cuestionario Google",    tipo:"google",      url:"https://docs.google.com/forms/d/e/1FAIpQLSdnvzBaXKLrRSqBIvjUCi3-hxv2EZHO18NPRy8cqWXk6SV9NQ/viewform", editUrl:"https://docs.google.com/forms/d/1ZvsRJuQn1DOqeRhHaN96F-aT7xw3kG7qWOlzOAPQjzE/edit" },
      { label:"Cuestionario inorgánica",tipo:"formulacion", url:"https://sites.google.com/view/cuest-form-inorg/", editUrl:"https://drive.google.com/drive/u/1/folders/1ZmfUuTCnn0y3m3kPf_m6W-SzPNCvACFS" },
      { label:"Kahoot en grupo",        tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/lobby?quizId=21de7dbf-62f1-4fa0-8bc4-45ba8d7cb0d6" },
      { label:"Kahoot en solitario",    tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=21de7dbf-62f1-4fa0-8bc4-45ba8d7cb0d6&gameMode=nano" },
    ]},
    { nombre:"Reacciones químicas",                 cat:"quimica", icono:"imagenes/3ESO/05A - Icono.webp", fondo:"imagenes/3ESO/05C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EYpSDRvz-gpIp88zTDZer3MBVB_hSJgUch_WgltUer--Lg?e=WqyPgs" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQWFZdDR4WlhpeFJLMkd6bXdnTW1VcEFjQjd2WlU0ZUNrLWtPWnNGQmE0Ukl3&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s31de621a786544b1ad86ce6c20326529&parId=5E49627FE7EEC215%21sc09c414909a1435e810243744d9c16c1&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSfVB8fftpUEp4hM51fQh-XpLdFzpWT_fIOrn2SbroZh3bObUw/viewform", editUrl:"https://docs.google.com/forms/d/16cnPrXsiHH7sTfY3eOiXvj1dRp_C6KFFfR_6OjIMxrc/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/lobby?quizId=0c454512-61a4-4f24-8d79-8568d6699932" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=0c454512-61a4-4f24-8d79-8568d6699932&gameMode=nano" },
    ]},
    { nombre:"Movimientos y fuerzas",               cat:"fisica", icono:"imagenes/3ESO/06A - Icono.webp", fondo:"imagenes/3ESO/06C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EWKDYP8-jjlAoqIw5S1Rlt0Bbvr90LofWwoOKHXl90jO5w?e=P7tDCj" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRRGpMaEJNR0ZXWlE2TXFFRFVRSFVPVkFlSTd3XzNadWZUUFVkdng2UlUtX0NF&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s4c102ee355184399a32a1035101d4395&parId=5E49627FE7EEC215%21sc09c414909a1435e810243744d9c16c1&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSfL505eJ2YRTdov1gfyoMdCbzZOAiQhFFmuZ2Ae9AWtrSFn5A/viewform", editUrl:"https://docs.google.com/forms/d/10w7lE37mTo-Qy2Xh50H53COWmYhlSxRcVyua0jLmHsE/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/?quizId=6f330229-ea98-4202-8dd9-74e2f2f5b045" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=6f330229-ea98-4202-8dd9-74e2f2f5b045&gameMode=nano" },
    ]},
    { nombre:"Gravedad, electricidad y magnetismo", cat:"fisica", icono:"imagenes/3ESO/07A - Icono.webp", fondo:"imagenes/3ESO/07C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EVNgZ29CI8tEoJiAKaU03a0BWiI8Cd-9bQnkKB_IE6T46g?e=jiRLfC" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQzlUNm1Cdlp0NlRablVWYy1ZaTBKeUFjVTNNVWZ1d3p3WTB6bzJYNExWNE1J&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s81a94fbd9bbd4d7a99d455cf988b4272&parId=5E49627FE7EEC215%21sc09c414909a1435e810243744d9c16c1&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSeaPlLLpBAsQ_bS6WuY23GFAWUzQtGlPL_5l6O08Cv8HM6EUw/viewform", editUrl:"https://docs.google.com/forms/d/1qlAq_lUk2XBcb6UtjhAszuduuhs0xWwo5Aout84-pUM/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/?quizId=fd713e87-24a3-409c-80a8-f64d59dc0ada" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=fd713e87-24a3-409c-80a8-f64d59dc0ada&gameMode=nano" },
    ]},
    { nombre:"Energía",                             cat:"fisica", icono:"imagenes/3ESO/08A - Icono.webp", fondo:"imagenes/3ESO/08C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/Ef_OIHQBKzNGms6P4kQw7OEBrB9YNPHmSFVXgOhxKiOHQw?e=GO3rlJ" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSeg36ooE-UUWPQ1v04QrBJ-Vbfh5hvj_e_-6yWHjWX1LB-DBA/viewform", editUrl:"https://docs.google.com/forms/d/1RNt_H0rgTzO_wl0bHB4fy7C2_Cz8Yx1mnBa3f13gIk0/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/?quizId=11ed8053-dfac-45bc-a409-544a848bca36" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=11ed8053-dfac-45bc-a409-544a848bca36&gameMode=nano" },
    ]},
  ]},

  "4eso": { label:"4º ESO - Física y Química", temas:[
    { nombre:"Método científico",              cat:"metodo", icono:"imagenes/4ESO/01A - Icono.webp", fondo:"imagenes/4ESO/01C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/Ea1nDthNjGRNjb_geDzy8WABPMSrqrfrIqwAJNMF1PsJkw?e=X7knc2" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQjlWMlE0SkpJOVQ3MzQ4dThIRFhFbkFVZXRLY1dfWURGWHFmZ1FycTQ3Nl9n&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s3864577d92244f3dbdf8f2ef070d7127&parId=5E49627FE7EEC215%21s3d93976c770749d29c517ea4591aba88&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSdKZb7neSAgZqdr8fjzSOFXYq2iipmAvLyNKJrYwGLOtxIYvw/viewform", editUrl:"https://docs.google.com/forms/d/14xmEshUdMpGbsWrJO3b8grT_htDF50kEteiXKqC1rb0/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/?quizId=fe7112f9-9267-4c01-825b-4a9db5f223d1" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=fe7112f9-9267-4c01-825b-4a9db5f223d1&gameMode=nano" },
    ]},
    { nombre:"El átomo y la tabla periódica",  cat:"quimica", icono:"imagenes/4ESO/02A - Icono.webp", fondo:"imagenes/4ESO/02C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EYF0XCA4Mz9NoY2RRjotT4YBB_1g8vcf7q1V19ybeOeJpw?e=NRqmcJ" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRRGJkUGFBQ192MFRibW5EVmFDQlFQeUFWT3lFOTA5U1RDNkJuLVR1Ulp4WGMw&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s80f674dbfb0b4df4b9a70d56820503f2&parId=5E49627FE7EEC215%21s3d93976c770749d29c517ea4591aba88&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLScc2aJIk0C7tSHC4IYWFtp510Sogv6y-v0BngsR7KxZDcJOOg/viewform", editUrl:"https://docs.google.com/forms/d/1TAEzw4sHHFKi327ygU-j5u7-9WVIdHRlz5XWR_6dsJQ/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/#/?quizId=262659f9-539f-4c77-abd9-af9f2985e22e" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=262659f9-539f-4c77-abd9-af9f2985e22e&gameMode=nano" },
    ]},
    { nombre:"Enlace químico",                 cat:"quimica", icono:"imagenes/4ESO/03A - Icono.webp", fondo:"imagenes/4ESO/03C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EVlxrPqHoMNMgj0Yn7Bnsi8B7IXkyIbz_fFdXO5V0immRQ?e=FrhQnR" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLScQzDiBV7mhHUFUDdQF7JqWg1NF1r2-ka1Yk5bUQgH792_3HA/viewform", editUrl:"https://docs.google.com/forms/d/1XKIuhjD9M87WfkZyHVyAD0ONaItTSyHa5JpdTW_Hn5k/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/#/?quizId=673063a7-e660-4266-83b8-c7ba223e2a54" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=673063a7-e660-4266-83b8-c7ba223e2a54&gameMode=nano" },
    ]},
    { nombre:"Compuestos del carbono",         cat:"quimica", icono:"imagenes/4ESO/04A - Icono.webp", fondo:"imagenes/4ESO/04C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/ESc3FRREZ2NPjraS8NO3T38BzFiouL6rjBghWzZapeqXVQ?e=uO7sY5" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSfgwNEXCNh6FFvD80LxDSSz9hKlYQ4aaWj-zNy2O1VZ9ZbnvQ/viewform", editUrl:"https://docs.google.com/forms/d/1w7YlZznQnVsQdkNe58aPi2iEv96WxmZ5VPqA-TC7Hd0/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/*?quizId=e519edf6-01f1-43ac-b6bb-26c529308b23" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=e519edf6-01f1-43ac-b6bb-26c529308b23&gameMode=nano" },
    ]},
    { nombre:"Formulación inorgánica",         cat:"quimica", icono:"imagenes/4ESO/05A - Icono.webp", fondo:"imagenes/4ESO/05C - Imagen.webp", enlaces:[
      { label:"Presentación online",     tipo:"online",      url:"https://1drv.ms/b/c/5e49627fe7eec215/EQEEsVM0ECZJqK9nCXYqtksBs2ybboq0fEXy00IcOD8B3g?e=9yXWh6" },
      { label:"Cuestionario inorgánica",tipo:"formulacion", url:"https://sites.google.com/view/cuest-form-inorg/", editUrl:"https://drive.google.com/drive/u/1/folders/1ZmfUuTCnn0y3m3kPf_m6W-SzPNCvACFS" },
      { label:"Kahoot en grupo",         tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/?quizId=069e3cd8-837f-4115-9f08-768956bbe356" },
      { label:"Kahoot en solitario",     tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=069e3cd8-837f-4115-9f08-768956bbe356&gameMode=nano" },
    ]},
    { nombre:"Reacciones químicas",            cat:"quimica", icono:"imagenes/4ESO/06A - Icono.webp", fondo:"imagenes/4ESO/06C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://onedrive.live.com/?id=5E49627FE7EEC215%21s0354274a1333440fa0deeba06d24507f&cid=5E49627FE7EEC215&redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQktKMVFETXhNUFJLRGU2NkJ0SkZCX0FlRUFERDNLckxCYmkzb3RzcDV6S0VJ&parId=5E49627FE7EEC215%21s294bdad391d14c9481d7578f51996b40&o=OneUp" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQlpoODFtbkF3NVJwNC12b2lfLVdSMEFlWEVqU2UxTGZNNUUxLTN4RmN5a3lV&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s66cd87590c9c46399e3ebe88bff96474&parId=5E49627FE7EEC215%21s3d93976c770749d29c517ea4591aba88&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSeMhQ2wP-dUbf7C8LBpNBkUgszWYd7Xl346zIgqmqJ5oC3Omg/viewform", editUrl:"https://docs.google.com/forms/d/1w7YlZznQnVsQdkNe58aPi2iEv96WxmZ5VPqA-TC7Hd0/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/#/?quizId=2edb4ded-30b7-4616-869a-6c78e6583838" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=2edb4ded-30b7-4616-869a-6c78e6583838&gameMode=nano" },
    ]},
    { nombre:"Reacciones químicas de interés", cat:"quimica", icono:"imagenes/4ESO/07A - Icono.webp", fondo:"imagenes/4ESO/07C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EZRubu9_YpxJr9avjFDWzVkBv_887xQY1kj-0V0BO-JTKQ?e=3uOLsO" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQjFnaFpGcVd4TlJyRWI0NWk0X3lNM0FhY3NKcFdTTEtFWDBEaTJXbTVmVHE0&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s451682756ca9464db11be398b8ff2337&parId=5E49627FE7EEC215%21s3d93976c770749d29c517ea4591aba88&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSdpz4zMXVif_6I327EMA7P-Z8t7E0XSVNRzw6KPWqY2Yt0zwg/viewform", editUrl:"https://docs.google.com/forms/d/1S7yKivEWwwPoAZgRLyinnTzE5G0wIUaxho4ohHVKsKs/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/#/?quizId=1f760d8c-bc60-431a-920c-4e498e81f026" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=1f760d8c-bc60-431a-920c-4e498e81f026&gameMode=nano" },
    ]},
    { nombre:"Cinética",                       cat:"fisica", icono:"imagenes/4ESO/08A - Icono.webp", fondo:"imagenes/4ESO/08C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EfuWk-gZWcFDt0DYJE03ImAB0ViFvLN4G6F4zDwAGn5tfQ?e=ofEPdv" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQkcxd2JuUXBBLVFySzRkQ29lUDZ2aUFWRnlOUmRkR2dTTUlLckE5LWZtLVM0&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21se706d7469042423eb2b8742a1e3fabe2&parId=5E49627FE7EEC215%21s3d93976c770749d29c517ea4591aba88&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLScCzBYjtkDxcQuHhrseTdRzxQy2eOOigohZRjyy0h_ik3hNJg/viewform", editUrl:"https://docs.google.com/forms/d/1zD2AObEsI-02OSPmHhTmDBYNxdXGcm_BEuA9pOf1Azo/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/#/?quizId=00c1fb03-9ccd-4cfd-8245-a0554910ae0f" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=00c1fb03-9ccd-4cfd-8245-a0554910ae0f&gameMode=nano" },
    ]},
    { nombre:"Leyes de Newton",                cat:"fisica", icono:"imagenes/4ESO/09A - Icono.webp", fondo:"imagenes/4ESO/09C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EYsICcyqEmxKgcXecLl_acwBsgdA3cGr1eNzyoXLjkqpag?e=R2m39a" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRRGRQcjFoTVdIZ1FZTWhVNEhVZ2JFd0FVYXQ0YWFNeVVSLTNpWE1UcElOT3RB&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s61bd3edd613141e083215381d481b130&parId=5E49627FE7EEC215%21s3d93976c770749d29c517ea4591aba88&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSe3ZjBx5XcthaBqYmtXH1lv8pV5R5BJuDjL76gUIQfkmy3Pug/viewform", editUrl:"https://docs.google.com/forms/d/1Ri0VLInhc2dImBZRh3w7lW73rI2lvONO-2MQ-gyJ6as/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/#/?quizId=32cea81e-721a-4f4f-948c-ced8ee7b0a38" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=32cea81e-721a-4f4f-948c-ced8ee7b0a38&gameMode=nano" },
    ]},
    { nombre:"Fuerzas en el universo",         cat:"fisica", icono:"imagenes/4ESO/10A - Icono.webp", fondo:"imagenes/4ESO/10C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EXen6v6Sc5hMtH05yNPEJQYBU88jUvr6H2lwIOY3Y-c1vQ?e=NofVq8" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQmdfc1FIVmx4dVJZWEZISU1zUnd2WkFZUmVacHFkdXgxMXF5REIwNjJvWTJz&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s07c4fe605c56456e85c51c832c470bd9&parId=5E49627FE7EEC215%21s3d93976c770749d29c517ea4591aba88&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSdNyRxsNlsBEb9j-SyZ4thpXHjFmT9ILvBygU2JIDuQzP9dJg/viewform", editUrl:"https://docs.google.com/forms/d/1CPCBHapbxrECR9q5xGJIGyHcmzO8C8n0N5Io5NGq7Wc/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/#/?quizId=9b09e178-a54e-4c4f-b9df-379fd5e71123" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=9b09e178-a54e-4c4f-b9df-379fd5e71123&gameMode=nano" },
    ]},
    { nombre:"Fuerzas en fluidos",             cat:"fisica", icono:"imagenes/4ESO/11A - Icono.webp", fondo:"imagenes/4ESO/11C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/Ec5BX7biF2lMg6MWsTi-ODUBngzNduc0H9C-eoqqjeZaiw?e=JaJtFz" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQUYzU0VManhZZ1Q1Zkk2NHFGS3E4REFYdXNIVWdGMmluYlR3REowQXhkYnNn&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s0b21dd05168f4f2097c8eb8a852aaf03&parId=5E49627FE7EEC215%21s3d93976c770749d29c517ea4591aba88&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSdqIgxbojpO8tuAMJP2lrfQX0MHJJAWawn1lRvBPE1Gara_MA/viewform", editUrl:"https://docs.google.com/forms/d/1RgBagPKWlReQzlzMW_SkbiLkb_yfdO2ja-3z-tbjsI8/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/#/?quizId=df2d6c91-a842-4f70-ae5a-fc621fbb2930" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=df2d6c91-a842-4f70-ae5a-fc621fbb2930&gameMode=nano" },
    ]},
    { nombre:"Energía mecánica y trabajo",     cat:"fisica", icono:"imagenes/4ESO/12A - Icono.webp", fondo:"imagenes/4ESO/12C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EZ8fzUyFkXBOmiGIrzNnT8oBve5p7bKkiiROSXpSUqEuIQ?e=CwIk6Y" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQ2MwZlRFTndZZFQ2VDJoUGNaT0pQZ0FRNXEydGRUOTJJdVZ5d2QwMldiR3Zn&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21sc4f4d19c06374f1da4f684f7193893e0&parId=5E49627FE7EEC215%21s3d93976c770749d29c517ea4591aba88&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSf31Q3wGvltCKBSRUkteP1MNs9KoZcrwzvoc4RLTQxlLgDPiQ/viewform", editUrl:"https://docs.google.com/forms/d/1O9L7Cqfj-WhnwaONRYzVJJTv4cmSy3-AGY0XADb1xtM/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/#/?quizId=28ac3226-b10d-4b1d-b49c-5c112c608af8" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=28ac3226-b10d-4b1d-b49c-5c112c608af8&gameMode=nano" },
    ]},
    { nombre:"Energía térmica y calor",        cat:"fisica", icono:"imagenes/4ESO/13A - Icono.webp", fondo:"imagenes/4ESO/13C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/Efr6zo1uN0BHnhszNUiZLlABoMtu9nGrXxqkkp-XRnKX-Q?e=aIijMb" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRRG13Tk5MWEV0ZVRJR1ZfRVJiSjU5bkFXMEh2cnJUM2Z2NTYyR0d5d0FSVXNv&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s4bd3c0e64b5c4c5e8195fc445b279f67&parId=5E49627FE7EEC215%21s3d93976c770749d29c517ea4591aba88&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLScgm16fVYFhgDQNyrK81x3KWF34cLTTpSHmm6ProizKJKmO6w/viewform", editUrl:"https://docs.google.com/forms/d/1ZUPhPeAcZ_FuMKBhiX0vOQmCc_IBz6hpR9T99oyEcn0/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/?quizId=852d6dff-3251-40fa-9fe5-5a5be9578b18" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=852d6dff-3251-40fa-9fe5-5a5be9578b18&gameMode=nano" },
    ]},
  ]},

  "1bach": { label:"1º Bachillerato - Física y Química", temas:[
    { nombre:"Método científico", cat:"metodo", icono:"imagenes/1BACH/01A - Icono.webp", fondo:"imagenes/1BACH/01C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0Vaam5vRmpIa2JsRG1iTWgyQks1LUdZQnZxZ3R6amJZdGRDdFo4bWpzdm1EVmc%5FZT1CQ09PVlM&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s58a0e79891c743b999b321d812b9f866&parId=5E49627FE7EEC215%21sce87da85e83e4409aa7d803e7ffb10b8&o=OneUp" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRRFo4UmJpQUlWS1Q2MkpLVW80TDA3T0FUY0FHVUV2VkYwdDlrWGwxMFo3cHVn&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21se216f1d985004f4aad89294a382f4ece&parId=5E49627FE7EEC215%21s9a281db4d51c4d44bf7f92af4a2ed480&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSeXe-iU0uprmBt2K3sOzbJPHCPQZlUEfI7RwoWbKsWVn7II-Q/viewform", editUrl:"https://docs.google.com/forms/d/1_VV5_j3sP7ww0Gj7_fG6Vb2X8_84D7pvJsp-Y69gMl4/edit" },
      { label:"Kahoot en grupo",    tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/intro?quizId=a7283634-981b-462e-80c5-72871ddccb74" },
      { label:"Kahoot en solitario",tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=a7283634-981b-462e-80c5-72871ddccb74&gameMode=nano" },
    ]},
    { nombre:"Formulación inorgánica", cat:"quimica", icono:"imagenes/1BACH/02A - Icono.webp", fondo:"imagenes/1BACH/02C - Imagen.webp", enlaces:[
      { label:"Presentación online",     tipo:"online",      url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0VUOXExaDdrWjd4Qm5RbVY0cUhiXzJnQnJuWi1ELVN4SkRtNjRuTTlaay1HQnc%5FZT1uU2c1aFk&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s1ed66a3f67e441bc9d0995e2a1dbff68&parId=5E49627FE7EEC215%21sce87da85e83e4409aa7d803e7ffb10b8&o=OneUp" },
      { label:"Cuestionario inorgánica",tipo:"formulacion", url:"https://sites.google.com/view/cuest-form-inorg/", editUrl:"https://drive.google.com/drive/u/1/folders/1ZmfUuTCnn0y3m3kPf_m6W-SzPNCvACFS" },
      { label:"Kahoot en grupo",         tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/intro?quizId=7e3ca6b4-c3c4-4370-8e8b-ea49fca07466" },
      { label:"Kahoot en solitario",     tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=7e3ca6b4-c3c4-4370-8e8b-ea49fca07466&gameMode=nano" },
    ]},
    { nombre:"Formulación orgánica", cat:"quimica", icono:"imagenes/1BACH/03A - Icono.webp", fondo:"imagenes/1BACH/03C - Imagen.webp", enlaces:[
      { label:"Presentación online",     tipo:"online",      url:"https://1drv.ms/b/c/5e49627fe7eec215/EYmFQPfdx99Dism6krpkRR0BRr2uFn1zhyVVBTzJ9JrNpQ?e=NJBgPs" },
      { label:"Cuestionario orgánica",tipo:"formulacion", url:"https://sites.google.com/view/cuest-form-org/", editUrl:"https://drive.google.com/drive/u/1/folders/1KCV8G7KE8gT31khT-IWJL7h9klEpKZXr" },
      { label:"Kahoot en grupo",         tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/intro?quizId=c5040bac-2e40-41a4-b798-6a5d6e93b68d" },
      { label:"Kahoot en solitario",     tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=c5040bac-2e40-41a4-b798-6a5d6e93b68d&gameMode=nano" },
    ]},
    { nombre:"Estructura de la materia", cat:"quimica", icono:"imagenes/1BACH/04A - Icono.webp", fondo:"imagenes/1BACH/04C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQTRvZ3RfbGN5blM2NXpjN2F1eGRIb0FRbFIyUnFDTkUxSTFjZzJFWHNzUVk0&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s7f0ba238cc954ba7ae7373b6aec5d1e8&parId=5E49627FE7EEC215%21sce87da85e83e4409aa7d803e7ffb10b8&o=OneUp" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRRE5IWHcwcE5fclJwbkVTbjhvWnRDU0FlWEtmSWQtMlNJZGZCNU9seWJiRHVV&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s347c1dcddfa446eb99c44a7f2866d092&parId=5E49627FE7EEC215%21s9a281db4d51c4d44bf7f92af4a2ed480&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSdidctnPpA-Xh5UOH9vpRKqM0Q_wETyb1Ezha7krNcpFZtysg/viewform", editUrl:"https://docs.google.com/forms/d/1TomyQzMkbL2y-yrJEkzYmski70GTHkNvrCm_nGb_Cug/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/lobby?quizId=8ee2b558-6218-4850-8370-0a897b1973eb" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=8ee2b558-6218-4850-8370-0a897b1973eb&gameMode=nano" },
    ]},
    { nombre:"Gases y disoluciones", cat:"quimica", icono:"imagenes/1BACH/05A - Icono.webp", fondo:"imagenes/1BACH/05C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQjkwRXVHZ2VVN1E0ODhpaVJKQ3U5S0FiR1BCTlhkSUpBTmVkaXpLanBYZ1AwP2U9MDhTaGg4&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s864bd07de581433b8f3c8a24490aef4a&parId=5E49627FE7EEC215%21sce87da85e83e4409aa7d803e7ffb10b8&o=OneUp" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQW0tZUhWLVIzZ1RxeVYwYmRCbGFJVkFZT2hGUzVOYlBUNHhiMnRaYXZQbWg4&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21sd5e1f9261df94ee0ac95d1b74195a215&parId=5E49627FE7EEC215%21s9a281db4d51c4d44bf7f92af4a2ed480&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSedrpTEERAVMacyqnXN9gKVDyVftMvbb2M0GhrHGMTiZTX4xQ/viewform", editUrl:"https://docs.google.com/forms/d/1wr_iZF1-vSElKlrwEhsLE0SWK41aBtLOAF7OhZDZ0ro/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/intro?quizId=306223a8-6df7-49dd-8804-e265c42b5e9d" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=306223a8-6df7-49dd-8804-e265c42b5e9d&gameMode=nano" },
    ]},
    { nombre:"Reacciones químicas", cat:"quimica", icono:"imagenes/1BACH/06A - Icono.webp", fondo:"imagenes/1BACH/06C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0VjVVdNZnZhV3h0SXBxdlRvMzZOdXRvQkpDY2x6QllwTkxDTkRsdENEdjMxWXc%5FZT0wZXU1aWQ&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21sfb3116c55bda481ba6abd3a37e8dbada&parId=5E49627FE7EEC215%21sce87da85e83e4409aa7d803e7ffb10b8&o=OneUp" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQzczRVVZeEZyZlJiUS1UTEk0ZjNSOUFTVHliOFFNd1l4YkRfVlp1bW5jckY0&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s1845dcbb5ac445dfb43e4cb2387f747d&parId=5E49627FE7EEC215%21s9a281db4d51c4d44bf7f92af4a2ed480&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSce9dr8NODx9yhelhxjW02VlY0qJoSUDNHj7Z-KIobFnMm3mQ/viewform", editUrl:"https://docs.google.com/forms/d/10OSZ8T0Z9IXFbA3uBW10Eu9TeEH49HFmTpbeVW9vT18/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/lobby?quizId=9411a722-0b80-4369-891d-b311d7b32af5" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=9411a722-0b80-4369-891d-b311d7b32af5&gameMode=nano" },
    ]},
    { nombre:"Termodinámica", cat:"quimica", icono:"imagenes/1BACH/07A - Icono.webp", fondo:"imagenes/1BACH/07C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0VjTUplX3N3ejBCRWhXREdwOHFkWkdFQjlHcjNHZmRhTkE4a2ZaNXVKUTdDWGc%5FZT1WQ3JtODU&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21sfb7b09c3cf3044408560c6a7ca9d6461&parId=5E49627FE7EEC215%21sce87da85e83e4409aa7d803e7ffb10b8&o=OneUp" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQi1kTUdLdFJtelNwcXpFRUxOSkxvSEFXY2c2Y1RudXlFdXlxRGRGMFZfeWkw&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s8ac1747e19b54ab39ab31042cd24ba07&parId=5E49627FE7EEC215%21s9a281db4d51c4d44bf7f92af4a2ed480&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSf3fpSFuGqXNrm2u1bzyQHXcc3nmSKtqM_PHdh4Fl-Bp7XDnQ/viewform", editUrl:"https://docs.google.com/forms/d/10OSZ8T0Z9IXFbA3uBW10Eu9TeEH49HFmTpbeVW9vT18/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/intro?quizId=4894e8a3-b0b2-4d6e-b811-d233a39daf8a" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=4894e8a3-b0b2-4d6e-b811-d233a39daf8a&gameMode=nano" },
    ]},
    { nombre:"Química del carbono", cat:"quimica", icono:"imagenes/1BACH/08A - Icono.webp", fondo:"imagenes/1BACH/08C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0VaSUZ5aGlyWV9GRXBjS20wUHJNMjg4QmpQVk9QeVVRVExXSkwwbFM3UXZXNlE%5FZT1FQWhHbDI&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s18ca059263ab44f1a5c2a6d0faccdbcf&parId=5E49627FE7EEC215%21sce87da85e83e4409aa7d803e7ffb10b8&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSc7LW3-AmjzGxsMNJJHbm9lCvQVSkCGy139NTsFwq8Tg1fQtw/viewform", editUrl:"https://docs.google.com/forms/d/1SEn74N0xQGdDOgRcMb6-Kvx3ft5G3U7OYKpTe2dnUg0/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/intro?quizId=90bf388d-be05-4d5d-848c-c4dfe66d5825" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=90bf388d-be05-4d5d-848c-c4dfe66d5825&gameMode=nano" },
    ]},
    { nombre:"Cinética", cat:"fisica", icono:"imagenes/1BACH/09A - Icono.webp", fondo:"imagenes/1BACH/09C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0VZT0tmdW50U01KTGwxX1d2Rk44ZWVvQjlGblFwNGFiUlp5c2I3UG40UTNOWWc%5FZT14WGZybEU&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21se97e8a8348ed4bc2975fd6bc537c79ea&parId=5E49627FE7EEC215%21sce87da85e83e4409aa7d803e7ffb10b8&o=OneUp" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRRF9DVFlqZUVsWFJZVGhkR2xqLUh5MkFkTnBYVXA0Uzl6NFYwSS0wNG5FWkk4&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s233609ff4978455784e1746963f87cb6&parId=5E49627FE7EEC215%21s9a281db4d51c4d44bf7f92af4a2ed480&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSeFTiAX80OMP61oCtaBoQKTFCxoPbqZ5YKQ3wZlqEuUO-8ReA/viewform", editUrl:"https://docs.google.com/forms/d/11mH_9aMAx9vcJvIBKorScR_xBE-kbU7rdayHMEEeFJQ/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/intro?quizId=2b4907f0-8c72-4bd7-ab3d-6e06db9eb135" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=2b4907f0-8c72-4bd7-ab3d-6e06db9eb135&gameMode=nano" },
    ]},
    { nombre:"Dinámica", cat:"fisica", icono:"imagenes/1BACH/10A - Icono.webp", fondo:"imagenes/1BACH/10C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0VlcG9HMF9YVlUxRHJISzdHaXpJSUNzQlZWZE5IcHd1NHMxdWNEZU5oVG80RVE%5FZT0xOHllblM&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s4f1b68ea55d7434dac72bb1a2cc8202b&parId=5E49627FE7EEC215%21sce87da85e83e4409aa7d803e7ffb10b8&o=OneUp" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRRHdLUW5Ob2tDOFNKelFnSVZ5MjVsMkFZZ202b3huaDBPMUdLdkIwX3JVQnFB&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21scd0929f040a248bc9cd0808572db9976&parId=5E49627FE7EEC215%21s9a281db4d51c4d44bf7f92af4a2ed480&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSdbz7UDayDh4uwRfFWczMOTyArNsroUFs6VneWRZiIAk5eB2w/viewform", editUrl:"https://docs.google.com/forms/d/1B0jHnrAmdv0eOIulJ3-9ikW5XnTHmyrC2vKeMeXt-j8/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/intro?quizId=2d420ff6-586a-4642-8203-bcd28369e9b9" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=2d420ff6-586a-4642-8203-bcd28369e9b9&gameMode=nano" },
    ]},
    { nombre:"Gravedad y electrostática", cat:"fisica", icono:"imagenes/1BACH/11A - Icono.webp", fondo:"imagenes/1BACH/11C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0VXbUFnaE1ydU1CTWlqZkpnOTl6T0x3QlpEZHVGb2RFb2x0Y2hOWDBfLWd4aWc%5FZT1RZGxIek4&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s13828069b82b4cc08a37c983df7338bc&parId=5E49627FE7EEC215%21sce87da85e83e4409aa7d803e7ffb10b8&o=OneUp" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQV9RcDMyWlFleVFZTlV4aXVIOHJyRkFYTjYtemN5ZU5mV2JoR0xXQVB4Vndj&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21sf69d423f076541b28354c62b87f2bac5&parId=5E49627FE7EEC215%21s9a281db4d51c4d44bf7f92af4a2ed480&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSfUD497hspoeF9D1cuMoObkFoyFm0ZCI6GEKTuxQ8R7g5mOhA/viewform", editUrl:"https://docs.google.com/forms/d/1WLUbJLvYdzGDwgnEBIV6WaEmqd2Ct6rBSny-2AVHtvc/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/lobby?quizId=9d7da485-9d61-4409-a4c4-dc937a35bf03" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=9d7da485-9d61-4409-a4c4-dc937a35bf03&gameMode=nano" },
    ]},
    { nombre:"Energía mecánica", cat:"fisica", icono:"imagenes/1BACH/12A - Icono.webp", fondo:"imagenes/1BACH/12C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0VkRmJxTTc5Nk5WSmhrejQyYlMtN1dNQkhWTEthNVdyaHhsLUNCSTVvODc4UWc%5FZT1FUWhxckw&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21scea85bd1e8fd49d5864cf8d9b4beed63&parId=5E49627FE7EEC215%21sce87da85e83e4409aa7d803e7ffb10b8&o=OneUp" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRRFNNdUhXSGJISlQ2Rjg2U1pJcVowRUFYemUyODVmdDZjZWFHNUstcW1RbU9N&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21sd6e132d2b11d4fc9a17ce92648a99d04&parId=5E49627FE7EEC215%21s9a281db4d51c4d44bf7f92af4a2ed480&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLScS9-H8ER1wLLWNqGVvpQEmmuZEIq0XtzT_T0CBpd_IgKPM0w/viewform", editUrl:"https://docs.google.com/forms/d/1u_xoh6fNr8ja1fdet0ZKlflmUycsw1UJO2J5EOhTp3o/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/lobby?quizId=eb11d62e-62f6-46df-9bdf-8123920ac543" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=eb11d62e-62f6-46df-9bdf-8123920ac543&gameMode=nano" },
    ]},
  ]},

  "2bachF": { label:"2º Bachillerato - Física", temas:[
    { nombre:"Método científico",           cat:"metodo", icono:"imagenes/2BACHF/01A - Icono.webp", fondo:"imagenes/2BACHF/01C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQ3E2NkwwM3J6UVM2TnJZTVVxNWIyaUFaT3RWaFRCNWNfNGVWRllPbzgyZVBr&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21sf4a2ebaabcde4bd0a36b60c52ae5bda2&parId=5E49627FE7EEC215%21s482b53a283c948a29d6458ac9242ea14&o=OneUp" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQUdaSWhwZTN1RVFaTmxnam1EREUtWUFYMURJN0hRbGtLZXNxcFp1emlvdXMw&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s698864067b7b418493658239830c4f98&parId=5E49627FE7EEC215%21sd19708fc25354e609e583e7b1a8d1311&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSdaCIwxtLnNXAq7p_AzEG-6pnantqhcu9UqRzHMOeLf5l8GFg/viewform", editUrl:"https://docs.google.com/forms/d/1zqlgU6B-Vs10vAycLVkn0R_iiFOTBcN1CQCRO486g6A/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/lobby?quizId=10bb6692-b36c-48d5-a353-84612a7032dc" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=10bb6692-b36c-48d5-a353-84612a7032dc&gameMode=nano" },
    ]},
    { nombre:"Campo gravitatorio",          cat:"fisica", icono:"imagenes/2BACHF/02A - Icono.webp", fondo:"imagenes/2BACHF/02C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EVEcSp-rxnZFqE6MyTaxlHkB9foHR1NcHYIMSy6fPW-0Qg?e=jp8On9" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRRHA2RmVyLWRJSFJwNnJMYWtQOUdDS0FhN2dBT3VsQ2RNcXl5Q3pmUXBjeDlv&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21sab57e8e9d2f946079eab2da90ff4608a&parId=5E49627FE7EEC215%21sd19708fc25354e609e583e7b1a8d1311&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSesNwLOWd4SXW0D8Rna-BAUnZXLywDOnR6NowxNkdYK1jXBfw/viewform", editUrl:"https://docs.google.com/forms/d/1MLoXgYlOZcQNIbLCnJ2hIKy8FoL39udufMSiYiJ3CZA/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/intro?quizId=a0260fe3-9322-4894-b3b3-eca31e83ebd9" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=a0260fe3-9322-4894-b3b3-eca31e83ebd9&gameMode=nano" },
    ]},
    { nombre:"Campo eléctrico",             cat:"fisica", icono:"imagenes/2BACHF/03A - Icono.webp", fondo:"imagenes/2BACHF/03C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/ESngpu0e57dEifV2vt3p4JEBC03Ap59VdfBcmKtg70E8vA?e=jlszjc" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQk5SZUNXYTBNNVFxVDA3aWRITWRtNUFiS1hYRlNqQzE5UWVhdG9uUld1ZE9n&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s96e0454d436b4239a4f4ee274731d9b9&parId=5E49627FE7EEC215%21sd19708fc25354e609e583e7b1a8d1311&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSeLoXxEgZBSF-4oeHN-JpTIhtvFkvg3RsPTW6JaNA-1xVzPmw/viewform", editUrl:"https://docs.google.com/forms/d/1B0HAATMGfJIObkbgbYK9Og6C_xh-utKhpTlB4TaOeXk/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/intro?quizId=a8691e45-985e-4768-8607-f5ebb3d007b6" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=a8691e45-985e-4768-8607-f5ebb3d007b6&gameMode=nano" },
    ]},
    { nombre:"Campo magnético",             cat:"fisica", icono:"imagenes/2BACHF/04A - Icono.webp", fondo:"imagenes/2BACHF/04C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EROBx-Vv0B9Lvg7sIco05ZMBcuhTKsLqEVlwsCz_yS21-w?e=vgeIxd" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQ0ZDay1jTHkwZ1NKQXpvVFd2ZjIxUUFXZF9wV2pmZF90b0tBXzdEY0pzUG5j&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s9c4f0a852d2f48209033a135af7f6d50&parId=5E49627FE7EEC215%21sd19708fc25354e609e583e7b1a8d1311&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSdyPvUrRdnA4da1RFC8NvootEi5F6wLgX2mV4U0gbOQwXq9Vw/viewform", editUrl:"https://docs.google.com/forms/d/1MbLAvzsBXk8KgX7kkFxe5eRVv61pHLTAR6P04PTvxvw/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/intro?quizId=66af51b6-3681-465d-9750-91eb29d4e405" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=66af51b6-3681-465d-9750-91eb29d4e405&gameMode=nano" },
    ]},
    { nombre:"Inducción electromagnética",  cat:"fisica", icono:"imagenes/2BACHF/05A - Icono.webp", fondo:"imagenes/2BACHF/05C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQ0MyOUJjdGdHblNaT0JTU1d4dWY1Y0FXMzdoYy1PNEk4bEVOOVA3M1g4OUhrP2U9OGNJb1pP&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s5cd0db8201b649a793814925b1b9fe5c&parId=5E49627FE7EEC215%21s482b53a283c948a29d6458ac9242ea14&o=OneUp" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQ19jT0I1aU1OMFNZc3ZxeC1qUHI3SkFlX2dCdF9tbjZHX2ZodzBNWWpaSEw4&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s79e070bfc38849748b2fab1fa33ebec9&parId=5E49627FE7EEC215%21sd19708fc25354e609e583e7b1a8d1311&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSfOUj420NrmGfcJZU8G0ifXGnP86lYG-5jIRpl7LcXssetVHQ/viewform", editUrl:"https://docs.google.com/forms/d/1Q4nvDDnLvn3yh91aZtIfykwTUNFZ0gD--gzY425nOG8/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/lobby?quizId=f09dec56-8a20-4408-8cb6-5a5933c1742d" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=f09dec56-8a20-4408-8cb6-5a5933c1742d&gameMode=nano" },
    ]},
    { nombre:"Movimiento ondulatorio",      cat:"fisica", icono:"imagenes/2BACHF/06A - Icono.webp", fondo:"imagenes/2BACHF/06C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/IQCbp-4KaM3cR6vPOfnSPTiUASE79tYmR_TPNRBoWnNzzfI?e=hA6zoG" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQUo0ZjlvakQ0aFFxeWdiNmduTjV2YUFTU3hCRmRVSG5PMmxiU1Z4SGdkdk1F&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s68ffe1093e8c4221aca06fa827379bda&parId=5E49627FE7EEC215%21sd19708fc25354e609e583e7b1a8d1311&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSefkYP0_ArCtlQXgSc3x71X6x8df98sI1kMVir7D3uJdhPrRw/viewform", editUrl:"https://docs.google.com/forms/d/1EjvIw072YBGXm0nyTKeEBK0tV1TBznMJ4Qwta5rj0Do/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/lobby?quizId=c67d6754-f5c1-4b07-b22b-3e76566d2063" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=c67d6754-f5c1-4b07-b22b-3e76566d2063&gameMode=nano" },
    ]},
    { nombre:"Ondas sonoras",               cat:"fisica", icono:"imagenes/2BACHF/07A - Icono.webp", fondo:"imagenes/2BACHF/07C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EQa6NLxyLk1Kn80hbg4lMAkBW4EpallxIw35rSSG-rNxnw?e=l8QbS6" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQ2NrNUVvVkVaU1NxdW9seXl3dkNHS0FXNUFMVmxrYU9HOXRmMnNmUUE1QzhJ&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s2891939c46544a52aba8972cb0bc218a&parId=5E49627FE7EEC215%21sd19708fc25354e609e583e7b1a8d1311&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSfuDEwCqEtRPp7kp0wkvb72qhNEaWJRRPhiS0TuVqe8DbVdWQ/viewform", editUrl:"https://docs.google.com/forms/d/1zNH5N49NaoA7EBgQ9KwyYYCmPF1Jy-_8_UJEQOAs2WI/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/lobby?quizId=4af7f93e-76dc-44d1-a3ed-d17249afc696" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=4af7f93e-76dc-44d1-a3ed-d17249afc696&gameMode=nano" },
    ]},
    { nombre:"Ondas electromagnéticas",     cat:"fisica", icono:"imagenes/2BACHF/08A - Icono.webp", fondo:"imagenes/2BACHF/08C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/ETiB3rS75LhNnjKXCg2O_QcBcQ4Gaf6zlJvjKP_-OiOThw?e=acpGTB" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQVFJcGxrQlBoelJZeTR2b0thZFEwb0FYbXFseTVRRmZFM09qUW9fMDdrdkIw&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s64992210f80445738cb8be829a750d28&parId=5E49627FE7EEC215%21sd19708fc25354e609e583e7b1a8d1311&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSeUFZokEGqnHl1p_RejxFH55MadS9DoBPmxR2OfaUKUFwM4ig/viewform", editUrl:"https://docs.google.com/forms/d/1G-aCEz40NGedV-urdKpM-TudZ5PsczddGZxor22QA_Y/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/lobby?quizId=61592109-659a-450b-8718-d56b56e08700" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=61592109-659a-450b-8718-d56b56e08700&gameMode=nano" },
    ]},
    { nombre:"Óptica geométrica",           cat:"fisica", icono:"imagenes/2BACHF/09A - Icono.webp", fondo:"imagenes/2BACHF/09C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/IQC3eJHRs45sRq8t7eFO3gabAT-0Q3yMXz46mevqrN_KiKI" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQjN4ODBmS2I3NFJMVGwwQ2ZpWjIyb0FYZURXa3NyZWtQU051cjRPMFF1RDRB&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s1fcdc777be2944f8b4e5d027e2676da8&parId=5E49627FE7EEC215%21sd19708fc25354e609e583e7b1a8d1311&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSef-ECyhGQAwPESXa-so72uZsjpPrmPpfIjNuBrrKCRnhfumg/viewform", editUrl:"https://docs.google.com/forms/d/15WNyK75_5pN93oUsKJajgl9iruxfnFguHkRPv0HyW7o/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/lobby?quizId=81e45137-c6af-447f-9451-a3045cc9c0ef" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=81e45137-c6af-447f-9451-a3045cc9c0ef&gameMode=nano" },
    ]},
    { nombre:"Teoría de la relatividad especial", cat:"fisica", icono:"imagenes/2BACHF/10A - Icono.webp", fondo:"imagenes/2BACHF/10C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EWtOqKaz1NFIlmGTNgefbxEBXuWPuTQJLIwfKQjV2lO8Wg?e=4prcqk" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQlpWSV84WmxRMVNwcS1TT05kc2N0N0FUQS1RZzEzSEVXd2pHMjRQMnBxekhr&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21sfc8f545954664a359abe48e35db1cb7b&parId=5E49627FE7EEC215%21sd19708fc25354e609e583e7b1a8d1311&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLScSWHGRt1-QXJ1HdtZDo_Rf7Y93VEjWa2wVblij2kvDkRtOOg/viewform", editUrl:"https://docs.google.com/forms/d/1s8h2yO5RwKUhKwcza9rzA9gf2UTFCz6KzX7ULuHO81I/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/lobby?quizId=8e1e6fdb-1dd3-411b-a383-784de563fc94" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=8e1e6fdb-1dd3-411b-a383-784de563fc94&gameMode=nano" },
    ]},
    { nombre:"Mecánica cuántica",           cat:"fisica", icono:"imagenes/2BACHF/11A - Icono.webp", fondo:"imagenes/2BACHF/11C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EcV9lWENee5OuwxPAN5IalYBAyrCIC47YS3XzDib2o4-0A?e=AFRlmK" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQWJSSW9hZXpjOVFvbWh1SXBxa0JBOEFTVlFWcVVDU1VuRmVjQXdQTGZfOXJR&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s1a8a441b377b423d89a1b88a6a90103c&parId=5E49627FE7EEC215%21sd19708fc25354e609e583e7b1a8d1311&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLScks_smhoMtsnnW5d7U3112zaZxuI2jA7F7Q_07Io-2lXT8nQ/viewform", editUrl:"https://docs.google.com/forms/d/1Dl_ZyIYF0iACv1BbnDCnmidU-g7G4E6z1Ojyq834X10/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/intro?quizId=d2c3b643-8e37-45ae-9d66-5ce3b7ef8c88" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=d2c3b643-8e37-45ae-9d66-5ce3b7ef8c88&gameMode=nano" },
    ]},
    { nombre:"Física nuclear",              cat:"fisica", icono:"imagenes/2BACHF/12A - Icono.webp", fondo:"imagenes/2BACHF/12C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EUPO3WslOzJAiptQ7sp3NBcByyBL5gyr7wseqMKrdOufGA?e=7FN25W" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQTU2NV9hMEtuOFFhTWtfZHVhWUE4T0Fhdl9DdUI1WmVVQ3JMblhNR0dfbDNz&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21sda9feb39a9d041fca324fddb9a600f0e&parId=5E49627FE7EEC215%21sd19708fc25354e609e583e7b1a8d1311&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSdJI9ctmPW-Vg5LpKLZjh5erl71zMdk9gMaxBvfvSAAZsQhIw/viewform", editUrl:"https://docs.google.com/forms/d/1I9kExAXzLoN8MvIgbyfS0hnJymisHk5TcvkRT7lSR3g/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/intro?quizId=b3d53384-dd88-4799-b804-643b7a18a58b" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=b3d53384-dd88-4799-b804-643b7a18a58b&gameMode=nano" },
    ]},
    { nombre:"Física de partículas",        cat:"fisica", icono:"imagenes/2BACHF/13A - Icono.webp", fondo:"imagenes/2BACHF/13C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EWvldBr3NZNIpgzzrM9nA6ABkuldV1orGCNWNlt_wJyAdQ?e=VnyI2U" },
    ]},
  ]},

  "2bachQ": { label:"2º Bachillerato - Química", temas:[
    { nombre:"Método científico",               cat:"metodo", icono:"imagenes/2BACHQ/01A - Icono.webp", fondo:"imagenes/2BACHQ/01C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EfJSxz1h3phFrOrfj-4pFwQBjqFKXgEyKHT37aFKwv69bQ?e=DuXtfU" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRRHlORXZHZFNfZFNhdFBfeENsTHBINUFhc3lRcklHYTFMc1hhcVBYSWNPampJ&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21sc64b34f22f7549ddab4fff10a52e91f9&parId=5E49627FE7EEC215%21se6eb9fbd0ded4782be297deb6689c2f7&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSe7Z5n7SftCmwTY1vpZH7aaSg5tEhPH_K_EI19TcVfbgvv0Xw/viewform", editUrl:"https://docs.google.com/forms/d/1NQwmUOQy8J0ZV-Q4wUbmEMFHpQeSCyNqFRUsIxtbX3k/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/lobby?quizId=a195223a-f694-4719-b1a0-3a72f908d766" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=a195223a-f694-4719-b1a0-3a72f908d766&gameMode=nano" },
    ]},
    { nombre:"Formulación orgánica",            cat:"quimica", icono:"imagenes/2BACHQ/02A - Icono.webp", fondo:"imagenes/2BACHQ/02C - Imagen.webp", enlaces:[
      { label:"Presentación online",     tipo:"online",     url:"https://1drv.ms/b/c/5e49627fe7eec215/EciAubepJm5Fs9OYFkA0OosB1AxVpXrC0C2bBFxfQrl6SQ?e=0SR9Fk" },
      { label:"Cuestionario orgánica",tipo:"formulacion", url:"https://sites.google.com/view/cuest-form-org/", editUrl:"https://drive.google.com/drive/u/1/folders/1KCV8G7KE8gT31khT-IWJL7h9klEpKZXr" },
      { label:"Kahoot en grupo",         tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/intro?quizId=7d46341c-158a-4044-8723-5a610d1ff6f6" },
      { label:"Kahoot en solitario",     tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=7d46341c-158a-4044-8723-5a610d1ff6f6&gameMode=nano" },
    ]},
    { nombre:"Isomería y reacciones orgánicas", cat:"quimica", icono:"imagenes/2BACHQ/03A - Icono.webp", fondo:"imagenes/2BACHQ/03C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EUpSg_IoVERDjLQgGIU1qdIBaurbBtUXnU1hdup4mtxorA?e=mVsmAJ" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSfEvxkuYb7OdsT23JOH-Qd3fcpqJdZ_Nbfe9KQ4XC2lxT2tlg/viewform", editUrl:"https://docs.google.com/forms/d/1OqmFPYWFFf22qht71cWhi_-TppJQjIHU3AG-yhwZxeQ/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/intro?quizId=18f5f849-0f45-443a-a00b-8a1739685647" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=18f5f849-0f45-443a-a00b-8a1739685647&gameMode=nano" },
    ]},
    { nombre:"Cinética química",                cat:"quimica", icono:"imagenes/2BACHQ/04A - Icono.webp", fondo:"imagenes/2BACHQ/04C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EWjp78q9etpPrkb2hNKq7csBjIregCFmv53_3HZPZ46Evg?e=VzF67d" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRRE5mTHZUOExyOVNxc25LZzdrR0JFTEFYMi00eEZTS1VNdjh6bm9HODlRdEJv&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21sd3bb7ccdbaf04afdab272a0ee418110b&parId=5E49627FE7EEC215%21se6eb9fbd0ded4782be297deb6689c2f7&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSfmwUsoaHpROOJimwKt2Ry9g5sNmjqZ1hB9HPAR2QLjBysykg/viewform", editUrl:"https://docs.google.com/forms/d/1QIXtIF3ZZQyps17TtJGoiCxcOjbD5R_0DnnmUUnMHW0/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/intro?quizId=b0045734-ccd9-47cc-934f-08512ee7f8e7" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=b0045734-ccd9-47cc-934f-08512ee7f8e7&gameMode=nano" },
    ]},
    { nombre:"Equilibrio químico",              cat:"quimica", icono:"imagenes/2BACHQ/05A - Icono.webp", fondo:"imagenes/2BACHQ/05C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EWNrVAwsnJpArZvl69OJ9v0B9hLkGnShW5KR59GOBOHfIA?e=JJByUr" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQ3FKS1hEVHlVNVE1azd0NFhtNW9PeUFhN25tenFBZXNwcW53SHVrdThRMEN3&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21sc3a524aa254f4339993bb785e6e683b2&parId=5E49627FE7EEC215%21se6eb9fbd0ded4782be297deb6689c2f7&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLScUR5B_b9gjSpgo6IVt902lNJZksT1o0xZHxI6ZLSQrkQ4CFg/viewform", editUrl:"https://docs.google.com/forms/d/1L1ytwDonAirAVHIHjfclOI5o7b_7IvnHNdg6hiixFvY/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/intro?quizId=10c088f2-1a36-4024-80de-681c35026b10" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=10c088f2-1a36-4024-80de-681c35026b10&gameMode=nano" },
    ]},
    { nombre:"Reacciones ácido-base",           cat:"quimica", icono:"imagenes/2BACHQ/06A - Icono.webp", fondo:"imagenes/2BACHQ/06C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/ERWP2DMEVKlBgzQ1Lg0WrVwBQgzK3gXs0zJBFy-nCcVvhg?e=HuqeZG" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQVYzREt1YnVFZlJiNFVPVkxIcl9lc0FZdU9hWHpyMjF5UERic3JLRWNaSTFz&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21sae32dc15e16e451fbe143952c7aff7ac&parId=5E49627FE7EEC215%21se6eb9fbd0ded4782be297deb6689c2f7&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSeI7PiUS3PbDxn29BOB3_GHFo8ETHk_014AW7BOWb92nBP-cg/viewform", editUrl:"https://docs.google.com/forms/d/1Sj9gYQCnVHRP1-v0vd1eq6L9q9_IUcx_8ErsRV5dCQA/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/intro?quizId=408b46d4-e828-4a8d-b78f-b1cf81999dcd" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=408b46d4-e828-4a8d-b78f-b1cf81999dcd&gameMode=nano" },
    ]},
    { nombre:"Reacciones redox",                cat:"quimica", icono:"imagenes/2BACHQ/07A - Icono.webp", fondo:"imagenes/2BACHQ/07C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EZvbPcPv1klMqGwx3NkiqtsBS2bjN6L9gt9BD6HZtUO4sw?e=nGKfvW" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRQlBoeVlwN1NudVFvMXVFcUpWQzFRaUFYdF9Ja2ZkdTRLSUVTZGRreGRPMFpB&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21s2926874f29ed42ee8d6e12a2550b5422&parId=5E49627FE7EEC215%21se6eb9fbd0ded4782be297deb6689c2f7&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSecF70L15fyaaoBl245SPec6_CMaf9tCJ7EQrdHtzLfoXcXcA/viewform", editUrl:"https://docs.google.com/forms/d/1EnceJnfmrqy60hUYsBEDwu3ICrxu4gIJ52QvlZLLlyo/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/lobby?quizId=99d1beb1-fb6b-4c71-9387-449f5e4a29ca" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=99d1beb1-fb6b-4c71-9387-449f5e4a29ca&gameMode=nano" },
    ]},
    { nombre:"Estructura del átomo",            cat:"quimica", icono:"imagenes/2BACHQ/08A - Icono.webp", fondo:"imagenes/2BACHQ/08C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/EbGRBAZYDRFLpdWx7YW983MB1ILAsRSaK6bvslpA9-wweQ?e=Us8PAW" },
      { label:"Formulario", tipo:"formulario", url:"https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy81ZTQ5NjI3ZmU3ZWVjMjE1L0lRRHJJWUdpa1QtLVRKM2Jsei1VYktXYkFXbnRzdmZzdjgwSExJSE43alAxLWxZ&cid=5E49627FE7EEC215&id=5E49627FE7EEC215%21sa28121eb3f914cbe9ddb973f946ca59b&parId=5E49627FE7EEC215%21se6eb9fbd0ded4782be297deb6689c2f7&o=OneUp" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSe_D2d6kEQVY8Tc5Cwls3rY5zQi8qioQ_hHTjiB3JmPk2dx_g/viewform", editUrl:"https://docs.google.com/forms/d/1SqwFMIpLHxGIVzGrN2Nmtx9rMjqebvjvVoHbiUMSv0A/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/intro?quizId=a60a8093-89ac-40ed-bbe0-5b1b0957c9a1" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=a60a8093-89ac-40ed-bbe0-5b1b0957c9a1&gameMode=nano" },
    ]},
    { nombre:"Tabla periódica",                 cat:"quimica", icono:"imagenes/2BACHQ/09A - Icono.webp", fondo:"imagenes/2BACHQ/09C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/ERZPZOuZXKFGgyz2PYvzpR4Bd5PDVYIJVMpgLo3RWqLEqA?e=ja1h6V" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSczHMGCMhgM533idtLEkP4yqFLvTt-AiC1V5ljeGeSrogOuVw/viewform", editUrl:"https://docs.google.com/forms/d/1AvDctQfHez-nPZG8mN4yjQuidIPy3IULenShVR5bQqw/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/lobby?quizId=cd8f360c-64c8-4c2e-9954-dea33832adc0" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=cd8f360c-64c8-4c2e-9954-dea33832adc0&gameMode=nano" },
    ]},
    { nombre:"Enlace químico",                  cat:"quimica", icono:"imagenes/2BACHQ/10A - Icono.webp", fondo:"imagenes/2BACHQ/10C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/Eet6CuBmu4VDjy8U7PWUjRMBk1-wFPv-VhTw-mrVdcVfDw?e=ZbTde0" },
      { label:"Cuestionario Google", tipo:"google", url:"https://docs.google.com/forms/d/e/1FAIpQLSch0oa1dfA3KGoNjmTAVqXq16IAuiB4p8f38pLum7aL1mPzUQ/viewform", editUrl:"https://docs.google.com/forms/d/1_4FM-nhhgsMmN5gGJBQ5UCN8lTuhxriw3eAkrTTg6o4/edit" },
      { label:"Kahoot en grupo",     tipo:"kahoot_grupo", url:"https://play.kahoot.it/v2/intro?quizId=969d7dec-1790-46c6-a0cd-90c8ad21f82a" },
      { label:"Kahoot en solitario", tipo:"kahoot_solo",  url:"https://kahoot.it/solo/?quizId=969d7dec-1790-46c6-a0cd-90c8ad21f82a&gameMode=nano" },
    ]},
    { nombre:"Moléculas orgánicas",             cat:"quimica", icono:"imagenes/2BACHQ/11A - Icono.webp", fondo:"imagenes/2BACHQ/11C - Imagen.webp", enlaces:[
      { label:"Ver apuntes online", tipo:"online", url:"https://1drv.ms/b/c/5e49627fe7eec215/Ebxt_NN9RD9IvlOB154EXuIBZ7kWHk-H1EkRSD-N2wR8nw?e=jtvRvL" },
    ]},
  ]},
};

// Subtítulos por tipo
const SUBTITULOS = {
  online:       'OneDrive',
  presentacion_online: 'OneDrive',
  pdf:          'OneDrive',
  google:       'Google',
  formulacion:  'Google',
  kahoot_grupo: 'Kahoot!',
  kahoot_solo:  'Kahoot!',
  formulario:   'OneDrive',
  pasapalabra:  'OneDrive',
};


// Helper: pulso en botón de filtro
function pulsarBtn(btn) {
  btn.classList.remove('pulse');
  void btn.offsetWidth;
  btn.classList.add('pulse');
  btn.addEventListener('animationend', () => btn.classList.remove('pulse'), { once: true });
}

// Helper: anima los sidebar-btn del panel activo
function animarSidebar(panel) {
  if (!panel) return;
  panel.querySelectorAll('.sidebar-btn').forEach((btn, i) => {
    btn.classList.remove('anim-entrada');
    btn.style.removeProperty('--d');
    void btn.offsetWidth;
    btn.style.setProperty('--d', i);
    btn.classList.add('anim-entrada');
    btn.addEventListener('animationend', () => btn.classList.remove('anim-entrada'), { once: true });
  });
}

// Helper: activa un panel con animación de entrada
function activarPanel(id, _sinAnimarSidebar) {
  document.querySelectorAll('.contenedor-grande').forEach(p => {
    p.classList.remove('active', 'panel-enter');
  });
  const panel = document.getElementById(id);
  if (!panel) return panel;
  panel.classList.add('active');
  void panel.offsetWidth;
  panel.classList.add('panel-enter');
  if (!_sinAnimarSidebar) animarSidebar(panel);
  return panel;
}

function openJuegos(cursoId) {
  mostrarJuegos(cursoId);
}

function mostrarJuegos(cursoId) {
  const juegosArray = JUEGOS[cursoId] || [];
  const grid = document.getElementById('grid-'+cursoId);

  // Cambiar a tab activo
  document.querySelectorAll('.curso-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`.curso-tab[onclick*="${cursoId}"]`).classList.add('active');
  activarPanel('panel-'+cursoId);

  estadoGrids[cursoId] = 'juegos';
  grid.innerHTML = '';

  // Layout igual que mostrarSubelementos: colIzq (ficha+actividades) + imagen derecha
  const layout = document.createElement('div');
  layout.style.cssText = 'display:flex; flex-direction:row; overflow:visible; height:100%; width:100%; padding:0; box-sizing:border-box; align-items:flex-start;';

  // Columna izquierda: botón Juegos (unidad-ficha-dentro) + ficha-actividades
  const colIzq = document.createElement('div');
  colIzq.className = 'unidad-dentro-iconos';
  colIzq.style.cssText = 'flex:1; display:flex; flex-direction:column; overflow:visible; height:440px; padding:0; border:none; box-sizing:border-box; margin-right:10px;';
  colIzq.classList.add('anim-slide-izq');

  // Botón Juegos — mismo estilo que unidad-ficha-dentro
  const btnJuegos = document.createElement('button');
  btnJuegos.className = `unidad-${cursoId}-ficha unidad-ficha-dentro`;
  btnJuegos.style.cssText = 'flex-shrink:0; padding-top:15px;';
  btnJuegos.onclick = () => volverATemas(cursoId);
  const circleJ = document.createElement('div');
  circleJ.className = 'unidad-icono';
  const imgCircleJ = document.createElement('img');
  imgCircleJ.src = 'imagenes/menu/Juegos.webp';
  imgCircleJ.alt = 'Juegos';
  imgCircleJ.onerror = function() { this.style.display='none'; };
  circleJ.appendChild(imgCircleJ);
  const NOMBRES_CURSO_J = {
    '2eso':'2º ESO · Física y Química','3eso':'3º ESO · Física y Química',
    '4eso':'4º ESO · Física y Química','1bach':'1º Bachillerato · Física y Química',
    '2bachF':'2º Bachillerato · Física','2bachQ':'2º Bachillerato · Química'
  };
  const numLabelJ = document.createElement('div');
  numLabelJ.className = 'unidad-numero-texto1';
  numLabelJ.textContent = 'Juegos';
  const labelJ = document.createElement('div');
  labelJ.className = 'unidad-nombre-texto2';
  labelJ.textContent = NOMBRES_CURSO_J[cursoId] || '';
  btnJuegos.appendChild(circleJ);
  btnJuegos.appendChild(numLabelJ);
  btnJuegos.appendChild(labelJ);
  colIzq.appendChild(btnJuegos);

  // ficha-actividades con los juegos
  const subRow = document.createElement('div');
  subRow.className = 'ficha-actividades ficha-actividades--juegos';

  // Layout 3×2: col1=juego[0] enlaces, col2=juego[1] enlaces, col3=pasapalabras
  // El grid CSS rellena por filas, así que insertamos: fila1(col1[0],col2[0],col3[0]) fila2(col1[1],col2[1],col3[1])
  const col1Links = (juegosArray[0]?.enlaces || []).slice(0, 2);  // Día mundial ciencia
  const col2Links = (juegosArray[1]?.enlaces || []).slice(0, 2);  // Día de Europa
  const col3Links = juegosArray.filter(j => j.enlaces.some(e => e.tipo === 'pasapalabra'))
                               .flatMap(j => j.enlaces.filter(e => e.tipo === 'pasapalabra'))
                               .slice(0, 2);

  const maxRows = 2;
  let cellIndex = 0;

  function crearCeldaJuego(enlace, juego) {
    if (!enlace) {
      // celda vacía
      const empty = document.createElement('div');
      empty.className = `objeto-ficha color-${cursoId}`;
      empty.style.visibility = 'hidden';
      empty.style.setProperty('--d', cellIndex++);
      return empty;
    }
    const btn = document.createElement('button');
    const isKahoot = enlace.tipo.includes('kahoot');
    btn.className = `objeto-ficha anim-entrada color-${cursoId}`;
    btn.style.setProperty('--d', cellIndex++);
    btn.dataset.tipoJuego = isKahoot ? 'kahoot' : enlace.tipo;
    // editUrl: usar el del dato, o derivarlo del url para kahoot
    const jEditUrl = enlace.editUrl || (isKahoot ? (() => {
      const m = enlace.url.match(/quizId=([a-f0-9-]+)/i);
      return m ? `https://create.kahoot.it/details/${m[1]}` : null;
    })() : null);
    btn.onclick = (event) => {
      event.stopPropagation();
      if (event.ctrlKey && jEditUrl) { window.open(jEditUrl, '_blank'); return; }
      window.open(enlace.url, '_blank');
         };
    const iconSrc = ICONOS[enlace.tipo] || '';
    const oCircle = document.createElement('div');
    oCircle.className = 'objeto-icono';
    oCircle.style.position = 'relative';
    const oImg = document.createElement('img');
    oImg.src = iconSrc; oImg.alt = enlace.label || enlace.tipo;
    oImg.onerror = function() { this.style.display='none'; };
    oCircle.appendChild(oImg);
    // Overlay "Editar" (Ctrl+hover)
    if (jEditUrl) {
      const editOv = document.createElement('div');
      editOv.style.cssText = 'position:absolute;inset:0;border-radius:50%;background:rgba(0,0,0,0.72);display:flex;align-items:center;justify-content:center;color:#ffd700;font-size:0.85rem;font-family:Saira,sans-serif;font-weight:700;letter-spacing:0.05em;opacity:0;pointer-events:none;transition:opacity 0.15s;text-shadow:-0.6px -0.6px 0 #000,0.6px -0.6px 0 #000,-0.6px 0.6px 0 #000,0.6px 0.6px 0 #000;';
      editOv.textContent = 'Editar';
      oCircle.appendChild(editOv);
      btn.addEventListener('mouseenter', ev => { if (ev.ctrlKey) editOv.style.opacity = '1'; });
      btn.addEventListener('mouseleave', () => { editOv.style.opacity = '0'; });
      btn.addEventListener('mousemove', ev => { editOv.style.opacity = ev.ctrlKey ? '1' : '0'; });
      document.addEventListener('keydown', ev => { if (ev.key === 'Control' && btn.matches(':hover')) editOv.style.opacity = '1'; }, { passive:true });
      document.addEventListener('keyup', ev => { if (ev.key === 'Control') editOv.style.opacity = '0'; }, { passive:true });
    }
    const isPasapalabra = enlace.tipo === 'pasapalabra';
    const oNombre = document.createElement('div');
    oNombre.className = 'objeto-tema-texto2';
    oNombre.textContent = isKahoot ? (juego?.nombre || '') : (isPasapalabra ? enlace.label : '');
    const oTema = document.createElement('div');
    oTema.className = 'objeto-nombre-texto1';
    oTema.textContent = isPasapalabra ? 'Presentación' : (enlace.label || enlace.tipo.replace(/_/g,' '));
    btn.appendChild(oCircle); btn.appendChild(oNombre); btn.appendChild(oTema);
    return btn;
  }

  if (!juegosArray.length) {
    const emptyDiv = document.createElement('div');
    emptyDiv.style.cssText = 'text-align:center; padding:2rem; color:var(--muted); width:100%;';
    emptyDiv.innerHTML = 'Próximamente se añadirán juegos.';
    subRow.appendChild(emptyDiv);
  } else {
    for (let row = 0; row < maxRows; row++) {
      subRow.appendChild(crearCeldaJuego(col1Links[row], juegosArray[0]));
      subRow.appendChild(crearCeldaJuego(col2Links[row], juegosArray[1]));
      subRow.appendChild(crearCeldaJuego(col3Links[row], null));
    }
  }

  colIzq.appendChild(subRow);

  // Columna derecha: imagen del curso (25A - Juegos.png)
  const cursoCarpeta = { '2eso':'2ESO','3eso':'3ESO','4eso':'4ESO','1bach':'1BACH','2bachF':'2BACHF','2bachQ':'2BACHQ' }[cursoId] || cursoId.toUpperCase();
  const juegosVideoSrc = `imagenes/${cursoCarpeta}/25F - Vídeo.mp4`;
  const imagenDiv = document.createElement('div');
  imagenDiv.className = 'unidad-imagen';
  imagenDiv.style.cssText = 'overflow:hidden; padding:10px; box-sizing:border-box; height:100%; flex:0 0 660px; width:660px; margin-left:auto;';
  imagenDiv.style.opacity = '0';
  imagenDiv.style.transition = 'none';
  const imgJ = document.createElement('video');
  imgJ.src = juegosVideoSrc;
  imgJ.autoplay = true;
  imgJ.loop = true;
  imgJ.muted = true;
  imgJ.playsInline = true;
  imgJ.style.cssText = 'width:100%; height:100%; object-fit:cover; border:1px solid #999999; border-radius:10px; box-sizing:border-box; display:block;';
  imgJ.onerror = function() { this.style.display='none'; };
  imagenDiv.appendChild(imgJ);

  layout.appendChild(colIzq);
  layout.appendChild(imagenDiv);
  grid.appendChild(layout);

  // Activar clase en-unidad para mostrar botón volver en sidebar
  document.body.classList.add('en-unidad');

  // Fade-in imagen
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      imagenDiv.style.transition = 'opacity 0.25s ease';
      imagenDiv.style.opacity = '1';
      imagenDiv.classList.add('anim-slide-der');
    });
  });

  // Override grid style
  grid.style.display = 'block';
  grid.style.gridTemplateColumns = '';

  // Rueda del ratón para navegar entre cursos con juegos
  if (!grid._juegoWheelAdded) {
    grid._juegoWheelAdded = true;
    grid.addEventListener('wheel', (e) => {
      if (estadoGrids[cursoId] !== 'juegos') return;
      e.preventDefault();
      const idx = _JUEGOS_ORDEN.indexOf(cursoId);
      const next = e.deltaY > 0 ? _JUEGOS_ORDEN[idx + 1] : _JUEGOS_ORDEN[idx - 1];
      if (next) openJuegos(next);
    }, { passive: false });
  }

  // Cambiar botones de filtro de la barra interna a: Kahoot / Pasapalabra / Otros juegos
  const panelJ = document.getElementById('panel-'+cursoId);
  if (panelJ) {
    const filterGroupJ = panelJ.querySelector('.barra-interna .control-group [data-filter="metodo"]')?.closest('.control-group')
                      || panelJ.querySelector('.barra-interna .control-group [data-col-filter]')?.closest('.control-group');
    // Ocultar grupo TEMARIO si existe (solo algunos cursos como 3eso lo tienen)
    const temarioGroupJ = panelJ.querySelector('.barra-interna .control-group [data-sort]')?.closest('.control-group');
    if (temarioGroupJ) temarioGroupJ.style.display = 'none';

    if (filterGroupJ && filterGroupJ.dataset.modoJuegos !== '1') {
      if (!filterGroupJ.dataset.modoUnidad) {
        // guardar original si no lo hizo mostrarSubelementos
        filterGroupJ.dataset.originalHtml = filterGroupJ.innerHTML;
      }
      filterGroupJ.dataset.modoJuegos = '1';
      const _jItems = JUEGOS[cursoId] || [];
      const _tieneKahoot = _jItems.some(j => j.enlaces.some(e => e.tipo === 'kahoot_grupo' || e.tipo === 'kahoot_solo'));
      const _tienePasapalabra = _jItems.some(j => j.enlaces.some(e => e.tipo === 'pasapalabra'));
      const _tieneOtros = _jItems.some(j => j.enlaces.some(e => e.tipo !== 'kahoot_grupo' && e.tipo !== 'kahoot_solo' && e.tipo !== 'pasapalabra'));
      const _sinFiltro = (tipo) => !(_tieneKahoot && tipo==='kahoot' || _tienePasapalabra && tipo==='pasapalabra' || _tieneOtros && tipo==='otros');
      filterGroupJ.innerHTML = `
        <span class="control-label">FILTRO:</span>
        <button class="control-btn control-btn-filter${_tieneKahoot ? ' active' : ' col-filtro-off'}" data-juego-filter="kahoot" ${_tieneKahoot ? `onclick="filtrarTipoJuego(this,'kahoot','${cursoId}')"` : 'disabled'}><img src="imagenes/menu/Kahoot Grupo.webp" alt=""><span>Kahoot</span></button>
        <button class="control-btn control-btn-filter${_tienePasapalabra ? ' active' : ' col-filtro-off'}" data-juego-filter="pasapalabra" ${_tienePasapalabra ? `onclick="filtrarTipoJuego(this,'pasapalabra','${cursoId}')"` : 'disabled'}><img src="imagenes/menu/Pasapalabra.webp" alt=""><span>Pasapalabra</span></button>
        <button class="control-btn control-btn-filter${_tieneOtros ? ' active' : ' col-filtro-off'}" data-juego-filter="otros" ${_tieneOtros ? `onclick="filtrarTipoJuego(this,'otros','${cursoId}')"` : 'disabled'}><img src="imagenes/menu/Juegos.webp" alt=""><span>Otros juegos</span></button>
      `;
    }

    // Añadir o actualizar grupos PÁGINA y flechas en la barra interna
    const barraJ = panelJ.querySelector('.barra-interna');
    if (barraJ) {
      // Ocultar grupos UNIDAD, flechas-unidad y grupos estáticos PÁGINA/flechas-curso
      const unidadPagEl = barraJ.querySelector('[id^="unidad-pagina-"]');
      const unidadFlechasEl = barraJ.querySelector('[id^="unidad-flechas-"]');
      const cursoPagEl = barraJ.querySelector('[id^="curso-pagina-group-"]');
      const cursoFlechasEl = barraJ.querySelector('[id^="curso-flechas-group-"]');
      if (unidadPagEl) { unidadPagEl.style.visibility = 'hidden'; }
      if (unidadFlechasEl) unidadFlechasEl.style.visibility = 'hidden';
      if (cursoPagEl) cursoPagEl.style.visibility = 'hidden';
      if (cursoFlechasEl) cursoFlechasEl.style.visibility = 'hidden';
      const _jIdx = _JUEGOS_ORDEN.indexOf(cursoId) >= 0 ? _JUEGOS_ORDEN.indexOf(cursoId) : 0;
      const _jTotal = _JUEGOS_ORDEN.length;
      const prevC = _jIdx > 0 ? _JUEGOS_ORDEN[_jIdx - 1] : null;
      const nextC = _jIdx < _jTotal - 1 ? _JUEGOS_ORDEN[_jIdx + 1] : null;

      let grupoInfo = barraJ.querySelector('#juegos-curso-group');
      if (!grupoInfo) {
        grupoInfo = document.createElement('div');
        grupoInfo.className = 'control-group';
        grupoInfo.id = 'juegos-curso-group';
        grupoInfo.style.cssText = 'left:1075px;';
        barraJ.appendChild(grupoInfo);
      }
      grupoInfo.innerHTML = `<span class="control-label">PÁGINA:</span><span id="juegos-pagina-info" class="pagination-info" style="display:flex;gap:0.5rem;align-items:center;color:#ffffff;white-space:nowrap;">${_jIdx+1} / ${_jTotal}</span>`;

      let grupoFlechas = barraJ.querySelector('#juegos-flechas-group');
      if (!grupoFlechas) {
        grupoFlechas = document.createElement('div');
        grupoFlechas.className = 'control-group';
        grupoFlechas.id = 'juegos-flechas-group';
        grupoFlechas.style.cssText = 'left:1200px;';
        barraJ.appendChild(grupoFlechas);
      }
      grupoFlechas.innerHTML = `
        <button class="pagination-btn" title="Curso anterior" style="width:32px;height:32px;padding:0;" ${!prevC?'disabled':''} ${prevC?`onclick="openJuegos('${prevC}')"`:''}>
          <img src="imagenes/menu/Anterior.webp" alt="Anterior" style="width:100%;height:100%;object-fit:contain;">
        </button>
        <button class="pagination-btn" title="Curso siguiente" style="width:32px;height:32px;padding:0;" ${!nextC?'disabled':''} ${nextC?`onclick="openJuegos('${nextC}')"`:''}>
          <img src="imagenes/menu/Siguiente.webp" alt="Siguiente" style="width:100%;height:100%;object-fit:contain;">
        </button>`;

      // Animar contador PÁGINA
      const _pInfo = barraJ.querySelector('#juegos-pagina-info');
      if (_pInfo && _pInfo._flipReady) {
        _pInfo.classList.remove('anim-flip'); void _pInfo.offsetWidth; _pInfo.classList.add('anim-flip');
      } else if (_pInfo) { _pInfo._flipReady = true; }
    }

    // Reemplazar sidebar con botón volver al curso
    const sidebarJ = panelJ.querySelector('.curso-sidebar');
    if (sidebarJ && !sidebarJ.dataset.originalHtml) {
      sidebarJ.dataset.originalHtml = sidebarJ.innerHTML;
    }
    if (sidebarJ) {
      sidebarJ.innerHTML = `
        <a class="sidebar-btn" href="javascript:void(0)" onclick="volverATemas('${cursoId}')">
          <img src="imagenes/menu/Volver.png" alt="Volver al curso">
          <span>Volver al curso</span>
        </a>`;
    }
  }
}

function filtrarTipoJuego(btnEl, tipo, cursoId) {
  btnEl.classList.toggle('active');
  pulsarBtn(btnEl);
  const isActive = btnEl.classList.contains('active');
  const panel = document.getElementById('panel-' + cursoId);
  if (!panel) return;
  const grid = panel.querySelector('.ficha-actividades--juegos');
  if (!grid) return;
  Array.from(grid.children).forEach(cell => {
    if (cell.dataset.tipoJuego === tipo) {
      cell.classList.toggle('col-filtro-off', !isActive);
    }
  });
}

function _actualizarBarraVideo(barraEl, cursoId) {
  const _vIdx   = _CURSOS_ORDEN.indexOf(cursoId);
  const _vTotal = _CURSOS_ORDEN.length;
  const _vPrev  = _vIdx > 0 ? _CURSOS_ORDEN[_vIdx - 1] : null;
  const _vNext  = _vIdx < _vTotal - 1 ? _CURSOS_ORDEN[_vIdx + 1] : null;
  barraEl.innerHTML = `
    <div class="control-group" style="left:175px;">
      <span class="control-label">SALA DE VÍDEOS</span>
    </div>
    <div class="control-group" style="left:1075px;">
      <span class="control-label">PÁGINA:</span>
      <span class="pagination-info" style="display:flex;gap:0.5rem;align-items:center;color:#ffffff;white-space:nowrap;">${_vIdx + 1} / ${_vTotal}</span>
    </div>
    <div class="control-group" style="left:1200px;">
      <button class="pagination-btn" style="width:32px;height:32px;padding:0;" ${!_vPrev ? 'disabled' : ''} ${_vPrev ? `onclick="mostrarVideoTemario('${_vPrev}')"` : ''}>
        <img src="imagenes/menu/Anterior.webp" alt="Anterior" style="width:100%;height:100%;object-fit:contain;">
      </button>
      <button class="pagination-btn" style="width:32px;height:32px;padding:0;" ${!_vNext ? 'disabled' : ''} ${_vNext ? `onclick="mostrarVideoTemario('${_vNext}')"` : ''}>
        <img src="imagenes/menu/Siguiente.webp" alt="Siguiente" style="width:100%;height:100%;object-fit:contain;">
      </button>
    </div>`;
}

function _navegarVideoEnSala(nuevoCursoId) {
  // Encuentra el panel activo con modo vídeo
  const panelActivo = document.querySelector('.contenedor-grande--curso.active');
  if (!panelActivo) { mostrarVideoTemario(nuevoCursoId); return; }
  const cursoPanelId = panelActivo.id.replace('panel-', '');

  const VIDEO_SRCS = {
    '2eso':   'videos/2º ESO - Física y Química.mp4',
    '3eso':   'videos/3º ESO - Física y Química.mp4',
    '4eso':   'videos/4º ESO - Física y Química.mp4',
    '1bach':  'videos/1º Bachillerato - Física y Química.mp4',
    '2bachF': 'videos/2º Bachillerato - Física.mp4',
    '2bachQ': 'videos/2º Bachillerato - Química.mp4'
  };
  const NOMBRES_CURSO = {
    '2eso':'2º ESO · Física y Química','3eso':'3º ESO · Física y Química',
    '4eso':'4º ESO · Física y Química','1bach':'1º Bachillerato · Física y Química',
    '2bachF':'2º Bachillerato · Física','2bachQ':'2º Bachillerato · Química'
  };
  const NOMBRES_CURSO_HTML = {
    '2eso':'2º ESO<br>Física y Química','3eso':'3º ESO<br>Física y Química',
    '4eso':'4º ESO<br>Física y Química','1bach':'1º Bachillerato<br>Física y Química',
    '2bachF':'2º Bachillerato<br>Física','2bachQ':'2º Bachillerato<br>Química'
  };
  const COLOR_CURSO = {
    '2eso':'#55ddcc','3eso':'#88ee66','4eso':'#88bbff',
    '1bach':'#ff6666','2bachF':'#ffaa55','2bachQ':'#dd88ff'
  };

  // Actualizar estadoGrids
  estadoGrids[cursoPanelId] = 'video';

  // Actualizar barra: nuevo índice y flechas
  const barraEl = panelActivo.querySelector('.barra-interna');
  if (barraEl) _actualizarBarraVideo(barraEl, nuevoCursoId);

  // Actualizar sidebar con el volver correcto
  const sidebarEl = panelActivo.querySelector('.curso-sidebar');
  if (sidebarEl) {
    ['2eso','3eso','4eso','1bach','2bachF','2bachQ'].forEach(c => sidebarEl.classList.remove('active-'+c));
    sidebarEl.classList.add('active-'+cursoPanelId);
    sidebarEl.innerHTML = `<a class="sidebar-btn" href="javascript:void(0)" onclick="volverATemas('${cursoPanelId}')"><img src="imagenes/menu/Volver.png" alt="Volver al curso"><span>Volver al curso</span></a>`;
  }

  // Actualizar el reproductor de vídeo
  const videoEl = panelActivo.querySelector('video');
  if (videoEl) {
    videoEl.src = VIDEO_SRCS[nuevoCursoId] || '';
    videoEl.load();
    videoEl.play().catch(() => {});
  }

  // Actualizar botón ficha (nombre del curso)
  const labelEl = panelActivo.querySelector('.unidad-nombre-texto2');
  if (labelEl) labelEl.textContent = NOMBRES_CURSO[nuevoCursoId] || '';

  // Actualizar los 6 botones del grid: resaltar el activo, activar/desactivar los demás
  const fichas = panelActivo.querySelectorAll('.ficha-actividades--video .objeto-ficha');
  fichas.forEach(btn => {
    const cid = [...btn.classList].find(c => c.startsWith('color-'))?.replace('color-', '');
    if (!cid) return;
    const color = COLOR_CURSO[cid] || '#ffffff';
    const oCircle = btn.querySelector('.video-curso-icono');
    const oImg    = btn.querySelector('.video-curso-icono img');
    const oTema   = btn.querySelector('.video-curso-nombre');
    if (cid === nuevoCursoId) {
      btn.style.pointerEvents = 'none';
      btn.style.cursor = 'default';
      btn.style.filter = 'grayscale(100%)';
      btn.style.opacity = '0.5';
      btn.onclick = null;
    } else {
      btn.style.pointerEvents = '';
      btn.style.cursor = '';
      btn.style.filter = '';
      btn.style.opacity = '';
      btn.onclick = () => { _navegarVideoEnSala(cid); };
      if (oCircle && oImg && oTema) {
        // Re-registrar hover (clonar para limpiar listeners anteriores)
        const newBtn = btn.cloneNode(true);
        newBtn.onclick = () => { _navegarVideoEnSala(cid); };
        const nc = newBtn.querySelector('.video-curso-icono');
        const ni = newBtn.querySelector('.video-curso-icono img');
        const nt = newBtn.querySelector('.video-curso-nombre');
        if (nc && ni && nt) {
          newBtn.addEventListener('mouseenter', () => {
            ni.style.transform = 'scale(1.2)';
            nc.style.boxShadow = `0 0 18px 6px ${color}cc, inset 0 0 0 2px ${color}, inset 0 0 0 1px #999999`;
            nt.style.color = color;
          });
          newBtn.addEventListener('mouseleave', () => {
            ni.style.transform = '';
            nc.style.boxShadow = 'inset 0 0 0 1px #999999';
            nt.style.color = '#ffffff';
          });
        }
        btn.parentNode?.replaceChild(newBtn, btn);
      }
    }
  });
}

function mostrarVideoTemario(cursoId) {
  const grid = document.getElementById('grid-' + cursoId);
  if (!grid) return;

  // Si había otro curso en modo vídeo, restaurar su barra interna y sidebar antes de continuar
  Object.keys(estadoGrids).forEach(cid => {
    if (cid !== cursoId && estadoGrids[cid] === 'video') {
      const panelAnterior = document.getElementById('panel-' + cid);
      const barraAnterior = panelAnterior?.querySelector('.barra-interna');
      if (barraAnterior && barraAnterior._prevHtml) {
        barraAnterior.innerHTML = barraAnterior._prevHtml;
        delete barraAnterior._prevHtml;
        actualizarUnidadInfo(cid);
      }
      // Restaurar sidebar del curso anterior
      if (panelAnterior) {
        const sidebarAnterior = panelAnterior.querySelector('.curso-sidebar');
        if (sidebarAnterior && sidebarAnterior.dataset.originalHtml) {
          sidebarAnterior.innerHTML = sidebarAnterior.dataset.originalHtml;
          delete sidebarAnterior.dataset.originalHtml;
        }
      }
      estadoGrids[cid] = null;
    }
  });

  // Activar panel del curso
  document.querySelectorAll('.curso-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`.curso-tab[onclick*="${cursoId}"]`)?.classList.add('active');
  activarPanel('panel-' + cursoId);

  estadoGrids[cursoId] = 'video';
  grid.innerHTML = '';

  // Rutas de vídeo por curso — carpeta local videos/
  const VIDEO_SRCS = {
    '2eso':   'videos/2º ESO - Física y Química.mp4',
    '3eso':   'videos/3º ESO - Física y Química.mp4',
    '4eso':   'videos/4º ESO - Física y Química.mp4',
    '1bach':  'videos/1º Bachillerato - Física y Química.mp4',
    '2bachF': 'videos/2º Bachillerato - Física.mp4',
    '2bachQ': 'videos/2º Bachillerato - Química.mp4'
  };
  const videoSrc = VIDEO_SRCS[cursoId] || '';

  // Nombres de curso para los botones y ficha (2 líneas: curso / asignatura)
  const NOMBRES_CURSO = {
    '2eso':   '2º ESO · Física y Química',
    '3eso':   '3º ESO · Física y Química',
    '4eso':   '4º ESO · Física y Química',
    '1bach':  '1º Bachillerato · Física y Química',
    '2bachF': '2º Bachillerato · Física',
    '2bachQ': '2º Bachillerato · Química'
  };
  const NOMBRES_CURSO_HTML = {
    '2eso':   '2º ESO<br>Física y Química',
    '3eso':   '3º ESO<br>Física y Química',
    '4eso':   '4º ESO<br>Física y Química',
    '1bach':  '1º Bachillerato<br>Física y Química',
    '2bachF': '2º Bachillerato<br>Física',
    '2bachQ': '2º Bachillerato<br>Química'
  };
  const COLOR_CURSO = {
    '2eso':'#55ddcc','3eso':'#88ee66','4eso':'#88bbff',
    '1bach':'#ff6666','2bachF':'#ffaa55','2bachQ':'#dd88ff'
  };
  const ICONOS_CURSO = {
    '2eso':   'imagenes/2ESO/01A - Icono.webp',
    '3eso':   'imagenes/3ESO/01A - Icono.webp',
    '4eso':   'imagenes/4ESO/01A - Icono.webp',
    '1bach':  'imagenes/1BACH/01A - Icono.webp',
    '2bachF': 'imagenes/2BACHF/01A - Icono.webp',
    '2bachQ': 'imagenes/2BACHQ/01A - Icono.webp'
  };

  // Reemplazar barra interna con "SALA DE VÍDEOS"
  const barraV = document.getElementById('panel-' + cursoId)?.querySelector('.barra-interna');
  if (barraV && !barraV._prevHtml) {
    barraV._prevHtml = barraV.innerHTML;
    // Ocultar grupos estáticos de paginación que quedarían solapados
    barraV.querySelectorAll('[id^="curso-pagina-group-"],[id^="unidad-pagina-"],[id^="curso-flechas-group-"],[id^="unidad-flechas-"]').forEach(el => el.style.display = 'none');
    _actualizarBarraVideo(barraV, cursoId);
  }

  // Reemplazar sidebar: solo flecha de volver al temario del curso seleccionado
  const panelV = document.getElementById('panel-' + cursoId);
  if (panelV) {
    const sidebarV = panelV.querySelector('.curso-sidebar');
    if (sidebarV && !sidebarV.dataset.originalHtml) {
      sidebarV.dataset.originalHtml = sidebarV.innerHTML;
    }
    if (sidebarV) {
      ['2eso','3eso','4eso','1bach','2bachF','2bachQ'].forEach(c => sidebarV.classList.remove('active-'+c));
      sidebarV.classList.add('active-'+cursoId);
      sidebarV.innerHTML = `<a class="sidebar-btn" href="javascript:void(0)" onclick="volverATemas('${cursoId}')"><img src="imagenes/menu/Volver.png" alt="Volver al curso"><span>Volver al curso</span></a>`;
    }
  }

  // Layout: colIzq (ficha+actividades) + vídeo derecha
  const layout = document.createElement('div');
  layout.style.cssText = 'display:flex; flex-direction:row; overflow:visible; height:100%; max-height:100%; width:100%; padding-top:10px; box-sizing:border-box; align-items:stretch;';

  // Columna izquierda — ancho adaptable al espacio que deja el vídeo
  const colIzq = document.createElement('div');
  colIzq.className = 'unidad-dentro-iconos';
  colIzq.style.cssText = 'flex:1; min-width:0; display:flex; flex-direction:column; overflow:visible; height:100%; padding:0; border:none; box-sizing:border-box; margin-left:20px; margin-right:20px;';

  // Botón vídeo del temario (estilo unidad-ficha-dentro)
  const btnVideo = document.createElement('button');
  btnVideo.className = `unidad-${cursoId}-ficha unidad-ficha-dentro`;
  btnVideo.style.cssText = 'flex-shrink:0; padding-top:15px;';
  btnVideo.onclick = () => volverATemas(cursoId);
  const circleV = document.createElement('div');
  circleV.className = 'unidad-icono';
  const imgCircleV = document.createElement('img');
  imgCircleV.src = 'imagenes/menu/Video temario.webp';
  imgCircleV.alt = 'Vídeo del temario';
  imgCircleV.onerror = function() { this.style.display='none'; };
  circleV.appendChild(imgCircleV);
  const numLabelV = document.createElement('div');
  numLabelV.className = 'unidad-numero-texto1';
  numLabelV.textContent = 'Vídeo del temario';
  const labelV = document.createElement('div');
  labelV.className = 'unidad-nombre-texto2';
  labelV.textContent = NOMBRES_CURSO[cursoId];
  btnVideo.appendChild(circleV);
  btnVideo.appendChild(numLabelV);
  btnVideo.appendChild(labelV);
  colIzq.appendChild(btnVideo);

  // ficha-actividades: 6 botones de cursos con Video temario.png, hover glow, nombres en blanco
  const subRow = document.createElement('div');
  subRow.className = 'ficha-actividades ficha-actividades--video';
  subRow.style.cssText = 'flex:1; display:flex !important; align-items:center; justify-content:center; overflow:visible;';
  ['2eso','3eso','4eso','1bach','2bachF','2bachQ'].forEach((cid, i) => {
    const color = COLOR_CURSO[cid] || '#ffffff';
    const btn = document.createElement('button');
    btn.className = `objeto-ficha color-${cid}`;
    btn.style.cssText = 'overflow:visible; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; padding:0; height:100%; pointer-events:auto;';
    btn.style.setProperty('--d', i);
    if (cid === cursoId) {
      btn.style.pointerEvents = 'none';
      btn.style.cursor = 'default';
      btn.style.filter = 'grayscale(100%)';
      btn.style.opacity = '0.5';
    } else {
      btn.onclick = () => { mostrarVideoTemario(cid); };
    }
    const oCircle = document.createElement('div');
    oCircle.className = 'video-curso-icono';
    oCircle.style.cssText = 'width:64px; height:64px; overflow:visible; border-radius:50%; background:#000000; box-shadow:inset 0 0 0 1px #999999; display:flex; align-items:center; justify-content:center; transition:box-shadow 0.2s; flex-shrink:0;';
    const oImg = document.createElement('img');
    oImg.src = 'imagenes/menu/Video.webp';
    oImg.alt = NOMBRES_CURSO[cid];
    oImg.onerror = function() { this.style.display='none'; };
    oImg.style.cssText = 'width:85%; height:85%; object-fit:contain; transition:transform 0.2s;';
    oCircle.appendChild(oImg);
    const oTema = document.createElement('div');
    oTema.className = 'video-curso-nombre';
    oTema.style.cssText = 'color:#ffffff; font-family:Saira,sans-serif; font-size:0.86rem; font-weight:600; text-align:center; white-space:normal; line-height:1.2; width:100%;';
    oTema.innerHTML = NOMBRES_CURSO_HTML[cid] || NOMBRES_CURSO[cid];
    // Hover: solo amplia el icono interior, glow temático en círculo + nombre en color del curso
    if (cid !== cursoId) {
      btn.addEventListener('mouseenter', () => {
        oImg.style.transform = 'scale(1.2)';
        oCircle.style.boxShadow = `0 0 18px 6px ${color}cc, inset 0 0 0 2px ${color}, inset 0 0 0 1px #999999`;
        oTema.style.color = color;
      });
      btn.addEventListener('mouseleave', () => {
        oImg.style.transform = '';
        oCircle.style.boxShadow = 'inset 0 0 0 1px #999999';
        oTema.style.color = '#ffffff';
      });
    }
    btn.appendChild(oCircle); btn.appendChild(oTema);
    subRow.appendChild(btn);
  });
  const subRowWrapper = document.createElement('div');
  subRowWrapper.style.cssText = 'flex:1; display:flex; align-items:center; justify-content:center; overflow:visible;';
  subRowWrapper.appendChild(subRow);
  subRow.style.cssText = 'overflow:visible;';
  colIzq.appendChild(subRowWrapper);

  // Columna derecha: reproductor de vídeo — ancho fijo determinado por el vídeo más ancho (2º Bach Química)
  const videoDiv = document.createElement('div');
  videoDiv.className = 'unidad-imagen';
  videoDiv.style.cssText = 'flex-shrink:0; display:flex; align-items:stretch; justify-content:flex-end; overflow:hidden; padding:5px; box-sizing:border-box; height:100%; min-height:0;';
  videoDiv.style.opacity = '0';
  videoDiv.style.transition = 'none';

  const videoEl = document.createElement('video');
  videoEl.src = videoSrc;
  videoEl.autoplay = true;
  videoEl.loop = true;
  videoEl.muted = true;
  videoEl.playsInline = true;
  videoEl.style.cssText = 'height:100%; width:100%; object-fit:contain; border:1px solid #999999; border-radius:10px; box-sizing:border-box; background:#000; display:block;';

  // Fijar el ancho del videoDiv al ratio del vídeo más ancho (2º Bach Química),
  // así la columna izquierda no baila al navegar entre cursos.
  const REF_VIDEO_SRC = VIDEO_SRCS['2bachQ'];
  function _fijarAnchoPorRatio(ratio) {
    const h = layout.offsetHeight;
    if (!h) { requestAnimationFrame(() => _fijarAnchoPorRatio(ratio)); return; }
    const disponible = layout.offsetWidth;
    const wVideo = Math.round((h - 10) * ratio); // -10 por padding 5px×2
    videoDiv.style.width = Math.min(wVideo + 10, disponible * 0.7) + 'px'; // +10 por padding
  }
  if (VIDEO_SRCS['2bachQ'] === videoSrc) {
    // Estamos ya en 2º Bach Química: medir directamente
    videoEl.addEventListener('loadedmetadata', () => {
      _fijarAnchoPorRatio(videoEl.videoWidth / videoEl.videoHeight);
    });
  } else {
    // Cargar 2º Bach Química en oculto solo para medir su ratio
    const refEl = document.createElement('video');
    refEl.src = REF_VIDEO_SRC;
    refEl.preload = 'metadata';
    refEl.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;width:1px;height:1px;';
    document.body.appendChild(refEl);
    refEl.addEventListener('loadedmetadata', () => {
      _fijarAnchoPorRatio(refEl.videoWidth / refEl.videoHeight);
      refEl.remove();
    });
    refEl.addEventListener('error', () => {
      // Fallback: usar ratio del vídeo actual
      videoEl.addEventListener('loadedmetadata', () => {
        _fijarAnchoPorRatio(videoEl.videoWidth / videoEl.videoHeight);
      });
      refEl.remove();
    });
  }

  videoEl.onerror = function() {
    this.style.display = 'none';
    videoDiv.style.flex = '1';
    const imgFallback = document.createElement('img');
    imgFallback.src = ICONOS_CURSO[cursoId];
    imgFallback.style.cssText = 'width:100%; height:100%; object-fit:contain; border:1px solid #999999; border-radius:10px; box-sizing:border-box;';
    videoDiv.appendChild(imgFallback);
  };
  videoDiv.appendChild(videoEl);

  layout.appendChild(colIzq);
  layout.appendChild(videoDiv);
  grid.appendChild(layout);

  document.body.classList.add('en-unidad');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      videoDiv.style.transition = 'opacity 0.8s ease';
      videoDiv.style.opacity = '1';
      videoEl.play().catch(() => {});
    });
  });

  grid.style.display = 'block';
  grid.style.gridTemplateColumns = '';
}

// Datos de publicaciones (global)
const PUB_PANEL_DATA = [
    { nombre: 'Física y Química - 3º ESO', descripcion: '<ul style="padding-left:1.2em;margin:0;line-height:1.7;"><li>Incluye enlaces internos para moverse por el documento y enlaces externos con imágenes y vídeos.</li><li>Soluciones de las actividades, cuestionarios online, juegos de Kahoot.</li><li>Muy recomendable para profesores y para estudiantes.</li></ul>', tipo: 'libro', icono: 'imagenes/publicaciones/Libro - 3º ESO - Física y Química - Portada.jpg', enlace: 'https://www.amazon.es/3%C2%BA-ESO-F%C3%ADsica-Qu%C3%ADmica-Libros-ebook/dp/B09Z9N31CP/ref=sr_1_4?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=354274XKWWWTH&dib=eyJ2IjoiMSJ9.Wo_zJGgwiskhXBbAtjxi9zVEYY4kALyT7Qrkhayk6gmBT-FvFSsWYZYyfSiGk7C7bt4d9Ux6DKe6rnZuiBn8EbFpz7rYe4-TbUzy37Ze-SSHMtzhcrOYdxGrQESH74i7riQlR1nN0TPbK9HVsWIpAw.gJaEpvibYJ2fL47YRTf2bF6swiNRi1VzaVboxpPx0Lg&dib_tag=se&keywords=jacinto+javier+fern%C3%A1ndez+herrera&qid=1777945832&sprefix=jacinto+javier+fern%C3%A1ndez+herrera%2Caps%2C99&sr=8-4' },
    { nombre: 'Física y Química - 4º ESO', descripcion: '<ul style="padding-left:1.2em;margin:0;line-height:1.7;"><li>Incluye enlaces internos para moverse por el documento y enlaces externos con imágenes y vídeos.</li><li>Soluciones de las actividades, cuestionarios online, juegos de Kahoot.</li><li>Muy recomendable para profesores y para estudiantes.</li></ul>', tipo: 'libro', icono: 'imagenes/publicaciones/Libro - 4º ESO - Física y Química - Portada.jpg', enlace: 'https://www.amazon.es/4%C2%BA-ESO-F%C3%ADsica-Qu%C3%ADmica-Libros-ebook/dp/B09Z9N5S5W/ref=sr_1_6?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=354274XKWWWTH&dib=eyJ2IjoiMSJ9.Wo_zJGgwiskhXBbAtjxi9zVEYY4kALyT7Qrkhayk6gmBT-FvFSsWYZYyfSiGk7C7bt4d9Ux6DKe6rnZuiBn8EbFpz7rYe4-TbUzy37Ze-SSHMtzhcrOYdxGrQESH74i7riQlR1nN0TPbK9HVsWIpAw.gJaEpvibYJ2fL47YRTf2bF6swiNRi1VzaVboxpPx0Lg&dib_tag=se&keywords=jacinto+javier+fern%C3%A1ndez+herrera&qid=1777945832&sprefix=jacinto+javier+fern%C3%A1ndez+herrera%2Caps%2C99&sr=8-6' },
    { nombre: 'Física y Química - 1º Bachillerato', descripcion: '<ul style="padding-left:1.2em;margin:0;line-height:1.7;"><li>Incluye enlaces internos para moverse por el documento y enlaces externos con imágenes y vídeos.</li><li>Soluciones de las actividades, cuestionarios online, juegos de Kahoot.</li><li>Muy recomendable para profesores y para estudiantes.</li></ul>', tipo: 'libro', icono: 'imagenes/publicaciones/Libro - 1º Bachillerato - Física y Química - Portada.jpg', enlace: 'https://www.amazon.es/1%C2%BA-Bachillerato-F%C3%ADsica-Qu%C3%ADmica-Libros-ebook/dp/B09Z9NN4G2/ref=sr_1_7?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=354274XKWWWTH&dib=eyJ2IjoiMSJ9.Wo_zJGgwiskhXBbAtjxi9zVEYY4kALyT7Qrkhayk6gmBT-FvFSsWYZYyfSiGk7C7bt4d9Ux6DKe6rnZuiBn8EbFpz7rYe4-TbUzy37Ze-SSHMtzhcrOYdxGrQESH74i7riQlR1nN0TPbK9HVsWIpAw.gJaEpvibYJ2fL47YRTf2bF6swiNRi1VzaVboxpPx0Lg&dib_tag=se&keywords=jacinto+javier+fern%C3%A1ndez+herrera&qid=1777945832&sprefix=jacinto+javier+fern%C3%A1ndez+herrera%2Caps%2C99&sr=8-7' },
    { nombre: 'Física - 2º Bachillerato', descripcion: '<ul style="padding-left:1.2em;margin:0;line-height:1.7;"><li>Incluye enlaces internos para moverse por el documento y enlaces externos con imágenes y vídeos.</li><li>Soluciones de las actividades, cuestionarios online, juegos de Kahoot.</li><li>Muy recomendable para profesores y para estudiantes.</li></ul>', tipo: 'libro', icono: 'imagenes/publicaciones/Libro - 2º Bachillerato - Física - Portada.jpg', enlace: 'https://www.amazon.es/2%C2%BA-Bachillerato-F%C3%ADsica-Libros-texto-ebook/dp/B09Z9QMKPJ/ref=sr_1_5?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=354274XKWWWTH&dib=eyJ2IjoiMSJ9.Wo_zJGgwiskhXBbAtjxi9zVEYY4kALyT7Qrkhayk6gmBT-FvFSsWYZYyfSiGk7C7bt4d9Ux6DKe6rnZuiBn8EbFpz7rYe4-TbUzy37Ze-SSHMtzhcrOYdxGrQESH74i7riQlR1nN0TPbK9HVsWIpAw.gJaEpvibYJ2fL47YRTf2bF6swiNRi1VzaVboxpPx0Lg&dib_tag=se&keywords=jacinto+javier+fern%C3%A1ndez+herrera&qid=1777945832&sprefix=jacinto+javier+fern%C3%A1ndez+herrera%2Caps%2C99&sr=8-5' },
    { nombre: 'Química - 2º Bachillerato', descripcion: '<ul style="padding-left:1.2em;margin:0;line-height:1.7;"><li>Incluye enlaces internos para moverse por el documento y enlaces externos con imágenes y vídeos.</li><li>Soluciones de las actividades, cuestionarios online, juegos de Kahoot.</li><li>Muy recomendable para profesores y para estudiantes.</li></ul>', tipo: 'libro', icono: 'imagenes/publicaciones/Libro - 2º Bachillerato - Química - Portada.jpg', enlace: 'https://www.amazon.es/2%C2%BA-Bachillerato-Qu%C3%ADmica-Libros-texto-ebook/dp/B09Z9QFRHM/ref=sr_1_8?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=354274XKWWWTH&dib=eyJ2IjoiMSJ9.Wo_zJGgwiskhXBbAtjxi9zVEYY4kALyT7Qrkhayk6gmBT-FvFSsWYZYyfSiGk7C7bt4d9Ux6DKe6rnZuiBn8EbFpz7rYe4-TbUzy37Ze-SSHMtzhcrOYdxGrQESH74i7riQlR1nN0TPbK9HVsWIpAw.gJaEpvibYJ2fL47YRTf2bF6swiNRi1VzaVboxpPx0Lg&dib_tag=se&keywords=jacinto+javier+fern%C3%A1ndez+herrera&qid=1777945832&sprefix=jacinto+javier+fern%C3%A1ndez+herrera%2Caps%2C99&sr=8-8' },
    { nombre: 'Cuaderno de formulación inorgánica', descripcion: '<ul style="padding-left:1.2em;margin:0;line-height:1.7;"><li>Práctico cuaderno para aprender a nombrar y formular especies inorgánicas. Normativa IUPAC 2005.</li><li>Pensado para profesores y estudiantes de Secundaria y Bachillerato.</li><li>Fichas de actividades con tablas preparadas para imprimir y rellenar. Incluye solucionario completo.</li><li>Cuestionario online de autoevaluación. Ilustraciones de compuestos conocidos. Tablas-resumen.</li><li>Diseño limpio y directo. Contenido estructurado y de consulta rápida.</li><li>Tercera edición.</li></ul>', tipo: 'cuaderno', icono: 'imagenes/publicaciones/Cuaderno de formulación inorgánica.jpg', enlace: 'https://www.amazon.es/Cuaderno-Formulaci%C3%B3n-Inorg%C3%A1nica-Qu%C3%ADmica/dp/B0DHQC9V5N/ref=sr_1_3?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=354274XKWWWTH&dib=eyJ2IjoiMSJ9.Wo_zJGgwiskhXBbAtjxi9zVEYY4kALyT7Qrkhayk6gmBT-FvFSsWYZYyfSiGk7C7bt4d9Ux6DKe6rnZuiBn8EbFpz7rYe4-TbUzy37Ze-SSHMtzhcrOYdxGrQESH74i7riQlR1nN0TPbK9HVsWIpAw.gJaEpvibYJ2fL47YRTf2bF6swiNRi1VzaVboxpPx0Lg&dib_tag=se&keywords=jacinto+javier+fern%C3%A1ndez+herrera&qid=1777945832&sprefix=jacinto+javier+fern%C3%A1ndez+herrera%2Caps%2C99&sr=8-3', muestras: ['imagenes/publicaciones/Cuaderno formulación inorgánica - Muestra 01.jpg','imagenes/publicaciones/Cuaderno formulación inorgánica - Muestra 02.jpg','imagenes/publicaciones/Cuaderno formulación inorgánica - Muestra 03.jpg'] },
    { nombre: 'Ingeniosas, inauditas e inéditas lecturas de matemáticas (1º y 2º ESO)', descripcion: '<ul style="padding-left:1.2em;margin:0;line-height:1.7;"><li>Un poco de historia, algunas curiosidades, cuentos y diálogos que despiertan el interés por las matemáticas.</li><li>Pensado para padres, madres, alumnos y profesores. Ideal para el Plan Lector.</li><li>Comprensión lectora y matemática reunidas en un solo cuaderno de lectura.</li><li>Fichas listas para imprimir y usar en clase. Preguntas de búsqueda, lógica y redacción.</li><li>39 lecturas para 9 unidades didácticas. Más de 75 ilustraciones originales.</li><li>Formato sencillo: fichas de lectura. Textos inéditos acompañados de actividades de evaluación.</li></ul>', tipo: 'lectura', icono: 'imagenes/publicaciones/Lecturas - Matemáticas (1º y 2º ESO).jpg', enlace: 'https://www.amazon.es/Ingeniosas-inauditas-in%C3%A9ditas-lecturas-Matem%C3%A1ticas/dp/B0G4MKKDBL/ref=sr_1_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=354274XKWWWTH&dib=eyJ2IjoiMSJ9.Wo_zJGgwiskhXBbAtjxi9zVEYY4kALyT7Qrkhayk6gmBT-FvFSsWYZYyfSiGk7C7bt4d9Ux6DKe6rnZuiBn8EbFpz7rYe4-TbUzy37Ze-SSHMtzhcrOYdxGrQESH74i7riQlR1nN0TPbK9HVsWIpAw.gJaEpvibYJ2fL47YRTf2bF6swiNRi1VzaVboxpPx0Lg&dib_tag=se&keywords=jacinto+javier+fern%C3%A1ndez+herrera&qid=1777945832&sprefix=jacinto+javier+fern%C3%A1ndez+herrera%2Caps%2C99&sr=8-1', muestras: ['imagenes/publicaciones/Lecturas - Matemáticas (1º y 2º ESO) - Muestra 01.jpg','imagenes/publicaciones/Lecturas - Matemáticas (1º y 2º ESO) - Muestra 02.jpg','imagenes/publicaciones/Lecturas - Matemáticas (1º y 2º ESO) - Muestra 03.jpg'] },
    { nombre: 'Cuaderno de formulación orgánica', descripcion: '<ul style="padding-left:1.2em;margin:0;line-height:1.7;"><li>Práctico cuaderno para aprender a nombrar y formular especies orgánicas. Normativa IUPAC 2005.</li><li>Pensado para profesores y estudiantes de Secundaria y Bachillerato.</li><li>Fichas de actividades con tablas preparadas para imprimir y rellenar. Incluye solucionario completo.</li><li>Cuestionario online de autoevaluación. Ilustraciones de compuestos conocidos. Tablas-resumen.</li><li>Diseño limpio y directo. Contenido estructurado y de consulta rápida.</li><li>Tercera edición.</li></ul>', tipo: 'cuaderno', icono: 'imagenes/publicaciones/Cuaderno de formulación orgánica.jpg', enlace: 'https://www.amazon.es/Cuaderno-Formulaci%C3%B3n-Org%C3%A1nica-Qu%C3%ADmica/dp/B0DHKVB2D3/ref=sr_1_2?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=354274XKWWWTH&dib=eyJ2IjoiMSJ9.Wo_zJGgwiskhXBbAtjxi9zVEYY4kALyT7Qrkhayk6gmBT-FvFSsWYZYyfSiGk7C7bt4d9Ux6DKe6rnZuiBn8EbFpz7rYe4-TbUzy37Ze-SSHMtzhcrOYdxGrQESH74i7riQlR1nN0TPbK9HVsWIpAw.gJaEpvibYJ2fL47YRTf2bF6swiNRi1VzaVboxpPx0Lg&dib_tag=se&keywords=jacinto+javier+fern%C3%A1ndez+herrera&qid=1777945832&sprefix=jacinto+javier+fern%C3%A1ndez+herrera%2Caps%2C99&sr=8-2', muestras: ['imagenes/publicaciones/Cuaderno formulación orgánica - Muestra 01.jpg','imagenes/publicaciones/Cuaderno formulación orgánica - Muestra 02.jpg','imagenes/publicaciones/Cuaderno formulación orgánica - Muestra 03.jpg','imagenes/publicaciones/Cuaderno formulación orgánica - Muestra 04.jpg'] }
];
const PUB_PANEL_ORDENADAS = ['libro','cuaderno','lectura'].flatMap(t => PUB_PANEL_DATA.filter(p => p.tipo === t));

function renderPublicaciones(filtrosActivos) {
  const grid = document.getElementById('grid-publicaciones');
  if (!grid) return;
  grid.innerHTML = '';
  const tipos = filtrosActivos && filtrosActivos.length > 0 ? filtrosActivos : [];
  const lista = PUB_PANEL_ORDENADAS.filter(p => tipos.includes(p.tipo));
  lista.forEach((p, i) => {
    const btn = document.createElement('button');
    btn.className = 'publicacion-ficha anim-entrada';
    btn.style.setProperty('--d', i);
    btn.onclick = () => abrirFichaPublicacion(p);
    let nombre = p.nombre;
    if (nombre.startsWith('Ingeniosas')) {
      nombre = 'Ingeniosas, inauditas e inéditas lecturas de matemáticas (1º y 2º ESO)';
    } else if (nombre.includes(' - ')) {
      nombre = nombre.replace(' - ', '<br>');
    } else if (nombre.startsWith('Cuaderno de ')) {
      nombre = nombre.replace('Cuaderno de ', 'Cuaderno de<br>');
    }
    btn.innerHTML = `<div class="publicacion-icono"><img src="${p.icono}" alt="${p.nombre}" onerror="this.style.display='none'"></div><div class="publicacion-titulo">${nombre}</div>`;
    grid.appendChild(btn);
  });
}

function filtrarPublicaciones(btnEl, filtro) {
  // Toggle complementario: cada botón activa/desactiva independientemente
  btnEl.classList.toggle('active');
  pulsarBtn(btnEl);
  const activos = [...document.querySelectorAll('[data-pub-filter].active')].map(b => b.dataset.pubFilter);
  renderPublicaciones(activos);
}

function openPublicaciones() {
  document.querySelectorAll('.curso-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.curso-sidebar').forEach(sb => {
    sb.classList.remove('active-2eso', 'active-3eso', 'active-4eso', 'active-1bach', 'active-2bachF', 'active-2bachQ', 'active-publicaciones', 'active-objetos');
  });
  document.querySelector('button[onclick="openPublicaciones()"]').classList.add('active');
  const panel = activarPanel('panel-publicaciones');
  panel.querySelector('.curso-sidebar')?.classList.add('active-publicaciones');
  // Restaurar siempre a la vista principal (no recordar vista interna)
  _barraPublicacionesRestaurar(panel);
  const sbPub = panel.querySelector('.curso-sidebar');
  const _veniaDeFicha = sbPub && !!sbPub.dataset.originalHtml;
  if (_veniaDeFicha) {
    sbPub.innerHTML = sbPub.dataset.originalHtml;
    delete sbPub.dataset.originalHtml;
  }
  const gridPub = panel.querySelector('.publicaciones-grid');
  if (gridPub) {
    gridPub.removeAttribute('style');
    delete gridPub.dataset.originalHtml;
    delete gridPub.dataset.pubOpened;
  }
  const _activosPub = [...document.querySelectorAll('[data-pub-filter].active')].map(b => b.dataset.pubFilter);
  const _filtrosPub = _activosPub.length > 0 ? _activosPub : ['libro','cuaderno','lectura'];
  renderPublicaciones(_filtrosPub);

  // Rueda del ratón sobre el grid de publicaciones: navegar entre fichas
  const gridPubWheel = panel.querySelector('.publicaciones-grid');
  if (gridPubWheel && !gridPubWheel._wheelAdded) {
    gridPubWheel._wheelAdded = true;
    gridPubWheel.addEventListener('wheel', (e) => {
      if (!window._pubActual) return;
      e.preventDefault();
      _pubNavegar(e.deltaY > 0 ? 1 : -1);
    }, { passive: false });
  }
}

let estadoGrids = {}; // Para rastrear qué unidad está abierta en cada curso



const _classroomAcceso = {};

function codigosValidosParaCurso(cursoId) {
  const mapaClase = {
    '1bach': ['1º Bachillerato'],
    '2bachF': ['2º Bachillerato'],
    '2bachQ': ['2º Bachillerato'],
    '2eso': ['2º ESO'],
    '3eso': ['3º ESO'],
    '4eso': ['4º ESO'],
  };
  const claves = mapaClase[cursoId] || [];
  return CLASSROOMS.filter(c => claves.some(k => c.clase.startsWith(k))).map(c => c.codigo);
}

function verificarCodigoClassroom(cursoId, codigo) {
  if (codigo.trim() === '9445') {
    ['2eso','3eso','4eso','1bach','2bachF','2bachQ'].forEach(id => { _classroomAcceso[id] = '9445'; });
    actualizarBotonesClassroom();
    return true;
  }
  return codigosValidosParaCurso(cursoId).includes(codigo.trim().toLowerCase());
}

function tieneAccesoClassroom(cursoId) {
  return !!_classroomAcceso[cursoId];
}

function actualizarBotonesClassroom() {
  ['2eso','3eso','4eso','1bach','2bachF','2bachQ'].forEach(cId => {
    const btn = document.getElementById('btn-classroom-' + cId);
    if (btn) btn.style.display = tieneAccesoClassroom(cId) ? '' : 'none';
  });
}

function abrirClassroomCurso(cursoId) {
  const codigo = _classroomAcceso[cursoId];
  if (codigo && codigo !== '9445') {
    const c = CLASSROOMS.find(x => x.codigo === codigo && x.enlace);
    if (c && c.enlace) { window.open(c.enlace, '_blank'); return; }
  }
  const mapaClase = {'1bach':['1º Bachillerato'],'2bachF':['2º Bachillerato'],'2bachQ':['2º Bachillerato'],'2eso':['2º ESO'],'3eso':['3º ESO'],'4eso':['4º ESO']};
  const claves = mapaClase[cursoId] || [];
  const c2 = CLASSROOMS.find(c => claves.some(k => c.clase.startsWith(k)) && c.enlace);
  if (c2) window.open(c2.enlace, '_blank');
}

function pedirCodigoClassroomYAbrir(cursoId, url) {
  if (tieneAccesoClassroom(cursoId)) { window.open(url, '_blank'); return; }
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem;backdrop-filter:blur(10px);';
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  overlay.innerHTML = `<div style="background:#0d0d0d;border:1px solid #999999;border-radius:10px;padding:1.5rem 2rem;width:100%;max-width:340px;text-align:center;font-family:'Saira',sans-serif;">
    <div style="font-family:'Saira',sans-serif;font-size:1.1rem;font-weight:700;color:var(--accent);margin-bottom:0.8rem;letter-spacing:0.08em;text-transform:uppercase;">Acceso restringido</div>
    <div style="font-size:0.85rem;color:var(--muted);margin-bottom:0.8rem;font-family:'Roboto Condensed',sans-serif;">Introduce el código de tu Google Classroom:</div>
    <input id="_cls_input" type="text" style="width:50%;height:38px;padding:0 0.8rem;border-radius:6px;border:1px solid #999999;background:#000000;color:#ffffff;font-size:0.95rem;font-weight:500;text-align:center;box-sizing:border-box;font-family:'Roboto Condensed',sans-serif;outline:none;" placeholder="">
    <div id="_cls_err" style="color:#ff6666;font-size:0.8rem;margin-top:0.4rem;margin-bottom:0.6rem;min-height:1.2em;font-family:'Roboto Condensed',sans-serif;"></div>
    <div style="display:flex;gap:1.5rem;margin-top:1rem;justify-content:center;">
      <button id="_cls_cancel" style="padding:0 1.2rem;height:34px;border-radius:6px;border:1px solid #999999;background:#000000;color:#ffffff;cursor:pointer;font-family:'Saira',sans-serif;font-size:0.85rem;font-weight:500;transition:border-color 0.2s,color 0.2s;" onmouseover="this.style.borderColor='#ffffff';this.style.color='#ffffff';" onmouseout="this.style.borderColor='#999999';this.style.color='#ffffff';">Cerrar</button>
      <button id="_cls_ok" style="padding:0 1.2rem;height:34px;border-radius:6px;border:1px solid #000000;background:var(--accent);color:#000000;cursor:pointer;font-family:'Saira',sans-serif;font-size:0.85rem;font-weight:700;transition:filter 0.2s;" onmouseover="this.style.filter='brightness(1.15)';this.style.borderColor='#ffffff';" onmouseout="this.style.filter='';this.style.borderColor='#000000';">Acceder</button>
    </div>
  </div>`;
  document.body.appendChild(overlay);
  const input = overlay.querySelector('#_cls_input');
  const errDiv = overlay.querySelector('#_cls_err');
  const okBtn = overlay.querySelector('#_cls_ok');
  function _clsBambalear(el, color, onDone) {
    el.style.background = color;
    const shake = [8,-8,6,-6,4,-4,0];
    let i = 0;
    const interval = setInterval(() => {
      el.style.transform = `translateX(${shake[i]}px)`;
      i++;
      if (i >= shake.length) {
        clearInterval(interval);
        el.style.transform = '';
        if (onDone) onDone();
      }
    }, 60);
  }
  const tryAccess = () => {
    const cod = input.value.trim().toLowerCase();
    if (verificarCodigoClassroom(cursoId, cod)) {
      input.style.borderColor = '#44cc88';
      errDiv.style.color = '#44cc88'; errDiv.textContent = 'Código correcto.';
      _clsBambalear(okBtn, '#44cc88', () => {
        _classroomAcceso[cursoId] = cod;
        actualizarBotonesClassroom();
        overlay.remove();
        window.open(url, '_blank');
      });
    } else {
      errDiv.textContent = 'Código incorrecto.';
      input.style.borderColor = '#ff6666';
      _clsBambalear(okBtn, '#ff6666', () => {
        okBtn.style.background = 'var(--accent)';
        input.value = '';
        setTimeout(() => { input.style.borderColor = ''; errDiv.textContent = ''; }, 800);
        input.focus();
      });
    }
  };
  const cancelBtn = overlay.querySelector('#_cls_cancel');
  cancelBtn.addEventListener('click', () => overlay.remove());
  okBtn.addEventListener('click', tryAccess);
  input.addEventListener('input', () => {
    const cod = input.value.trim().toLowerCase();
    if (verificarCodigoClassroom(cursoId, cod)) tryAccess();
  });
  input.addEventListener('keydown', e => { if(e.key==='Enter') tryAccess(); else if(e.key==='Escape') overlay.remove(); });
  setTimeout(() => input.focus(), 100);
}

let CLASSROOMS = [
  { id:1, clase:'1º ESO A', asignatura:'Matemáticas', codigo:'o2wu3m4n', enlace:'https://classroom.google.com/u/4/c/ODA2MzU5Njc2NjA2' },
  { id:2, clase:'3º ESO B', asignatura:'Física y Química', codigo:'5d3szx3k', enlace:'https://classroom.google.com/u/4/c/ODA2MzYwNDM1OTI3' },
  { id:3, clase:'3º ESO C', asignatura:'Física y Química', codigo:'vs2rvygj', enlace:'https://classroom.google.com/u/4/c/ODA2MzYxMDMyMTA3' },
  { id:4, clase:'1º Bachillerato B', asignatura:'Física y Química', codigo:'bcyxomxg', enlace:'https://classroom.google.com/u/4/c/ODA2MzU5NjI3MjM4' },
  { id:5, clase:'2º Bachillerato B', asignatura:'Física', codigo:'ikkmdvda', enlace:'https://classroom.google.com/u/4/c/ODA2MzYwNDg1Mjcz' },
];


// ═══════════════════════════════════════════
// ESTADÍSTICAS
// ═══════════════════════════════════════════


function renderConsola() {
  const grid = document.getElementById('grid-consola');
  if (!grid) return;

  const esMobil = window.location.pathname.endsWith('movil.html');
  const btnSize = esMobil ? 'width:100%;box-sizing:border-box;' : 'width:250px;';
  const btnClass = esMobil ? 'control-btn control-btn-filter control-btn-consola' : 'control-btn control-btn-filter';

  const groupStyle = 'background:#20292F; border:1px solid #999999; border-radius:6px; padding:10px; display:flex; flex-direction:column; gap:6px; overflow:hidden;';
  const topGroupExtra = esMobil ? ' height:100px;' : '';
  const titleStyle = 'font-family:Saira,sans-serif;font-size:0.85rem;font-weight:700;color:var(--accent);letter-spacing:0.08em;margin-bottom:2px;';
  const inputStyle = 'width:100%;background:#111;border:1px solid #444;border-radius:4px;color:#fff;padding:2px 4px;font-size:0.75rem;font-family:Saira,sans-serif;box-sizing:border-box;height:24px;';

  const codigoUniversalHTML = `<div style="${groupStyle}${topGroupExtra} flex:1; min-width:0; box-sizing:border-box; display:flex; flex-direction:column; align-items:flex-start; justify-content:flex-start; overflow:hidden;">
    <div style="${titleStyle}">${esMobil ? 'CÓDIGO' : 'CÓDIGO UNIVERSAL'}</div>
    <div id="codigo-universal-cuadro" style="background:#000000; border:1px solid #999999; border-radius:4px; padding:10px; margin:0; display:inline-flex; align-items:center; justify-content:center; height:66px; width:100%; box-sizing:border-box;">
      <div id="codigo-universal-texto" style="font-family:Saira,sans-serif;font-size:1.4rem;font-weight:700;color:var(--accent);letter-spacing:0.15em;text-align:center;margin:0;padding:0;user-select:text;cursor:text;">9445</div>
    </div>
  </div>`;

  const estadisticasHTML = `<div style="${groupStyle}${topGroupExtra} flex:1; min-width:0; box-sizing:border-box; overflow:hidden;">
    <div style="${titleStyle}">${esMobil ? 'ESTADÍSTICAS' : 'ESTADÍSTICAS GOAT'}</div>
    <button class="${btnClass}" style="${btnSize}" onclick="window.open('https://jfhprofesor.goatcounter.com','_blank')"><img src="imagenes/menu/Estadisticas.png" alt=""><span>Estadísticas</span></button>
  </div>`;

  const amazonHTML = `<div style="${groupStyle}${topGroupExtra} flex:1; min-width:0; box-sizing:border-box; overflow:hidden;">
    <div style="${titleStyle}">${esMobil ? 'KINDLE' : 'AMAZON KINDLE'}</div>
    <button class="${btnClass}" style="${btnSize}" onclick="window.open('https://kdpreports.amazon.com/royalties','_blank')"><img src="imagenes/menu/Amazon.webp" alt=""><span>Ventas</span></button>
    <button class="${btnClass}" style="${btnSize}" onclick="window.open('https://kdp.amazon.com/es_ES/bookshelf','_blank')"><img src="imagenes/menu/Amazon.webp" alt=""><span>Administrar</span></button>
  </div>`;

  let tableHTML = `<div style="${groupStyle}">
    <div style="${titleStyle}">GOOGLE CLASSROOM</div>
    <table id="tabla-classrooms" style="width:100%;border-collapse:collapse;font-family:Saira,sans-serif;font-size:0.75rem;">
    <thead><tr style="color:var(--accent);border-bottom:1px solid #444;">
      <th style="padding:4px 6px;text-align:left;">Grupo</th>
      <th style="padding:4px 6px;text-align:left;">Asignatura</th>
      <th style="padding:4px 6px;text-align:left;">Código</th>
      <th style="padding:4px 6px;text-align:left;">Enlace</th>
      <th style="padding:4px 6px;text-align:center;">Acciones</th>
    </tr></thead><tbody>`;
  CLASSROOMS.forEach(c => {
    tableHTML += `<tr id="row-cls-${c.id}" style="border-bottom:1px solid #222;">
      <td style="padding:4px 6px;">${c.clase}</td>
      <td style="padding:4px 6px;">${c.asignatura}</td>
      <td style="padding:4px 6px;font-family:monospace;user-select:text;-webkit-user-select:text;cursor:text;">${c.codigo}</td>
      <td style="padding:4px 6px;"><a href="${c.enlace||'#'}" target="_blank" rel="noopener" style="color:#38bdf8;text-decoration:none;font-size:0.75rem;word-break:break-all;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">${c.enlace||''}</a></td>
      <td style="padding:4px 6px;text-align:center;white-space:nowrap;">
        <button onclick="editarClassroom(${c.id})" style="font-size:0.75rem;padding:2px 8px;height:24px;border-radius:4px;border:1px solid #555;background:#222;color:#fff;cursor:pointer;font-family:Saira,sans-serif;transition:border-color 0.15s,color 0.15s,background 0.15s;" onmouseover="this.style.borderColor='#38bdf8';this.style.color='#38bdf8';this.style.background='#0a1f2e';" onmouseout="this.style.borderColor='#555';this.style.color='#fff';this.style.background='#222';">Editar</button>
        <button onclick="borrarClassroom(${c.id})" style="font-size:0.75rem;padding:2px 8px;height:24px;border-radius:4px;border:1px solid #ff4444;background:#2a0000;color:#ff4444;cursor:pointer;font-family:Saira,sans-serif;margin-left:4px;transition:border-color 0.15s,color 0.15s,background 0.15s;" onmouseover="this.style.borderColor='#ff6666';this.style.color='#ff6666';this.style.background='#3d0000';" onmouseout="this.style.borderColor='#ff4444';this.style.color='#ff4444';this.style.background='#2a0000';">Borrar</button>
      </td>
    </tr>`;
  });
    tableHTML += `<tr style="border-top:1px solid #444;">
    <td style="padding:4px 2px;"><input id="new-clase" placeholder="Grupo" style="${inputStyle}"></td>
    <td style="padding:4px 2px;"><input id="new-asig" placeholder="Asignatura" style="${inputStyle}"></td>
    <td style="padding:4px 2px;"><input id="new-cod" placeholder="Código" style="${inputStyle}"></td>
    <td style="padding:4px 2px;"><input id="new-enlace" placeholder="https://..." style="width:100%;background:#111;border:1px solid #444;border-radius:4px;color:#fff;padding:2px 4px;font-size:0.75rem;font-family:Saira,sans-serif;box-sizing:border-box;height:24px;"></td>
    <td style="padding:4px 2px;text-align:center;white-space:nowrap;vertical-align:middle;">
      <button onclick="áñadirClassroom()" style="font-size:0.75rem;padding:2px 8px;height:24px;border-radius:4px;border:1px solid #555;background:#222;color:#fff;cursor:pointer;font-family:Saira,sans-serif;transition:border-color 0.15s,color 0.15s,background 0.15s;" onmouseover="this.style.borderColor='#38bdf8';this.style.color='#38bdf8';this.style.background='#0a1f2e';" onmouseout="this.style.borderColor='#555';this.style.color='#fff';this.style.background='#222';">Añadir</button>
    </td>
  </tr></tbody></table>
  </div>`;

  const topRowHTML = `<div style="display:flex;flex-direction:row;gap:10px;width:100%;align-items:stretch;">${amazonHTML}${codigoUniversalHTML}${estadisticasHTML}</div>`;

  grid.innerHTML = topRowHTML + tableHTML;
  grid.style.cssText = 'display:flex; flex-direction:column; gap:10px; width:100%; height:100%; overflow:auto;';

  // Medir Amazon Kindle y aplicar misma altura a Código Universal
  requestAnimationFrame(() => {
    const containers = grid.querySelectorAll(':scope > div:first-child > div');
    if (containers.length >= 2) {
      const hAmazon = containers[0].offsetHeight;
      containers[0].style.height = hAmazon + 'px';
      containers[1].style.height = hAmazon + 'px';
    }
    // Animar dígitos del código universal: aparecen uno a uno en orden aleatorio
    const codigoEl = document.getElementById('codigo-universal-texto');
    if (codigoEl) {
      const codigoFinal = codigoEl.textContent.trim();
      const n = codigoFinal.length;
      // Inicializar todos los dígitos con guiones
      const revealed = Array(n).fill('—');
      codigoEl.textContent = revealed.join('');
      // Orden aleatorio de revelado
      const orden = Array.from({length: n}, (_, i) => i).sort(() => Math.random() - 0.5);
      orden.forEach((pos, i) => {
        setTimeout(() => {
          revealed[pos] = codigoFinal[pos];
          codigoEl.textContent = revealed.join('');
        }, 300 + i * 220);
      });
    }
  });
}

function editarClassroom(id) {
  const c = CLASSROOMS.find(x => x.id === id);
  if (!c) return;
  const row = document.getElementById('row-cls-'+id);
  if (!row) return;
  const ei = 'width:100%;background:#111;border:1px solid #38bdf8;border-radius:4px;color:#fff;padding:2px 4px;font-size:0.75rem;font-family:Saira,sans-serif;box-sizing:border-box;height:24px;';
  row.innerHTML = `
    <td style="padding:4px 2px;"><input id="edit-clase-${id}" value="${c.clase}" style="${ei}"></td>
    <td style="padding:4px 2px;"><input id="edit-asig-${id}" value="${c.asignatura}" style="${ei}"></td>
    <td style="padding:4px 2px;"><input id="edit-cod-${id}" value="${c.codigo}" style="${ei}font-family:monospace;"></td>
    <td style="padding:4px 2px;"><input id="edit-enlace-${id}" value="${c.enlace||''}" style="${ei}"></td>
    <td style="padding:4px 2px;text-align:center;white-space:nowrap;">
      <button onclick="guardarClassroom(${id})" style="font-size:0.75rem;padding:2px 8px;height:24px;border-radius:4px;border:none;background:#38bdf8;color:#000;font-weight:700;cursor:pointer;font-family:Saira,sans-serif;">Guardar</button>
      <button onclick="renderConsola()" style="font-size:0.75rem;padding:2px 8px;height:24px;border-radius:4px;border:1px solid #555;background:#222;color:#fff;cursor:pointer;font-family:Saira,sans-serif;margin-left:4px;">Cancelar</button>
    </td>`;
}

function guardarClassroom(id) {
  const c = CLASSROOMS.find(x => x.id === id);
  if (!c) return;
  const inpClase = document.getElementById('edit-clase-'+id);
  const inpAsig = document.getElementById('edit-asig-'+id);
  const inpCod = document.getElementById('edit-cod-'+id);
  const inpEnlace = document.getElementById('edit-enlace-'+id);
  if (inpClase) c.clase = inpClase.value.trim() || c.clase;
  if (inpAsig) c.asignatura = inpAsig.value.trim();
  if (inpCod) c.codigo = inpCod.value.trim() || c.codigo;
  if (inpEnlace) c.enlace = inpEnlace.value.trim();
  renderConsola();
}

function borrarClassroom(id) {
  const idx = CLASSROOMS.findIndex(x => x.id === id);
  if (idx >= 0) { CLASSROOMS.splice(idx, 1); renderConsola(); }
}

function añadirClassroom() {
  const clase = document.getElementById('new-clase').value.trim();
  const asig = document.getElementById('new-asig').value.trim();
  const cod = document.getElementById('new-cod').value.trim();
  const enlace = document.getElementById('new-enlace').value.trim();
  if (!clase || !cod) return;
  const maxId = CLASSROOMS.reduce((m,c) => Math.max(m,c.id), 0);
  CLASSROOMS.push({ id:maxId+1, clase, asignatura:asig, codigo:cod.toLowerCase(), enlace });
  renderConsola();
}


// ═══════════════════════════════════════════
// LISTADO DE PUBLICACIONES
// ═══════════════════════════════════════════

const PUBLICACIONES_DATA = [
  { id:'3eso', titulo:'3º ESO - Física y Química', descripcion:'<ul style="padding-left:1.2em;margin:0;line-height:1.7;"><li>Incluye enlaces internos para moverse por el documento y enlaces externos con imágenes y vídeos.</li><li>Soluciones de las actividades, cuestionarios online, juegos de Kahoot.</li><li>Muy recomendable para profesores y para estudiantes.</li></ul>', tipo:'libro',
    icono:'imagenes/publicaciones/Libro - 3º ESO - Física y Química - Portada.jpg',
    enlace:'https://www.amazon.es/dp/B09Z9N31CP', precio:'6,99 €', paginas:248, año:2022 },
  { id:'4eso', titulo:'4º ESO - Física y Química', descripcion:'<ul style="padding-left:1.2em;margin:0;line-height:1.7;"><li>Incluye enlaces internos para moverse por el documento y enlaces externos con imágenes y vídeos.</li><li>Soluciones de las actividades, cuestionarios online, juegos de Kahoot.</li><li>Muy recomendable para profesores y para estudiantes.</li></ul>', tipo:'libro',
    icono:'imagenes/publicaciones/Libro - 4º ESO - Física y Química - Portada.jpg',
    enlace:'https://www.amazon.es/dp/B09Z9N5S5W', precio:'6,99 €', paginas:312, año:2022 },
  { id:'1bach', titulo:'1º Bachillerato - Física y Química', descripcion:'<ul style="padding-left:1.2em;margin:0;line-height:1.7;"><li>Incluye enlaces internos para moverse por el documento y enlaces externos con imágenes y vídeos.</li><li>Soluciones de las actividades, cuestionarios online, juegos de Kahoot.</li><li>Muy recomendable para profesores y para estudiantes.</li></ul>', tipo:'libro',
    icono:'imagenes/publicaciones/Libro - 1º Bachillerato - Física y Química - Portada.jpg',
    enlace:'https://www.amazon.es/dp/B09Z9NN4G2', precio:'6,99 €', paginas:356, año:2022 },
  { id:'2bachF', titulo:'2º Bachillerato - Física', descripcion:'<ul style="padding-left:1.2em;margin:0;line-height:1.7;"><li>Incluye enlaces internos para moverse por el documento y enlaces externos con imágenes y vídeos.</li><li>Soluciones de las actividades, cuestionarios online, juegos de Kahoot.</li><li>Muy recomendable para profesores y para estudiantes.</li></ul>', tipo:'libro',
    icono:'imagenes/publicaciones/Libro - 2º Bachillerato - Física - Portada.jpg',
    enlace:'https://www.amazon.es/dp/B09Z9QMKPJ', precio:'6,99 €', paginas:298, año:2022 },
  { id:'2bachQ', titulo:'2º Bachillerato - Química', descripcion:'<ul style="padding-left:1.2em;margin:0;line-height:1.7;"><li>Incluye enlaces internos para moverse por el documento y enlaces externos con imágenes y vídeos.</li><li>Soluciones de las actividades, cuestionarios online, juegos de Kahoot.</li><li>Muy recomendable para profesores y para estudiantes.</li></ul>', tipo:'libro',
    icono:'imagenes/publicaciones/Libro - 2º Bachillerato - Química - Portada.jpg',
    enlace:'https://www.amazon.es/dp/B09Z9QFRHM', precio:'6,99 €', paginas:286, año:2022 },
  { id:'cuad_inorg', titulo:'Cuaderno de formulación inorgánica', descripcion:'<ul style="padding-left:1.2em;margin:0;line-height:1.7;"><li>Práctico cuaderno para aprender a nombrar y formular especies inorgánicas. Normativa IUPAC 2005.</li><li>Pensado para profesores y estudiantes de Secundaria y Bachillerato.</li><li>Fichas de actividades con tablas preparadas para imprimir y rellenar. Incluye solucionario completo.</li><li>Cuestionario online de autoevaluación. Ilustraciones de compuestos conocidos. Tablas-resumen.</li><li>Diseño limpio y directo. Contenido estructurado y de consulta rápida.</li><li>Tercera edición.</li></ul>', tipo:'cuaderno',
    icono:'imagenes/publicaciones/Cuaderno de formulación inorgánica.jpg',
    enlace:'https://www.amazon.es/dp/B0DHQC9V5N', precio:'4,99 €', paginas:96, año:2024 },
  { id:'lecturas', titulo:'Ingeniosas, inauditas e inéditas<br>lecturas de matemáticas<br>(1º y 2º ESO)', descripcion:'<ul style="padding-left:1.2em;margin:0;line-height:1.7;"><li>Un poco de historia, algunas curiosidades, cuentos y diálogos que despiertan el interés por las matemáticas.</li><li>Pensado para padres, madres, alumnos y profesores. Ideal para el Plan Lector.</li><li>Comprensión lectora y matemática reunidas en un solo cuaderno de lectura.</li><li>Fichas listas para imprimir y usar en clase. Preguntas de búsqueda, lógica y redacción.</li><li>39 lecturas para 9 unidades didácticas. Más de 75 ilustraciones originales.</li><li>Formato sencillo: fichas de lectura. Textos inéditos acompañados de actividades de evaluación.</li></ul>', tipo:'lectura',
    icono:'imagenes/publicaciones/Lecturas - Matemáticas (1º y 2º ESO).jpg',
    enlace:'https://www.amazon.es/dp/B0G4MKKDBL', precio:'4,99 €', paginas:80, año:2024 },
  { id:'cuad_org', titulo:'Cuaderno de formulación orgánica', descripcion:'<ul style="padding-left:1.2em;margin:0;line-height:1.7;"><li>Práctico cuaderno para aprender a nombrar y formular especies orgánicas. Normativa IUPAC 2005.</li><li>Pensado para profesores y estudiantes de Secundaria y Bachillerato.</li><li>Fichas de actividades con tablas preparadas para imprimir y rellenar. Incluye solucionario completo.</li><li>Cuestionario online de autoevaluación. Ilustraciones de compuestos conocidos. Tablas-resumen.</li><li>Diseño limpio y directo. Contenido estructurado y de consulta rápida.</li><li>Tercera edición.</li></ul>', tipo:'cuaderno',
    icono:'imagenes/publicaciones/Cuaderno de formulación orgánica.jpg',
    enlace:'https://www.amazon.es/dp/B0DHKVB2D3', precio:'4,99 €', paginas:96, año:2024 },
];

function renderizarListadoPublicaciones() {
  const pagina = document.getElementById('pagina-listado');
  if (!pagina) return;

  const grupos = {
    libro: { titulo:'Libros de texto', items:[] },
    cuaderno: { titulo:'Cuadernos de actividades', items:[] },
    lectura: { titulo:'Fichas de lectura', items:[] },
  };
  PUBLICACIONES_DATA.forEach(p => {
    if (grupos[p.tipo]) grupos[p.tipo].items.push(p);
  });

  const ordenGrupos = ['libro', 'cuaderno', 'lectura'];
  const contenedor = pagina.querySelector('.pub-listado-contenedor') || pagina;

  let _grupoIdx = 0;
  ordenGrupos.forEach(tipo => {
    const g = grupos[tipo];
    if (!g.items.length) return;

    const grupoDiv = document.createElement('div');
    grupoDiv.className = 'pub-listado-grupo';

    const titulo = document.createElement('div');
    titulo.className = 'pub-listado-titulo';
    const ICONOS_GRUPO = { libro:'imagenes/menu/Libro de texto.webp', cuaderno:'imagenes/menu/Cuaderno.webp', lectura:'imagenes/menu/Lecturas.webp' };
    const iconoTitulo = document.createElement('img');
    iconoTitulo.src = ICONOS_GRUPO[tipo] || '';
    iconoTitulo.style.cssText = 'width:26px;height:26px;object-fit:contain;vertical-align:middle;margin-right:0px;flex-shrink:0;';
    titulo.style.cssText = 'display:flex;align-items:center;';
    titulo.appendChild(iconoTitulo);
    titulo.appendChild(document.createTextNode(g.titulo));
    grupoDiv.appendChild(titulo);

    g.items.forEach(p => {
      const item = document.createElement('div');
      item.className = 'pub-listado-item';
      const chevron = document.createElement('span');
      chevron.className = 'pub-listado-item-chevron';
      chevron.textContent = '›';
      const nombre = document.createElement('a');
      nombre.className = 'pub-listado-nombre';
      nombre.textContent = p.titulo;
      nombre.href = 'javascript:void(0)';
      nombre.onclick = () => mostrarFichaPublicacion(p);
      const meta = document.createElement('div');
      meta.className = 'pub-listado-meta';
      meta.textContent = p.descripcion + (p.año ? ' · ' + p.año : '');
      item.appendChild(chevron);
      item.appendChild(nombre);
      item.appendChild(meta);
      grupoDiv.appendChild(item);
    });

    if (_grupoIdx < 2) grupoDiv.style.marginBottom = '-0.6rem'; _grupoIdx++;
    contenedor.appendChild(grupoDiv);
  });
}

function openPaginaListado() {
  const pagina = document.getElementById('pagina-listado');
  if (!pagina) return;
  // Hide all panels
  document.querySelectorAll('.curso-tab').forEach(t => t.classList.remove('active'));
  activarPanel('pagina-listado');
  if (!pagina.dataset.rendered) {
    pagina.dataset.rendered = '1';
    renderizarListadoPublicaciones();
  }
}

function _barraPublicacionesGuardar(panel) {
  const barra = panel.querySelector('.barra-interna');
  if (barra && !barra.dataset.originalHtml) barra.dataset.originalHtml = barra.innerHTML;
}
function _barraPublicacionesRestaurar(panel) {
  const barra = panel.querySelector('.barra-interna');
  if (barra && barra.dataset.originalHtml) {
    barra.innerHTML = barra.dataset.originalHtml;
    delete barra.dataset.originalHtml;
  }
}

function _pubNavegar(delta) {
  const lista = PUB_PANEL_ORDENADAS;
  const idx = lista.findIndex(p => p === window._pubActual);
  if (idx < 0) return;
  const nuevoIdx = idx + delta;
  if (nuevoIdx < 0 || nuevoIdx >= lista.length) return;
  abrirFichaPublicacion(lista[nuevoIdx], true);
}

function abrirFichaPublicacion(pub, _navegando) {
  const panel = document.getElementById('panel-publicaciones');
  if (!panel) return;

  // Guardar y reemplazar barra interna con grupos PUBLICACIÓN + flechas
  _barraPublicacionesGuardar(panel);
  const barra = panel.querySelector('.barra-interna');
  if (barra) {
    const lista = PUB_PANEL_ORDENADAS;
    const idx = lista.findIndex(p => p === pub);
    const total = lista.length;
    const prevDis = idx <= 0;
    const nextDis = idx >= total - 1;
    const tipoLabel = pub.tipo === 'libro' ? 'LIBRO DE TEXTO' : pub.tipo === 'cuaderno' ? 'CUADERNO DE FORMULACIÓN' : 'LECTURAS';
    barra.innerHTML = `
      <span class="control-label" style="position:absolute;left:175px;top:50%;transform:translateY(-50%);">${tipoLabel}</span>
      <div class="control-group" style="left:1025px;">
        <span class="control-label">PUBLICACIÓN:</span>
        <span class="pagination-info" id="pub-ficha-info" style="display:flex;gap:0.5rem;align-items:center;color:#ffffff;white-space:nowrap;">${idx + 1} / ${total}</span>
      </div>
      <div class="control-group" style="left:1200px;">
        <button class="pagination-btn" id="pub-prev-btn" onclick="_pubNavegar(-1)" title="Publicación anterior" style="width:32px;height:32px;padding:0;" ${prevDis ? 'disabled' : ''}>
          <img src="imagenes/menu/Anterior.webp" alt="Anterior" style="width:100%;height:100%;object-fit:contain;">
        </button>
        <button class="pagination-btn" id="pub-next-btn" onclick="_pubNavegar(1)" title="Publicación siguiente" style="width:32px;height:32px;padding:0;" ${nextDis ? 'disabled' : ''}>
          <img src="imagenes/menu/Siguiente.webp" alt="Siguiente" style="width:100%;height:100%;object-fit:contain;">
        </button>
      </div>`;
    // Flip en el contador de publicación (solo al navegar, no al abrir por primera vez)
    const _pubInfo = document.getElementById('pub-ficha-info');
    const _gridTmp = panel.querySelector('.publicaciones-grid');
    if (_pubInfo && _gridTmp && _gridTmp.dataset.pubOpened) { _pubInfo.classList.remove('anim-flip'); void _pubInfo.offsetWidth; _pubInfo.classList.add('anim-flip'); }
    if (_gridTmp) _gridTmp.dataset.pubOpened = '1';
  }

  // Guardar y reemplazar sidebar
  const sidebar = panel.querySelector('.curso-sidebar');
  if (sidebar && !sidebar.dataset.originalHtml) sidebar.dataset.originalHtml = sidebar.innerHTML;
  if (sidebar) {
    sidebar.innerHTML = `
      <a class="sidebar-btn" href="javascript:void(0)" onclick="volverAPublicaciones()">
        <img src="imagenes/menu/Volver.png" alt="Volver a las publicaciones">
        <span>Volver a las publicaciones</span>
      </a>`;
    if (!_navegando) _animarSidebarPub(sidebar);
  }

  // Contenido: ficha de la publicación en el grid
  const grid = panel.querySelector('.publicaciones-grid');
  if (!grid) return;
  if (!grid.dataset.originalHtml) grid.dataset.originalHtml = grid.innerHTML;
  grid.innerHTML = '';
  grid.style.display = 'flex';
  grid.style.flexDirection = 'row';
  grid.style.alignItems = 'flex-start';
  grid.style.justifyContent = '';
  grid.style.gap = '0';
  grid.style.padding = window.location.pathname.endsWith('movil.html') ? '20px' : '10px 20px 20px 20px';
  grid.style.overflowY = 'auto';
  grid.classList.remove('slide-down-anim');
  requestAnimationFrame(() => grid.classList.add('slide-down-anim'));

  let nombre = pub.nombre;
  if (nombre.startsWith('Ingeniosas')) {
    nombre = 'Ingeniosas, inauditas e inéditas lecturas de matemáticas (1º y 2º ESO)';
  } else if (nombre.includes('Bachillerato') || nombre.includes('ESO')) {
    nombre = nombre.replace(' - ', '<br>');
  } else if (nombre.startsWith('Cuaderno de ')) {
    nombre = nombre.replace('Cuaderno de ', 'Cuaderno de<br>');
  }

  window._pubActual = pub;
  const muestrasHtml = pub.muestras && pub.muestras.length
    ? `<button class="control-btn control-btn-filter ancho-pub" onclick="mostrarMuestras(event, window._pubActual.muestras, window._pubActual.nombre)" style="margin-left:0.5rem;">
        <img src="imagenes/menu/Muestras.webp" alt="Ver muestras" style="width:28px;height:28px;object-fit:contain;">
        <span>Ver muestras</span>
      </button>`
    : '';

  grid.innerHTML = `
    <div style="flex:0 0 280px;width:280px;height:416px;display:flex;align-items:stretch;background:#ffffff;border-radius:10px;overflow:hidden;opacity:0;transform:translateX(-30px);animation:slideInLeft 0.35s ease forwards;margin:0 0 0 40px;">
      <img src="${pub.icono}" alt="${pub.nombre}" style="width:100%;height:100%;object-fit:contain;border:1px solid #999999;border-radius:10px;display:block;padding:0 5px;background:#ffffff;box-sizing:border-box;" onerror="this.style.display='none'">
    </div>
    <div style="flex:1;display:flex;flex-direction:column;font-family:'Roboto Condensed',sans-serif;height:416px;min-height:0;opacity:0;transform:translateX(30px);animation:slideInRight 0.35s ease forwards;animation-delay:0.05s;margin-left:-30px;">
      <div style="font-family:'Saira',sans-serif;font-size:1.1rem;font-weight:700;color:var(--accent);letter-spacing:0.08em;text-transform:uppercase;line-height:1.3;flex-shrink:0;padding-top:0.5rem;text-shadow:-0.5px -0.5px 0 #000,0.5px -0.5px 0 #000,-0.5px 0.5px 0 #000,0.5px 0.5px 0 #000;">${pub.nombre}</div>
      <div style="flex:1;min-height:0;overflow-y:auto;padding:0.4rem 0;display:flex;flex-direction:column;gap:0.4rem;">
        ${pub.descripcion ? `<div class="pub-descripcion" style="font-size:0.93rem;color:var(--text);line-height:1.6;">${pub.descripcion}</div>` : ''}
        ${pub.precio ? `<div style="font-size:0.93rem;color:#ffffff;">Precio: <strong>${pub.precio}</strong></div>` : ''}
        ${pub.paginas ? `<div style="font-size:0.93rem;color:var(--muted);">${pub.paginas} páginas${pub.año ? ' · ' + pub.año : ''}</div>` : ''}
      </div>
      <div style="flex-shrink:0;display:flex;flex-direction:row;align-items:center;gap:0;padding-bottom:0.5rem;">
        <a href="${pub.enlace}" target="_blank" rel="noopener" class="control-btn control-btn-filter ancho-pub" style="text-decoration:none;">
          <img src="imagenes/menu/Amazon.webp" alt="Amazon" style="width:28px;height:28px;object-fit:contain;">
          <span>Ver en Amazon</span>
        </a>
        ${muestrasHtml}
      </div>
    </div>`;
}

function mostrarMuestras(e, muestras, titulo) {
  e && e.stopPropagation();
  const prev = document.getElementById('overlay-muestras');
  if (prev) {
    prev.style.opacity = '0';
    prev.style.pointerEvents = 'none';
    setTimeout(() => prev.remove(), 250);
    return;
  }

  const overlay = document.createElement('div');
  overlay.id = 'overlay-muestras';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.82);z-index:300;display:flex;align-items:center;justify-content:center;padding:1.2rem;opacity:0;pointer-events:none;transition:opacity 0.25s;';
  overlay.onclick = (ev) => {
    if (ev.target === overlay) {
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
      setTimeout(() => overlay.remove(), 250);
    }
  };

  let idx = 0;
  const total = muestras.length;

  // Contenedor fijo (no se re-crea en cada render)
  const panel = document.createElement('div');
  panel.className = 'objeto-detail';
  panel.style.cssText = 'width:min(90vw,450px);display:flex;flex-direction:column;height:88vh;max-height:88vh;transform:scale(0.92) translateY(20px);transition:transform 0.3s cubic-bezier(.34,1.3,.64,1);';
  overlay.appendChild(panel);

  function render() {
    const prevDisabled = idx === 0;
    const nextDisabled = idx === total - 1;
    const tituloHtml = (titulo || 'Muestras').replace('inéditas lecturas', 'inéditas<br>lecturas');
    panel.innerHTML = `
      <div class="objeto-detail-title">
        <span style="flex:1;min-width:0;overflow:hidden;white-space:normal;line-height:1.3;">${tituloHtml}</span>
        <button class="objeto-detail-close" onclick="(function(){const o=document.getElementById('overlay-muestras');o.style.opacity='0';o.style.pointerEvents='none';setTimeout(()=>o.remove(),250);})()">
          <img src="imagenes/menu/Cerrar.webp" alt="Cerrar" style="width:100%;height:100%;object-fit:contain;">
        </button>
      </div>
      <div style="flex:1;min-height:0;overflow:hidden;border-radius:0 0 10px 10px;display:flex;align-items:center;justify-content:center;background:#ffffff;position:relative;">
        <img src="${muestras[idx]}" alt="Muestra ${idx+1}"
          style="display:block;max-height:calc(88vh - 43px);width:auto;height:auto;max-width:100%;"
          onerror="this.style.display='none'">
        <div id="muestras-flash" style="position:absolute;inset:0;background:#ffffff;opacity:0;pointer-events:none;"></div>
        <div style="position:absolute;bottom:14px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:0;background:rgba(0,0,0,0.55);backdrop-filter:blur(6px);border-radius:20px;padding:2px 6px;">
          ${!prevDisabled
            ? `<button class="pagination-btn" onclick="window._muestrasIdx--;window._muestrasRender()" style="margin:0;"><img src="imagenes/menu/Anterior.webp" alt="Anterior"></button>`
            : `<span style="width:27px;display:inline-block;visibility:hidden;"></span>`}
          <span id="muestras-counter" style="font-family:'Saira',sans-serif;font-size:0.89rem;color:#ffffff;white-space:nowrap;min-width:3.5rem;text-align:center;display:inline-block;font-variant-numeric:tabular-nums;font-weight:700;">${idx+1} / ${total}</span>
          ${!nextDisabled
            ? `<button class="pagination-btn" onclick="window._muestrasIdx++;window._muestrasRender()" style="margin:0;"><img src="imagenes/menu/Siguiente.webp" alt="Siguiente"></button>`
            : `<span style="width:27px;display:inline-block;visibility:hidden;"></span>`}
        </div>
      </div>`;
  }

  function handleWheel(ev) {
    ev.preventDefault();
    if (ev.deltaY > 0 && idx < total - 1) { window._muestrasIdx++; window._muestrasRender(); }
    else if (ev.deltaY < 0 && idx > 0) { window._muestrasIdx--; window._muestrasRender(); }
  }

  window._muestrasIdx = 0;
  window._muestrasRender = function() {
    idx = window._muestrasIdx;
    // Flash blanco: fade-in del overlay, swap imagen, fade-out
    const imgEl = panel.querySelector('img');
    const flashEl = panel.querySelector('#muestras-flash');
    if (imgEl && flashEl) {
      flashEl.style.transition = 'opacity 0.12s ease';
      flashEl.style.opacity = '1';
      setTimeout(() => {
        render();
        requestAnimationFrame(() => {
          const ctr = document.getElementById('muestras-counter');
          if (ctr) { ctr.classList.remove('anim-flip'); void ctr.offsetWidth; ctr.classList.add('anim-flip'); }
          const f = panel.querySelector('#muestras-flash');
          if (f) { f.style.transition = 'opacity 0.18s ease'; f.style.opacity = '0'; }
        });
      }, 120);
    } else {
      render();
      requestAnimationFrame(() => {
        const ctr = document.getElementById('muestras-counter');
        if (ctr) { ctr.classList.remove('anim-flip'); void ctr.offsetWidth; ctr.classList.add('anim-flip'); }
      });
    }
  };

  render();
  overlay.addEventListener('wheel', handleWheel, { passive:false });
  document.body.appendChild(overlay);
  // Animar entrada igual que objeto-detail-overlay
  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'auto';
    panel.style.transform = 'scale(1) translateY(0)';
  });
}

function volverAPublicaciones() {
  const panel = document.getElementById('panel-publicaciones');
  if (!panel) return;

  window._pubActual = null; // Limpiar ficha activa al volver al listado

  // Restaurar barra interna
  _barraPublicacionesRestaurar(panel);

  // Restaurar sidebar
  const sidebar = panel.querySelector('.curso-sidebar');
  if (sidebar && sidebar.dataset.originalHtml) {
    sidebar.innerHTML = sidebar.dataset.originalHtml;
    delete sidebar.dataset.originalHtml;
  }

  // Restaurar grid
  const grid = panel.querySelector('.publicaciones-grid');
  if (!grid) return;
  grid.style.display = '';
  grid.style.flexDirection = '';
  grid.style.alignItems = '';
  grid.style.gap = '';
  grid.style.padding = '';
  grid.style.overflowY = '';
  delete grid.dataset.originalHtml;
  delete grid.dataset.pubOpened;

  const activos = [...document.querySelectorAll('[data-pub-filter].active')].map(b => b.dataset.pubFilter);
  renderPublicaciones(activos);
}

function mostrarFichaPublicacion(pub) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.82);z-index:200;display:flex;align-items:center;justify-content:center;padding:1.2rem;';
  overlay.innerHTML = `<div style="background:var(--surface);border:1px solid #444;border-radius:20px;max-width:520px;width:100%;max-height:85vh;overflow:auto;padding:2rem;position:relative;font-family:'Roboto Condensed',sans-serif;">
    <button onclick="this.closest('div[style*=fixed]').remove()" style="position:absolute;top:0.7rem;right:0.7rem;width:30px;height:30px;border-radius:50%;background:rgba(0,0,0,0.6);border:1px solid #999999;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.97rem;">✕</button>
    <img src="${pub.icono}" alt="${pub.titulo}" style="width:120px;height:150px;object-fit:contain;float:left;margin-right:1.5rem;margin-bottom:1rem;">
    <div style="font-family:'Saira',sans-serif;font-size:1.1rem;font-weight:700;color:var(--accent);margin-bottom:0.5rem;">${pub.titulo}</div>
    <div style="font-size:0.9rem;color:var(--muted);margin-bottom:0.5rem;">${pub.descripcion}</div>
    ${pub.precio ? `<div style="font-size:0.9rem;color:#ffffff;margin-bottom:0.5rem;">Precio: <strong>${pub.precio}</strong></div>` : ''}
    ${pub.paginas ? `<div style="font-size:0.9rem;color:var(--muted);margin-bottom:0.5rem;">${pub.paginas} páginas · ${pub.año||''}</div>` : ''}
    <div style="clear:both;margin-top:1rem;">
      <a href="${pub.enlace}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.6rem 1.4rem;background:#ff9900;color:#000;border-radius:8px;font-family:'Saira',sans-serif;font-weight:700;text-decoration:none;font-size:0.95rem;">Amazon</a>
    </div>
  </div>`;
  overlay.addEventListener('click', (e) => { if(e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// ═══════════════════════════════════════════
// SOBRE EL AUTOR
// ═══════════════════════════════════════════
function mostrarAutor() {
  const panel = document.getElementById('panel-publicaciones');
  if (!panel) return;

  // Guardar y reemplazar barra interna
  _barraPublicacionesGuardar(panel);
  const barra = panel.querySelector('.barra-interna');
  if (barra) barra.innerHTML = `<span class="control-label" style="position:absolute;left:175px;top:50%;transform:translateY(-50%);">SOBRE EL AUTOR</span>`;

  // Guardar y reemplazar sidebar
  const sidebar = panel.querySelector('.curso-sidebar');
  if (sidebar && !sidebar.dataset.originalHtml) sidebar.dataset.originalHtml = sidebar.innerHTML;
  if (sidebar) {
    sidebar.innerHTML = `
      <a class="sidebar-btn" href="javascript:void(0)" onclick="volverAPublicaciones()">
        <img src="imagenes/menu/Volver.png" alt="Volver a las publicaciones">
        <span>Volver a las publicaciones</span>
      </a>`;
    _animarSidebarPub(sidebar);
  }

  // Contenido: página del autor — foto a la izquierda, textos a la derecha
  const grid = panel.querySelector('.publicaciones-grid');
  if (!grid) return;
  if (!grid.dataset.originalHtml) grid.dataset.originalHtml = grid.innerHTML;
  grid.innerHTML = '';
  grid.style.display = 'flex';
  grid.style.flexDirection = 'row';
  grid.style.alignItems = 'stretch';
  grid.style.gap = '2rem';
  grid.style.padding = window.location.pathname.endsWith('movil.html') ? '20px' : '10px 20px 20px 20px';
  grid.style.overflowY = 'auto';
  grid.classList.remove('slide-down-anim');
  requestAnimationFrame(() => grid.classList.add('slide-down-anim'));

  grid.innerHTML = `
    <div style="flex-shrink:0;display:flex;align-items:flex-start;padding-top:0;">
      <img src="imagenes/menu/Foto autor.webp" alt="Foto del autor" style="width:auto;height:140px;object-fit:cover;border-radius:12px;border:1px solid #999999;display:block;">
    </div>
    <div style="flex:1;display:flex;flex-direction:column;gap:0.4rem;font-family:'Roboto Condensed',sans-serif;justify-content:flex-start;padding-top:0;">
      <div style="font-family:'Saira',sans-serif;font-size:1.1rem;font-weight:700;color:var(--accent);letter-spacing:0.08em;text-transform:uppercase;line-height:1.3;text-shadow:-0.5px -0.5px 0 #000,0.5px -0.5px 0 #000,-0.5px 0.5px 0 #000,0.5px 0.5px 0 #000;">Jacinto Javier Fernández Herrera</div>
      <div style="font-size:0.93rem;color:var(--muted);">Profesor de Física y Química · Licenciado en Química</div>
      <div style="font-size:0.93rem;color:var(--text);line-height:1.7;">
        <p>Siempre he sentido una gran pasión por el mundo de la edición digital y la creación de contenidos educativos. A lo largo de los años he desarrollado un estilo propio basado en el cuidado visual, la claridad de los materiales y la búsqueda constante de nuevas formas de transmitir conocimientos de manera atractiva y accesible. Mi trabajo combina diseño, organización y creatividad, con el objetivo de transformar cada recurso en una experiencia útil y moderna para el alumnado.</p>
        <p>Como editor digital independiente, he trabajado en la elaboración y publicación de distintos materiales didácticos, entre ellos libros de texto, cuadernos de formulación y fichas de lectura orientadas a diferentes niveles educativos.</p>
      </div>
      <button class="control-btn control-btn-filter" onclick="_mostrarContactoAutor()" style="width:155px;margin-top:0.5rem;"><img src="imagenes/menu/Correo.png" alt=""><span>Contacto</span></button>
    </div>`;
}


function _publicacionesAbrirVistaInterna(barraLabel, gridHtml) {
  const panel = document.getElementById('panel-publicaciones');
  if (!panel) return;
  window._pubActual = null; // No hay ficha activa: desactivar rueda del ratón
  _barraPublicacionesGuardar(panel);
  const barra = panel.querySelector('.barra-interna');
  if (barra) barra.innerHTML = `<span class="control-label" style="position:absolute;left:175px;top:50%;transform:translateY(-50%);">${barraLabel}</span>`;
  const sidebar = panel.querySelector('.curso-sidebar');
  if (sidebar && !sidebar.dataset.originalHtml) sidebar.dataset.originalHtml = sidebar.innerHTML;
  if (sidebar) {
    sidebar.innerHTML = `
      <a class="sidebar-btn" href="javascript:void(0)" onclick="volverAPublicaciones()">
        <img src="imagenes/menu/Volver.png" alt="Volver a las publicaciones">
        <span>Volver a las publicaciones</span>
      </a>`;
    _animarSidebarPub(sidebar);
  }
  const grid = panel.querySelector('.publicaciones-grid');
  if (!grid) return;
  if (!grid.dataset.originalHtml) grid.dataset.originalHtml = grid.innerHTML;
  grid.innerHTML = '';
  grid.style.display = 'flex';
  grid.style.flexDirection = 'column';
  grid.style.alignItems = 'stretch';
  grid.style.gap = '0.5rem';
  grid.style.padding = window.location.pathname.endsWith('movil.html') ? '20px' : '10px 20px 20px 20px';
  grid.style.overflowY = 'auto';
  grid.classList.remove('slide-down-anim');
  requestAnimationFrame(() => grid.classList.add('slide-down-anim'));
  grid.innerHTML = gridHtml;
}

function mostrarListadoPublicaciones() {
  const grupos = [
    { titulo:'Libros de texto', tipos:['libro'], icono:'imagenes/menu/Libro de texto.webp' },
    { titulo:'Cuadernos de actividades', tipos:['cuaderno'], icono:'imagenes/menu/Cuaderno.webp' },
    { titulo:'Fichas de lectura', tipos:['lectura'], icono:'imagenes/menu/Lecturas.webp' },
  ];
  const html = grupos.map(g => {
    const items = PUB_PANEL_DATA.filter(p => g.tipos.includes(p.tipo));
    if (!items.length) return '';
    return `<div style="margin-bottom:0.8rem;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:0.3rem;"><img src="${g.icono}" alt="" style="width:22px;height:22px;object-fit:contain;flex-shrink:0;"><span style="font-family:'Saira',sans-serif;font-size:0.9rem;font-weight:700;color:var(--accent);letter-spacing:0.08em;text-transform:uppercase;text-shadow:-0.5px -0.5px 0 #000,0.5px -0.5px 0 #000,-0.5px 0.5px 0 #000,0.5px 0.5px 0 #000;">${g.titulo}</span></div>
      ${items.map((p,i) => `<div style="display:flex;align-items:center;gap:5px;padding:5px 0 5px 22px;"><span style="color:var(--accent);font-size:1.1rem;font-family:'Saira',sans-serif;font-weight:700;flex-shrink:0;line-height:1;">›</span><a href="javascript:void(0)" onclick="window._listadoPubs[${PUB_PANEL_DATA.indexOf(p)}]()" style="font-family:'Roboto Condensed',sans-serif;font-size:0.85rem;color:#ffffff;text-decoration:none;transition:color 0.2s;-webkit-tap-highlight-color:transparent;outline:none;" onmouseover="this.style.color='#38bdf8'" onmouseout="this.style.color='#ffffff'">${p.nombre}</a></div>`).join('')}
    </div>`;
  }).join('');
  // Registrar callbacks antes de inyectar HTML
  window._listadoPubs = PUB_PANEL_DATA.map(p => () => abrirFichaPublicacion(p));
  _publicacionesAbrirVistaInterna('LISTADO DE PUBLICACIONES', html);
}

function mostrarVersionesWeb() {
  const versiones = [
    {
      titulo: 'Versión 1.0 (Ver web)',
      url: 'https://jfhprofesor.github.io/temariov1/',
      items: [
        'Temario clasificado por cursos y unidades.',
        'Cada curso incluye: jornada de bienvenida y vídeo del temario.',
        'Cada unidad incluye: apuntes, formulario, cuestionarios y juegos.',
      ]
    },
    {
      titulo: 'Versión 2.0 (Ver web)',
      url: 'https://jfhprofesor.github.io/temariov2/',
      items: [
        'Añadida la colección de objetos (39).',
        'Nueva estructura y estética.',
      ]
    },
    {
      titulo: 'Versión 3.0',
      url: null,
      items: [
        'Nuevos iconos para algunos objetos.',
        'Nuevas imágenes para todas las unidades.',
        'Mejoras en la interfaz (rueda del ratón).',
        'Vídeos de algunos objetos (2).',
        'Vídeos para algunas unidades (14).',
        'Vídeos del temario integrados.',
        'Ampliación de la sección de Publicaciones con descripciones, enlaces e imágenes de muestra.',
      ]
    },
  ];
  const liStyle = 'padding-left:calc(1.2em + 5px);margin:0;line-height:1.7;';
  const html = versiones.map(v => {
    const tituloHtml = v.url
      ? `<a href="${v.url}" target="_blank" rel="noopener" style="font-family:'Saira',sans-serif;font-size:0.9rem;font-weight:700;color:var(--accent);letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;transition:color 0.2s;text-shadow:-0.5px -0.5px 0 #000,0.5px -0.5px 0 #000,-0.5px 0.5px 0 #000,0.5px 0.5px 0 #000;" onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='var(--accent)'">${v.titulo}</a>`
      : `<span style="font-family:'Saira',sans-serif;font-size:0.9rem;font-weight:700;color:var(--accent);letter-spacing:0.08em;text-transform:uppercase;text-shadow:-0.5px -0.5px 0 #000,0.5px -0.5px 0 #000,-0.5px 0.5px 0 #000,0.5px 0.5px 0 #000;">${v.titulo}</span>`;
    const listHtml = `<ul style="${liStyle}">${v.items.map(it => `<li style="color:#ffffff;font-family:'Roboto Condensed',sans-serif;font-size:0.93rem;">${it}</li>`).join('')}</ul>`;
    return `<div style="margin-bottom:5px;">
      <div style="margin-bottom:0.2rem;">${tituloHtml}</div>
      ${listHtml}
    </div>`;
  }).join('');
  _publicacionesAbrirVistaInterna('VERSIONES WEB', html);
}

let _salaControlAutorizado = false;

function openConsola() {
  if (!_salaControlAutorizado) {
    _mostrarPinSala();
    return;
  }
  _abrirSalaControl();
}

function _abrirSalaControl() {
  document.querySelectorAll('.curso-tab').forEach(t => t.classList.remove('active'));
  const panel = activarPanel('panel-consola');
  if (panel) renderConsola();
  const btnSala = document.getElementById('btn-sala-control');
  if (btnSala) {
    btnSala.classList.add('active');
    btnSala.classList.remove('tab-press');
    void btnSala.offsetWidth;
    btnSala.classList.add('tab-press');
    btnSala.addEventListener('animationend', () => btnSala.classList.remove('tab-press'), { once: true });
  }
}

function _mostrarPinSala() {
  const overlay = document.getElementById('pinSalaOverlay');
  if (!overlay) return;
  const digits = [0,1,2,3].map(i => document.getElementById('pinSala' + i));
  const btn = document.getElementById('pinSalaBtn');
  digits.forEach(d => { d.value = ''; d.style.borderColor = ''; });
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  const btnSala = document.getElementById('btn-sala-control');
  if (btnSala) {
    btnSala.classList.remove('tab-press');
    void btnSala.offsetWidth;
    btnSala.classList.add('tab-press');
    btnSala.addEventListener('animationend', () => btnSala.classList.remove('tab-press'), { once: true });
  }
  setTimeout(() => digits[0].focus(), 100);

  function getPIN() { return digits.map(d => d.value).join(''); }

  function bambalearSala(el, color, onDone) {
    el.style.background = color;
    const shake = [8,-8,6,-6,4,-4,0];
    let i = 0;
    const interval = setInterval(() => {
      el.style.transform = `translateX(${shake[i]}px)`;
      i++;
      if (i >= shake.length) { clearInterval(interval); el.style.transform = ''; if (onDone) onDone(); }
    }, 60);
  }

  function intentar() {
    const btnEl = document.getElementById('pinSalaBtn');
    const pin = getPIN();
    if (pin === '9445') {
      digits.forEach(d => d.style.borderColor = '#44cc88');
      const errEl = document.getElementById('pinSalaErr');
      if (errEl) { errEl.style.color = '#44cc88'; errEl.textContent = 'Código correcto.'; }
      bambalearSala(btnEl, '#44cc88', () => {
        btnEl.style.background = '';
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        if (errEl) { errEl.textContent = ''; errEl.style.color = '#ff6666'; }
        _salaControlAutorizado = true;
        // PIN universal: desbloquear también Classroom y botón sala en móvil
        ['2eso','3eso','4eso','1bach','2bachF','2bachQ'].forEach(id => { _classroomAcceso[id] = '9445'; });
        actualizarBotonesClassroom();
        const btnSala = document.getElementById('btn-sala-control');
        if (btnSala) btnSala.style.display = '';
        _abrirSalaControl();
      });
    } else {
      digits.forEach(d => { d.value = ''; d.style.borderColor = '#ff6666'; });
      const errEl = document.getElementById('pinSalaErr');
      if (errEl) errEl.textContent = 'Código incorrecto.';
      bambalearSala(btnEl, '#ff6666', () => {
        btnEl.style.background = '';
        digits[0].focus();
        setTimeout(() => { digits.forEach(d => d.style.borderColor = ''); if (errEl) errEl.textContent = ''; }, 600);
      });
    }
  }

  // Limpiar listeners anteriores clonando los elementos
  digits.forEach((d, i) => {
    const nd = d.cloneNode(true);
    d.parentNode.replaceChild(nd, d);
    digits[i] = nd;
    nd.addEventListener('input', () => {
      nd.value = nd.value.replace(/\D/g, '').slice(-1);
      if (nd.value && i < 3) digits[i+1].focus();
      if (getPIN().length === 4) intentar();
    });
    nd.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !nd.value && i > 0) digits[i-1].focus();
      if (e.key === 'Escape') { overlay.classList.remove('open'); document.body.style.overflow = ''; }
    });
  });
  const nb = document.getElementById('pinSalaBtn').cloneNode(true);
  document.getElementById('pinSalaBtn').parentNode.replaceChild(nb, document.getElementById('pinSalaBtn'));
  nb.addEventListener('click', intentar);
}

// filtros activos por curso: array de categorías grises (complementario)
const filtroCurso = {};

function renderTemaGrid(cursoId, soloFiltro) {
  const curso = CURSOS[cursoId];
  const grid = document.getElementById('grid-'+cursoId);
  if (!grid) return;

  const visibles = filtroCurso[cursoId] || [];

  // Si ya hay botones y solo cambia el filtro, solo actualizar clases sin reconstruir
  if (soloFiltro && grid.children.length === curso.temas.length) {
    const grisIdxsR = temarioReal[cursoId] || [];
    curso.temas.forEach((tema, idxReal) => {
      const btn = grid.children[idxReal];
      if (!btn) return;
      const esGrisPorFiltro = tema.cat && !visibles.includes(tema.cat);
      const esGrisPorTemario = temarioState[cursoId] === 'Real' && grisIdxsR.includes(idxReal + 1);
      btn.classList.toggle('tema-gris', esGrisPorFiltro || esGrisPorTemario);
    });
    return;
  }

  // Construcción inicial completa
  grid.innerHTML = '';
  grid.style.display = '';
  grid.style.gridTemplateColumns = '';

  const total = curso.temas.length;
  curso.temas.forEach((tema, idxReal) => {
    const btn = document.createElement('button');
    const esGris = tema.cat && !visibles.includes(tema.cat);
    btn.className = `unidad-ficha anim-entrada color-${cursoId}${tema.cat ? ' cat-'+tema.cat : ''}${esGris ? ' tema-gris' : ''}`;
    btn.style.setProperty('--d', idxReal);
    btn.onclick = function() { mostrarSubelementos(cursoId, idxReal, this); };
    btn.innerHTML = `<div class="unidad-icono"><img src="${tema.icono}" alt="${tema.nombre}" onerror="this.style.display='none'"></div><div class="unidad-numero-texto1">Unidad ${idxReal+1}</div><div class="unidad-nombre-texto2">${tema.nombre}</div>`;
    grid.appendChild(btn);
  });

  const cols = Math.ceil(total / 2) || 1;
  grid.style.gridTemplateColumns = `repeat(${cols},1fr)`;
}

function toggleFiltroCurso(btn) {
  const panel = btn.closest('.contenedor-grande--curso');
  if (!panel) return;
  const id = panel.id.replace('panel-', '');
  const f = btn.dataset.filter;
  // Inicializar solo si nunca se ha inicializado (undefined)
  if (filtroCurso[id] === undefined) {
    const cats = [...new Set((CURSOS[id]?.temas || []).map(t => t.cat).filter(Boolean))];
    filtroCurso[id] = [...cats];
  }
  const idx = filtroCurso[id].indexOf(f);
  if (idx >= 0) {
    filtroCurso[id].splice(idx, 1);
    btn.classList.remove('active');
  } else {
    filtroCurso[id].push(f);
    btn.classList.add('active');
  }
  pulsarBtn(btn);
  if (estadoGrids[id] === null) renderTemaGrid(id, true);
}

function buildGrids() {
  Object.entries(CURSOS).forEach(([id, curso]) => {
    estadoGrids[id] = null;

    // Inicializar con todas las categorías visibles
    const catsEnCurso = [...new Set(curso.temas.map(t => t.cat).filter(Boolean))];
    filtroCurso[id] = [...catsEnCurso];
    renderTemaGrid(id);
    actualizarUnidadInfo(id);

    const panel = document.getElementById('panel-'+id);
    if (!panel) return;

    // Rueda del ratón: navegar entre unidades si hay una abierta, entre cursos si no
    panel.addEventListener('wheel', (e) => {
      if (estadoGrids[id] === 'juegos') return;
      e.preventDefault();
      if (estadoGrids[id] === 'video') {
        // En sala de vídeos: navegar entre vídeos de cursos (igual que pulsar los iconos)
        const vidActivo = Object.keys(estadoGrids).find(cid => estadoGrids[cid] === 'video') || id;
        const idx = _CURSOS_ORDEN.indexOf(vidActivo);
        const next = e.deltaY > 0 ? _CURSOS_ORDEN[idx + 1] : _CURSOS_ORDEN[idx - 1];
        if (next) mostrarVideoTemario(next);
      } else if (typeof estadoGrids[id] === 'number') {
        if (e.deltaY > 0) unidadNext(id);
        else unidadPrev(id);
      } else {
        const idx = _CURSOS_ORDEN.indexOf(id);
        const next = e.deltaY > 0 ? _CURSOS_ORDEN[idx + 1] : _CURSOS_ORDEN[idx - 1];
        if (next) selectCurso(next, document.querySelector(`.curso-tab[onclick*="${next}"]`), true);
      }
    }, { passive: false });

    // Ocultar botones cuya cat no existe en este curso, activar los que sí
    const catBtns = panel.querySelectorAll('.control-btn-filter[data-filter="metodo"], .control-btn-filter[data-filter="fisica"], .control-btn-filter[data-filter="quimica"]');
    catBtns.forEach(btn => {
      const f = btn.dataset.filter;
      if (!catsEnCurso.includes(f)) { btn.style.display = 'none'; return; }
      btn.classList.add('active');
    });
  });
}

function mostrarSubelementos(cursoId, temaIdx, origenBtn, _skipSidebar) {
  const curso = CURSOS[cursoId];
  const tema = curso.temas[temaIdx];
  const grid = document.getElementById('grid-'+cursoId);

  estadoGrids[cursoId] = temaIdx;
  actualizarUnidadInfo(cursoId);

  // Capturar posición, imagen y resplandor del botón origen antes de borrar el grid
  let iconOrigen = null;
  let iconOrigenSrc = tema.icono;
  let iconOrigenShadow = 'inset 0 0 0 1px #999999';
  let btnOrigenRect = null;
  if (origenBtn) {
    btnOrigenRect = origenBtn.getBoundingClientRect();
    const iconEl = origenBtn.querySelector('.unidad-icono');
    if (iconEl) {
      iconOrigen = iconEl.getBoundingClientRect();
      const iconImgEl = iconEl.querySelector('img');
      if (iconImgEl && iconImgEl.src) iconOrigenSrc = iconImgEl.src;
      iconOrigenShadow = getComputedStyle(iconEl).boxShadow || iconOrigenShadow;
    }
  }

  grid.innerHTML = '';

  // Layout flex: columna izquierda (tema btn + subelementos) + columna derecha (imagen E)
  const layout = document.createElement('div');
  layout.style.cssText = 'display:flex; flex-direction:row; overflow:visible; height:100%; width:100%; padding:0; box-sizing:border-box; align-items:stretch;';

  // Columna izquierda: tema btn + subelementos
  const colIzq = document.createElement('div');
  colIzq.className = 'unidad-dentro-iconos';
  colIzq.style.cssText = 'flex:1; display:flex; flex-direction:column; overflow:visible; height:100%; padding:0; border:none; box-sizing:border-box; margin-right:10px;';

  // Botón del tema seleccionado (vista-sub)
  const btnTema = document.createElement('button');
  btnTema.className = `unidad-${cursoId}-ficha unidad-ficha-dentro`;
  btnTema.style.cssText = 'flex-shrink:0; padding-top:15px;';
  btnTema.onclick = () => volverATemas(cursoId);

  const circle = document.createElement('div');
  circle.className = 'unidad-icono';
  const img = document.createElement('img');
  img.src = tema.icono;
  img.alt = tema.nombre;
  img.onerror = function() { this.style.display='none'; };
  circle.appendChild(img);

  const numLabel = document.createElement('div');
  numLabel.className = 'unidad-numero-texto1';
  numLabel.textContent = 'Unidad ' + (temaIdx+1);
  const label = document.createElement('div');
  label.className = 'unidad-nombre-texto2';
  label.textContent = tema.nombre;

  btnTema.appendChild(circle);
  btnTema.appendChild(numLabel);
  btnTema.appendChild(label);
  colIzq.appendChild(btnTema);

  // Grid 3 columnas: Apuntes | Cuestionarios | Juegos
  const subRow = document.createElement('div');
  subRow.className = 'ficha-actividades ficha-actividades--unidad';
  subRow.style.cssText = 'opacity:0;';

  // Columnas por tipo: col1=apuntes, col2=cuestionarios, col3=juegos
  // Cada botón va directo al grid con grid-column asignado
  const COL_APUNTES  = ['online','presentacion_online','formulario'];
  const COL_CUESTION = ['google','formulacion'];
  const COL_JUEGOS   = ['kahoot_grupo','kahoot_solo','pasapalabra'];
  const TIPO_A_COL   = {};
  COL_APUNTES .forEach(t => TIPO_A_COL[t] = 1);
  COL_CUESTION.forEach(t => TIPO_A_COL[t] = 2);
  COL_JUEGOS  .forEach(t => TIPO_A_COL[t] = 3);

  // Etiquetas renombradas según curso
  function getLabelUnidad(e) {
    if (e.tipo === 'online')              return cursoId === '2eso' ? 'Ver presentación' : 'Ver apuntes';
    if (e.tipo === 'presentacion_online') return cursoId === '2eso' ? 'Ver presentación' : 'Ver apuntes';
    if (e.tipo === 'formulario')          return 'Formulario';
    return e.label || e.tipo.replace(/_/g,' ');
  }

  // Construir URL de edición para kahoot y google
  function getEditUrl(tipo, url, enlaceEditUrl) {
    if (enlaceEditUrl) return enlaceEditUrl;
    if (tipo === 'kahoot_grupo' || tipo === 'kahoot_solo') {
      const m = url.match(/quizId=([a-f0-9-]+)/i);
      return m ? `https://create.kahoot.it/details/${m[1]}` : null;
    }
    if (tipo === 'google') return url.replace('/viewform', '/edit');
    return null;
  }

  // Crear botón individual colocado en la columna y fila correcta del grid
  function crearBtnEnlace(e, i, row) {
    const col = TIPO_A_COL[e.tipo];
    if (!col) return null; // tipo desconocido: ignorar
    const btn = document.createElement('button');
    btn.className = `objeto-ficha anim-entrada color-${cursoId}`;
    btn.style.setProperty('--d', i);
    btn.style.gridColumn = String(col);
    if (row) btn.style.gridRow = String(row);
    btn.dataset.colFiltro = col === 1 ? 'apuntes' : col === 2 ? 'cuestionarios' : 'juegos';
    const editUrl = getEditUrl(e.tipo, e.url, e.editUrl);
    console.log('editUrl:', editUrl, '| tipo:', e.tipo, '| e.editUrl:', e.editUrl);
    btn.onclick = (event) => {
      event.stopPropagation();
      if (event.ctrlKey && editUrl) { const a = document.createElement('a'); a.href = editUrl; a.target = '_blank'; a.rel = 'noopener'; document.body.appendChild(a); a.click(); document.body.removeChild(a); return; }
      const tiposProtegidos = ['online','presentacion_online','formulario'];
      if (tiposProtegidos.includes(e.tipo) && typeof pedirCodigoClassroomYAbrir === 'function') {
        pedirCodigoClassroomYAbrir(cursoId, e.url);
      } else {
        window.open(e.url, '_blank');
      }
         };
    const iconSrc = ICONOS[e.tipo] || '';
    const nombre = getLabelUnidad(e);
    const oCircle = document.createElement('div');
    oCircle.className = 'objeto-icono';
    oCircle.style.position = 'relative';
    const oImg = document.createElement('img');
    oImg.src = iconSrc; oImg.alt = nombre;
    oImg.onerror = function() { this.style.display='none'; };
    oCircle.appendChild(oImg);
    // Overlay "Editar" (Ctrl+hover) para kahoot y google
    if (editUrl) {
      const editOverlay = document.createElement('div');
      editOverlay.style.cssText = 'position:absolute;inset:0;border-radius:50%;background:rgba(0,0,0,0.72);display:flex;align-items:center;justify-content:center;color:#ffd700;font-size:0.85rem;font-family:Saira,sans-serif;font-weight:700;letter-spacing:0.05em;opacity:0;pointer-events:none;transition:opacity 0.15s;text-shadow:-0.6px -0.6px 0 #000,0.6px -0.6px 0 #000,-0.6px 0.6px 0 #000,0.6px 0.6px 0 #000;';
      editOverlay.textContent = 'Editar';
      oCircle.appendChild(editOverlay);
      btn.addEventListener('mouseenter', ev => { if (ev.ctrlKey) editOverlay.style.opacity = '1'; });
      btn.addEventListener('mouseleave', () => { editOverlay.style.opacity = '0'; });
      btn.addEventListener('mousemove', ev => { editOverlay.style.opacity = ev.ctrlKey ? '1' : '0'; });
      document.addEventListener('keydown', ev => { if (ev.key === 'Control' && btn.matches(':hover')) editOverlay.style.opacity = '1'; }, { passive:true });
      document.addEventListener('keyup',   ev => { if (ev.key === 'Control') editOverlay.style.opacity = '0'; }, { passive:true });
    }
    const oTema = document.createElement('div');
    oTema.className = 'objeto-nombre-texto1';
    oTema.textContent = nombre;
    btn.appendChild(oCircle); btn.appendChild(oTema);
    return btn;
  }

  if (!tema.enlaces || tema.enlaces.length === 0) {
    subRow.style.setProperty('--fa-cols', '1');
    const ph = document.createElement('div');
    ph.style.cssText = 'grid-column:1; display:flex; align-items:center; justify-content:center; color:var(--muted); font-size:0.8rem;';
    ph.textContent = '—';
    subRow.appendChild(ph);
  } else {
    // Calcular qué columnas lógicas (1=apuntes, 2=cuestionarios, 3=juegos) tienen items
    const colsUsadas = new Set();
    tema.enlaces.forEach(e => { const c = TIPO_A_COL[e.tipo]; if (c) colsUsadas.add(c); });
    const colsOrdenadas = [...colsUsadas].sort(); // ej. [1,3] o [1,2,3]
    const numCols = colsOrdenadas.length;
    subRow.style.setProperty('--fa-cols', String(numCols));
    // Mapear columna lógica → posición real en el grid (1..numCols)
    const colMap = {};
    colsOrdenadas.forEach((c, i) => { colMap[c] = i + 1; });

    // Ordenar: apuntes primero, luego cuestionarios, luego juegos
    const enlacesOrdenados = [...tema.enlaces].sort((a,b) => (TIPO_A_COL[a.tipo]||9) - (TIPO_A_COL[b.tipo]||9));
    const rowCount = {1:0, 2:0, 3:0};
    enlacesOrdenados.forEach((e, i) => {
      const colLogica = TIPO_A_COL[e.tipo];
      if (!colLogica) return;
      rowCount[colLogica] = (rowCount[colLogica] || 0) + 1;
      const row = Math.min(rowCount[colLogica], 2);
      const btn = crearBtnEnlace(e, i, row);
      if (btn) {
        btn.style.gridColumn = String(colMap[colLogica]); // posición real
        subRow.appendChild(btn);
      }
    });
  }

  colIzq.appendChild(subRow);

  // Contenedor derecho: vídeo (ancho proporcional a la altura disponible) o imagen (ancho natural)
  const imagenEDiv = document.createElement('div');
  imagenEDiv.className = 'unidad-imagen';
  imagenEDiv.style.cssText = 'overflow:hidden; padding:10px; box-sizing:border-box; height:100%; flex:0 0 660px; width:660px; margin-left:auto;';
  imagenEDiv.style.opacity = '0';
  imagenEDiv.style.transition = 'none';

  // Imagen/vídeo grande: XXE - Kahoot o XXF - Vídeo del curso (carpeta según cursoId, número según temaIdx)
  const _carpetasCurso = {'2eso':'2ESO','3eso':'3ESO','4eso':'4ESO','1bach':'1BACH','2bachF':'2BACHF','2bachQ':'2BACHQ'};
  const _carpeta = _carpetasCurso[cursoId] || '';
  const _num = String(temaIdx + 1).padStart(2, '0');
  // Cursos y unidades con vídeo F disponible en carpeta local
  const _videosF = {
    '2eso':   [1,2,3,4,5,6,7,8],
    '3eso':   [1,2,3,4,5,6,7,8],
    '4eso':   [1,2,3,4,5,6,7,8,9,10,11,12,13],
    '1bach':  [1,2,3,4,5,6,7,8,9,10,11,12],
    '2bachF': [1,2,3,4,5,6,7,8,9,10,11,12,13],
    '2bachQ': [1,2,3,4,5,6,7,8,9,10,11]
  };
  const _numInt = temaIdx + 1;
  const _tieneVideoF = _carpeta && _videosF[cursoId] && _videosF[cursoId].includes(_numInt);
  const mediaStyle = 'width:100%; height:100%; object-fit:cover; border:1px solid #999999; border-radius:10px; box-sizing:border-box; display:block;';
  if (_carpeta) {
    if (_tieneVideoF) {
      const vid = document.createElement('video');
      vid.src = `imagenes/${_carpeta}/${_num}F - Vídeo.mp4`;
      vid.autoplay = true;
      vid.loop = true;
      vid.muted = true;
      vid.playsInline = true;
      vid.setAttribute('playsinline', '');
      vid.style.cssText = mediaStyle;
      imagenEDiv.appendChild(vid);
    } else {
      const imgE = document.createElement('img');
      imgE.alt = tema.nombre;
      imgE.style.cssText = mediaStyle;
      // Intentar .png primero; si falla, .jpeg
      imgE.src = `imagenes/${_carpeta}/${_num}E - Kahoot.webp`;
      imgE.onerror = function() {
        if (!this._triedJpeg) {
          this._triedJpeg = true;
          this.src = `imagenes/${_carpeta}/${_num}E - Kahoot.webp`;
        } else {
          this.style.display = 'none';
        }
      };
      imagenEDiv.appendChild(imgE);
    }
  }

  // Iconos a la izquierda, imagen a la derecha
  layout.appendChild(colIzq);
  layout.appendChild(imagenEDiv);
  grid.appendChild(layout);


  // Animación: solo el círculo vuela — sin textos durante el vuelo
  if (btnOrigenRect && iconOrigen) {
    requestAnimationFrame(() => {
      const destCircle = btnTema.querySelector('.unidad-icono');
      if (!destCircle) return;

      const destCircleRect = destCircle.getBoundingClientRect();

      // Ocultar todo el btnTema (círculo + textos) hasta que llegue el clon
      btnTema.style.opacity = '0';
      btnTema.style.visibility = 'hidden';
      // Ocultar textos por separado para fade-in independiente
      const destNum    = btnTema.querySelector('.unidad-numero-texto1');
      const destNombre = btnTema.querySelector('.unidad-nombre-texto2');
      if (destNum)    { destNum.style.opacity    = '0'; destNum.style.transition    = 'none'; }
      if (destNombre) { destNombre.style.opacity = '0'; destNombre.style.transition = 'none'; }

      // Escala uniforme: círculo origen → círculo destino
      const escala = destCircleRect.width / iconOrigen.width;

      // El clon es solo el círculo, posicionado exactamente sobre el origen
      const origenCX = iconOrigen.left + iconOrigen.width  / 2;
      const origenCY = iconOrigen.top  + iconOrigen.height / 2;
      const destCX   = destCircleRect.left + destCircleRect.width  / 2;
      const destCY   = destCircleRect.top  + destCircleRect.height / 2;
      const dxFinal  = destCX - origenCX;
      const dyFinal  = destCY - origenCY;

      // Extraer color del glow del box-shadow para filter:drop-shadow
      // El box-shadow computado tiene formato: "rgba(r, g, b, a) 0px 0px Xpx 0px"  o  "0 0 Xpx rgba(...)"
      const glowMatch = iconOrigenShadow.match(/rgba?\([^)]+\)\s+0(?:px)?\s+0(?:px)?\s+[\d.]+px|0(?:px)?\s+0(?:px)?\s+[\d.]+px\s+(rgba?\([^)]+\))/i);
      // Buscar cualquier rgba con alpha > 0 que no sea el inset
      const rgbaMatches = iconOrigenShadow.match(/rgba?\([^)]+\)/g) || [];
      // El glow suele ser el último rgba con valor de blur mayor (ignorar el inset que es el primero)
      const glowColor = rgbaMatches.length > 1 ? rgbaMatches[rgbaMatches.length - 1]
                      : rgbaMatches.length === 1 ? rgbaMatches[0]
                      : 'rgba(255,255,255,0.6)';
      const glowFilter = `drop-shadow(0 0 8px ${glowColor}) drop-shadow(0 0 16px ${glowColor})`;

      // Wrapper exterior: solo tiene filter (no overflow:hidden) para que el glow no se recorte
      const clonWrapper = document.createElement('div');
      clonWrapper.style.cssText = [
        'position:fixed',
        `left:${iconOrigen.left}px`,
        `top:${iconOrigen.top}px`,
        `width:${iconOrigen.width}px`,
        `height:${iconOrigen.height}px`,
        'z-index:9999',
        'pointer-events:none',
        'transition:none',
        'will-change:transform',
        'transform-origin:center center',
        `filter:${glowFilter}`,
        'overflow:visible',
      ].join(';');

      // Clon interior: círculo con imagen recortada (el borde/box-shadow del origen se mantiene visible)
      const clon = document.createElement('div');
      clon.style.cssText = [
        'width:100%',
        'height:100%',
        'border-radius:50%',
        'background:#000000',
        'overflow:hidden',
        'box-sizing:border-box',
        'position:relative',
        `box-shadow:${iconOrigenShadow}`,
      ].join(';');

      const clonImg = document.createElement('img');
      clonImg.src = iconOrigenSrc;
      clonImg.alt = tema.nombre;
      clonImg.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.20);';
      clon.appendChild(clonImg);
      clonWrapper.appendChild(clon);

      document.body.appendChild(clonWrapper);

      // Activar transición en el siguiente frame
      requestAnimationFrame(() => {
        clonWrapper.style.transition = 'transform 0.45s cubic-bezier(0.4,0,0.2,1)';
        clonWrapper.style.transform = `translate(${dxFinal}px, ${dyFinal}px) scale(${escala})`;

        clonWrapper.addEventListener('transitionend', () => {
          clonWrapper.remove();
          // Mostrar solo el círculo del btnTema primero (textos siguen ocultos)
          btnTema.style.visibility = '';
          btnTema.style.transition = 'none';
          btnTema.style.opacity = '1';
          // Textos aparecen con fade después
          setTimeout(() => {
            if (destNum) {
              destNum.style.transition = 'opacity 1s ease';
              destNum.style.opacity = '1';
              destNum.classList.add('texto-shine');
              destNum.addEventListener('animationend', () => destNum.classList.remove('texto-shine'), { once: true });
            }
            if (destNombre) {
              destNombre.style.transition = 'opacity 1s ease';
              destNombre.style.opacity = '1';
              destNombre.classList.add('texto-shine');
              destNombre.addEventListener('animationend', () => destNombre.classList.remove('texto-shine'), { once: true });
            }
          }, 80);
          // Fade-in lento del resto
          subRow.style.transition = 'opacity 1s ease 0.5s';
          subRow.style.opacity = '1';
          imagenEDiv.style.transition = 'opacity 1s ease 0.5s';
          imagenEDiv.style.opacity = '1';
          imagenEDiv.classList.add('anim-slide-der');
        }, { once: true });
      });
    });
  }

  // Fade-in de todo (solo si no hay animación de vuelo)
  if (!btnOrigenRect) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        subRow.style.transition = 'opacity 1s ease 0.5s';
        subRow.style.opacity = '1';
        imagenEDiv.style.transition = 'opacity 1s ease 0.5s';
        imagenEDiv.style.opacity = '1';
        imagenEDiv.classList.add('anim-slide-der');
      });
    });
  }

  // Override grid style
  grid.style.display = 'block';
  grid.style.gridTemplateColumns = '';

  // Cambiar botones de filtro a Apuntes/Cuestionarios/Juegos en vista unidad
  const panel = document.getElementById('panel-'+cursoId);
  if (panel) {
    const filterGroup = panel.querySelector('.barra-interna .control-group [data-filter="metodo"]')?.closest('.control-group');
    if (filterGroup && !filterGroup.dataset.modoUnidad) {
      filterGroup.dataset.modoUnidad = '1';
      filterGroup.dataset.originalHtml = filterGroup.innerHTML;
      filterGroup.innerHTML = `
        <span class="control-label">FILTRO:</span>
        <button class="control-btn control-btn-filter active" data-col-filter="apuntes" onclick="filtrarColumnaUnidad(this,'apuntes')"><img src="imagenes/menu/Apuntes.webp" alt=""><span>Apuntes</span></button>
        <button class="control-btn control-btn-filter active" data-col-filter="cuestionarios" onclick="filtrarColumnaUnidad(this,'cuestionarios')"><img src="imagenes/menu/Cuestionarios.webp" alt=""><span>Cuestionarios</span></button>
        <button class="control-btn control-btn-filter active" data-col-filter="juegos" onclick="filtrarColumnaUnidad(this,'juegos')"><img src="imagenes/menu/Juegos.webp" alt=""><span>Juegos</span></button>
      `;
    }
  }

  // Reemplazar sidebar con botón volver al curso (solo si no viene de navegación prev/next en móvil)
  const panelCurso = document.getElementById('panel-'+cursoId);
  if (panelCurso && !_skipSidebar) {
    const sidebar = panelCurso.querySelector('.curso-sidebar');
    if (sidebar && !sidebar.dataset.originalHtml) {
      sidebar.dataset.originalHtml = sidebar.innerHTML;
    }
    if (sidebar) {
      sidebar.innerHTML = `
        <a class="sidebar-btn" href="javascript:void(0)" onclick="volverATemas('${cursoId}')">
          <img src="imagenes/menu/Volver.png" alt="Volver al curso">
          <span>Volver al curso</span>
        </a>`;
      // Animar solo al entrar desde el grid, no al navegar prev/next
      if (origenBtn) _animarSidebarUnidad(sidebar);
    }
  }

  document.body.classList.add('en-unidad');

  // Debug visual desactivado
  // setTimeout(() => mostrarDebugUnidad(layout, colIzq, btnTema, subRow, imagenEDiv), 100);
}

function mostrarDebugUnidad(layout, colIzq, btnTema, subRow, imagenEDiv) {
  document.querySelectorAll('.debug-unidad-box').forEach(el => el.remove());

  function marcar(texto, el, color) {
    const r = el.getBoundingClientRect();
    const d = document.createElement('div');
    d.className = 'debug-unidad-box';
    d.style.cssText = [
      'position:fixed',
      `left:${Math.round(r.left)}px`,
      `top:${Math.round(r.top)}px`,
      `width:${Math.round(r.width)}px`,
      `height:${Math.round(r.height)}px`,
      `outline:2px solid ${color}`,
      `outline-offset:-1px`,
      'z-index:8888',
      'pointer-events:none',
      'box-sizing:border-box',
      'background:transparent',
    ].join(';');
    const tag = document.createElement('div');
    tag.style.cssText = `position:absolute;top:0;left:0;background:${color};color:#000;font-size:9px;font-family:monospace;font-weight:700;padding:1px 3px;line-height:1.3;white-space:nowrap;`;
    tag.textContent = `${texto} ${Math.round(r.width)}×${Math.round(r.height)}`;
    d.appendChild(tag);
    document.body.appendChild(d);
  }

  marcar('layout', layout, '#ff0');
  marcar('colIzq', colIzq, '#0f0');
  marcar('btnTema', btnTema, '#0ff');
  marcar('subRow', subRow, '#f80');
  marcar('imagenEDiv', imagenEDiv, '#f0f');
}
window.mostrarDebugUnidad = mostrarDebugUnidad;

// Limpiar cuadros debug al volver al curso
function limpiarDebugUnidad() {
  document.querySelectorAll('.debug-unidad-box').forEach(el => el.remove());
}
window.limpiarDebugUnidad = limpiarDebugUnidad;

function volverDesdeUnidad() {
  // Detecta el panel de curso activo y vuelve a su vista de temas
  const panelActivo = document.querySelector('.contenedor-grande--curso.active');
  if (!panelActivo) return;
  const cursoId = panelActivo.id.replace('panel-', '');
  volverATemas(cursoId);
}

function filtrarColumnaUnidad(btnEl, col) {
  btnEl.classList.toggle('active');
  pulsarBtn(btnEl);
  const isActive = btnEl.classList.contains('active');
  const grid = document.querySelector('.ficha-actividades--unidad');
  if (!grid) return;
  Array.from(grid.children).forEach(cell => {
    if (cell.dataset.colFiltro === col) {
      cell.classList.toggle('col-filtro-off', !isActive);
    }
  });
}

const _CURSOS_ORDEN = ['2eso','3eso','4eso','1bach','2bachF','2bachQ'];
const _JUEGOS_ORDEN = Object.keys(JUEGOS);
function _juegoPrevCurso(cursoId) { const i = _JUEGOS_ORDEN.indexOf(cursoId); return i > 0 ? _JUEGOS_ORDEN[i-1] : null; }
function _juegoNextCurso(cursoId) { const i = _JUEGOS_ORDEN.indexOf(cursoId); return i < _JUEGOS_ORDEN.length-1 ? _JUEGOS_ORDEN[i+1] : null; }

function volverATemas(cursoId) {
  estadoGrids[cursoId] = null;
  document.body.classList.remove('en-unidad');
  limpiarDebugUnidad();

  // Eliminar grupos de juegos y restaurar grupos nativos
  const barraJuegos = document.getElementById('panel-' + cursoId)?.querySelector('.barra-interna');
  if (barraJuegos) {
    // Restaurar grupo TEMARIO si estaba oculto en modo juegos
    const temarioGroupRestore = barraJuegos.querySelector('.control-group [data-sort]')?.closest('.control-group');
    if (temarioGroupRestore) temarioGroupRestore.style.display = '';
    const gJ1 = barraJuegos.querySelector('#juegos-curso-group');
    const gJ2 = barraJuegos.querySelector('#juegos-flechas-group');
    if (gJ1) gJ1.remove();
    if (gJ2) gJ2.remove();
    const unidadPagEl = barraJuegos.querySelector('[id^="unidad-pagina-"]');
    const unidadFlechasEl = barraJuegos.querySelector('[id^="unidad-flechas-"]');
    if (unidadPagEl) unidadPagEl.style.visibility = '';
    if (unidadFlechasEl) unidadFlechasEl.style.visibility = '';
    // Restaurar grupos estáticos PÁGINA y flechas del curso
    const cursoPagEl = barraJuegos.querySelector('[id^="curso-pagina-group-"]');
    const cursoFlechasEl = barraJuegos.querySelector('[id^="curso-flechas-group-"]');
    if (cursoPagEl) cursoPagEl.style.visibility = '';
    if (cursoFlechasEl) cursoFlechasEl.style.visibility = '';
  }

  // Restaurar barra interna si fue reemplazada por modo vídeo temario
  const barraRestore = document.getElementById('panel-' + cursoId)?.querySelector('.barra-interna');
  if (barraRestore && barraRestore._prevHtml) {
    barraRestore.innerHTML = barraRestore._prevHtml;
    delete barraRestore._prevHtml;
  }

  // Actualizar info de paginación DESPUÉS de restaurar la barra (para que existan los elementos)
  actualizarUnidadInfo(cursoId);

  // Restaurar sidebar
  const panel = document.getElementById('panel-'+cursoId);
  if (panel) {
    const sidebar = panel.querySelector('.curso-sidebar');
    if (sidebar && sidebar.dataset.originalHtml) {
      sidebar.innerHTML = sidebar.dataset.originalHtml;
      delete sidebar.dataset.originalHtml;
    }
  }

  // Restaurar botones de filtro originales
  if (panel) {
    const filterGroup = panel.querySelector('.control-group[data-modo-unidad="1"], .control-group[data-modo-juegos="1"]');
    if (filterGroup && filterGroup.dataset.originalHtml) {
      filterGroup.innerHTML = filterGroup.dataset.originalHtml;
      delete filterGroup.dataset.modoUnidad;
      delete filterGroup.dataset.modoJuegos;
      delete filterGroup.dataset.originalHtml;
      const catBtns2 = panel.querySelectorAll('.control-btn-filter[data-filter="metodo"], .control-btn-filter[data-filter="fisica"], .control-btn-filter[data-filter="quimica"]');
      catBtns2.forEach(btn => {
        btn.classList.toggle('active', (filtroCurso[cursoId] || []).includes(btn.dataset.filter));
      });
    }
  }

  renderTemaGrid(cursoId);
}

// ── Paginación de unidades ──────────────────────────────────────────────────
function actualizarUnidadInfo(cursoId) {
  const paginaEl  = document.getElementById('unidad-pagina-' + cursoId);
  const infoEl    = document.getElementById('unidad-info-' + cursoId);
  const flechasEl = document.getElementById('unidad-flechas-' + cursoId);
  const prevBtn   = document.getElementById('unidad-prev-' + cursoId);
  const nextBtn   = document.getElementById('unidad-next-' + cursoId);

  const estado = estadoGrids[cursoId];
  const total  = (CURSOS[cursoId]?.temas || []).length;

  // Grupos estáticos PÁGINA/flechas del curso (navegación entre cursos)
  const cursoPagGrp    = document.getElementById('curso-pagina-group-' + cursoId);
  const cursoFlechasGrp = document.getElementById('curso-flechas-group-' + cursoId);
  // Grupo TEMARIO (solo en cursos que lo tienen, ej. 3eso)
  const panelEl = document.getElementById('panel-' + cursoId);
  const temarioGrp = panelEl ? panelEl.querySelector('.barra-interna .control-group [data-sort]')?.closest('.control-group') : null;
  // Grupo FILTRO normal (Método/Física/Química)
  const filtroGrp = panelEl ? panelEl.querySelector('.barra-interna .control-group [data-filter]')?.closest('.control-group') : null;
  // Grupo FILTRO columnas (Apuntes/Cuestionarios/Juegos) — se crea dinámicamente
  const colFiltroGrp = panelEl ? panelEl.querySelector('.barra-interna .control-group [data-col-filter]')?.closest('.control-group') : null;

  const _esMobil = window.location.pathname.endsWith('movil.html');
  function _mostrar(el) { if (!el) return; if (_esMobil) { el.style.opacity = '1'; el.style.pointerEvents = ''; } else { el.style.visibility = ''; } }
  function _ocultar(el) { if (!el) return; if (_esMobil) { el.style.opacity = '0'; el.style.pointerEvents = 'none'; } else { el.style.visibility = 'hidden'; } }

  if (typeof estado === 'number') {
    // Dentro de una unidad: mostrar UNIDAD, ocultar PÁGINA del curso, TEMARIO y FILTROs
    _ocultar(cursoPagGrp);
    _ocultar(cursoFlechasGrp);
    _ocultar(temarioGrp);
    _ocultar(filtroGrp);
    _ocultar(colFiltroGrp);
    _mostrar(paginaEl);
    if (infoEl) {
      infoEl.textContent = (estado + 1) + ' / ' + total;
      if (infoEl._flipReady) {
        infoEl.classList.remove('anim-flip');
        void infoEl.offsetWidth;
        infoEl.classList.add('anim-flip');
      } else {
        infoEl._flipReady = true;
      }
    }
    _mostrar(flechasEl);
    if (prevBtn) { _mostrar(prevBtn); prevBtn.disabled = (estado === 0); }
    if (nextBtn) { _mostrar(nextBtn); nextBtn.disabled = (estado === total - 1); }
  } else {
    // Vista de temas: mostrar PÁGINA del curso, TEMARIO y FILTRO, ocultar UNIDAD
    _mostrar(cursoPagGrp);
    _mostrar(cursoFlechasGrp);
    _mostrar(temarioGrp);
    _mostrar(filtroGrp);
    _ocultar(colFiltroGrp);
    _ocultar(paginaEl);
    _ocultar(flechasEl);
    _ocultar(prevBtn);
    _ocultar(nextBtn);
  }
}

function unidadPrev(cursoId) {
  const estado = estadoGrids[cursoId];
  if (typeof estado !== 'number' || estado <= 0) return;
  _navegarUnidadMovil(cursoId, estado - 1);
}

function unidadNext(cursoId) {
  const estado = estadoGrids[cursoId];
  const total  = (CURSOS[cursoId]?.temas || []).length;
  if (typeof estado !== 'number' || estado >= total - 1) return;
  _navegarUnidadMovil(cursoId, estado + 1);
}

function _navegarUnidadMovil(cursoId, nuevoIdx) {
  const esMobil = window.location.pathname.endsWith('movil.html');
  if (!esMobil) { mostrarSubelementos(cursoId, nuevoIdx); return; }

  // En móvil: actualizar solo icono, número, nombre y flechas sin reconstruir sidebar
  const tema = CURSOS[cursoId]?.temas[nuevoIdx];
  if (!tema) return;
  const total = CURSOS[cursoId].temas.length;

  // Actualizar estadoGrids e infoEl
  estadoGrids[cursoId] = nuevoIdx;
  const infoEl = document.getElementById('unidad-info-' + cursoId);
  if (infoEl) infoEl.textContent = (nuevoIdx + 1) + ' / ' + total;

  // Actualizar icono, número y nombre en el sidebar
  const panel = document.getElementById('panel-' + cursoId);
  if (panel) {
    const iconoImg = panel.querySelector('.sidebar-unidad-icono img');
    const numDiv   = panel.querySelector('.sidebar-unidad-num');
    const nombreDiv = panel.querySelector('.sidebar-unidad-nombre');
    if (iconoImg) iconoImg.src = tema.icono;
    if (numDiv)   numDiv.textContent = 'Unidad ' + (nuevoIdx + 1);
    if (nombreDiv) nombreDiv.textContent = tema.nombre;
    // Actualizar visibilidad flechas
    const btnPrev = panel.querySelector('.sidebar-nav-col:first-child .sidebar-nav-unidad-btn');
    const btnNext = panel.querySelector('.sidebar-nav-col:last-child .sidebar-nav-unidad-btn');
    if (btnPrev) btnPrev.classList.toggle('invisible', nuevoIdx <= 0);
    if (btnNext) btnNext.classList.toggle('invisible', nuevoIdx >= total - 1);
  }

  // Reconstruir solo el contenido del grid (imagen/vídeo + actividades), sin tocar el sidebar
  mostrarSubelementos(cursoId, nuevoIdx, null, true);
}
// ────────────────────────────────────────────────────────────────────────────

// Cache simplificado para iconos
const iconCache = new Map();

function openModal(cursoId, temaIdx) {
  const curso = CURSOS[cursoId];
  const tema = curso.temas[temaIdx];
  const linksEl = document.getElementById('modal-links');

  // Mostrar modal inmediatamente
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';

  // Actualizar contenido
  document.getElementById('modal-bg').src = tema.fondo;
  document.getElementById('modal-icon').src = tema.icono;
  document.getElementById('modal-name').textContent = `Unidad ${temaIdx + 1}: ${tema.nombre}`;
  document.getElementById('modal-curso').textContent = curso.label;

  // Agregar clase de color al contenedor de links
  linksEl.className = `color-${cursoId}`;
  linksEl.innerHTML = '';

  if (!tema.enlaces || tema.enlaces.length === 0) {
    linksEl.innerHTML = `<div class="modal-empty"><span>🔗</span>Próximamente se añadirán recursos para este tema.</div>`;
  } else {
    tema.enlaces.forEach(e => {
      const a = document.createElement('a');
      a.className = 'link-row';
      a.href = e.url; a.target = '_blank'; a.rel = 'noopener';
      const iconSrc = ICONOS[e.tipo] || '';
      const sub = SUBTITULOS[e.tipo] || '';

      a.innerHTML = `
        <div class="link-row-icon">${iconSrc ? `<img src="${iconSrc}" alt="${e.tipo}">` : '🔗'}</div>
        <div class="link-row-text">
          <div class="link-row-name">${e.label}</div>
          <div class="link-row-type">${sub}</div>
        </div>
        <div class="link-row-arrow">→</div>`;

      linksEl.appendChild(a);
    });
  }
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('modal') && !e.target.classList.contains('modal-close')) return;
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

let paginaActualObjetos = 0;
let ordenActualObjetos = 'nombre';
let _objetosAnimarEntrada = false; // solo animar al entrar en la sección
const OBJETOS_POR_PAGINA = 12; // 6 columnas x 2 filas

// Estado del temario para los cursos (Todo vs Real)
const temarioState = {
  '2eso': 'Todo',
  '3eso': 'Todo',
  '4eso': 'Todo',
  '1bach': 'Todo',
  '2bachF': 'Todo',
  '2bachQ': 'Todo'
};
// Unidades (índice base 1) que se ponen en gris en modo Real
const temarioReal = {
  '3eso':  [8],
  '4eso':  [13],
  '1bach': [8, 11],
  '2bachF':[7, 10, 13],
  '2bachQ':[11]
};
function aplicarTemarioState(cursoId) {
  const grid = document.getElementById('grid-' + cursoId);
  if (!grid) return;
  const state = temarioState[cursoId];
  const grisIdxs = temarioReal[cursoId] || [];
  const curso = CURSOS[cursoId];
  const visibles = filtroCurso[cursoId] !== undefined ? filtroCurso[cursoId] :
    [...new Set((curso?.temas || []).map(t => t.cat).filter(Boolean))];
  [...grid.querySelectorAll('.unidad-ficha')].forEach((btn, i) => {
    const unidad = i + 1;
    const tema = curso?.temas[i];
    const esGrisPorTemario = state === 'Real' && grisIdxs.includes(unidad);
    const esGrisPorFiltro  = tema?.cat && !visibles.includes(tema.cat);
    btn.classList.toggle('tema-gris', esGrisPorTemario || esGrisPorFiltro);
  });
}

function obtenerObjetosFiltrados() {
  let objetos = OBJETOS.slice();

  // Filtrar por temas seleccionados (fuente de verdad única)
  if (temasSeleccionados.size > 0) {
    objetos = objetos.filter(o => temasSeleccionados.has(o.tema));
  } else {
    return [];
  }

  // Aplicar orden
  if (ordenActualObjetos === 'tema') {
    objetos.sort((a, b) => a.tema.localeCompare(b.tema) || a.objeto.localeCompare(b.objeto));
  } else {
    objetos.sort((a, b) => a.objeto.localeCompare(b.objeto));
  }

  return objetos;
}

function _crearObjetoBtn(obj, i, animar) {
  const btn = document.createElement('button');
  btn.className = animar ? 'objeto-ficha anim-entrada' : 'objeto-ficha';
  btn.style.setProperty('--d', i);
  btn.onclick = () => abrirObjetoDetalle(obj);
  const iconImg = document.createElement('img');
  iconImg.alt = obj.objeto;
  iconImg.src = obj.icono;
  iconImg.onerror = function() { this.style.display = 'none'; };
  const iconDiv = document.createElement('div');
  iconDiv.className = 'objeto-icono';
  iconDiv.appendChild(iconImg);
  const temaDiv = document.createElement('div');
  temaDiv.className = 'objeto-nombre-texto1';
  const nombreDiv = document.createElement('div');
  nombreDiv.className = 'objeto-tema-texto2';
  if (ordenActualObjetos === 'tema') {
    temaDiv.textContent = obj.tema;
    nombreDiv.textContent = obj.objeto;
  } else {
    temaDiv.textContent = obj.objeto;
    nombreDiv.textContent = obj.tema;
  }
  btn.appendChild(iconDiv);
  btn.appendChild(temaDiv);
  btn.appendChild(nombreDiv);
  return btn;
}

function mostrarPagina() {
  const grid = document.getElementById('grid-objetos');
  grid.style.gridTemplateColumns = 'repeat(6,1fr)';

  const objetosFiltrados = obtenerObjetosFiltrados();
  const inicio = paginaActualObjetos * OBJETOS_POR_PAGINA;
  const fin = inicio + OBJETOS_POR_PAGINA;
  const filtradosPagina = objetosFiltrados.slice(inicio, fin);

  // Primera vez o animación de entrada: renderizado simple
  if (_objetosAnimarEntrada || !grid.children.length) {
    grid.innerHTML = '';
    filtradosPagina.forEach((obj, i) => {
      grid.appendChild(_crearObjetoBtn(obj, i, _objetosAnimarEntrada));
    });
  } else {
    // Animación: el círculo negro permanece, solo cambian icono y textos
    const nNuevas = filtradosPagina.length;
    const nActuales = grid.children.length;
    const nMax = Math.max(nNuevas, nActuales);

    for (let i = 0; i < nMax; i++) {
      const obj = filtradosPagina[i];
      const celda = grid.children[i];

      if (!obj && celda) {
        // Sin objeto: fade out y eliminar celda entera
        const c = celda;
        c.style.transition = 'opacity 0.25s';
        c.style.opacity = '0';
        c.style.pointerEvents = 'none';
        setTimeout(() => { if (c.parentNode === grid) grid.removeChild(c); }, 260);
        continue;
      }

      if (obj && !celda) {
        // Nueva celda extra: crear y añadir
        const nuevo = _crearObjetoBtn(obj, i, false);
        nuevo.dataset.objKey = obj.objeto + obj.tema;
        grid.appendChild(nuevo);
        continue;
      }

      const mismoObjeto = celda.dataset.objKey === obj.objeto + obj.tema;
      if (mismoObjeto) continue;

      // Mismo círculo, distinto objeto: fade out del contenido, swap, fade in
      const iconImg = celda.querySelector('.objeto-icono img');
      const texto1  = celda.querySelector('.objeto-nombre-texto1');
      const texto2  = celda.querySelector('.objeto-tema-texto2');
      const delay   = `${i * 0.03}s`;

      // Icono: encogerse hasta desaparecer
      if (iconImg) {
        iconImg.style.transition = `transform 0.2s ease ${delay}, opacity 0.2s ease ${delay}`;
        iconImg.style.transform = 'scale(0)';
        iconImg.style.opacity = '0';
      }
      // Textos: blur out
      [texto1, texto2].forEach(el => {
        if (!el) return;
        el.style.transition = `opacity 0.18s ease ${delay}, filter 0.18s ease ${delay}`;
        el.style.opacity = '0';
        el.style.filter = 'blur(6px)';
      });

      setTimeout(() => {
        // Actualizar icono y textos
        if (iconImg) { iconImg.src = obj.icono; iconImg.alt = obj.objeto; }
        if (texto1) texto1.textContent = ordenActualObjetos === 'tema' ? obj.tema : obj.objeto;
        if (texto2) texto2.textContent = ordenActualObjetos === 'tema' ? obj.objeto : obj.tema;
        celda.onclick = () => abrirObjetoDetalle(obj);
        celda.dataset.objKey = obj.objeto + obj.tema;
        // Icono: crecer desde pequeño
        if (iconImg) {
          iconImg.style.transition = 'transform 0.25s cubic-bezier(.34,1.56,.64,1), opacity 0.2s ease';
          iconImg.style.transform = 'scale(0)';
          iconImg.style.opacity = '0';
          requestAnimationFrame(() => requestAnimationFrame(() => {
            iconImg.style.transform = 'scale(1)';
            iconImg.style.opacity = '1';
          }));
        }
        // Textos: blur in
        [texto1, texto2].forEach(el => {
          if (!el) return;
          el.style.filter = 'blur(6px)';
          el.style.transition = 'opacity 0.25s ease, filter 0.25s ease';
          requestAnimationFrame(() => requestAnimationFrame(() => {
            el.style.opacity = '1';
            el.style.filter = 'blur(0px)';
          }));
        });
      }, 200 + i * 30);
    }
  }

  // Marcar claves
  Array.from(grid.children).forEach((celda, i) => {
    const obj = filtradosPagina[i];
    if (obj) celda.dataset.objKey = obj.objeto + obj.tema;
  });


  const totalPaginas = Math.ceil(objetosFiltrados.length / OBJETOS_POR_PAGINA);
  const coleccionText = objetosFiltrados.length === 0 ? `0 / 0` : `${paginaActualObjetos + 1} / ${totalPaginas}`;
  const _infoCount = document.getElementById('pagination-info-count');
  const _newCount = `${objetosFiltrados.length} / ${OBJETOS.length}`;
  if (_infoCount && _infoCount.innerHTML !== _newCount) {
    _infoCount.innerHTML = _newCount;
    if (_infoCount._flipReady) {
      _infoCount.classList.remove('anim-flip'); void _infoCount.offsetWidth; _infoCount.classList.add('anim-flip');
    } else { _infoCount._flipReady = true; }
  }
  const _infoTop = document.getElementById('pagination-info-top');
  if (_infoTop) {
    _infoTop.innerHTML = coleccionText;
    const _grupoPagina = document.getElementById('grupo-pagina-top');
    if (_grupoPagina) _grupoPagina.style.visibility = (objetosFiltrados.length === 0) ? 'hidden' : 'visible';
    _infoTop.style.visibility = (objetosFiltrados.length === 0) ? 'hidden' : 'visible';
    if (_infoTop._flipReady) {
      _infoTop.classList.remove('anim-flip');
      void _infoTop.offsetWidth;
      _infoTop.classList.add('anim-flip');
    } else {
      _infoTop._flipReady = true;
    }
  }
  const sinPaginas = totalPaginas === 0;
  document.getElementById('btn-prev').style.visibility = sinPaginas ? 'hidden' : 'visible';
  document.getElementById('btn-next').style.visibility = sinPaginas ? 'hidden' : 'visible';
  document.getElementById('btn-prev').disabled = paginaActualObjetos === 0;
  document.getElementById('btn-next').disabled = paginaActualObjetos === totalPaginas - 1;
  _objetosAnimarEntrada = false;
}


function calcularObjetosPorPagina() {
  // Simple stub - OBJETOS_POR_PAGINA is const so we can't reassign
  // This function exists as a compatibility shim
  return 12;
}

function buildObjetosGrid() {
  window.objetosPrevPage = function() {
    if (paginaActualObjetos > 0) {
      paginaActualObjetos--;
      mostrarPagina();
    }
  };

  window.objetosNextPage = function() {
    const objetosFiltrados = obtenerObjetosFiltrados();
    const totalPaginas = Math.ceil(objetosFiltrados.length / OBJETOS_POR_PAGINA);
    if (paginaActualObjetos < totalPaginas - 1) {
      paginaActualObjetos++;
      mostrarPagina();
    }
  };

  // Event listener delegado para controles de ordenamiento (sobrevive a innerHTML replacements)
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('[data-sort]');
    if (!btn) return;
    document.querySelectorAll('[data-sort]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    pulsarBtn(btn);
    const panelCurso = btn.closest('[id^="panel-"]');
    if (panelCurso && panelCurso.id !== 'panel-objetos') {
      const cursoId = panelCurso.id.replace('panel-', '');
      if (temarioState[cursoId] === 'Todo') {
        temarioState[cursoId] = 'Real';
        btn.textContent = 'Real';
      } else {
        temarioState[cursoId] = 'Todo';
        btn.textContent = 'Todo';
      }
      aplicarTemarioState(cursoId);
    } else {
      ordenActualObjetos = btn.dataset.sort;
      paginaActualObjetos = 0;
      mostrarPagina();
    }
  });

  // Inicializar temas seleccionados y botones
  inicializarTemasSeleccionados();
  actualizarBotonesObjetos();

  // Event listeners para controles de filtro (solo panel objetos)
  document.querySelectorAll('#panel-objetos [data-filter]').forEach(btn => {
    btn.addEventListener('click', function() {
      const filterValue = this.dataset.filter;
      const temas = getUniqueTemas();

      if (filterValue === 'temas') {
        const dropdown = document.getElementById('temas-dropdown');
        const todosActivos = temas.every(t => temasSeleccionados.has(t));
        const ningunoActivo = temasSeleccionados.size === 0;

        if (dropdown.classList.contains('open')) {
          // Dropdown visible: toggle solo si todos o ninguno seleccionado
          if (todosActivos) {
            temasSeleccionados.clear();
            aplicarFiltroTemas();
          } else if (ningunoActivo) {
            temas.forEach(t => temasSeleccionados.add(t));
            aplicarFiltroTemas();
          }
          // Si hay algunos: no hace nada
        } else {
          openTemasModal();
        }
        return;
      }

      // metodo/fisica/quimica: toggle los temas de esa categoría
      const temasDeEsta = getTemasDeCategoria(filterValue);
      const todosDeEstaActivos = temasDeEsta.length > 0 && temasDeEsta.every(t => temasSeleccionados.has(t));
      if (todosDeEstaActivos) {
        temasDeEsta.forEach(t => temasSeleccionados.delete(t));
      } else {
        temasDeEsta.forEach(t => temasSeleccionados.add(t));
      }
      pulsarBtn(this);
      aplicarFiltroTemas();
    });
  });

  window.addEventListener('resize', () => {
    const prevObjetos = OBJETOS_POR_PAGINA;
    calcularObjetosPorPagina();
    if (OBJETOS_POR_PAGINA !== prevObjetos) {
      paginaActualObjetos = 0;
      mostrarPagina();
    }
  });

  // Evento wheel para cambiar páginas con rueda del ratón
  const gridContainer = document.getElementById('grid-objetos');
  if (gridContainer) {
    gridContainer.addEventListener('wheel', (e) => {
      e.preventDefault();
      const objetosFiltrados = obtenerObjetosFiltrados();
      const totalPaginas = Math.ceil(objetosFiltrados.length / OBJETOS_POR_PAGINA);

      if (e.deltaY > 0) {
        // Scroll hacia abajo → Siguiente página
        if (paginaActualObjetos < totalPaginas - 1) {
          paginaActualObjetos++;
          mostrarPagina();
        }
      } else if (e.deltaY < 0) {
        // Scroll hacia arriba → Página anterior
        if (paginaActualObjetos > 0) {
          paginaActualObjetos--;
          mostrarPagina();
        }
      }
    }, { passive: false });
  }

  mostrarPagina();
}

function selectObjetos(btn) {
  document.querySelectorAll('.curso-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.curso-sidebar').forEach(sb => {
    sb.classList.remove('active-2eso','active-3eso','active-4eso','active-1bach','active-2bachF','active-2bachQ','active-publicaciones','active-objetos');
  });
  btn.classList.add('active');
  activarPanel('panel-objetos');
  paginaActualObjetos = 0;
  temasSeleccionados.clear();
  inicializarTemasSeleccionados();
  const _infoTopReset = document.getElementById('pagination-info-top');
  if (_infoTopReset) _infoTopReset._flipReady = false;
  const _infoCountReset = document.getElementById('pagination-info-count');
  if (_infoCountReset) _infoCountReset._flipReady = false;
  _objetosAnimarEntrada = true;
  mostrarPagina();
}

// Extensiones reales de cada objeto (generado desde los archivos en disco)
const EXTENSION_MAP = {"Cinética|Fidget spinner":{"A":"webp","B":"webp","C":"webp","D":"webp"},"Cinética|Peonza":{"A":"webp","B":"webp","C":"webp"},"Dinámica|Centro de gravedad":{"A":"webp","B":"webp","C":"webp"},"Dinámica|Colgantes de los astros":{"A":"webp","B":"webp","C":"webp"},"Energía|Anillo termocrómico":{"A":"webp","B":"webp","C":"webp"},"Energía|Linterna con dinamo":{"A":"webp","B":"webp","C":"webp"},"Energía|Térmica a cinética":{"A":"webp","B":"webp","C":"webp"},"Formulación|Modelo molecular avanzado":{"A":"webp","B":"webp","C":"webp"},"Formulación|Modelo molecular básico":{"A":"webp","B":"webp","C":"webp"},"Formulación|Modelo molecular experto":{"B":"webp"},"Física nuclear|Fósil amonita":{"A":"webp","B":"webp","C":"webp"},"Física nuclear|Fósil en ámbar":{"A":"webp","B":"webp","C":"webp"},"Laboratorio|Brújula":{"A":"webp","B":"webp","C":"webp"},"Laboratorio|Jeringa":{"A":"webp","B":"webp","C":"webp"},"Laboratorio|Kit de cristalización":{"A":"webp","B":"webp","C":"webp"},"Laboratorio|Pictogramas de seguridad":{"A":"webp","B":"webp","C":"webp"},"Laboratorio|Pictogramas del alcanfor":{"A":"webp","B":"webp","C":"webp"},"Laboratorio|Pulverizadores":{"A":"webp","B":"webp","C":"webp"},"Laboratorio|Termómetro-higrómetro":{"A":"webp","B":"webp","C":"webp"},"Magnetismo|Imán y ferrita":{"A":"webp","B":"webp","C":"webp"},"Magnetismo|Levitación magnética":{"A":"webp","B":"webp","C":"webp"},"Reacciones químicas|Papel pHmetro":{"A":"webp","B":"webp","C":"webp"},"Reacciones químicas|Piedras fluorescentes":{"A":"webp","B":"webp","C":"webp"},"Reacciones químicas|Sustancias fosforescentes":{"A":"webp","B":"webp","C":"webp"},"Reacciones químicas|Tejidos naturales y sintéticos":{"A":"webp","B":"webp","C":"webp"},"Sonido|Armónica":{"A":"webp","B":"webp","C":"webp"},"Sonido|Diapasones 512 Hz y 256 Hz":{"A":"webp","B":"webp","C":"webp"},"Sustancias|Arena hidrófoba":{"A":"webp","B":"webp","C":"webp"},"Sustancias|Colorantes alimentarios":{"A":"webp","B":"webp","C":"webp"},"Sustancias|Metales identificados":{"A":"webp","B":"webp","C":"webp"},"Sustancias|Metales sin identificar":{"A":"webp","B":"webp","C":"webp"},"Óptica|Caleidoscopio":{"A":"webp","B":"webp","C":"webp"},"Óptica|Creador de hologramas":{"A":"webp","B":"webp","C":"webp"},"Óptica|Cubo de fluorita":{"A":"webp","B":"webp","C":"webp"},"Óptica|Cubo transparente":{"A":"webp","B":"webp","C":"webp"},"Óptica|Linterna radiación UV":{"A":"webp","B":"webp","C":"webp"},"Óptica|Medallones de dispersión":{"A":"webp","B":"webp","C":"webp"},"Óptica|Microscopio portátil":{"A":"webp","B":"webp","C":"webp"},"Óptica|Prisma de dispersión":{"A":"webp","B":"webp","C":"webp"},"Óptica|Puntero láser rojo":{"A":"webp","B":"webp","C":"webp"}};

// Objetos con vídeo: tema|objeto -> extensión del archivo
const VIDEO_MAP = {"Laboratorio|Brújula":"mp4","Magnetismo|Levitación magnética":"mp4"};

// Navegación entre objetos en el detalle (móvil)
window._objetoDetalleListaActual = [];
window._objetoDetalleIdxActual = 0;

window.objetoDetalleNext = function(e) { e && e.stopPropagation(); const lista = window._objetoDetalleListaActual; const idx = window._objetoDetalleIdxActual; if (idx < lista.length - 1) abrirObjetoDetalle(lista[idx + 1]); };
window.objetoDetallePrevious = function(e) { e && e.stopPropagation(); const lista = window._objetoDetalleListaActual; const idx = window._objetoDetalleIdxActual; if (idx > 0) abrirObjetoDetalle(lista[idx - 1]); };

function abrirObjetoDetalle(obj) {
  const key = obj.tema + '|' + obj.objeto;
  // Guardar lista y posición actual para navegación
  const _listaNav = obtenerObjetosFiltrados();
  window._objetoDetalleListaActual = _listaNav;
  window._objetoDetalleIdxActual = _listaNav.findIndex(o => o.tema === obj.tema && o.objeto === obj.objeto);
  const exts = EXTENSION_MAP[key] || {};
  const extB = exts['B'] || 'webp';
  const extC = exts['C'] || 'webp';

  const esDesktop = !window.location.pathname.endsWith('movil.html');
  const imagenB = esDesktop
    ? `imagenes/objetos/${obj.tema} - ${obj.objeto} - D.${extB}`
    : `imagenes/objetos/${obj.tema} - ${obj.objeto} - B.${extB}`;
  const imagenC = `imagenes/objetos/${obj.tema} - ${obj.objeto} - C.${extC}`;

  const imgA = document.getElementById('objeto-detail-img-a');
  const imgB = document.getElementById('objeto-detail-img-b');
  imgA.style.display = '';
  const sideRealidad   = document.querySelector('.objeto-detail-side.realidad');
  const sideSimulacion = document.querySelector('.objeto-detail-side.simulacion');
  const titleRealidad  = sideRealidad ? sideRealidad.querySelector('.objeto-detail-title-text') : null;
  const titleSimulacion = sideSimulacion ? sideSimulacion.querySelector('.objeto-detail-title-text') : null;
  const nombre = obj.objeto || '';
  const _esMobilTitulo = window.location.pathname.endsWith('movil.html');
  if (!_esMobilTitulo) {
    if (titleRealidad)   titleRealidad.textContent  = 'Objeto en la realidad';
    if (titleSimulacion) titleSimulacion.textContent = 'Objeto en la simulación';
  } else {
    if (titleRealidad)   titleRealidad.textContent  = `${nombre} - Objeto en la realidad`;
    if (titleSimulacion) titleSimulacion.textContent = `${nombre} - Objeto en la simulación`;
  }

  let ratioA = 1, ratioB = 1.42, loadedA = false, loadedB = false;

  function ajustarAnchosVentana() {
    if (!loadedA || !loadedB) return;
    const titleH = 43;
    const vh = window.innerHeight * 0.88 - titleH;
    const wA = Math.round(vh * ratioA);
    const wB = Math.round(vh * ratioB);
    sideRealidad.style.width   = wA + 'px';
    sideSimulacion.style.width = wB + 'px';
  }

  const imagenBFallback = `imagenes/objetos/${obj.tema} - ${obj.objeto} - B.${extB}`;
  const imgATemp = new Image();
  imgATemp.onerror = () => {
    if (esDesktop && imgATemp.src !== location.origin + '/' + imagenBFallback && !imgATemp.src.endsWith(imagenBFallback)) {
      // Fallback a - B si - D no existe
      imgATemp.src = imagenBFallback;
    } else {
      imgA.style.display = 'none'; loadedA = true; ajustarAnchosVentana();
    }
  };
  imgATemp.onload  = () => { imgA.src = imgATemp.src; ratioA = imgATemp.naturalWidth / imgATemp.naturalHeight; loadedA = true; ajustarAnchosVentana(); };
  imgATemp.src = imagenB;

  const imgBTemp = new Image();
  imgBTemp.onerror = () => {
    imgB.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    loadedB = true; ajustarAnchosVentana();
  };
  imgBTemp.onload = () => {
    imgB.src = imagenC; ratioB = imgBTemp.naturalWidth / imgBTemp.naturalHeight; loadedB = true; ajustarAnchosVentana();
  };
  imgBTemp.src = imagenC;

  // Botón "Ver vídeo" flotante sobre la imagen
  const videoContainer = document.getElementById('objeto-detail-video');
  videoContainer.innerHTML = '';
  videoContainer.style.display = '';

  const esMobil = window.location.pathname.endsWith('movil.html');

  // Nombre del objeto: arriba centrado sobre la imagen realidad, solo desktop
  const _nombreAnterior = imgA ? imgA.parentElement.querySelector('.objeto-nombre-label') : null;
  if (_nombreAnterior) _nombreAnterior.remove();
  if (!esMobil && imgA) {
    // Envolver imgA en un div relativo si no lo está ya
    let _imgWrap = imgA.parentElement.classList.contains('objeto-img-wrap') ? imgA.parentElement : null;
    if (!_imgWrap) {
      _imgWrap = document.createElement('div');
      _imgWrap.className = 'objeto-img-wrap';
      _imgWrap.style.cssText = 'position:relative;flex:1;min-height:0;display:flex;align-items:center;justify-content:center;';
      imgA.parentElement.insertBefore(_imgWrap, imgA);
      _imgWrap.appendChild(imgA);
    }
    const _labelNombre = document.createElement('div');
    _labelNombre.className = 'objeto-nombre-label';
    _labelNombre.textContent = nombre;
    _labelNombre.style.cssText = 'position:absolute;top:0.6rem;left:50%;transform:translateX(-50%);z-index:20;background:#000000;border:1px solid #999999;border-radius:6px;color:var(--text);font-size:0.89rem;font-weight:500;font-family:\'Saira\',sans-serif;height:30px;padding:0 10px;display:flex;align-items:center;white-space:nowrap;pointer-events:none;';
    _imgWrap.appendChild(_labelNombre);
  }

  // Limpiar vídeo inline anterior si existía al abrir un objeto nuevo
  const videoInlineAnterior = sideRealidad ? sideRealidad.querySelector('.objeto-detail-video-inline') : null;
  if (videoInlineAnterior) { videoInlineAnterior.pause(); videoInlineAnterior.src = ''; videoInlineAnterior.remove(); }

  const videoExt = VIDEO_MAP[key];
  if (videoExt) {
    const videoSrc = `imagenes/objetos/${obj.tema} - ${obj.objeto} - V.${videoExt}`;
    // AMBAS VERSIONES: vídeo inline dentro del lado realidad
    const videoInline = document.createElement('video');
    videoInline.className = 'objeto-detail-video-inline';
    videoInline.src = videoSrc;
    videoInline.controls = true;
    videoInline.playsInline = true;
    videoInline.setAttribute('playsinline', '');
    videoInline.setAttribute('webkit-playsinline', '');
    videoInline.style.display = 'none';
    sideRealidad.appendChild(videoInline);

    videoContainer.innerHTML = `<button id="_btn-ver-video-obj"><img src="imagenes/menu/Video temario.webp" alt="" style="width:20px;height:20px;object-fit:contain;"><span>Ver vídeo</span></button>`;
    document.getElementById('_btn-ver-video-obj').onclick = function() {
      if (!esDesktop) {
        // MÓVIL: abrir en video-overlay independiente, el objeto-overlay sigue abierto debajo
        abrirVideo(videoSrc, `${nombre} - Vídeo en la realidad`);
        return;
      }
      imgA.style.display = 'none';
      videoContainer.style.display = 'none';
      if (esDesktop) {
        // En desktop: mover el vídeo al objeto-detail con barra superior
        const detalle = document.querySelector('.objeto-detail');
        const content = detalle ? detalle.querySelector('.objeto-detail-content') : null;
        if (content) {
          content.style.display = 'none';
          // Crear barra superior igual a .objeto-detail-title
          const barraVideo = document.createElement('div');
          barraVideo.className = 'objeto-detail-title objeto-video-barra';
          barraVideo.style.cssText = 'display:flex; align-items:center; justify-content:space-between; flex-shrink:0;';
          barraVideo.innerHTML = `
            <span class="objeto-detail-title-text">${nombre} - Vídeo</span>
            <button class="objeto-detail-close" id="_btn-cerrar-video-obj"><img src="imagenes/menu/Cerrar.webp" alt="Cerrar" style="width:100%;height:100%;object-fit:contain;"></button>`;
          detalle.appendChild(barraVideo);
          videoInline.style.cssText = 'display:block; width:100%; flex:1; min-height:0; background:#000; object-fit:contain; border:none;';
          detalle.appendChild(videoInline);
          // Botón cerrar restaura la vista anterior
          barraVideo.querySelector('#_btn-cerrar-video-obj').onclick = function(e) {
            e.stopPropagation();
            _cerrarVideoInlineObjeto(imgA, videoInline, videoContainer, titleRealidad, nombre);
          };
        }
      } else {
        videoInline.style.display = 'block';
      }
      videoInline.play();
      if (titleRealidad) titleRealidad.textContent = `${nombre} - Vídeo en la realidad`;
    };
    videoInline.onended = function() { _cerrarVideoInlineObjeto(imgA, videoInline, videoContainer, titleRealidad, nombre); };
  }

  const overlay = document.getElementById('objeto-detail-overlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Actualizar estado de flechas de navegación
  const _lista = window._objetoDetalleListaActual;
  const _idx = window._objetoDetalleIdxActual;
  const btnPrev = document.getElementById('objeto-nav-prev');
  const btnNext = document.getElementById('objeto-nav-next');
  if (btnPrev) { btnPrev.style.visibility = _idx <= 0 ? 'hidden' : ''; btnPrev.style.pointerEvents = _idx <= 0 ? 'none' : ''; }
  if (btnNext) { btnNext.style.visibility = _idx >= _lista.length - 1 ? 'hidden' : ''; btnNext.style.pointerEvents = _idx >= _lista.length - 1 ? 'none' : ''; }

  const btnPrevNav = document.getElementById('btn-prev-objeto');
  const btnNextNav = document.getElementById('btn-next-objeto');
  if (btnPrevNav) { btnPrevNav.style.visibility = _idx <= 0 ? 'hidden' : ''; btnPrevNav.style.pointerEvents = _idx <= 0 ? 'none' : ''; }
  if (btnNextNav) { btnNextNav.style.visibility = _idx >= _lista.length - 1 ? 'hidden' : ''; btnNextNav.style.pointerEvents = _idx >= _lista.length - 1 ? 'none' : ''; }

  // Rueda del ratón: navegar entre objetos
  if (!overlay._wheelObjeto) {
    overlay._wheelObjeto = true;
    overlay.addEventListener('wheel', (e) => {
      e.preventDefault();
      const lista = window._objetoDetalleListaActual;
      const idx = window._objetoDetalleIdxActual;
      if (e.deltaY > 0 && idx < lista.length - 1) abrirObjetoDetalle(lista[idx + 1]);
      else if (e.deltaY < 0 && idx > 0) abrirObjetoDetalle(lista[idx - 1]);
    }, { passive: false });
  }
}

function _animarSidebarUnidad(sidebar) {
  const btns = sidebar.querySelectorAll('.sidebar-btn');
  btns.forEach((btn, i) => {
    btn.classList.remove('anim-entrada');
    btn.style.setProperty('--d', i);
    requestAnimationFrame(() => btn.classList.add('anim-entrada'));
  });
}

function _animarSidebarPub(sidebar) {
  const btns = sidebar.querySelectorAll('.sidebar-btn');
  btns.forEach((btn, i) => {
    btn.classList.remove('anim-entrada');
    btn.style.setProperty('--d', i);
    requestAnimationFrame(() => btn.classList.add('anim-entrada'));
  });
}

function _cerrarVideoInlineObjeto(imgA, videoInline, videoContainer, titleRealidad, nombre) {
  videoInline.pause();
  videoInline.style.display = 'none';
  // En desktop: eliminar barra de vídeo, restaurar content y devolver vídeo al lado realidad
  const detalle = document.querySelector('.objeto-detail');
  const barraVideo = detalle ? detalle.querySelector('.objeto-video-barra') : null;
  if (barraVideo) barraVideo.remove();
  const content = detalle ? detalle.querySelector('.objeto-detail-content') : null;
  const sideRealidad = detalle ? detalle.querySelector('.objeto-detail-side.realidad') : null;
  if (content && content.style.display === 'none') {
    content.style.display = '';
    if (sideRealidad && !sideRealidad.contains(videoInline)) sideRealidad.appendChild(videoInline);
  }
  imgA.style.display = '';
  if (videoContainer) videoContainer.style.display = '';
  if (titleRealidad) titleRealidad.textContent = `${nombre} - Objeto en la realidad`;
}

function closeObjeto(e) {
  if (e && e.target !== document.getElementById('objeto-detail-overlay') && !e.target.classList.contains('objeto-detail-close')) return;
  const videoInline = document.querySelector('.objeto-detail-video-inline');
  if (videoInline) { videoInline.pause(); videoInline.src = ''; }
  // Restaurar content si estaba oculto
  const detalle = document.getElementById('objeto-detail-overlay')?.querySelector('.objeto-detail');
  const content = detalle ? detalle.querySelector('.objeto-detail-content') : null;
  if (content) content.style.display = '';
  document.getElementById('objeto-detail-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function abrirVideo(src, titulo) {
  const overlay = document.getElementById('video-overlay');
  const player  = document.getElementById('video-player');
  const titleEl = document.getElementById('video-overlay-title');
  const panel   = overlay.querySelector('.video-overlay-panel');
  const bar     = overlay.querySelector('.video-overlay-bar');
  const barH    = 43; // altura de .video-overlay-bar

  if (titleEl) titleEl.textContent = titulo || '';

  const detalle = document.querySelector('.objeto-detail');
  if (detalle && panel) {
    const r = detalle.getBoundingClientRect();

    const maxW = r.width;
    const maxH = r.height - barH;

    // Panel se centra sobre el objeto-detail; barra y player se ajustan al mismo ancho
    panel.style.position       = 'absolute';
    panel.style.left           = r.left + 'px';
    panel.style.top            = r.top  + 'px';
    panel.style.width          = r.width + 'px';
    panel.style.height         = r.height + 'px';
    panel.style.background     = 'transparent';
    panel.style.alignItems     = 'center';
    panel.style.justifyContent = 'flex-start';
    panel.style.flexDirection  = 'column';

    function ajustarPlayer() {
      const vw = player.videoWidth  || maxW;
      const vh = player.videoHeight || maxH;
      const ratio = vw / vh;
      let w = maxW, h = maxW / ratio;
      if (h > maxH) { h = maxH; w = maxH * ratio; }
      w = Math.round(w); h = Math.round(h);
      // Barra y player tienen el mismo ancho
      if (bar) { bar.style.width = w + 'px'; bar.style.flexShrink = '0'; }
      player.style.width     = w + 'px';
      player.style.height    = h + 'px';
      player.style.objectFit = 'fill';
      player.style.flex      = 'none';
      player.style.display   = 'block';
    }

    player.removeEventListener('loadedmetadata', player._ajustarPlayer);
    player._ajustarPlayer = ajustarPlayer;
    player.addEventListener('loadedmetadata', ajustarPlayer);
    player.src = src;
    if (player.readyState >= 1) ajustarPlayer();
  } else {
    player.src = src;
  }

  overlay.style.display        = 'flex';
  overlay.style.alignItems     = 'flex-start';
  overlay.style.justifyContent = 'flex-start';
  document.body.style.overflow = 'hidden';
}

function cerrarVideo() {
  const overlay = document.getElementById('video-overlay');
  const player = document.getElementById('video-player');
  player.pause();
  player.src = '';
  overlay.style.display = 'none';
  // Si el overlay de objeto sigue abierto, mantener overflow:hidden
  const objOverlay = document.getElementById('objeto-detail-overlay');
  if (objOverlay && objOverlay.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}


function selectPortada(btn) {
  document.querySelectorAll('.curso-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  activarPanel('panel-portada');
}

function irAPortada() {
  document.querySelectorAll('.curso-tab').forEach(t => t.classList.remove('active'));
  activarPanel('panel-portada');
}

function irAAutor() {
  document.querySelectorAll('.curso-tab').forEach(t => t.classList.remove('active'));
  const btnPub = document.querySelector('.curso-tab[onclick*="publicaciones"]');
  if (btnPub) btnPub.classList.add('active');
  activarPanel('panel-publicaciones');
  mostrarAutor();
}

function selectCurso(id, btn, _sinAnimar) {
  document.body.classList.remove('en-unidad');
  document.querySelectorAll('.curso-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.curso-sidebar').forEach(sb => {
    sb.classList.remove('active-2eso', 'active-3eso', 'active-4eso', 'active-1bach', 'active-2bachF', 'active-2bachQ', 'active-publicaciones', 'active-objetos');
  });
  btn.classList.add('active');
  const panel = activarPanel('panel-'+id, _sinAnimar);

  // Animar contador PÁGINA del curso destino (solo si ya se visitó antes)
  const _pgInfo = panel?.querySelector('.curso-pagina-info');
  if (_pgInfo && _pgInfo._flipReady) {
    _pgInfo.classList.remove('anim-flip'); void _pgInfo.offsetWidth; _pgInfo.classList.add('anim-flip');
  } else if (_pgInfo) { _pgInfo._flipReady = true; }

  // Restaurar sidebar si fue modificado dentro de una unidad
  const sidebar = panel.querySelector('.curso-sidebar');
  if (sidebar && sidebar.dataset.originalHtml) {
    sidebar.innerHTML = sidebar.dataset.originalHtml;
    delete sidebar.dataset.originalHtml;
  }
  sidebar?.classList.add('active-'+id);

  // Restaurar barra interna si fue modificada dentro de una unidad o sala de vídeos
  const filterGroup = panel.querySelector('.control-group[data-modo-unidad="1"], .control-group[data-modo-juegos="1"]');
  if (filterGroup && filterGroup.dataset.originalHtml) {
    filterGroup.innerHTML = filterGroup.dataset.originalHtml;
    delete filterGroup.dataset.modoUnidad;
    delete filterGroup.dataset.modoJuegos;
    delete filterGroup.dataset.originalHtml;
  }
  // Restaurar barra interna si estaba en modo vídeo (usa _prevHtml)
  const barra = panel.querySelector('.barra-interna');
  if (barra && barra._prevHtml) {
    barra.innerHTML = barra._prevHtml;
    delete barra._prevHtml;
  }
  if (estadoGrids[id] === 'video') estadoGrids[id] = null;

  // Resetear filtros al estado inicial (todas las categorías activas)
  const catsEnCurso = [...new Set((CURSOS[id]?.temas || []).map(t => t.cat).filter(Boolean))];
  filtroCurso[id] = [...catsEnCurso];

  // Resetear temario a Todo y reasignar listener (barra fue reconstruida desde _prevHtml)
  temarioState[id] = 'Todo';
  const btnTemario = panel.querySelector('.control-btn-orden[data-sort]');
  if (btnTemario) {
    btnTemario.textContent = 'Todo';
    btnTemario.classList.add('active');

  }

  // Resetear vista al grid
  estadoGrids[id] = null;
  renderTemaGrid(id);
  actualizarUnidadInfo(id);

  // Sincronizar botones de filtro (todos activos)
  panel.querySelectorAll('.control-btn-filter[data-filter="metodo"], .control-btn-filter[data-filter="fisica"], .control-btn-filter[data-filter="quimica"]').forEach(b => {
    if (catsEnCurso.includes(b.dataset.filter)) b.classList.add('active');
  });
}

document.addEventListener('keydown', e => {
  if(e.key==='Escape'){
    document.getElementById('modal').classList.remove('open');
    document.getElementById('objeto-detail-overlay').classList.remove('open');
    cerrarVideo();
    document.body.style.overflow='';
  }
});

// ═══════════════════════════════════════════
// TOGGLE BOTÓN ORDEN NOMBRE/TEMA
// ═══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  buildGrids();


  const btnOrden = document.getElementById('btn-orden-toggle');
  if (btnOrden) {
    // btnOrden starts without active class (Task 7)
    btnOrden.addEventListener('click', (e) => {
      e.preventDefault();
      const currentSort = btnOrden.getAttribute('data-sort');
      const newSort = currentSort === 'nombre' ? 'tema' : 'nombre';
      btnOrden.setAttribute('data-sort', newSort);
      btnOrden.textContent = newSort.charAt(0).toUpperCase() + newSort.slice(1); // Cambiar el texto del botón
      ordenActualObjetos = newSort;
      paginaActualObjetos = 0;
      const _ic = document.getElementById('pagination-info-count');
      const _it = document.getElementById('pagination-info-top');
      if (_ic) _ic._flipReady = false;
      if (_it) _it._flipReady = false;
      mostrarPagina();
    });
  }

  // Iniciar en la portada (sin animación de entrada)
  document.querySelectorAll('.curso-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.contenedor-grande').forEach(p => p.classList.remove('active'));
  const panelPortada = document.getElementById('panel-portada');
  if (panelPortada) panelPortada.classList.add('active');
});

// ═══════════════════════════════════════════
// FUNCIONES PARA MODAL DE TEMAS
// ═══════════════════════════════════════════
// Mapa de categoría a temas (se construye al cargar)
const categoriaMap = { 'metodo': 'Método científico', 'fisica': 'Física', 'quimica': 'Química' };
let temasSeleccionados = new Set();

function getUniqueTemas() {
  return [...new Set(OBJETOS.map(obj => obj.tema))].sort((a, b) => a.localeCompare(b, 'es'));
}

function getTemasDeCategoria(filtroKey) {
  const catNombre = categoriaMap[filtroKey];
  return [...new Set(OBJETOS.filter(o => o.categoria === catNombre).map(o => o.tema))];
}

function inicializarTemasSeleccionados() {
  getUniqueTemas().forEach(t => temasSeleccionados.add(t));
}

function actualizarBotonesObjetos() {
  const temas = getUniqueTemas();
  const todosActivos = temas.every(t => temasSeleccionados.has(t));

  // Botón temas
  const btnTemas = document.querySelector('#panel-objetos [data-filter="temas"]');
  if (btnTemas) btnTemas.classList.toggle('active', todosActivos);

  // Botones metodo/fisica/quimica
  ['metodo', 'fisica', 'quimica'].forEach(key => {
    const btn = document.querySelector(`#panel-objetos [data-filter="${key}"]`);
    if (!btn) return;
    const temasDeEsta = getTemasDeCategoria(key);
    const todosDeEstaActivos = temasDeEsta.length > 0 && temasDeEsta.every(t => temasSeleccionados.has(t));
    btn.classList.toggle('active', todosDeEstaActivos);
  });
}

function aplicarFiltroTemas() {
  paginaActualObjetos = 0;
  mostrarPagina();
  actualizarBotonesObjetos();
  actualizarDropdownTemas();
}

function openTemasModal() {
  const dropdown = document.getElementById('temas-dropdown');
  const temasCheckboxes = document.getElementById('temas-checkboxes');
  const temas = getUniqueTemas();
  const btnTemas = document.querySelector('#panel-objetos [data-filter="temas"]');

  temasCheckboxes.innerHTML = '';
  temas.forEach(tema => {
    const countTema = OBJETOS.filter(obj => obj.tema === tema).length;
    const checkboxDiv = document.createElement('div');
    const isChecked = temasSeleccionados.has(tema);
    checkboxDiv.className = 'tema-checkbox' + (isChecked ? ' checked' : '');
    checkboxDiv.innerHTML = `
      <input type="checkbox" id="tema-${tema}" value="${tema}" ${isChecked ? 'checked' : ''}>
      <label for="tema-${tema}">${tema} (${countTema})</label>
    `;
    checkboxDiv.querySelector('input').addEventListener('change', (e) => {
      if (e.target.checked) { temasSeleccionados.add(tema); checkboxDiv.classList.add('checked'); }
      else { temasSeleccionados.delete(tema); checkboxDiv.classList.remove('checked'); }
      aplicarFiltroTemas();
    });
    temasCheckboxes.appendChild(checkboxDiv);
  });

  if (btnTemas) {
    const rect = btnTemas.getBoundingClientRect();
    dropdown.style.top = (rect.bottom + 6) + 'px';
    dropdown.style.left = rect.left + 'px';
  }
  dropdown.classList.add('open');
}

function closTemasModal() {
  document.getElementById('temas-dropdown').classList.remove('open');
}

function resaltarBotonesCategorias() {
  actualizarBotonesObjetos();
}

function actualizarDropdownTemas() {
  const temasCheckboxes = document.getElementById('temas-checkboxes');
  if (!temasCheckboxes) return;

  const temas = getUniqueTemas();
  const temasCheckboxesElements = temasCheckboxes.querySelectorAll('input[type="checkbox"]');

  // Si no hay checkboxes o el número no coincide, regenerar
  if (temasCheckboxesElements.length !== temas.length) {
    temasCheckboxes.innerHTML = '';
    temas.forEach(tema => {
      const countTema = OBJETOS.filter(obj => obj.tema === tema).length;
      const checkboxDiv = document.createElement('div');
      checkboxDiv.className = 'tema-checkbox';
      checkboxDiv.innerHTML = `
        <input type="checkbox" id="tema-${tema}" value="${tema}" ${temasSeleccionados.has(tema) ? 'checked' : ''}>
        <label for="tema-${tema}">${tema} (${countTema})</label>
      `;
      checkboxDiv.querySelector('input').addEventListener('change', (e) => {
        if (e.target.checked) {
          temasSeleccionados.add(tema);
        } else {
          temasSeleccionados.delete(tema);
        }
        aplicarFiltroTemas();
      });
      temasCheckboxes.appendChild(checkboxDiv);
    });
  } else {
    // Solo actualizar checkboxes existentes
    temasCheckboxesElements.forEach((input, idx) => {
      if (idx < temas.length) {
        input.checked = temasSeleccionados.has(temas[idx]);
      }
    });
  }
}

// Agregar sonidos a los botones interactivos
document.addEventListener('DOMContentLoaded', () => {
  // Animación de carga inicial: header-logo, header-sub, barra-superior, main
  const loadEls = [
    { el: document.querySelector('.header-logo'),        delay:  100 },
    { el: document.querySelector('.header-sub'),         delay:  250 },
    { el: document.getElementById('btn-sala-control'),   delay:  400 },
    { el: document.querySelector('.barra-superior'),     delay:  550 },
    { el: document.getElementById('panel-portada'),      delay:  750 },
  ];
  loadEls.forEach(({ el, delay }) => {
    if (!el) return;
    setTimeout(() => el.classList.add('page-load-anim'), delay);
  });

  // Animación A: press en curso-tab al hacer click
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('.curso-tab');
    if (!tab) return;
    tab.classList.remove('tab-press');
    void tab.offsetWidth;
    tab.classList.add('tab-press');
    tab.addEventListener('animationend', () => tab.classList.remove('tab-press'), { once: true });
  });


  // Cerrar dropdown de temas solo cuando se hace clic fuera del botón y del dropdown
  document.addEventListener('click', (e) => {
    const wrapper = document.querySelector('.temas-button-wrapper');
    const dropdown = document.getElementById('temas-dropdown');
    if (!dropdown) return;
    // Usar composedPath para detectar el origen aunque el DOM haya cambiado
    const path = e.composedPath ? e.composedPath() : [];
    const dentroDropdown = path.includes(dropdown) || (wrapper && path.includes(wrapper));
    if (!dentroDropdown) {
      dropdown.classList.remove('open');
    }
  });
});

// Precarga inteligente de iconos en background (después de 2 segundos)
setTimeout(() => {
  const iconos = Object.values(ICONOS).filter(url => typeof url === 'string' && url.startsWith('imagenes/'));
  iconos.forEach((url, i) => {
    setTimeout(() => {
      const img = new Image();
      img.src = url;
    }, i * 300); // Espaciar las cargas 300ms
  });
}, 2000);

// Agregar clases de color a los botones de curso
const cursoColors = {
  '2eso': 'color-2eso',
  '3eso': 'color-3eso',
  '4eso': 'color-4eso',
  '1bach': 'color-1bach',
  '2bachF': 'color-2bachF',
  '2bachQ': 'color-2bachQ'
};

document.querySelectorAll('.curso-tab').forEach(btn => {
  const cursoId = btn.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
  if (cursoId && cursoColors[cursoId]) {
    btn.classList.add(cursoColors[cursoId]);
  }
});

buildObjetosGrid();


// Función para medir los contenedores
function medirContainers() {
  const objContainerWrapper = document.querySelector('.objetos-container-wrapper');
  const cursoLayout2eso = document.querySelector('#panel-2eso .curso-layout');
  const cursoLayoutPublicaciones = document.querySelector('#panel-publicaciones .curso-layout');
  const medidas = {
    'Colección (objetos-container-wrapper)': objContainerWrapper ? objContainerWrapper.offsetWidth + 'px' : 'No encontrado',
    '2º ESO (curso-layout)': cursoLayout2eso ? cursoLayout2eso.offsetWidth + 'px' : 'No encontrado',
    'Publicaciones (curso-layout)': cursoLayoutPublicaciones ? cursoLayoutPublicaciones.offsetWidth + 'px' : 'No encontrado'
  };
  console.log('=== MEDIDAS DE CONTENEDORES ===');
  Object.entries(medidas).forEach(([nombre, ancho]) => { console.log(nombre + ': ' + ancho); });
  return medidas;
}
setTimeout(medirContainers, 500);

function medirCirculos() {
  const c1 = document.querySelector('#grid-1bach .unidad-icono');
  const c2 = document.querySelector('#grid-objetos .objeto-icono');
  const b1 = document.querySelector('#grid-1bach .unidad-ficha');
  const b2 = document.querySelector('#grid-objetos .objeto-ficha');
  if (!c1 || !c2) { console.log('Activa 1Bach y Objetos a la vez'); return; }
  const r1 = c1.getBoundingClientRect();
  const r2 = c2.getBoundingClientRect();
  const rb1 = b1.getBoundingClientRect();
    const rb2 = b2.getBoundingClientRect();
  const msg = [
    '=== CÍRCULOS ===',
    'unidad-icono top: ' + Math.round(r1.top) + ' | objeto-icono top: ' + Math.round(r2.top),
    'unidad-ficha top: ' + Math.round(rb1.top) + ' | objeto-ficha top: ' + Math.round(rb2.top),
    'unidad-ficha height: ' + Math.round(rb1.height) + ' | objeto-ficha height: ' + Math.round(rb2.height),
  ].join('\n');
  console.log(msg);
  let div = document.getElementById('medir-debug');
  if (!div) { div = document.createElement('div'); div.id='medir-debug'; div.style.cssText='position:fixed;bottom:10px;left:10px;background:#000;color:#0f0;font-size:11px;padding:8px;z-index:9999;white-space:pre;border:1px solid #0f0;'; document.body.appendChild(div); }
  div.textContent = msg;
}

// ══════════�