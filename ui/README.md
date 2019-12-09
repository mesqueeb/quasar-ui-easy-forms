# Quasar Easy Forms 📮

[![npm](https://img.shields.io/npm/v/quasar-ui-easy-forms.svg?label=quasar-ui-easy-forms)](https://www.npmjs.com/package/quasar-ui-easy-forms)
[![npm](https://img.shields.io/npm/dt/quasar-ui-easy-forms.svg)](https://www.npmjs.com/package/quasar-ui-easy-forms)

- Demo: [quasar-easy-forms.web.app](http://quasar-easy-forms.web.app)
- Support: [jump to support ↓](#support)

# Installation

## Vue project

```bash
npm i quasar-ui-easy-forms
```

## Quasar CLI project

Install the [App Extension](../app-extension).

# Usage

Create and register a boot file:

```js
import Vue from 'vue'
import Plugin from 'quasar-ui-easy-forms'
import 'quasar-ui-easy-forms/dist/index.css'

Vue.use(Plugin)
```

**OR**:

```html
<style src="quasar-ui-easy-forms/dist/index.css"></style>

<script>
import { EasyForm } from 'quasar-ui-easy-forms'

export default {
  components: {
    EasyForm
  }
}
</script>
```

## UMD variant

Exports `window.easyForms`.

Add the following tag(s) after the Quasar ones:

```html
<head>
  <!-- AFTER the Quasar stylesheet tags: -->
  <link href="https://cdn.jsdelivr.net/npm/quasar-ui-easy-forms/dist/index.min.css" rel="stylesheet" type="text/css">
</head>
<body>
  <!-- at end of body, AFTER Quasar script(s): -->
  <script src="https://cdn.jsdelivr.net/npm/quasar-ui-easy-forms/dist/index.umd.min.js"></script>
</body>
```

If you need the RTL variant of the CSS, then go for the following (instead of the above stylesheet link):

```html
<link href="https://cdn.jsdelivr.net/npm/quasar-ui-easy-forms/dist/index.rtl.min.css" rel="stylesheet" type="text/css">
```

# Support

If this helped you in any way, you can contribute to the package's long term survival by supporting me:

### [💜 Support my open-source work on GitHub](https://github.com/sponsors/mesqueeb)

Be sure to check out my sponsor page, I have a lot of open-source packages that might help you!

(GitHub currently **doubles your support**! So if you support me with $10/mo, I will $20 instead! They're alchemists 🦾😉)

Thank you so much!!!

# Developing

If you want to help develop you can clone the package and just run:

```bash
$ npm i
# start dev in SPA mode
$ npm run dev
```

Other develop options include:

```bash
# start dev in UMD mode
$ npm run dev:umd

# start dev in SSR mode
$ npm run dev:ssr

# start dev in Cordova iOS mode
$ npm run dev:ios

# start dev in Cordova Android mode
$ npm run dev:android

# start dev in Electron mode
$ npm run dev:electron
```

# Building package

```bash
$ npm run build
```

# License
MIT (c) Luca Ban - Mesqueeb
