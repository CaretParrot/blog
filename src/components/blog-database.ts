import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement("blog-database")
export class BlogDatabase extends LitElement {
    @property({type: Number})
    count: number = 0;

    render() {
        return html`<div><slot></slot></div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "blog-database": BlogDatabase;
    }
}