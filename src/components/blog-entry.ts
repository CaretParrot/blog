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

    static styles = css`
        div {
            margin: var(--base-unit);
        }

        .outer-wrapper {
            display: grid;
            grid: auto / auto auto;
            margin: var(--base-unit);
            border: calc(var(--base-unit) / 4) solid hsla(0, 0%, 0%, 1);
            border-radius: var(--base-unit);
        }

        .text {
            display: grid;
            grid: auto / 1fr;
        }

        h1, p {
            width: 100%;
            padding: var(--base-unit);
        }

        img {
            width: 50%;
        }
    `;

    titleTemplate() {
        return html`<h1>${this.title}</h1>`;
    }

    descriptionTemplate() {
        return html`<p>${this.description}</p>`;
    }

    imageTemplate() {
        return html`<img src="${this.imageURL || "https://caretparrot.github.io/papaya-salad/Profile%20Picture.png"}" />`;
    }
    
    render() {
        return html`
            <div class="outer-wrapper">
                <div class="text">
                    ${this.titleTemplate()}
                    ${this.descriptionTemplate()}
                </div>

                ${this.imageTemplate()}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "blog-entry": BlogEntry;
    }
}