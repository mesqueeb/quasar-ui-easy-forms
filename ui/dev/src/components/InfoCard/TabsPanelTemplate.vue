<template>
  <div class="tabs-panel-template q-pa-md">
    <div class="text-bold q-my-sm">dynamic prop binding with v-bind</div>
    <q-markdown no-line-numbers :src="codeVBind" />
    <div class="text-bold q-my-sm">regular prop binding</div>
    <q-markdown no-line-numbers :src="codeRegular" />
  </div>
</template>

<script>
export default {
  name: 'TabsPanelTemplate',
  props: {
    tagName: {
      desc: 'The tag name for the template component. Eg. `EasyForm` will render `<EasyForm />`',
      type: String,
    },
    varNameProps: { type: String },
    varNameValue: { type: String },
    varNameSchema: { type: String },
    propDataPrintReady: Object,
  },
  data () { return {} },
  computed: {
    codeRegular () {
      const { tagName, varNameValue, propDataPrintReady } = this
      const props = Object.entries(propDataPrintReady)
        .reduce((carry, [key, value]) => {
          if (value.startsWith('\'') && value.endsWith('\'')) {
            carry += `\n    ${key}="${value.slice(1, -1)}"`
            return carry
          }
          carry += `\n    :${key}="${value}"`
          return carry
        }, `v-model="${varNameValue}"`)
      return `
\`\`\`html
<template>
  <${tagName}
    ${props}
  />
<\/template>
\`\`\``.trim()
    },
    codeVBind () {
      const { tagName, varNameValue, varNameProps } = this
      return `
\`\`\`html
<template>
  <${tagName}
    v-model="${varNameValue}"
    v-bind="${varNameProps}"
  />
<\/template>
\`\`\``.trim()
    },
  },
}
</script>
