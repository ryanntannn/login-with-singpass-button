/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { MyElement } from "../login-with-singpass-button.js";
import { fixture, assert } from "@open-wc/testing";
import { html } from "lit/static-html.js";

suite("login-with-singpass-button", () => {
  test("is defined", () => {
    const el = document.createElement("login-with-singpass-button");
    assert.instanceOf(el, MyElement);
  });

  test("renders with default values", async () => {
    const el = await fixture(
      html`<login-with-singpass-button></login-with-singpass-button>`
    );
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test("renders with a set name", async () => {
    const el = await fixture(
      html`<login-with-singpass-button
        name="Test"
      ></login-with-singpass-button>`
    );
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, Test!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test("handles a click", async () => {
    const el = await fixture(
      html`<login-with-singpass-button></login-with-singpass-button>`
    );
    const button = el.shadowRoot.querySelector("button");
    button.click();
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 1</button>
      <slot></slot>
    `
    );
  });

  test("styling applied", async () => {
    const el = await fixture(
      html`<login-with-singpass-button></login-with-singpass-button>`
    );
    await el.updateComplete;
    assert.equal(getComputedStyle(el).paddingTop, "16px");
  });
});
