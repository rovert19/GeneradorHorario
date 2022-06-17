import _ from 'lodash';

import { checkConsecutivos } from "../filtros/ciclos-consecutivos"
import { ordenarHoras } from "./filtros/ordenarPorHora"
import { getTodasHoras, getInfoCursos } from "./fetchs/infoCursos"
import { checkCruces } from "./filtros/cruces"

const cursosElegidos = ["BMA20M","CIB12N","EE648O","EE458O","EE528M","EE530P"]

function generarHorario(arrCursos) {
  const infoCursos = getInfoCursos(arrCursos)
  const cursosNoConsecutivos = checkConsecutivos(infoCursos)
  console.log('Cursos que no pertenecen a 3 ciclos consecutivos')
  console.log(cursosNoConsecutivos)
  const infoHoras = getTodasHoras(infoCursos) //infoHoras = [{'Codigo': 'BMA20', 'Horas': [{T}, {P}, {L}]},{}, {}]
  const horarioOrdenado = ordenarHoras(infoHoras) //coordenadas [[horaLunes:{},{}], [horaMartes], ...]
  const infoCruces = checkCruces(horarioOrdenado)
  //const horarioGenerado = generarHorario(horarioOrdenado)
  console.log(infoCruces)
  return [cursosNoConsecutivos, infoCruces]
}

console.time('Genera los cursos')
generarHorario(cursosElegidos)
console.timeEnd('Genera los cursos')
//export const tablaHorario = generarHorario(cursosElegidos)
