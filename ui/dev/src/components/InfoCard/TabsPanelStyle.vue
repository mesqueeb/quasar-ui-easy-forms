<template>
  <div class="tabs-panel-style q-pa-md">
    <EasyForm
      :schema="schema"
      :action-buttons="['edit', 'cancel', 'save']"
      @save="applyCss"
    />
  </div>
</template>

<style lang="stylus" scoped>
// $

// .tabs-panel-style

</style>

<script>
import { pascalCase, camelCase, kebabCase } from 'case-anything'
import { isArray } from 'is-what'
import { dom } from 'quasar'
const { css: applyCss } = dom

export default {
  name: pascalCase('tabs-panel-style'),
  props: {
    classes: {
      type: Array,
      desc: 'An array of classes to show in the textarea. These classes will be targeted in the dom to apply the custom css typed in the textarea.',
    },
    classesData: {
      type: Object,
      desc: 'An object with classes as keys and an object as value that has the default styles to add to this class',
    },
    targetWrapperElementSelector: {
      type: String,
      desc: 'The selector class for the wrapper element to target when applying the css'
    },
  },
  data () {
    const { classes, classesData } = this
    const cssDefaultBody = classes.map(targetClass => {
      const styleObject = classesData[targetClass]
      const cssBody = !styleObject
        ? '  '
        : Object.entries(styleObject)
          .map(entry => `  ${kebabCase(entry[0])}: ${entry[1]}`)
          .join('\n')
      return `${targetClass}\n${cssBody}\n`
    }).join('\n')
    const schema = [
      {
        id: 'css',
        label: 'Because of the limitations of this preview, do not nest your sass via indentation.',
        subLabel: '`<style lang="sass">`',
        hasMarkdown: true,
        fieldType: 'input',
        type: 'textarea',
        default: cssDefaultBody,
        standout: true,
        outlined: false,
        autogrow: true,
      },
      {
        subLabel: '`</style>`',
        hasMarkdown: true,
      },
    ]
    return { schema }
  },
  computed: {},
  methods: {
    applyCss ({newData, oldData}) {
      const { targetWrapperElementSelector } = this
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
        const wrapperEl = document.querySelector(targetWrapperElementSelector)
        if (!wrapperEl || !wrapperEl) return
        const element = wrapperEl.querySelectorAll(className)
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
