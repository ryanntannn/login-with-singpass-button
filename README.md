![alt](./res/btn.svg)

# login-with-singpass-button

![NPM Version](https://img.shields.io/npm/v/%40ndisg%2Flogin-with-singpass-button) [![install size](https://packagephobia.com/badge?p=@ndisg/login-with-singpass-button)](https://packagephobia.com/result?p=@ndisg/login-with-singpass-button)

`login-with-singpass-button` is a lightweight web component that provides a button to login with Singpass as part of the Singpass authentication flow.

## Usage

1. Import the minified script from the CDN

```html
<html>
  <head>
    <!-- other head components -->
    <script
      type="module"
      src="https://cdn.jsdelivr.net/gh/ryanntannn/login-with-singpass-button/login-with-singpass-button.min.js"
    ></script>
    <!-- other head components -->
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

2. Add the `login-with-singpass-button` element anywhere in your body and configure its properties as needed.

```html
<login-with-singpass-button
  size="sm"
  color="white"
  multiline
></login-with-singpass-button>
```

3. Configure your Singpass login URL in your application to redirect to the
   Singpass login page.

```html
<script type="module">
  import {LoginWithSingpassButton} from 'https://cdn.jsdelivr.net/gh/ryanntannn/login-with-singpass-button/login-with-singpass-button.min.js';

  LoginWithSingpassButton.setAuthOptions({
    clientId: 'test',
    redirectUri: 'test',
    state: 'test',
  });
</script>
```

You may also also import the module `LoginWithSingpassButton` and use the `redirectToSingpass` function to redirect to the Singpass login page.

```js
import {LoginWithSingpassButton} from 'https://cdn.jsdelivr.net/gh/ryanntannn/login-with-singpass-button/login-with-singpass-button.min.js';

LoginWithSingpassButton.redirectToSingpass({
  clientId: 'test',
  redirectUri: 'test',
  state: 'test',
});
```

### `login-with-singpass-button` Properties

| Property      | Attribute      | Description                                                                                                | Type             | Default     |
| ------------- | -------------- | ---------------------------------------------------------------------------------------------------------- | ---------------- | ----------- |
| `size`        | `size`         | The size of the button.                                                                                    | `"sm"\|"md"`     | `"md"`      |
| `color`       | `color`        | The color of the button.                                                                                   | `"white"\|"red"` | `"red"`     |
| `multiline`   | `multiline`    | Whether the button should display in multiple lines.                                                       | `boolean`        | `false`     |
| `disabled`    | `disabled`     | Whether the button should be disabled.                                                                     | `boolean`        | `false`     |
| `authOptions` | `auth-options` | The authentication options for the Singpass login. Will not trigger any redirect on click if not specified | `AuthOptions`    | `undefined` |

### `AuthOptions`

The `AuthOptions` object is used to configure the Singpass login flow. All options should be passed in as strings. The following properties are available:

| Property               | Description                                                                                               | Optional | Default               |
| ---------------------- | --------------------------------------------------------------------------------------------------------- | -------- | --------------------- |
| `clientId`             | The client ID for the Singpass login.                                                                     | No       |                       |
| `redirectUri`          | The redirect URI for the Singpass login.                                                                  | No       |                       |
| `stg`                  | Use the singpass stg environment                                                                          | Yes      | `true`                |
| `scope`                | The scope for the Singpass login.                                                                         | Yes      | `"openid"`            |
| `responseType`         | The response type for the Singpass login.                                                                 | Yes      | `"code"`              |
| `state`                | The state for the Singpass login.                                                                         | Yes      | `crypto.randomUUID()` |
| `codeChallenge`        | The code challenge for the Singpass login.                                                                | Yes      |                       |
| `codeChallengeMethod`  | The code challenge method for the Singpass login.                                                         | Yes      |                       |
| `uiLocale`             | The locale of the Singpass Auth page. Supported locales are 'en', 'ms', 'ta', 'zh-SG'                     | Yes      |                       |
| `redirectUriHttpsType` | The type of redirect uri. Default is 'https'. Required if the redirect uri uses an app claimed HTTPS URL. | Yes      |                       |
| `appLaunchUrl`         | The URL to launch the app after login.                                                                    | Yes      |                       |
