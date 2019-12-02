<template>
  <q-markdown
    class="markdown-code"
    v-if="code"
    :no-line-numbers="noLineNumbers"
    :src="code"
  />
</template>

<script>
import parseCodeForPrint from '../../helpers/parseCodeForPrint.js'

export default {
  name: 'MarkdownCode',
  props: {
    prefix: {
      desc: 'could be `export default`; `const myObj = `; `<template/>` etc.',
      type: String,
    },
    suffix: {
      desc: 'could be `</template>` etc.',
      type: String,
    },
    src: {
      desc: 'The code to show as markdown.',
      type: undefined,
    },
    noLineNumbers: {
      type: Boolean,
      default: true,
    },
    lang: {
      desc: 'The lang to be placed behind ```{{ lang }}',
      type: String,
      default: 'js'
    },
  },
  data () { return {} },
  computed: {
    code () {
      const { src, lang, prefix = '', suffix = '' } = this
      return `
\`\`\`${lang}
${prefix}${parseCodeForPrint(src)}${suffix}
\`\`\``.trim()
    },
  },
}
</script>
