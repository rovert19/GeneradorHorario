import { css, html, LitElement } from "lit"
import{ getInfoCursos } from "../fetchs/infoCursos"
import { generarHorario } from "../generador"
import { day } from "../constantes"
import { range } from "lit/directives/range.js"
import { map } from "lit/directives/map.js"
import './showCurso.js'
import './diaHorario.js'

class MyElement extends LitElement {
  static properties = { // los elementos de aqui se podran actualizar tiene un estado
    nombre: {type: String},
    checked: {type: Boolean},
    listCursos: {type: Array},
    combosCursos: {state: true},
    generate: {state: true},
  }
  
  static styles = css`
  .container {
    display: flex;
    justify-content: space-around;
    border: 1px var(--color-design-horario) solid;
    margin: auto;
    width: 695px;
    height: 805px;
    padding: 5px;

  }
  .container-hour {
    display: flex;
    flex-direction: column;
    text-align: center;
    border-top-style: none;
    border-bottom-style: none;
    padding: 0.5px 0;
    margin-left: auto;
    width: 80px;
    height: 800px;
  }
  .hora {
    width: 80px;
    border: 1px var(--color-cell-horario) solid;
    padding: 10px 0px;
    height: 30px;
    text-align: center;
    font-size: 12px;
  }
  .container-preview {
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 0.5px 20px;
    background-color: var(--color-design-horario); //luego lo asignaremos
    border-radius: 20px;
    width: 50%;
  }
  `

  constructor() {
    super()
    this.nombre = ''
    this.listCursos = []
    this.checked = false
    this.combosCursos = []
    this.generate = false
  }

  get inputCurso() {
    return this.renderRoot?.querySelector('#inputCurso') ?? null
  }

  handleChange(e) {
    this.nombre = e.target.value
  }

  setChecked(e) {
    this.checked = e.target.checked
    console.log(this.checked)
  }

  addCurso() {
    this.listCursos.push(this.inputCurso.value)
    this.inputCurso.value = ''
    this.requestUpdate()
  }

  handleclick(e) {
    const index = Number(e.target.__index)
    console.log(getInfoCursos([this.listCursos[index]]).infoCursos.get(this.listCursos[index].slice(0,-1)))
  }

  handleClickGenerate() {
    if(this.listCursos.length > 0) {
      this.combosCursos = generarHorario(this.listCursos)[0][0]
      this.generate = !this.generate
    } 
  }

  render() {
    const showHora = (hora) => {
      if(hora > 9) {
        return html`${hora}:00 <br>${hora+1}:00<br>`
      }
      if(hora == 9) {
        return html`0${hora}:00 <br>${hora+1}:00<br>`
      }
      if(hora < 9) {
        return html`0${hora}:00 <br>0${hora+1}:00<br>`
      }
    }

    const isGenerate = this.generate ? 
      html`
        <h3>Horario generado a ${this.nombre}</h3>
        <div class="container">
          <div class="container-hour">
            <span class="dia">Día ${Object.keys(day)[this.dia]}</span><br>
            ${map(range(7, 22), (hora) => {
            return html`<span class="hora">${showHora(hora)}</span>`
            })}
          </div>
          ${this.combosCursos.map((comboDia, dia) => {
          return html`
          <dia-horario .dia=${dia} .cursosToday=${comboDia}></dia-horario>`
          })}
        </div>` :
      html `<button @click=${this.handleClickGenerate}>Generar</button>`

    return html`
    <h2>Estoy aprendiendo Lit</h2>
    <div>
      <label>Nombre:</label><br>
      <input @input=${this.handleChange} placeholder="Digita tu nombre" value=""><br>
      <label>Lista de cursos: </label><br>
      <input id="inputCurso" placeholder="Ingresa un cursos" value="" ?disabled=${!this.checked}>
      <button @click=${this.addCurso}>Agregar</button><br>
      <label>Editar</label><input type='checkbox' @change=${this.setChecked}>
    </div>
    <br>
    <h3>Mostrando los cursos</h3>
    <p>Total de cursos: ${this.listCursos.length}</p>
    <ul @click=${this.handleclick} class="container-preview">
      ${this.listCursos.map((curso, index) => {
        return html`<show-curso .curso=${curso} .index=${index}></show-curso>`
      })
    }  
    </ul>
    ${isGenerate}
    `;
  }
}

customElements.define('my-element', MyElement)
