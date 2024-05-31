![alt](https://cdn.jsdelivr.net/gh/ryanntannn/login-with-singpass-button/res/btn.svg)

# login-with-singpass-button

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

### Properties

| Property    | Attribute   | Description                                          | Type             | Default |
| ----------- | ----------- | ---------------------------------------------------- | ---------------- | ------- |
| `size`      | `size`      | The size of the button.                              | `"sm"\|"md"`     | `"md"`  |
| `color`     | `color`     | The color of the button.                             | `"white"\|"red"` | `"red"` |
| `multiline` | `multiline` | Whether the button should display in multiple lines. | `boolean`        | `false` |
| `disabled`  | `disabled`  | Whether the button should be disabled.               | `boolean`        | `false` |
