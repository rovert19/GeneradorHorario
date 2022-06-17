const infoCruces = [
  {
      IdCruce: 0, //Prohibidos
      Codigos: [],
      Cantidad: this.Codigos.length
  },
  {
      IdCruce: 1, //Teoria-Otro
      Codigos: [],
      Cantidad: this.Codigos.length
  },
  {
      IdCruce: 2, //Teoria-Teoria
      Codigos: [],
      Cantidad: this.Condigos.length
  },
]
//Si hay cruce retiramos el curso y lo agregamos a un array de no permitidos
function crucesEnDia(cursoActual, cursoSiguiente) {
  const tipoActual = cursoActual.Tipo
  const tipoSiguiente = cursoSiguiente.Tipo
  const  idCruce = (tipoActual === 'L' || tipoActual === 'P') ? 
                    tipoSiguiente != 'T' ? 0 : 1 
                    : 2 

  infoCruces[idCruce].Codigos
      .push([cursoActual.Codigo, cursoSiguiente.Codigo, cursoActual.Dia])
  cursoActual['IdCruce'] = idCruce
  cursoSiguiente['IdCruce'] = idCruce
}

function checkCruces(matrixHoras) {
  
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
    const horaMaxima = matrixDia.slice(-1).Hora
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
