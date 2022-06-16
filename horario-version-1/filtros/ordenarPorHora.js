//const horaMinima = 7
//const horaMaxima = 20

export function ordenarHoras (infoHorasCursos) {
  const horasCursos = []

  for (let dia=0; dia < 6; dia++) {
    horasOrdenadas
      .push(infoHorasCursos
        .filter(tipoCurso => tipoCurso['Día'] === dia))
  }

  horasCursos.map(cursosDia => {
    cursosDia = cursosDia.sort((a, b) => a.Hora - b.Hora)
  })
  
  return horasCursos
}