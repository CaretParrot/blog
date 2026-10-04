import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement("blog-entry")
export class BlogEntry extends LitElement {
    @property()
    title: string = "";
    
    @property()
    description: string = "";

    @property()
    imageURL?: string = "https://caretparrot.github.io/papaya-salad/Profile%20Picture.png";

    static styles = css`
        img {
            width: 10%;
        }
    `;

    titleTemplate() {
        return html`<h1>${this.title}</h1>`;
    }

    descriptionTemplate() {
        return html`<p>${this.description}</p>`;
    }

    imageTemplate() {
        return html`<img src="${this.imageURL}" />`;
    }
    
    render() {
        return html`
            ${this.titleTemplate()}
            ${this.descriptionTemplate()}
            ${this.imageTemplate()}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "blog-entry": BlogEntry;
    }
}