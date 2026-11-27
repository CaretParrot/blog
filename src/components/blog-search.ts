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
        input:hover,
        input[type="submit"]:hover {
            -webkit-tap-highlight-color: transparent;
        }

        form {
            display: flex;
            flex-flow: row wrap;
            justify-content: center;
        }

        input,
        button,
        label {
            font-family: inherit;
            border: inherit;
            border-radius: var(--base-unit);
            padding: var(--base-unit);
            margin: var(--base-unit);
            background-color: var(--element-container);
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
            ${this.inputTemplate()} ${this.dateRangeTemplate()}
            ${this.filterButtonTemplate()} ${this.resultsCountTemplate()}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "blog-search": BlogSearchElement;
    }
}
