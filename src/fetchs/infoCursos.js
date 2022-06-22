//import horario_carrera from './fetchCarrera'
import * as horario from '../horario.json'
import { day } from '../constantes'

const dataHorario = Array.from(horario)

function searchCurso (codigo) {
  return dataHorario
  .filter(curso => curso.Codigo === codigo ? curso : undefined)[0]
}

function procesarSeccion (horasSeccionInfo, seccion, codigo) {
  const seccionProcesada = horasSeccionInfo.map(seccionInfo => {
    return {
      Codigo: `${codigo}${seccion}`,
      Tipo: seccionInfo.Tipo,
      Dia: day[seccionInfo['Día']],
      Hora: Number(seccionInfo.Hora.slice(0, 2)),
      Rango: seccionInfo.Hora.slice(-5,-3) - seccionInfo.Hora.slice(0, 2)
    }
  })
  return seccionProcesada
}

function getInfoCurso (curso, seccion) {
  const seccionesCurso = curso.Secciones
  const seccionesProcesadas = seccion === '' ?  
    Object.keys(seccionesCurso).map(secc => procesarSeccion(seccionesCurso[secc], secc, curso.Codigo)) : 
    [procesarSeccion(seccionesCurso[seccion], seccion, curso.Codigo)]
  //Abre: data.AbreCursos
  return [ { Ciclo: curso.Ciclo, Nombre: curso.Nombre }, seccionesProcesadas]
}

export function getInfoCursos (codigos) {
  const infoCursos = new Map()
  const infoSeccionesCursos = new Map()
  codigos.map(cod => {
    let seccion = ''
    if (Number.isNaN(Number(cod.slice(-1)))){
      seccion = cod.slice(-1)
      cod = cod.slice(0,-1)
    }
    const curso = searchCurso(cod)
    if(!curso) {
      console.log('Se borro un curso pq no existe')
      return
    }
    const [ cursoInfo, seccionesInfo ] = getInfoCurso(curso, seccion)
    infoCursos.set(cod, cursoInfo)
    infoSeccionesCursos.set(cod, seccionesInfo)
  })
  return { infoCursos, infoSeccionesCursos }
}

export function getCursoCiclo (infoCursos) {
  const cursos = infoCursos.values()
  const arrCiclos = []

  let result = cursos.next()
  while (!result.done){
    arrCiclos.push(result.value.Ciclo)
    result = cursos.next()
  }
  return arrCiclos
}
