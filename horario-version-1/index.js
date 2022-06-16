import { checkConsecutivos } from "../filtros/ciclos-consecutivos"
import { ordenarHoras } from "./filtros/ordenarPorHora"
import { getTodasHoras, getInfoCursos } from "./fetchs/infoCursos"

const cursosElegidos = ["BMA20M","CIB12N","EE648O","EE458O","EE528M","EE530P"]

function generarHorario(arrCursos) {
  const infoCursos = getInfoCursos(arrCursos)
  const cursosNoConsecutivos = checkConsecutivos(infoCursos)
  console.log('Cursos que no pertenecen a 3 ciclos consecutivos')
  console.log(cursosNoConsecutivos)
  //infoHoras = [{'Codigo': 'BMA20', 'Horas': [{T}, {P}, {L}]},{}, {}]
  const infoHoras = getTodasHoras(infoCursos)
  //coordenadas [[horaLunes:{},{}], [horaMartes], ...]
  const horarioOrdenado = ordenarHoras(infoHoras) //Hecho
  const cursosNoPermitidos = [cursosNoConsecutivos, checkCruces(horarioOrdenado, infoCursos)]
  //horario Final y listo para imprimir la tabla
  const horarioGenerado = generadorHorario(infoCursos)
  console.log(horarioGenerado)
  return
}

console.time('Genera los cursos')
console.log(generarHorario(cursosElegidos))
console.timeEnd('Genera los cursos')
//export const tablaHorario = generarHorario(cursosElegidos)
