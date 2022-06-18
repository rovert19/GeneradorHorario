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
function crucesEnDia(cursoActual, cursoSiguiente) {
  const tipoActual = cursoActual.Tipo
  const tipoSiguiente = cursoSiguiente.Tipo
  const  idCruce = (tipoActual === 'L' || tipoActual === 'P') ? 
                    tipoSiguiente != 'T' ? 0 : 1 
                    : 2 
  infoCruces[idCruce].Codigos.push([cursoActual.Codigo, cursoSiguiente.Codigo, cursoActual.Dia])
  infoCruces[idCruce].Cantidad += 1
  cursoActual['IdCruce'] = idCruce
  cursoSiguiente['IdCruce'] = idCruce
}

export function checkCruces(matrixHoras) {
  // for (let dia=0; dia < 6; dia++) {
  //   const matrixDia = matrixHoras[dia]
  //   const horaMaxima = matrixDia.slice(-1).Hora
  //   let index = 0
  //   let cursoActual = matrixDia[index]
  //   //Forma 1, se puede mejorar
  //   while (cursoActual.Hora < horaMaxima) {
  //     const horaTermina = cursoActual.Hora + cursoActual.Rango
  //     const cursoSiguiente = matrixDia[index+1]
  //     if (cursoSiguiente.Hora < horaTermina) crucesEnDia(cursoActual, cursoSiguiente)
  //     index++
  //     cursoActual = matrixDia[index]
  //   }
  // }
  matrixHoras.map(matrixDia => {
    const len = matrixDia.length
    const horaMaxima = matrixDia[len-1].Hora
    let index = 0
    let cursoActual = matrixDia[index]
    //Forma 1, se puede mejorar
    while (cursoActual.Hora < horaMaxima) {
      const horaTermina = cursoActual.Hora + cursoActual.Rango
      const cursoSiguiente = matrixDia[index+1]
      if (cursoSiguiente.Hora < horaTermina) crucesEnDia(cursoActual, cursoSiguiente)
      index++
      cursoActual = matrixDia[index]
    }
  })
  return infoCruces
}
//Regresa los cursos no permitidos por cruce
