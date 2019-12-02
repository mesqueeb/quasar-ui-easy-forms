<template>
  <div class="tabs-panel-schema">
    <q-markdown no-line-numbers :src="code" />
  </div>
</template>

<script>
import { pascalCase } from 'case-anything'
import parseCodeAsString from '../../helpers/parseCodeAsString.js'

export default {
  name: pascalCase('tabs-panel-schema'),
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
      const { propSchema } = this
      return propSchema
        ? propSchema
        : null
    },
    schemaVarName () {
      const { tag, settings } = this
      const { fieldType } = settings
      return (tag === 'EasyField')
        ? `schema${pascalCase(tag) + pascalCase(fieldType)}`
        : `schema${pascalCase(tag)}`
    },
    propSchema () {
      const { settings, schemaVarName } = this
      const { schema } = settings
      if (!schema) return false
      return `
\`\`\`js
const ${schemaVarName} = ${parseCodeAsString(schema)}
\`\`\``.trim()
    },
  },
}
</script>
