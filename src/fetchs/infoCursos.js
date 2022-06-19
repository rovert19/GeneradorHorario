//import horario_carrera from './fetchCarrera'
import * as horario from '../horario.json'
import { day } from '../constantes'

const dataHorario = Array.from(horario)

function searchCurso (codigo) {
  return dataHorario
  .filter(curso => curso.Codigo === codigo ? curso : undefined)[0]
}

function procesarSeccion (horasSeccionInfo) {
  const seccionProcesada = horasSeccionInfo.map(seccionInfo => {
    return {
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
    Object.keys(seccionesCurso).map(secc => procesarSeccion(seccionesCurso[secc])) : 
    [procesarSeccion(seccionesCurso[seccion])]
  //Abre: data.AbreCursos
  return [ { Ciclo: curso.Ciclo, Nombre: curso.Nombre }, seccionesProcesadas]
}

export function getInfoCursos (codigos) {
  const infoCursos = new Map()
  const infoSecciones = new Map()
  codigos.map(cod => {
    let seccion = ''
    if (Number.isNaN(Number(cod.slice(-1)))){
      seccion = cod.slice(-1)
      cod = cod.slice(0,-1)
    }
    const curso = searchCurso(cod)
    if(!curso) return
    const [ cursoInfo, seccionesInfo ] = getInfoCurso(curso, seccion)
    infoCursos.set(cod, cursoInfo) // quiero que de -> BMA20 : [infoCurso]   -> Secciones = BMA20 : [infosecciones]
    infoSecciones.set(cod, seccionesInfo)
  })
  console.log(infoSecciones.get('BMA20'))
  return { infoCursos, infoSecciones }
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

export function getTodasHoras (infoCursos, listCursos) {
  const cursos = infoCursos.values()
  //cursos = Array.from(infoCursos.values()) es una opcion 
  //pero se conocio un poco de iteradores
  const arrHoras = []
  let index = 0
  let result = cursos.next()
  while (!result.done){
    result.value.Horas.forEach(horaTipoCurso => {
      horaTipoCurso['Codigo'] = listCursos[index]
      arrHoras.push(horaTipoCurso)
    })
    result = cursos.next()
    index++
  }
  return arrHoras
}