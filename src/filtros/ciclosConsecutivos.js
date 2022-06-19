import { getCursoCiclo } from "../fetchs/infoCursos"

function checkCiclos (arrCiclos) {
  const ciclosOrdenados = arrCiclos.sort((a, b) => a-b)
  const minCiclo = ciclosOrdenados[0]
  const maxCiclo = ciclosOrdenados.slice(-1)
  return [maxCiclo - minCiclo < 3, maxCiclo]
}

export function checkConsecutivos (infoCursos) {
  const infoCiclos = getCursoCiclo(infoCursos)
  const codigos = Array.from(infoCursos.keys())
  const cursosNoPermitidos = []
  const [areInRow, maxCiclo] = checkCiclos(infoCiclos)
  if (!areInRow) {
    codigos.filter((codigo, index) => {
      if (infoCiclos[index] === maxCiclo) {
        cursosNoPermitidos.push(codigo)
        infoCursos.delete(codigo) 
      }
    })
  }
  return cursosNoPermitidos
}