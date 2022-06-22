import { generarHorario } from './generador'

//                         2       2        5       2         2       6  =  max 480
const cursosElegidos = ["BMA20","CIB12","EE648","EE644M","EE528","EE530O"]

function clasificarHorario(allCombos, totalInfoCruces) {
  const infoCrucesPosibles = []
  const infoSinCruces = []
  const infoCrucesTipo1 = []
  const infoCrucesTipo2 = []
  const infoCrucesMod = []
  const combosSinCruce  = [] // Sin cruce
  const combosCruceTipo1 = [] // Teoria-Otro
  const combosCruceTipo2 = [] // Teoria-Teoria
  const combosModificar = [] //Los demas casos
  const combosPosibles = allCombos.filter((combo, index) => {
    if (totalInfoCruces[index][0].Cantidad === 0 && (totalInfoCruces[index][1].Cantidad + totalInfoCruces[index][2].Cantidad < 3)) {
      infoCrucesPosibles.push(totalInfoCruces[index])
      return combo
    } else {
      infoCrucesMod.push(totalInfoCruces[index])
      combosModificar.push(combo)
    }
  })
  if (combosPosibles.length !== 0) {
    combosPosibles.filter((combo, index) => {
      if (infoCrucesPosibles[index][2].Cantidad === 0) {
        if (infoCrucesPosibles[index][1].Cantidad === 0) {
          combosSinCruce.push(...combosPosibles.splice(index, 1))
          infoSinCruces.push(...infoCrucesPosibles.splice(index, 1))
          index--
        } else {
          if (infoCrucesPosibles[index][1].Cantidad === 1) {
            combosCruceTipo1.push(...combosPosibles.splice(index, 1))
            infoCrucesTipo1.push(...infoCrucesPosibles.splice(index, 1))
            index--
          } 
        }
      } else {
        if (infoCrucesPosibles[index][1].Cantidad === 0) {
          if ((infoCrucesPosibles[index][2].Horas < 5 && infoCrucesPosibles[index][2].Cantidad === 2)
              || (infoCrucesPosibles[index][2].Horas < 3 && infoCrucesPosibles[index][2].Cantidad === 1)) {
            combosCruceTipo2.push(...combosPosibles.splice(index, 1))
            infoCrucesTipo2.push(...infoCrucesPosibles.splice(index, 1))
            index--
          }
        } 
      } 
    })
  }
  combosModificar.push(...combosPosibles)
  infoCrucesMod.push(...infoCrucesPosibles)
  const len = combosModificar.length > 100 ?  20 
              : combosModificar.length > 10 ? 10 : combosModificar.length
  return [combosSinCruce,
          [combosCruceTipo1, infoCrucesTipo1],
          [combosCruceTipo2, infoCrucesTipo2],
          [combosModificar.slice(0, len), infoCrucesMod.slice(0, len)]]
}

//Se clickea un boton de cierto id que sera el index del tipo de combo
function filtrarCursosGenerados(combosTipo, horas=1, cantidad=1) {
  return combosTipo[1].filter((infoCruce, index) => {
    const totalCruces = infoCruce[0].Cantidad + infoCruce[1].Cantidad + infoCruce[2].Cantidad
    const totalHoras = infoCruce[0].Horas + infoCruce[1].Horas + infoCruce[2].Horas
    if (totalCruces === cantidad && totalHoras === horas) return combosTipo[0][index]
  })
}

console.time('Genera los cursos')
const [totalCombos, totalInfoCruces ] =  generarHorario(cursosElegidos)

console.log('Clasificando horario')
const combosClasificados = clasificarHorario(totalCombos.slice(),totalInfoCruces.slice())
const tiposCasos = ['casos sin cruces', 'casos con cruce teoria-otro', 'casos con cruce teoria-teoria', 'casos no permitidos, no hay más opciones']

console.log(`Se muestran solo ${tiposCasos[0]}`)
console.log(combosClasificados[0])
console.log(`Se muestran solo ${tiposCasos[1]}`)
console.log(combosClasificados[1])
console.log(`Se muestran solo ${tiposCasos[2]}`)
console.log(combosClasificados[2])
console.log(`Se muestran solo ${tiposCasos[3]}`)
console.log(combosClasificados[3])
console.timeEnd('Genera los cursos')

const totalPosibles = combosClasificados[0].length + combosClasificados[1][0].length + combosClasificados[2][0].length

console.log(`Total de horarios a elegir: ${totalPosibles}`)

console.log(filtrarCursosGenerados(combosClasificados[2], 4, 2))


//480 casos
//Mostrar 10(if hay mas de 20 casos sin cruces) sin cruces y de los demas excepto con cruces no permitidos

//Mostrar 6(if hay menos de 20 casos pero mayor a 12 sin cruces) y los demas 10 excepto con cruces no permitidos
//Mostart 5 o los que hay cuando hay 12 casos o menos de sin cruces y los demas 10 excepto con cruces no permitidos
//Mostrar 10(if hay mas de 20 casos con cruce teoria-teoria)
//
//continuamente

//Solo existen horarios con cruces no permitidos se muestran