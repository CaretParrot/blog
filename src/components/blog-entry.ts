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

    @property({ type: Array<String> })
    tags: String[] = [];

    static styles = css`
        img {
            width: 100%;
        }

        time {
            font-style: italic;
        }

        .small {
            background-color: var(--element-container);
            width: fit-content;
            font-size: 0.75rem;
            border-radius: var(--base-unit);
            padding: calc(var(--base-unit) / 2);
        }

        div div {
            display: flex;
            padding: 0;
            margin: 0;
        }
    `;

    titleTemplate() {
        return html`<h1>${this.title}</h1>`;
    }

    descriptionTemplate() {
        return html`<p class="small">${this.description}</p>`;
    }

    imageTemplate() {
        return html`<img src="${this.imageURL}" />`;
    }

    dateTemplate() {
        return html`
            <time datetime="${this.datePublished}">
                ${this.datePublished.toDateString()}
            </time>
        `;
    }

    tagsTemplate() {
        return html`
            <div>
                ${this.tags.map(
                    (tag) => html`<label class="small">${tag}</label>`
                )}
            </div>
        `;
    }

    render() {
        return html`
            <div>
                ${this.titleTemplate()} ${this.dateTemplate()}
                ${this.descriptionTemplate()} ${this.tagsTemplate()}
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
