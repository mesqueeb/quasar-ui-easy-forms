<template>
  <q-splitter
    v-model="splitterModel"
    style="height: 400px"
    class="tabs-panel-source"
  >
    <template v-slot:before>
      <q-tabs
        v-model="tabControl"
        vertical
        style="background: whitesmoke"
        class="text-grey full-height"
        active-color="primary"
        indicator-color="primary"
        no-caps
      >
        <q-tab
          v-for="panel in Object.values(codePerCategory)"
          :key="panel.name"
          :name="panel.name"
          :label="panel.name[0].toUpperCase() + panel.name.slice(1)"
          class="_left-tab"
        />
      </q-tabs>
    </template>

    <template v-slot:after>
      <q-tab-panels
        v-model="tabControl"
        animated
        transition-prev="slide-down"
        transition-next="slide-up"
      >
        <q-tab-panel
          v-for="panel in Object.values(codePerCategory)"
          :key="panel.name"
          :name="panel.name"
        >
          <template v-if="panel.codeVBind">
            <h6 class="q-my-sm">dynamic prop binding with v-bind</h6>
            <q-markdown :src="panel.codeVBind" />
            <h6 class="q-my-sm">regular prop binding</h6>
          </template>
          <q-markdown :src="panel.codeRegular" />
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>

<script>
import { pascalCase, camelCase } from 'case-anything'
import { isFunction } from 'is-what'

function parseCodeAsString (code) {
  const stringifiedFns = []
  function replacer (key, value) {
    if (isFunction(value) && value.prototype.stringifiedFn) {
      const fnString = value.prototype.stringifiedFn
      stringifiedFns.push(fnString)
      return fnString
    }
    return value
  }
  const string = JSON.stringify(code, replacer, 2)
  const cleanedString = string
    .replace(/'/g, `\\'`)
    .replace(/"/g, `'`)
  const formatedString = stringifiedFns.reduce((str, fnString) => {
    const fnStringRegex = `'${fnString.replace(/'/g, `\\'`).replace(/"/g, `'`)}'`
    return str.replace(fnStringRegex, fnString)
  }, cleanedString)
  return formatedString
}

export default {
  name: pascalCase('tabs-panel-source'),
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
  data () {
    const tabControl = (this.tag === 'EasyForm')
      ? 'schema'
      : 'script'
    return {
      tabControl,
      splitterModel: 12,
    }
  },
  computed: {
    codePerCategory () {
      const { templateVBind, templateRegular, scriptVBind, scriptRegular, propSchema } = this
      return [
        propSchema ? {
          name: 'schema',
          codeRegular: propSchema,
        } : null,
        {
          name: 'template',
          codeVBind: templateVBind,
          codeRegular: templateRegular,
        },
        {
          name: 'script',
          codeRegular: scriptRegular,
        },
      ].filter(notNull => notNull)
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
    templateRegular () {
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
    templateVBind () {
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
    scriptRegular () {
      const { settings, settingsFormattedForSource, tag } = this
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
      ${camelCase(tag)}Value: ${parseCodeAsString(settings.value)}, // this is in sync with the data when used with v-model
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
