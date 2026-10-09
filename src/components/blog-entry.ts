import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement("blog-entry")
export class BlogEntry extends LitElement {
    @property({type: String})
    title: string = "";
    
    @property({type: String})
    description: string = "";

    @property({type: String})
    imageURL?: string = "https://caretparrot.github.io/papaya-salad/Profile%20Picture.png";

    titleTemplate() {
        return html`<h1>${this.title}</h1>`;
    }

    descriptionTemplate() {
        return html`<p>${this.description}</p>`;
    }

    imageTemplate() {
        return html`<img style="
            width: 100%;
        " src="${this.imageURL || "https://caretparrot.github.io/papaya-salad/Profile%20Picture.png"}" />`;
    }
    
    render() {
        return html`
            <div>
                ${this.titleTemplate()}
                ${this.descriptionTemplate()}
            </div>

            ${this.imageTemplate()}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "blog-entry": BlogEntry;
    }
}