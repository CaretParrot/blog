import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement("blog-entry")
export class BlogEntryElement extends LitElement {
    @property({type: String})
    title: string = "";
    
    @property({type: String})
    description: string = "";

    @property({type: Date})
    datePublished: Date = new Date();

    @property({type: String})
    imageURL: string = "";

    @property({type: String})
    content: string = "";

    @property({ type: String })
    keywords: string = "";

    static styles = css`
        :host {
            cursor: pointer;
        }
    `;

    titleTemplate() {
        return html`<h1>${this.title}</h1>`;
    }

    descriptionTemplate() {
        return html`<p>${this.description}</p>`;
    }

    imageTemplate() {
        return html`<img style="width: 100%;" src="${this.imageURL}" />`;
    }

    dateTemplate() {
        return html`
            <time style="font-style: italic;" datetime="${this.datePublished}">${this.datePublished.toDateString()}</time>
        `;
    }
    
    render() {
        return html`
            <div>
                ${this.titleTemplate()}
                ${this.dateTemplate()}
                ${this.descriptionTemplate()}
            </div>

            ${this.imageTemplate()}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "blog-entry": BlogEntryElement;
    }
}