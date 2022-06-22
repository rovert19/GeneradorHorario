import { checkConsecutivos } from "./filtros/ciclosConsecutivos"
import { ordenarHoras } from "./filtros/ordenarPorHora"
import { getInfoCursos } from "./fetchs/infoCursos"
import { checkCruces } from "./filtros/cruces"
import { combinatoriaCursos } from "./combo/combinacion"

const allCombinaciones = []
export function generarHorario(arrCursos) {
  const { infoCursos, infoSeccionesCursos } = getInfoCursos(arrCursos)
  const cursosNoConsecutivos = checkConsecutivos(infoCursos)
  if (cursosNoConsecutivos.length != 0) {
    console.log('Cursos que no pertenecen a 3 ciclos consecutivos')
    console.log(cursosNoConsecutivos)   
  }
  const arrSeccionesCursos = Array.from(infoSeccionesCursos.values())
  combinatoriaCursos(arrSeccionesCursos, 0, allCombinaciones)
  const totalInfoCruces = []
  const combos = []
  for (const combinacion of allCombinaciones) {
    // Prohibidos - Teorio-Otro - Teoria-Teoria 
    const infoCruces = [{ Codigos: [], Cantidad: 0, Horas: 0 },
                        { Codigos: [], Cantidad: 0, Horas: 0 },
                        { Codigos: [], Cantidad: 0, Horas: 0 },]
    const infoHoras = combinacion.flat()
    const horarioOrdenado = ordenarHoras(infoHoras)
    checkCruces(horarioOrdenado, infoCruces)
    combos.push(horarioOrdenado)
    totalInfoCruces.push(infoCruces)
  }
  return [ combos, totalInfoCruces ]
}