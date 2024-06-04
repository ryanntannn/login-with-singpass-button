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
 * @typedef {Object} AuthOptions
 * @property {string} clientId - The client id provided by the Singpass Developer Portal.
 * @property {string} redirectUri - The redirect uri after the login process is completed.
 * @property {boolean | undefined} stg - Authenticate through staging environment. Default is true.
 * @property {string | undefined} scope - The scope of the login request. Default is 'openid'.
 * @property {string | undefined} responseType - The authorization processing flow to be used. Default is 'code'.
 * @property {string | undefined} state - A session based, unique and non-guessable value.
 * @property {string | undefined} codeChallenge - The hash of a code verifier.
 * @property {string | undefined} codeChallengeMethod - The method used to hash the code verifier. Only S256 is supported.
 * @property {string | undefined} uiLocale - The locale of the Singpass Auth page. Supported locales are 'en', 'ms', 'ta', 'zh-SG'.
 * @property {string | undefined} redirectUriHttpsType - The type of redirect uri. Default is 'https'. Required if the redirect uri uses an app claimed HTTPS URL.
 * @property {string | undefined} appLaunchUrl - The URL to launch the app after the login process is completed.
 * @property {string | undefined} esrvc - For special case internal use.
 * @property {string | undefined} acrValues - For special case internal use.
 */

const xor = (a, b) => !a !== !b;

/**
 * Redirects to the Singpass Auth page to trigger the login process.
 * @param {AuthOptions} authOptions
 * @returns
 */
const redirectToSingpass = function (authOptions) {
  // Check if required fields are present
  const missingRequiredFields = ['clientId', 'redirectUri'].filter(
    (field) => !authOptions[field]
  );
  if (missingRequiredFields.length > 0) {
    console.error(
      `Missing required fields: ${missingRequiredFields.join(', ')}`
    );
    return;
  }

  // Construct the URLß
  const url = new URL(
    authOptions.stg === false
      ? `https://id.singpass.gov.sg/auth`
      : `https://stg-id.singpass.gov.sg/auth`
  );
  url.searchParams.set('scope', authOptions.scope || 'openid');
  url.searchParams.set('response_type', authOptions.responseType || 'code');
  url.searchParams.set('client_id', authOptions.clientId);
  url.searchParams.set('redirect_uri', authOptions.redirectUri);
  url.searchParams.set('nonce', crypto.randomUUID());
  url.searchParams.set('state', authOptions.state || crypto.randomUUID());

  if (xor(authOptions.codeChallenge, authOptions.codeChallengeMethod)) {
    console.error('Both codeChallenge and codeChallengeMethod are required');
  } else if (authOptions.codeChallenge && authOptions.codeChallengeMethod) {
    url.searchParams.set('code_challenge', authOptions.codeChallenge);
    url.searchParams.set(
      'code_challenge_method',
      authOptions.codeChallengeMethod
    );
  }

  if (authOptions.uiLocale) {
    url.searchParams.set('ui_locale', authOptions.uiLocale);
  }

  if (authOptions.redirectUriHttpsType) {
    url.searchParams.set(
      'redirect_uri_https_type',
      authOptions.redirectUriHttpsType
    );
  }

  if (authOptions.appLaunchUrl) {
    url.searchParams.set('app_launch_url', authOptions.appLaunchUrl);
  }

  if (authOptions.esrvc) {
    url.searchParams.set('esrvc', authOptions.esrvc);
  }

  if (authOptions.acrValues) {
    url.searchParams.set('acr_values', authOptions.acrValues);
  }

  // Redirect to the constructed URL
  window.location.href = url;
};

/**
 * An example element.
 * @fires on-click-login-with-singpass - Indicates when the count changes
 */
class LoginWithSingpassButton extends LitElement {
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

      /**
       * Options to configure redirection to the Singpass Auth page to trigger the login process.
       * @type {AuthOptions}
       */
      authOptions: {type: Object},
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
        aria-label="Login with Singpass"
      >
        <img src=${src} />
      </button>
    `;
  }

  _onClick() {
    this.dispatchEvent(new CustomEvent('on-click-login-with-singpass'));

    if (this.authOptions) {
      redirectToSingpass(this.authOptions);
    }
  }
}

LoginWithSingpassButton.redirectToSingpass = redirectToSingpass;

LoginWithSingpassButton.setAuthOptions = function (authOptions) {
  // There should only be one instance of the component on the page
  let component = document.getElementsByTagName(
    'login-with-singpass-button'
  )[0];

  component.setAttribute('authOptions', JSON.stringify(authOptions));
};

export {LoginWithSingpassButton};

window.customElements.define(
  'login-with-singpass-button',
  LoginWithSingpassButton
);
