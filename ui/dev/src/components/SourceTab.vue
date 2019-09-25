<template>
  <div>
    <h6 class="q-my-sm">regular prop binding template</h6>
    <q-input standout autogrow v-model="sourceCodeTemplate" />
    <h6 class="q-my-sm">with v-bind</h6>
    <q-input standout autogrow v-model="sourceCodeVBind" />
  </div>
</template>

<script>
// import { isPlainObject, isArray } from 'is-what'

export default {
  name: 'SourceTab',
  props: {
    settings: Object,
    settingsMetaData: Object,
  },
  data () { return {} },
  computed: {
    settingsFormattedForSource () {
      const { settings, settingsMetaData } = this
      return Object.entries(settings)
        .reduce((carry, [key, value]) => {
          if (value === undefined || value === '' || value === false) {
            return carry
          }
          const { fieldType } = settingsMetaData[key] || {}
          let valueParsed = JSON.stringify(value)
          valueParsed = valueParsed
            .replace(/'/g, `\\'`)
            .replace(/"/g, `'`)
          carry[key] = valueParsed
          return carry
        }, {})
    },
    sourceCodeTemplate () {
      const { settingsFormattedForSource } = this
      const open = '<EasyField\n  v-model="model"'
      const props = Object.entries(settingsFormattedForSource)
        .reduce((carry, [key, value]) => {
          carry += `\n  :${key}="${value}"`
          return carry
        }, '')
      const close = '\n/>\n'
      return `${open}${props}${close}`
    },
    sourceCodeVBind () {
      const { settingsFormattedForSource } = this
      const open = `<template>
  <EasyField
    v-model="model"
    v-bind="fieldProps"
  />
</template>
<script>
export default {
  data () {
    return {
      fieldProps: {`
      const props = Object.entries(settingsFormattedForSource)
        .reduce((carry, [key, value]) => {
          carry += `\n        ${key}: ${value},`
          return carry
        }, '')
      const close = `
      }
    }
  },
}
</ script>`
      return `${open}${props}${close}`
    },
  },
}
</script>
