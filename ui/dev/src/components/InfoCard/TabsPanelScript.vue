<template>
  <div class="tabs-panel-script">
    <q-markdown no-line-numbers :src="code" />
  </div>
</template>

<script>
import { pascalCase, camelCase } from 'case-anything'
import parseCodeAsString from '../../helpers/parseCodeAsString.js'

export default {
  name: pascalCase('tabs-panel-script'),
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
    code () {
      const { scriptRegular } = this
      return scriptRegular
    },
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
    scriptRegular () {
      const { settings, settingsFormattedForSource, tag } = this
      const value = !settings.value ? settings.value : parseCodeAsString(settings.value)
      const props = Object.entries(settingsFormattedForSource)
        .reduce((carry, [key, value]) => {
          carry += `\n        ${key}: ${value},`
          return carry
        }, '')
      const content = `
\`\`\`js
{
  data () {
    return {
      ${camelCase(tag)}Value: ${value}, // this is in sync with the data when used with v-model
      ${camelCase(tag)}Props: {${props}
      }
    }
  },
}
\`\`\``
      return content.trim()
    },
  },
}
</script>
