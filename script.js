const materias = [
  // [ID, Nombre, Semestre, [Prerrequisitos]]
  [1, "Introducción al Estudio del Derecho", 1, []],
  [2, "Orientación Institucional", 1, []],
  [3, "Introducción a la Economía", 1, []],
  [4, "Introducción a la Filosofía", 1, []],
  [5, "Física Básica", 1, []],
  [6, "Historia Social Dominicana", 1, []],
  [7, "Lengua Española Básica I", 1, []],
  [8, "Introducción a las Ciencias Sociales", 1, []],
  [9, "Biología Básica", 2, []],
  [10, "Introducción al Derecho Privado", 2, [1]],
  [11, "Educación Física", 2, []],
  [12, "Francés Elemental I", 2, []],
  [13, "Lengua Española Básica II", 2, [7]],
  [14, "Matemática Básica", 2, []],
  [15, "Química Básica", 2, []],
  [16, "Lógica Jurídica", 3, [1, 4]],
  [17, "Derecho Penal General I", 3, [10]],
  [18, "Historia del Derecho", 3, [6, 10]],
  [19, "Derecho Romano I", 3, [10]],
  [20, "Francés Elemental II", 3, [12]],
  [21, "Introducción a la Psicología", 3, []],
  [22, "Derecho Penal General II", 4, [17]],
  [23, "Derecho Romano II", 4, [19]],
  [24, "Métodos de Investigación Jurídica", 4, [16]],
  [25, "Derecho de Familia I", 4, [10]],
  [26, "Fundamentos de Estadística", 4, [14]],
  [27, "Traducción Jurídica I", 4, [12, 20]],
  [28, "Derecho Constitucional I", 4, [1]],
  [29, "Historia de las Ideas Políticas I", 4, [18]],
  [30, "Servicios Jurídicos I", 5, [22]],
  [31, "Derecho de Familia II", 5, [25]],
  [32, "Derecho de los Bienes", 5, [25]],
  [33, "Informática Jurídica", 5, [14]],
  [34, "Derecho Constitucional II", 5, [28]],
  [35, "Historia de las Ideas Políticas II", 5, [29]],
  [36, "Sociología Jurídica", 5, [24]],
  [37, "Derecho de Obligaciones I", 6, [32]],
  [38, "Servicios Jurídicos II", 6, [30]],
  [39, "Derecho de Contratos", 6, [32]],
  [40, "Derecho Penal Especial I", 6, [22]],
  [41, "Derecho Procesal Civil I", 6, [32]],
  [42, "Derecho Comercial I", 6, [32]],
  [43, "Derecho Administrativo", 6, [34]],
  [44, "Derecho Internacional Público I", 6, [34]],
  [45, "Derecho de Obligaciones II", 7, [37]],
  [46, "Derecho Comparado", 7, [18]],
  [47, "Servicios Jurídicos III", 7, [38]],
  [48, "Derecho Penal Especial II", 7, [40]],
  [49, "Derecho Procesal Civil II", 7, [41]],
  [50, "Derecho Comercial II", 7, [42]],
  [51, "Derecho Laboral I", 7, [39]],
  [52, "Derecho Internacional Público II", 7, [44]],
  [53, "Servicios Jurídicos IV", 8, [47]],
  [54, "Derecho de las Garantías", 8, [39]],
  [55, "Derecho Agrario", 8, [32]],
  [56, "Derecho Procesal Penal I", 8, [48]],
  [57, "Derecho Procesal Civil III", 8, [49]],
  [58, "Derecho Laboral II", 8, [51]],
  [59, "Derecho Inmobiliario", 8, [32]],
  [60, "Derecho Internacional Americano", 8, [52]],
  [61, "Filosofía del Derecho", 9, [18, 35]],
  [62, "Ética Jurídica", 9, [16]],
  [63, "Derecho Procesal Penal II", 9, [56]],
  [64, "Criminología", 9, [48]],
  [65, "Derecho Notarial", 9, [53]],
  [66, "Derecho Internacional Privado I", 9, [52]],
  [67, "Derecho Procesal Civil IV", 9, [57]],
  [68, "Responsabilidad Civil I", 9, [54]],
  [69, "Derecho Penitenciario", 10, [64]],
  [70, "Derecho Internacional Privado II", 10, [66]],
  [71, "Responsabilidad Civil II", 10, [68]],
  [72, "Derecho de Sucesiones y Donaciones", 10, [39]],
  [73, "Tesis de Grado o Curso Equivalente", 11, []],
];

const malla = document.getElementById("malla");
const estado = JSON.parse(localStorage.getItem("estadoMaterias") || "{}");

for (let semestre = 1; semestre <= 11; semestre++) {
  const divSem = document.createElement("div");
  divSem.className = "semestre";
  divSem.innerHTML = `<h2>${semestre === 11 ? "Tesis" : `Semestre ${semestre}`}</h2>`;

  materias.filter(m => m[2] === semestre).forEach(m => {
    const divMat = document.createElement("div");
    divMat.id = `mat-${m[0]}`;
    divMat.className = "materia bloqueada";
    divMat.textContent = m[1];

    const guardado = estado[m[0]];
    if (guardado === "aprobada") {
      divMat.classList.remove("bloqueada");
      divMat.classList.add("aprobada");
    } else if (guardado === "disponible" || m[3].length === 0) {
      divMat.classList.remove("bloqueada");
    }

    divMat.onclick = () => alternarEstado(m[0]);
    divSem.appendChild(divMat);
  });

  malla.appendChild(divSem);
}

function alternarEstado(id) {
  const el = document.getElementById(`mat-${id}`);
  const actual = el.classList.contains("aprobada");

  if (actual) {
    el.classList.remove("aprobada");
    estado[id] = "disponible";
  } else {
    el.classList.add("aprobada");
    estado[id] = "aprobada";
  }

  // Verifica dependencias
  materias.forEach(m => {
    const requisitos = m[3];
    const puedeDesbloquear = requisitos.every(rid =>
      document.getElementById(`mat-${rid}`).classList.contains("aprobada")
    );
    if (puedeDesbloquear || requisitos.length === 0) {
      document.getElementById(`mat-${m[0]}`).classList.remove("bloqueada");
      if (!estado[m[0]]) estado[m[0]] = "disponible";
    }
  });

  localStorage.setItem("estadoMaterias", JSON.stringify(estado));
}
