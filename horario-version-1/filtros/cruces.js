const max_cruces = 2

//Si hay cruce retiramos el curso y lo agregamos a un array de no permitidos
function crucesPorTipo(horasPracYLabo) {
  const cursosConCruceTipo = []
  for (let dia = 0; dia < 6; dia++) {
    const cursosHora = 'd'
  }
  return cursosConCruceTipo
}

function crucePorHora() {
  const cursosConCruceHora = []

  return cursosConCruceHora
}

export function checkCruces(matrixHorasOrdenadas, infoCursos) {
  const cursosNoPermitidos = []
  
  const cursosConCruceTipo = crucesPorTipo(matrixHorasOrdenadas)
  if (cursosConCruceTipo.length != 0) {
    cursosNoPermitidos.push(...cursosConCruceTipo)
  }
  const cursosConCruceHora = crucePorHora(matrixHorasOrdenadas)
  if (cursosConCruceTipo.length != 0) {
    cursosNoPermitidos
      .push(...cursosConCruceHora
        .filter(curso => !cursosNoPermitidos.includes(curso)))
  }
  //borrando cursos
  cursosNoPermitidos.map(curso => infoCursos.delete(curso))
  return cursosNoPermitidos
}