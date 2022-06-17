import horario_carrera from './fetchCarrera'
import * as horario from '../horario.json'
import { day } from '../constantes'
//const horario = require('../horario.json')
console.log(horario_carrera[0].Ciclo)

function searchCurso (codigo) {
  return horario
  .filter(curso => curso.Codigo === codigo ? curso : undefined)
}

function procesadoSeccion (horasSeccionInfo) {
  const seccionProcesada = horasSeccionInfo.map(seccionInfo => {
    return {
      Tipo: seccionInfo.Tipo,
      Dia: day[seccionInfo['Día']],
      Hora: Number(seccionInfo.Hora.slice(0, 2)),
      Rango: seccionInfo.Hora.slice(6,-3) - seccionInfo.Hora.slice(0, 2)
    }
  })
  return seccionProcesada
}

function getInfoCurso (codigo, seccion) {
  const data = searchCurso(codigo)
  if (!data){
    console.warn(`Este curso de codigo ${codigo} no existe`)
    return {}
  }
  const seccionProcesada = procesadoSeccion(data.Secciones[seccion])

  return {
    Ciclo: data.Ciclo,
    Nombre: data.Nombre,
    Seccion: seccion,
    Horas: seccionProcesada,
    //Abre: data.AbreCursos
  }
}

export function getInfoCursos (codigos) {
  const infoCursos = new Map()
  codigos.map(cod => {
    const codigo = cod.slice(0, -1)
    const seccion = cod.slice(-1)
    infoCursos.set(codigo, getInfoCurso(codigo, seccion)) 
  })
  return infoCursos
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

/*
[{
            Codigo: 'BFI01M',
            "Tipo": "T",
            "Día": "LU" = 0,
            "Hora": 10,
            Rango: 2,
          },]

*/