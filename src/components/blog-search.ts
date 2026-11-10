import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("blog-search")
export class BlogSearchElement extends LitElement {
    @property({ type: String })
    query: string = "";

    @property({ type: Number })
    resultsCount: Number = 0;

    @property({ type: Date })
    startDate: Date = new Date("");

    @property({ type: Date })
    endDate: Date = new Date("");

    @property({ type: String })
    minDate: Date = new Date("");

    @property({ type: String })
    maxDate: Date = new Date("");

    static styles = css`
        input:focus,
        button:hover,
        input:hover {
            box-shadow: 0 0 calc(var(--base-unit) / 2)
                calc(var(--base-unit) / 2) oklch(0 0 0 / 50%);
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

        form {
            display: flex;
            margin: 0;
            padding: 0;
            width: 100%;
            flex-flow: row wrap;
            justify-content: center;
        }

        input,
        button,
        label {
            border: calc(var(--base-unit) / 4) solid hsla(0, 0%, 0%, 1);
            border-radius: var(--base-unit);
            padding: var(--base-unit);
            margin: var(--base-unit);
            background-color: var(--element);
        }

        input[type="submit"] {
            cursor: pointer;
        }

        #arrows {
            background-color: transparent;
            border: none;
            margin: 0;
            padding: 0;
            align-items: center;
            display: flex;
        }
    `;

    inputTemplate() {
        return html`
            <input
                type="text"
                name="query"
                @input="${(event: { target: HTMLInputElement }) =>
                    (this.query = event.target.value)}"
            />
        `;
    }

    dateRangeTemplate() {
        return html`
            <input
                type="date"
                name="start"
                min="${this.minDate.toLocaleDateString("en-CA")}"
                max="${this.maxDate.toLocaleDateString("en-CA")}"
                value="${this.minDate.toLocaleDateString("en-CA")}"
                @input="${(event: { target: HTMLInputElement }) =>
                    (this.startDate = new Date(event.target.value))}"
            /><label id="arrows">&lt;-&gt;</label>
            <input
                type="date"
                name="end"
                min="${this.minDate.toLocaleDateString("en-CA")}"
                max="${this.maxDate.toLocaleDateString("en-CA")}"
                value="${this.maxDate.toLocaleDateString("en-CA")}"
                @input="${(event: { target: HTMLInputElement }) =>
                    (this.endDate = new Date(event.target.value))}"
            />
        `;
    }

    resultsCountTemplate() {
        return html`<label>Results: ${this.resultsCount}</label>`;
    }

    filterButtonTemplate() {
        return html`<input value="Filter" type="submit" />`;
    }

    render() {
        return html`
            <form
                action="/"
                @submit="${(event: Event) => {
                    event.preventDefault();
                    this.filterEntries();
                }}"
            >
                ${this.inputTemplate()} ${this.dateRangeTemplate()}
                ${this.filterButtonTemplate()} ${this.resultsCountTemplate()}
            </form>
        `;
    }

    filterEntries() {
        this.dispatchEvent(
            new CustomEvent("filterentries", {
                bubbles: true,
                composed: true,
            })
        );
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "blog-search": BlogSearchElement;
    }
}
