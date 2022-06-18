
const carrera = document.querySelector('#carrera')
const facultad = document.querySelector('#facultad')

const url_horario = 'https://gdsc-uni.github.io/generador.horario.io/JSON/horarios'

//import dinamico
async function importCursosPorCarrera(carrera, facultad) {
  const resp = await fetch(`${url_horario}/${facultad}/${carrera}.json`)
  const horario = await resp.json()
  return horario
}

export const horario_carrera = await importCursosPorCarrera(carrera, facultad)