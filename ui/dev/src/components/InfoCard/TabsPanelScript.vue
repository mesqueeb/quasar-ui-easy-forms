<template>
  <div class="tabs-panel-script">
    <q-markdown v-if="code" no-line-numbers :src="code" />
  </div>
</template>

<script>
export default {
  name: 'TabsPanelScript',
  props: ['valuePrintReady', 'propDataPrintReady', 'varNameProps', 'varNameValue', 'varNameSchema'],
  data () { return {} },
  computed: {
    code () {
      const { valuePrintReady, propDataPrintReady, varNameProps, varNameValue, varNameSchema } = this
      const props = Object.entries(propDataPrintReady)
        .reduce((carry, [key, value]) => {
          if (key === 'schema' && value === varNameSchema) {
            carry += `\n        ${key}: ${value}, // see 'Schema' tab on the left`
            return carry
          }
          carry += `\n        ${key}: ${value},`
          return carry
        }, '')
      return `
\`\`\`
<script>
export default {
  data () {
    return {
      ${varNameValue}: ${valuePrintReady}, // this is in sync with the data when used with v-model
      ${varNameProps}: {${props}
      }
    }
  },
}
<\/script>
\`\`\``.trim()
    },
  },
}
</script>
