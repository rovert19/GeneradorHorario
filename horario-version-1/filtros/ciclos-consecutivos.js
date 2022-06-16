import { getCursoCiclo } from "../fetchs/infoCursos"

function checkCiclos (arrCiclos) {
  const minCiclo = arrCiclos.sort((a, b) => a-b)[0]
  const maxCiclo = arrCiclos.sort((a,b) => b-a)[0]
  return [maxCiclo - minCiclo < 3, minCiclo, maxCiclo]
}

export function checkConsecutivos (infoCursos) {
  const infoCiclos = getCursoCiclo(infoCursos)
  const codigos = Array.from(infoCursos.keys())
  const cursosNoPermitidos = []
  const [areInRow, minCiclo, maxCiclo] = checkCiclos(infoCiclos)
  if (!areInRow) {
    let index = 0
    while (index < infoCiclos.length) {
      index = infoCiclos.indexOf(maxCiclo, index)
      if (index === -1) break
      //infoCiclos.splice(index, 1)
      const codigo = codigos.splice(index, 1)[0]
      cursosNoPermitidos.push(codigo)
      infoCursos.delete(codigo)
    }
  }
  return cursosNoPermitidos
}