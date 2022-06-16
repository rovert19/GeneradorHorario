import { checkConsecutivos } from "../filtros/ciclos-consecutivos"
import { ordenarHoras } from "./filtros/ordenarPorHora"
import { getTodasHoras, getInfoCursos } from "./fetchs/infoCursos"

const cursosElegidos = ["BMA20M","CIB12N","EE648O","EE458O","EE528M","EE530P"]

function generarHorario(arrCursos) {
  const infoCursos = getInfoCursos(arrCursos)
  const cursosNoPermitidos = checkConsecutivos(infoCursos)
  //infoHoras = [{'Codigo': 'BMA20', 'Horas': [{T}, {P}, {L}]},{}, {}]
  console.log(cursosNoPermitidos)
  const infoHoras = getTodasHoras(infoCursos)
  //coordenadas
  const horarioOrdenado = ordenarHoras(infoHoras)
  const horarioFinal = checkCruces(horarioOrdenado)

  console.log(requisitoMatricula)
  return
}

console.time('Genera los cursos')
console.log(generarHorario(cursosElegidos))
console.timeEnd('Genera los cursos')
//export const tablaHorario = generarHorario(cursosElegidos)
