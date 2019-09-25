<template>
  <div class="easy-field" :style="contentStyle">
    <div
      v-if="label"
      :class="classFieldLabel"
    >{{ label }}</div>
    <div
      v-if="subLabel"
      :class="`_sub-label mb-sm text-wrap-all`"
    >{{ subLabel }}</div>
    <div
      class="_field"
      v-if="!['title', 'space', 'none', undefined].includes(fieldType)"
    >
      <EfImg v-if="fieldType === 'img'" v-model="cValue" v-bind="fieldProps" />
      <EfPdf v-if="fieldType === 'pdf'" v-model="cValue" v-bind="fieldProps" />
      <EfForm v-if="fieldType === 'form'" v-model="cValue" v-bind="fieldProps" />
      <EfRange v-if="fieldType === 'range'" v-model="cValue" v-bind="fieldProps" />
      <EfVideo v-if="fieldType === 'video'" v-model="cValue" v-bind="fieldProps" />
      <EfInput v-if="fieldType === 'input'" v-model="cValue" v-bind="fieldProps" />
      <EfToggle v-if="fieldType === 'toggle'" v-model="cValue" v-bind="fieldProps" />
      <EfSlider v-if="fieldType === 'slider'" v-model="cValue" v-bind="fieldProps" />
      <EfSelect v-if="fieldType === 'select'" v-model="cValue" v-bind="fieldProps" />
      <EfButtons v-if="fieldType === 'buttons'" v-model="cValue" v-bind="fieldProps" />
      <EfInputDate v-if="fieldType === 'inputDate'" v-model="cValue" v-bind="fieldProps" />
      <EfUploaderFirebase v-if="fieldType === 'uploaderFirebase'" v-model="cValue" v-bind="fieldProps" />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
// $
@import '../index.styl'

// .easy-field
._sub-label
  opacity 0.8
  font-weight 300

</style>

<script>
import merge from 'merge-anything'

export default {
  name: 'EasyField',
  props: {
    // prop categories: behaviour content general model state style
    value: [Object, Array, String, Number, Boolean, Date],
    // EF props used here:
    fieldType: {
      category: 'general',
      type: String,
      required: true,
    },
    valueType: {
      category: 'model',
      type: String,
      validator: prop => ['string', 'boolean', 'number', 'array', 'object', 'date', 'null'].includes(prop),
      description: 'valueType is the type of the model of the field. Can be any of \'string\', \'boolean\', \'number\', \'array\', \'object\'.\n\nWhen `valueType: \'number\'` it will make sure the field value is formatted as Number. `valueType` will also provide extra documentation so is best always specified.',
      examples: ['string', 'boolean', 'number', 'array', 'object', 'date', 'null'],
      values: ['string', 'boolean', 'number', 'array', 'object', 'date', 'null'],
    },
    subLabel: {
      category: 'content',
      type: String,
      description: 'A smaller label for extra info.',
    },
    contentStyle: {
      category: 'style',
      type: [Object, Array, String],
      description: 'Custom styling to be applied to the EasyField. Applied like so `:style="contentStyle"`',
      examples: ['padding: 1em;'],
    },
    // Quasar props with modified defaults:
    // Quasar props with modified behaviour:
    label: {
      type: String,
      quasarProp: true,
    },
    disable: {
      type: Boolean,
      default: false,
      quasarProp: true,
      description: '`disable` is ignored when `readonly` is true',
    },
  },
  computed: {
    fieldProps () {
      return merge(this.$attrs, {
        // EF props used here, but also to pass:
        subLabel: this.subLabel,
        fieldType: this.fieldType,
        valueType: this.valueType,
        // Quasar props with modified defaults:
        // Quasar props with modified behaviour:
        // label: this.label,     // do not pass label
        disable: this.cDisable,
      })
    },
    cValue: {
      get () { return this.value },
      set (value) { this.$emit('input', value) },
    },
    cDisable () {
      const { readonly } = this.$attrs
      if (readonly) return false
      const { disable } = this
      return disable
    },
    classFieldLabel () {
      const { fieldType, subLabel } = this
      let classes = '_label text-wrap-all'
      if (fieldType === 'title' || fieldType === 'form') {
        classes += ' mt-md text-bold'
      } else if (!subLabel) {
        classes += ' mb-sm'
      }
      return classes
    },
  },
  methods: {}
}
</script>
