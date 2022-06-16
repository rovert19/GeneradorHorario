import { day, ciclos } from "./filtros/constantes"
//Función que capta del dom los cursos seleccionados
// Retorna una lista de Cursos y
// una lista de los ciclo a los cuales pertenecen


const cicloCursos = []
const arrCursos = undefined

export function selectionCourses () {
  arrCursos = document.querySelectorAll('.selected')
  .map(cardCurso => {
    const Codigo = `${cardCurso.children[0].innerHTML}${cardCurso.children[2].innerHTML}`
    const Nombre = cardCurso.children[1].innerHTML
    const Dia = day[cardCurso.children[4].innerHTML] // Coord X
    const Hora = Number(cardCurso.children[5].innerHTML.slice(0,2)) // Coord y 
    const Rango = Hora.slice(0,2) - Hora.slice(6,-3)
    
    cicloCursos.push(ciclos[cardCurso.children[7].innerHTML])
    
    return { Codigo, Nombre, Dia, Hora, Rango }
  })
}

//Va en otro archivo
const confirmCursosButton = document.querySelector('#generate')
confirmCursosButton.addEventListener("click", selectionCourses)
