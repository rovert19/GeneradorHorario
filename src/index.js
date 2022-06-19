import { checkConsecutivos } from "./filtros/ciclosConsecutivos"
import { ordenarHoras } from "./filtros/ordenarPorHora"
import { getTodasHoras, getInfoCursos } from "./fetchs/infoCursos"
import { checkCruces } from "./filtros/cruces"
import { combinatoriaCursos } from "./combo/combinacion"

const cursosElegidos = ["BMA20M","CIB12N","EE648O","EE644N","EE528M","EE530P"]
const allCombinaciones = []

function generarHorario(arrCursos) {
  const { infoCursos, infoSecciones } = getInfoCursos(arrCursos)
  const cursosNoConsecutivos = checkConsecutivos(infoCursos)
  if (cursosNoConsecutivos.length != 0) {
    console.log('Cursos que no pertenecen a 3 ciclos consecutivos')
    console.log(cursosNoConsecutivos) // check    
  }
  combinatoriaCursos(infoSecciones, 0, allCombinaciones)
  console.log('no llegue')
  for (const combinacion of allCombinaciones) {
    const infoHoras = getTodasHoras(combinacion, cursosElegidos) //check
    const horarioOrdenado = ordenarHoras(infoHoras) //check
    console.log(horarioOrdenado)
    const infoCruces = checkCruces(horarioOrdenado)
    console.log(infoCruces)
  }
  //const horarioGenerado = generarHorario(horarioOrdenado)
  //return [cursosNoConsecutivos, infoCruces]
}

console.time('Genera los cursos')
generarHorario(cursosElegidos)
console.timeEnd('Genera los cursos')
//export const tablaHorario = generarHorario(cursosElegidos)
