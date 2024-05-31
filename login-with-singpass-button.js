/**
 * @license
 * Copyright 2024 Government Technology Agency of Singapore
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {
  LitElement,
  html,
  css,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';

/**
 * An example element.
 * @fires on-click-login-with-singpass - Indicates when the count changes
 */
export class LoginWithSingpassButton extends LitElement {
  static get styles() {
    return css`
      :host button {
        width: fit-content;
        height: fit-content;
        margin: 0;
        padding: 0;
        border-radius: 6px;
        border: none;
        transition: background-color 0.2s;
      }

      :host button img {
        margin: 0;
        padding: 0;
      }

      :host button.sm.single {
        width: 173px;
        height: 40px;
      }

      :host button.md.single {
        width: 202px;
        height: 48px;
      }

      :host button.sm.multi {
        width: 106px;
        height: 48px;
      }

      :host button.md.multi {
        width: 110px;
        height: 56px;
      }

      :host button.red {
        background-color: #f4333d;
        border: none;
      }

      :host button.white {
        background-color: #ffffff;
        /* We use this instead to avoid affecting the size of the element */
        box-shadow: inset 0px 0px 0px 1px #c8c9cc;
      }

      :host button:hover {
        cursor: pointer;
      }

      :host button.red:hover {
        background-color: #b0262d;
      }

      :host button.white:hover {
        background-color: #f5f5f7;
      }

      :host button.red:active {
        background-color: #801e23;
      }

      :host button.white:active {
        background-color: #e8e9eb;
      }

      :host button:focus {
        outline-width: 2px;
        outline-color: #f4333d;
        outline-offset: 3px;
      }

      :host button:disabled {
        cursor: not-allowed;
      }

      :host button.red:disabled {
        background-color: #e8e9eb;
      }

      :host button.red:disabled img {
        filter: brightness(0.67);
      }

      :host button.white:disabled {
        background-color: #fff;
        box-shadow: inset 0px 0px 0px 1px #aaabad;
      }

      :host button.white:disabled img {
        filter: grayscale(100%) contrast(0) opacity(0.6);
      }
    `;
  }

  static get properties() {
    return {
      /**
       * The color of the button.
       * @type {"red" | "white"}
       */
      color: {type: String},

      /**
       * The size of the button.
       * @type {"sm" | "md"}
       */
      size: {type: String},

      /**
       * Single or multi line button.
       * @type {boolean}
       */
      multiline: {type: Boolean},

      /**
       * Disabled state of the button.
       * @type {boolean}
       */
      disabled: {type: Boolean},
    };
  }

  constructor() {
    super();
  }

  render() {
    const color = this.color || 'red';
    const size = this.size || 'md';
    const line = this.multiline ? 'multi' : 'single';
    const className = [color, size, line].join(' ');
    const src = `https://stg.storybook.design.singpass.gov.sg/${color}-${size}-${line}.svg`;
    return html`
      <button
        @click=${this._onClick}
        class=${className}
        ?disabled=${this.disabled}
      >
        <img src=${src} />
      </button>
    `;
  }

  _onClick() {
    this.dispatchEvent(new CustomEvent('on-click-login-with-singpass'));
  }
}

window.customElements.define(
  'login-with-singpass-button',
  LoginWithSingpassButton
);
