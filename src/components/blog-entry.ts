import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("blog-entry")
export class BlogEntryElement extends LitElement {
    @property({ type: String })
    title: string = "";

    @property({ type: String })
    description: string = "";

    @property({ type: Date })
    datePublished: Date = new Date();

    @property({ type: String })
    imageURL: string = "";

    @property({ type: String })
    content: string = "";

    @property({ type: String })
    keywords?: string = "";

    @property({ type: String })
    tags?: string = "";

    static styles = css`
        h1 {
            line-height: 1.5;
        }

        img {
            width: 100%;
        }

        time {
            font-style: italic;
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

    dateTemplate() {
        return html`
            <time datetime="${this.datePublished}"
                >${this.datePublished.toDateString()}</time
            >
        `;
    }

    render() {
        return html`
            <div>
                ${this.titleTemplate()} ${this.dateTemplate()}
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
