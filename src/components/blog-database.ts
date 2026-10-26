import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement("blog-database")
export class BlogDatabaseElement extends LitElement {
    @property({type: Number})
    count: number = 0;

    render() {
        return html`
            <slot></slot>
            <slot></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "blog-database": BlogDatabaseElement;
    }
}