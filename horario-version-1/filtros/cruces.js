

const infoCruces = [
  {
      IdCruce: 0, //Prohibidos
      Codigos: [],
      Cantidad: 0
  },
  {
      IdCruce: 1, //Teoria-Otro
      Codigos: [],
      Cantidad: 0
  },
  {
      IdCruce: 2, //Teoria-Teoria
      Codigos: [],
      Cantidad: 0
  },
]
//Si hay cruce retiramos el curso y lo agregamos a un array de no permitidos
function crucesPorTipo(horasPracYLabo) {
  const cursosConCruceTipo = []
  for (let dia = 0; dia < 6; dia++) {
    const cursosHora = 'd'
  }
  return cursosConCruceTipo
}



function checkCruces(matrixHoras) {
  matrixHoras.map(matrixDia => {
    const horaMaxima = matrixDia.slice(-1).Hora
    let index = 0
    //Forma 1, se puede mejorar
    let cursoActual = matrixDia[index]
    let horaActual = cursoActual.Hora
    while (horaActual < horaMaxima) {
      const horaTermina = horaActual + cursoActual.Rango
      const cursoSiguiente = matrixDia[index+1]
      if(cursoSiguiente.Hora < horaTermina) {
        //existe cruce ? por tipo y por hora 
        const tipoActual = cursoActual.Tipo
        const tipoSiguiente = cursoSiguiente.Tipo

        if (tipoActual === 'L' || tipoActual === 'P') {
          if (tipoSiguiente != 'T') {
            infoCruces[0].Cantidad++
            infoCruces[0].Codigos.push([cursoActual.Codigo, cursoSiguiente.Codigo])
          } else {
            infoCruces[1].Cantidad++
            infoCruces[1].Codigos.push([cursoActual.Codigo, cursoSiguiente.Codigo])
          }
        } else {
          infoCruces[2].Cantidad++
          infoCruces[2].Codigos.push([cursoActual.Codigo, cursoSiguiente.Codigo])
        }
      }
      index++
      cursoActual = matrixDia[index]
      horaActual = cursoActual.Hora
    }
  })
}

//Regresa los cursos no permitidos por cruce
export {
  infoCruces
}