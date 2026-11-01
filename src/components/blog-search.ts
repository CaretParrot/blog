import { LitElement, html, css } from "lit";
import { customElement, property} from "lit/decorators.js";

@customElement("blog-search")
export class BlogSearchElement extends LitElement {
    @property({ type: String })
    query: string = "";

    @property({ type: Number })
    resultsCount: Number = 0;

    @property({ type: String })
    startDate: string = "";

    @property({ type: String })
    endDate: string = "";

    static styles = css`
        input:focus,
        button:hover,
        input:hover {
            box-shadow: 0 0 calc(var(--base-unit) / 2) calc(var(--base-unit) / 2) oklch(0 0 0 / 50%);
            -webkit-tap-highlight-color: transparent;
        }

        ::selection {
            color: var(--element);
            background-color: var(--text);
        }

        ::-moz-selection {
            color: var(--element);
            background-color: var(--text);
        }

        input, button {
            border: calc(var(--base-unit) / 4) solid hsla(0, 0%, 0%, 1);
            border-radius: var(--base-unit);
            padding: var(--base-unit);
            margin: var(--base-unit);
            background-color: var(--element);
        }

        button {
            cursor: pointer;
        }
    `;

    inputTemplate() {
        return html`
            <input
                type="text"
                @input="${(event: { target: HTMLInputElement }) =>
                    (this.query = event.target.value)}"
            />
        `;
    }

    dateRangeTemplate() {
        return html`
            <input type="date" name="start" @input="${(event: { target: HTMLInputElement }) =>
                    (this.startDate = event.target.value)}">&lt;-&gt;
            <input type="date" name="end" @input="${(event: { target: HTMLInputElement }) =>
                    (this.endDate = event.target.value)}">
        `;
    }

    resultsCountTemplate() {
        return html`<label>Results: ${this.resultsCount}</label>`;
    }

    filterButtonTemplate() {
        return html`<button @click="${this.filterEntries}">Filter</button>`;
    }

    render() {
        return html` 
            ${this.inputTemplate()} 
            ${this.dateRangeTemplate()}
            ${this.filterButtonTemplate()}
            ${this.resultsCountTemplate()}
        `;
    }

    filterEntries() {
        this.dispatchEvent(
            new CustomEvent("filterentries", {
                bubbles: true,
                composed: true
            })
        );
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "blog-search": BlogSearchElement;
    }
}
