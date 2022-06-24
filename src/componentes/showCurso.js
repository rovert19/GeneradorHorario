import { LitElement, html, css } from "lit"

class ShowCurso extends LitElement {
  static properties = {
    curso: {type: String},
    index: {type: Number},
  }
  static styles = css`
    :host {
      margin: auto;
      padding: 5px 0; 
    }
    li {
      list-style-type: none;
      width: 100%;
      font-size: 0.95em;
      color: #3c3c3c;
      text-align: center;
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