import { LitElement, html, css } from "lit"
import { range } from "lit/directives/range.js"
import { map } from "lit/directives/map.js"
import { tipos, day } from "../constantes"

class DiaHorario extends LitElement {
  static properties = {
    dia: {type: Number},
    cursosToday: {type: Array},
  }

  static styles = css`
  .dia {
    text-align: center;
  }
  .container-day {
    display: flex;
    flex-direction: column;
    border: 1px gray solid;
    margin: auto;
    width: 100px;
    height: 800px;
  }
  .container-curso-hora {
    width: 100px;
    display:flex;
    flex-direction: column;
    border-bottom: 1px gray solid;
    border-top: 1px gray solid;
    height: 50px;
    text-align: center;
    font-size: 10px;
  }
  .content-hora {
    margin: auto 0;
    width: 96px;
    height: 15px;
    font-size: 10px;
    padding: 5px 2px;
  }
  `

  render() {
    const showContent = (hora)  => {
      const cursosNow = this.cursosToday.filter(curso => curso.Hora <= hora && hora < curso.Hora + curso.Rango)
      return cursosNow.map(curso => html`<span class="content-hora">${curso.Codigo} - ${tipos[curso.Tipo]}<br></span>`)
    }

    return html`
    <div class="container-day">
      <span class="dia">${Object.keys(day)[this.dia]}</span><br>
      ${map(range(7, 22), (hora) => {
        return html`<div class='container-curso-hora'>${showContent(hora)}</div>`
      })}
    </div>
    `
  }
}
customElements.define('dia-horario', DiaHorario)