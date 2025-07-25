const prerequisitos = {
  "bio-mol": ["bio-cel"],
  "anat-cc": ["anat-hum"],
  "histo": ["bio-cel"],
  "preclinico2": ["preclinico1"],
  "rehab1": ["preclinico2"],
  "rehab2": ["rehab1"],
  "operatoria1": ["rehab2"],
  "operatoria2": ["operatoria1"],
  "clinica1": ["intro-odo"],
  "clinica2": ["clinica1"],
  "clinica-adulto1": ["clinica2"],
  "clinica-adulto2": ["clinica-adulto1"],
  "clinica-adulto3": ["clinica-adulto2"],
  "clinica-adulto4": ["clinica-adulto3"],
  "rehab3": ["operatoria2"],
  "rehab4": ["rehab3"],
  "clinica-nino1": ["clinica2"],
  "clinica-nino2": ["clinica-nino1"],
  "clinica-nino3": ["clinica-nino2"],
  "clinica-nino4": ["clinica-nino3"],
  "patologia-oral1": ["patologia-gen"],
  "patologia-oral2": ["patologia-oral1"],
  "estoma1": ["patologia-oral2"],
  "estoma2": ["estoma1"],
  "simulacion2": ["simulacion1"],
  "simulacion3": ["simulacion2"],
  "internado": ["simulacion3"]
};

const ramos = document.querySelectorAll('.ramo');

function actualizarEstadoRamos() {
  const aprobados = JSON.parse(localStorage.getItem("aprobados") || "[]");

  ramos.forEach(ramo => {
    const id = ramo.dataset.id;
    const requisitos = prerequisitos[id] || [];

    if (aprobados.includes(id)) {
      ramo.classList.add('aprobado');
    } else {
      ramo.classList.remove('aprobado');
    }

    const bloqueado = requisitos.length > 0 && !requisitos.every(r => aprobados.includes(r));
    if (bloqueado && !aprobados.includes(id)) {
      ramo.classList.add('bloqueado');
    } else {
      ramo.classList.remove('bloqueado');
    }
  });
}

ramos.forEach(ramo => {
  ramo.addEventListener('click', () => {
    const id = ramo.dataset.id;
    let aprobados = JSON.parse(localStorage.getItem("aprobados") || "[]");

    if (ramo.classList.contains('bloqueado')) return;

    if (ramo.classList.contains('aprobado')) {
      aprobados = aprobados.filter(r => r !== id);
    } else {
      aprobados.push(id);
    }

    localStorage.setItem("aprobados", JSON.stringify(aprobados));
    actualizarEstadoRamos();
  });
});

actualizarEstadoRamos();
