//Cambiar de nombre a ordernarHorasCursos
export function ordenarHoras (infoHorasCursos) {
  const horasPorDia = []

  for (let dia=0; dia < 6; dia++) {
    horasPorDia
      .push(infoHorasCursos
        .filter(tipoCurso => tipoCurso['Día'] === dia))
  }
  const horasOrdenadas = horasPorDia
    .map(cursosDia => cursosDia
      .sort((a, b) => a.Hora - b.Hora))
  
  return horasOrdenadas
}