import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("blog-search")
export class BlogSearchElement extends LitElement {
    @property({ type: String })
    query: string = "";

    @property({ type: Number })
    resultsCount: Number = 0;

    inputTemplate() {
        return html`
            <input type="text" 
                .value="${this.query}" 
                @input="${(event: { target: HTMLInputElement }) =>
                        this.query = event.target.value}"
            />
        `;
    }   

    resultsCountTemplate() {
        return html`<label>Results: ${this.resultsCount}</label>`;
    }

    render() {
        return html`
            ${this.inputTemplate()}
            ${this.resultsCountTemplate()}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "blog-search": BlogSearchElement;
    }
}