
function crucesEnDia(cursoActual, cursoSiguiente, infoCruces) {
  const tipoActual = cursoActual.Tipo
  const tipoSiguiente = cursoSiguiente.Tipo
  const  idCruce = (tipoActual === 'L' || tipoActual === 'P') ? 
                    tipoSiguiente !== 'T' ? 0 : 1 
                    : tipoSiguiente === 'L' || tipoSiguiente === 'P' ? 1 : 2  
                    
  infoCruces[idCruce].Codigos.push([cursoActual.Codigo, cursoSiguiente.Codigo, cursoActual.Dia])
  infoCruces[idCruce].Cantidad ++
  infoCruces[idCruce].Horas += cursoActual.Hora + cursoActual.Rango - cursoSiguiente.Hora
}

export function checkCruces(matrixHoras, infCruce) {
  matrixHoras.forEach(matrixDia => {
    if(matrixDia.length !== 0) {
      const horaMaxima = matrixDia.slice(-1)[0].Hora + matrixDia.slice(-1)[0].Rango
      let index = 0
      let cursoActual = matrixDia[index]
      while (cursoActual.Hora <= horaMaxima && index < matrixDia.length-1) {
        const horaTermina = cursoActual.Hora + cursoActual.Rango
        const cursoSiguiente = matrixDia[index+1]
        if (cursoSiguiente.Hora < horaTermina){
          crucesEnDia(cursoActual, cursoSiguiente, infCruce)
        } 
        index++
        cursoActual = matrixDia[index]
      }
    }
  })
}
