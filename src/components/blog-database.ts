import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement("blog-database")
export class BlogDatabase extends LitElement {
    @property()
    count: number = 0;
    
    static styles = css`
        slot {
            border: none;
            width: 100%;
        }

        blog-entry {
            width: 100%;
            height: 100%;
        }
    `;

    render() {
        return html`<div><slot></slot></div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "blog-database": BlogDatabase;
    }
}