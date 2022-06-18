
import { checkConsecutivos } from "./filtros/ciclosConsecutivos"
import { ordenarHoras } from "./filtros/ordenarPorHora"
import { getTodasHoras, getInfoCursos } from "./fetchs/infoCursos"
import { checkCruces } from "./filtros/cruces"

const cursosElegidos = ["BMA20M","CIB12N","EE648O","EE644N","EE528M","EE530P"]

function generarHorario(arrCursos) {
  const infoCursos = getInfoCursos(arrCursos)
  const cursosNoConsecutivos = checkConsecutivos(infoCursos)
  if (cursosNoConsecutivos.length != 0) {
    console.log('Cursos que no pertenecen a 3 ciclos consecutivos')
    console.log(cursosNoConsecutivos) // check    
  }
  const infoHoras = getTodasHoras(infoCursos, cursosElegidos) //check
  const horarioOrdenado = ordenarHoras(infoHoras) //check
  console.log(horarioOrdenado)
  const infoCruces = checkCruces(horarioOrdenado)
  //const horarioGenerado = generarHorario(horarioOrdenado)
  console.log(infoCruces)
  return [cursosNoConsecutivos, infoCruces]
}

console.time('Genera los cursos')
generarHorario(cursosElegidos)
console.timeEnd('Genera los cursos')
//export const tablaHorario = generarHorario(cursosElegidos)
