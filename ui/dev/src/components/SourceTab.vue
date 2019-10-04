<template>
  <q-splitter
    v-model="splitterModel"
    style="height: 400px"
    class="api-card"
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
            <q-markdown :src="panel.codeRegular" />
          </template>
          <template v-else>
            <q-markdown :src="panel.codeRegular" />
          </template>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>

<script>
import { camelCase } from 'case-anything'
// import { isPlainObject, isArray } from 'is-what'

export default {
  name: 'SourceTab',
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
    return {
      tabControl: 'template',
      splitterModel: 12,
    }
  },
  computed: {
    codePerCategory () {
      const { templateVBind, templateRegular, scriptVBind, scriptRegular } = this
      return [
        {
          name: 'template',
          codeVBind: templateVBind,
          codeRegular: templateRegular,
        },
        {
          name: 'script',
          codeRegular: scriptRegular,
        },
      ]
    },
    settingsFormattedForSource () {
      const { settings, settingsSchema } = this
      return Object.entries(settings)
        .reduce((carry, [key, value]) => {
          if (value === undefined || value === '' || value === false) {
            return carry
          }
          const { fieldType } = settingsSchema[key] || {}
          let valueParsed = JSON.stringify(value)
          valueParsed = valueParsed
            .replace(/'/g, `\\'`)
            .replace(/"/g, `'`)
          carry[key] = valueParsed
          return carry
        }, {})
    },
    templateRegular () {
      const { settingsFormattedForSource, tag } = this
      const props = Object.entries(settingsFormattedForSource)
        .reduce((carry, [key, value]) => {
          carry += `\n  :${key}="${camelCase(tag)}Props.${key}"`
          return carry
        }, `v-model="${camelCase(tag)}Props.value"`)
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
  v-bind="${camelCase(tag)}Props"
  v-model="${camelCase(tag)}Props.value"
/>
\`\`\``
      return content.trim()
    },
    scriptRegular () {
      const { settingsFormattedForSource, tag } = this
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
