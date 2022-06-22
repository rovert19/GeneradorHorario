
let combinacion = []

export function combinatoriaCursos (infoSecciones, indice, arrCombos) {
  if(indice === infoSecciones.length){
    return combinacion
  }

  for (const elemento of infoSecciones[indice]){
    combinacion.push(elemento);
    
    let aux = combinacion.slice()
    if(aux.length === infoSecciones.length) arrCombos.push(aux)
    combinatoriaCursos(infoSecciones, indice + 1, arrCombos)
    combinacion.pop();
  }
}