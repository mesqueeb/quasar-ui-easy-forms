<template>
  <div class="tabs-panel-template q-pa-md">
    <h6 class="q-my-sm">dynamic prop binding with v-bind</h6>
    <q-markdown no-line-numbers :src="codeVBind" />
    <h6 class="q-my-sm">regular prop binding</h6>
    <q-markdown no-line-numbers :src="codeRegular" />
  </div>
</template>

<script>
import { pascalCase, camelCase } from 'case-anything'
import parseCodeAsString from '../../helpers/parseCodeAsString.js'

export default {
  name: pascalCase('tabs-panel-template'),
  props: {
    tag: {
      type: String,
      validator: prop => ['EasyField', 'EasyForm'].includes(prop),
      values: ['EasyField', 'EasyForm'],
      examples: [`'EasyField'`, `'EasyForm'`],
    },
    settings: Object,
    settingsSchema: Object,
  },
  data () { return {} },
  computed: {
    schemaVarName () {
      const { tag, settings } = this
      const { fieldType } = settings
      return (tag === 'EasyField')
        ? `schema${pascalCase(tag) + pascalCase(fieldType)}`
        : `schema${pascalCase(tag)}`
    },
    settingsFormattedForSource () {
      const { settings, settingsSchema, schemaVarName } = this
      return Object.entries(settings)
        .reduce((carry, [propKey, propValue]) => {
          if (propValue === undefined || propValue === '' || propKey === 'value') {
            return carry
          }
          if (propKey === 'schema') {
            carry[propKey] = `${schemaVarName}, // see 'Schema' tab on the left`
            return carry
          }
          carry[propKey] = parseCodeAsString(propValue)
          return carry
        }, {})
    },
    codeRegular () {
      const { settingsFormattedForSource, tag } = this
      const props = Object.entries(settingsFormattedForSource)
        .reduce((carry, [key, value]) => {
          carry += `\n  :${key}="${camelCase(tag)}Props.${key}"`
          return carry
        }, `v-model="${camelCase(tag)}value"`)
      const content = `
\`\`\`html
<${tag}
  ${props}
/>
\`\`\``
      return content.trim()
    },
    codeVBind () {
      const { tag } = this
      const content = `
\`\`\`html
<${tag}
  v-model="${camelCase(tag)}Value"
  v-bind="${camelCase(tag)}Props"
/>
\`\`\``
      return content.trim()
    },
  },
}
</script>
