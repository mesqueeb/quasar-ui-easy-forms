<template>
  <div class="tabs-panel-css q-pa-md">
    <EasyForm
      :schema="schema"
      :action-buttons="['edit', 'cancel', 'save']"
      @save="applyCss"
    />
  </div>
</template>

<style lang="stylus" scoped>
// $

// .tabs-panel-css

</style>

<script>
import { pascalCase, camelCase } from 'case-anything'
import { isArray } from 'is-what'
import { dom } from 'quasar'
const { css: applyCss } = dom

export default {
  name: pascalCase('tabs-panel-css'),
  props: {
    classes: {
      type: Array,
      desc: 'An array of classes to show in the textarea. These classes will be targeted in the dom to apply the custom css typed in the textarea.',
    },
  },
  data () {
    const { classes } = this
    const schema = [
      {
        id: 'css',
        label: 'Because of the limitations of this preview, do not nest your sass via indentation.',
        subLabel: '`<style lang="sass">`',
        fieldType: 'input',
        type: 'textarea',
        default: classes.join('\n  \n') + '\n\n',
        standout: true,
        outlined: false,
        autogrow: true,
      },
      {
        subLabel: '`</style>`',
      },
    ]
    return { schema }
  },
  computed: {},
  methods: {
    applyCss ({newData, oldData}) {
      const css = newData.css || ''
      const cssBlockPerClasses = css.split('\n.')
      cssBlockPerClasses.forEach(cssBlock => {
        const cssLines = cssBlock.match(/(\r\n|\r|\n)\s\s(.+)/g)
        if (!cssLines) return
        const className = ('.' + cssBlock.split('\n  ')[0]).replace('..', '.')
        const cssEntries = cssLines.map(line => {
          const parts = line.split(':')
          if (!parts[1]) return
          return [
            parts[0].replace('\n', '').trim(),
            parts[1].replace(';', '').trim()
          ]
        }).filter(isArray)
        if (!cssEntries || !cssEntries.length) return
        const wrapperEl = document.querySelector('.info-box-wrapper form')
        if (!wrapperEl || !wrapperEl.parentElement) return
        const element = wrapperEl.parentElement.querySelectorAll(className)
        if (!element || !element.length) return
        element.forEach(el => {
          const styleObject = cssEntries.reduce((carry, [key, value]) => {
            carry[camelCase(key)] = value
            return carry
          }, {})
          applyCss(el, styleObject)
        })
      })
    }
  },
}
</script>
