import { LitElement, html, css } from "lit"

class ShowCurso extends LitElement {
  static properties = {
    curso: {type: String},
    index: {type: Number},
  }
  static styles = css`
    li {
      display: block;
      border: 2px deepskyblue solid;
      margin: auto;
    }
  `
  render() {
    const description = this.curso.length > 5 ? 
    html`Código: ${this.curso.slice(0,-1)}  Sección: ${this.curso.slice(-1)}` :
    html`Código: ${this.curso}  Sección: Todas`

    return html`
    <li class="num-curso-${this.index}" id=${this.curso}>
      ${description}
    </li>
    `
  }
}

customElements.define('show-curso', ShowCurso)