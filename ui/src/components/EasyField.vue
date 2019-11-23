<template>
  <div
    :class="[
      'easy-field',
      `easy-field--${fieldType}`,
      `easy-field--label-${labelPosition}`,
      ...cFieldClassesArray
    ]"
    :style="cFieldStyle"
  >
    <div
      v-if="cLabel"
      :class="[
        'easy-field__label',
        'text-wrap-all', {
        'easy-field__label--title': fieldType === 'title' || fieldType === 'form',
        'easy-field__label--no-sublabel': !cSubLabel,
      }]"
    >{{ cLabel }}</div>
    <div
      v-if="cSubLabel"
      :class="[
        'easy-field__sub-label',
        'text-wrap-all'
      ]"
    >{{ cSubLabel }}</div>
    <div
      class="easy-field__field"
      v-if="!['title', 'space', 'none', undefined].includes(fieldType)"
    >
      <component
        :is="componentIdentifier"
        v-model="cValue"
        v-bind="fieldProps"
        v-on="cEvents"
        :class="cInnerClassesArray"
        :style="cInnerStyle"
      />
      <!-- <pre
        v-if="fieldType === 'q-markdown'"
        v-bind="fieldProps"
      >{{ cValue }}</pre> -->
    </div>
  </div>
</template>

<style lang="sass">
// $
@import '../index.sass'

// layout
.easy-field
  max-width: 100%
  display: grid
  align-content: start
  &--label-top
    grid-template-areas: "label" "sub-label" "field"
  &--label-left
    grid-template-areas: "label field" "sub-label field"
    grid-template-columns: auto 1fr
    grid-gap: 0 $md
  .easy-field__label
    grid-area: label
  .easy-field__sub-label
    grid-area: sub-label
  .easy-field__field
    grid-area: field
// style
.easy-field
  .easy-field__label
    &--title
      margin-top: $md
      font-weight: 500
    &--no-sublabel
      margin-bottom: $sm
  .easy-field__sub-label
    margin-bottom: $sm
    opacity: 0.8
    font-weight: 300

</style>

<script>
import { isFunction, isPlainObject, isArray, isString, isUndefined } from 'is-what'
import merge from 'merge-anything'
import defaultLang from '../meta/lang'

function resolveEasyFieldProp (propKey, propValue, componentValue, component) {
  // quasar props that can accept functions should be ignored:
  const propsToIgnore = [
    // EasyForm:
    'labelValue', 'fieldInput',
    // QSelect:
    'optionValue', 'optionLabel', 'optionDisable',
    // QUploader:
    'filter', 'factory', 'url', 'method', 'headers','fieldName','formFields','withCredentials','sendRaw','batch',
  ]
  if (propsToIgnore.includes(propKey)) return propValue
  return (isFunction(propValue))
    ? propValue(componentValue, component)
    : propValue
}

export default {
  name: 'EasyField',
  inheritAttrs: false,
  props: {
    // prop categories: behavior content general model state style
    // EF props used here:
    fieldType: {
      category: 'general',
      type: [String, Object],
    },
    value: {
      category: 'model',
      type: undefined,
    },
    default: {
      category: 'model',
      type: undefined,
      desc: `A default value to be used when the 'value' is \`undefined\`.

You can also pass a function that will receive two params you can work with: \`(formDataNested, context)\`
- \`formDataNested\` is the value object of your EasyForm. This will be undefined when EasyField is used as stand-alone (without EasyForm) unless you manually pass it.
- \`context\` is either your EasyForm or EasyField context with many usefull props. See the documentation on "Evaluated Props" for more info.`,
    },
    required: {
      category: 'behavior',
      type: Boolean,
      desc: `Wether or not the field is required or not. If a field is marked 'required' it will add a default rule like so: \`[val => !!val || 'Field is required']\`. The default message can be set in the \`lang\` prop as \`requiredField\`.`,
    },
    id: {
      category: 'model',
      type: String,
      desc: 'An \'id\' is required for an `<EasyForm />` to be able to know which fields have which value. When using `<EasyField />` on its own, it is not required.',
    },
    subLabel: {
      category: 'content',
      type: [String, Function],
      desc: 'A smaller label for extra info.',
    },
    labelPosition: {
      category: 'style',
      type: [String, Function],
      default: 'top',
      desc: 'The position of the label.',
      values: ['top', 'left'],
      examples: ['top', 'left'],
    },
    fieldStyle: {
      category: 'style',
      type: [Object, Array, String, Function],
      desc: 'Custom styling to be applied to the EasyField. Applied like so `:style="fieldStyle"`. Can be an Evaluated Prop (this is why I opted to have a different name from `style`).',
      examples: [`'padding: 1em;'`],
    },
    fieldClasses: {
      category: 'style',
      type: [Object, Array, String, Function],
      desc: 'Custom classes to be applied to the EasyField. Applied like so `:class="fieldClasses"`. Can be an Evaluated Prop (this is why I opted to have a different name from `class`).',
      examples: [`['dark-theme']`],
    },
    innerStyle: {
      category: 'style',
      type: [Object, Array, String, Function],
      desc: 'Custom styling to be applied to the inner component of EasyField. Applied like so `:style="innerStyle"`. Can be an Evaluated Prop.',
      examples: [`'padding: 1em;'`],
    },
    innerClasses: {
      category: 'style',
      type: [Object, Array, String, Function],
      desc: 'Custom classes to be applied to the inner component of EasyField. Applied like so `:class="innerClasses"`. Can be an Evaluated Prop.',
      examples: [`['dark-theme']`],
    },
    format: {
      category: 'model',
      type: Function,
      desc: 'You can change how the value is formatted even though the underlying data might be different. Depending on the `fieldType`, you will also need to provide a `parseInput` function to reverse the effect.',
      examples: ['val => thousandToK(val)' ],
    },
    parseInput: {
      category: 'model',
      type: Function,
      desc: 'You can change how the value is parsed before it\'s updated. You must return the parsed value.',
      examples: ['val => kToThousand(val)' ],
    },
    events: {
      category: 'behavior',
      type: Object,
      desc: 'An Object with an event name as key and the handler function as value. The function you pass will receive the native event payload as first parameter and the EasyField context (the component instance) as second: \`($event, context) => {}\`',
      default: () => ({}),
      examples: ['{click: (val, {$router}) => $router.push(\'/\')}', '{focus: console.log}'],
    },
    formDataNested: {
      category: 'easyFormProp',
      type: Object,
      desc: `This is the *nested* data of all the fields inside an EasyForm.`,
    },
    formDataFlat: {
      category: 'easyFormProp',
      type: Object,
      desc: `This is the *flattened* data of all the fields inside an EasyForm.`,
    },
    formId: {
      category: 'easyFormProp',
      type: String,
      desc: `A manually set 'id' of the EasyForm.`,
    },
    formMode: {
      category: 'easyFormProp',
      type: String,
      validator: prop => ['edit', 'add', 'view', 'raw'].includes(prop),
      desc: 'The state of the EasyForm. Has no effect on the EasyField, because EasyField only looks at `readonly` and `rawValue` props. Is passed so the `formMode` can be accessed by Evaluated Props.',
      examples: [`'edit'`, `'add'`, `'view'`, `'raw'`],
      values: ['edit', 'add', 'view', 'raw'],
    },
    fieldInput: {
      category: 'easyFormProp',
      type: Function,
      desc: 'The `fieldInput` function of EasyForm. Is passed so it can be used in the input event: `events: {input: (value, {fieldInput} => fieldInput({id: \'otherField\', value}))}`',
    },
    lang: {
      category: 'content',
      type: Object,
      desc: `The text used in the UI, eg. for required fields, etc.`,
      default: () => defaultLang,
      examples: [`{requiredField: 'Don\'t forget this field!'}`],
    },
    rawValue: {
      category: 'state',
      type: [Boolean, Function],
      default: false,
      desc: 'An EasyField with `rawValue: true` will just generate the raw value wrapped in a div, without generating the dedicated field UI.'
    },
    // Quasar props with modified defaults:
    // (category needs to be specified in case sub-field doesn't inherit this prop from Quasar)
    readonly: {
      category: 'state',
      quasarProp: 'modified',
      type: [Boolean, Function],
      default: false,
      desc: '`readonly` is used for \'view\' mode of an EasyForm.',
    },
    // Quasar props with modified behavior:
    // (category needs to be specified in case sub-field doesn't inherit this prop from Quasar)
    label: {
      category: 'content',
      quasarProp: 'modified',
      type: [String, Function],
      desc: 'An EasyField label is always "external" to the field. (It replaces the Quasar label if the underlying Quasar component uses one.)',
    },
    disable: {
      category: 'state',
      quasarProp: 'modified',
      type: [Boolean, Function],
      default: false,
      desc: '`disable` is ignored when `readonly` is true',
    },
  },
  data () {
    const { value, default: df, lang, formDataNested } = this
    const innerValue = !isUndefined(value)
      ? value
      : isFunction(df) ? df(formDataNested, this) : df
    // merge user provided lang onto defaults
    const innerLang = merge(defaultLang, lang)
    return {
      innerLang,
      innerValue,
    }
  },
  watch: {
    value (newValue) { this.innerValue = newValue },
    lang (newValue) { this.innerLang = merge(defaultLang, newValue) },
  },
  computed: {
    cFieldStyle () {
      const { fieldStyle, cValue } = this
      return resolveEasyFieldProp('fieldStyle', fieldStyle, cValue, this)
    },
    cInnerStyle () {
      const { innerStyle, cValue } = this
      return resolveEasyFieldProp('innerStyle', innerStyle, cValue, this)
    },
    cFieldClassesArray () {
      const { fieldClasses, cValue } = this
      const classes = resolveEasyFieldProp('fieldClasses', fieldClasses, cValue, this)
      if (isString(classes)) return classes.split(' ')
      if (isPlainObject(classes)) return [classes]
      return classes
    },
    cInnerClassesArray () {
      const { innerClasses, cValue } = this
      const classes = resolveEasyFieldProp('innerClasses', innerClasses, cValue, this)
      if (isString(classes)) return classes.split(' ')
      if (isPlainObject(classes)) return [classes]
      return classes
    },
    internalLabelMode () {
      const { fieldType } = this
      const { externalLabels } = this.$attrs
      return externalLabels === false && [
        'input', 'inputDate', 'select'
      ].includes(fieldType)
    },
    componentIdentifier () {
      const { fieldType, rawValue } = this
      if (isPlainObject(fieldType)) return fieldType
      if (rawValue === true) return 'EfDiv'
      if (!fieldType) return ''
      if (fieldType.slice(0, 2) === 'q-') return fieldType
      return 'Ef' + fieldType[0].toUpperCase() + fieldType.slice(1)
    },
    fieldProps () {
      // props only used here: format, parseInput, label
      const { cValue, $attrs, required, innerLang } = this
      const self = this
      // add default "required" rule
      const requiredRule = val => !!val || innerLang['requiredField']
      const requiredRules = (required && isArray($attrs.rules) && $attrs.rules.length)
        ? {rules: $attrs.rules.concat([requiredRule])}
        : required ? {rules: [requiredRule]} : {}

      const mergedProps = merge($attrs, {
        // EF props used here, but also to pass:
        formDataNested: this.formDataNested,
        formDataFlat: this.formDataFlat,
        formMode: this.formMode,
        formId: this.formId,
        fieldType: this.fieldType,
        labelRaw: this.label,
        subLabelRaw: this.subLabel,
        lang: this.innerLang,
        events: this.cEvents,
        // Quasar props with modified defaults:
        readonly: this.readonly,
        // Quasar props with modified behavior:
        disable: this.cDisable,
      }, requiredRules)
      return Object.entries(mergedProps)
        .reduce((carry, [propKey, propValue]) => {
          carry[propKey] = resolveEasyFieldProp(propKey, propValue, cValue, self)
          return carry
        }, {})
    },
    cValue: {
      get () {
        const { format, innerValue } = this
        if (isFunction(format)) return format(innerValue, this)
        return innerValue
      },
      set (val) { this.updateValue(val) },
    },
    cLabel () {
      const { label, cValue, internalLabelMode } = this
      if (isFunction(label)) return label(cValue, this)
      return internalLabelMode ? undefined : label
    },
    cSubLabel () {
      const { subLabel, cValue, internalLabelMode } = this
      if (isFunction(subLabel)) return subLabel(cValue, this)
      return internalLabelMode ? undefined : subLabel
    },
    cEvents () {
      return Object.entries(this.events)
        .reduce((carry, [eventName, eventFn]) => {
          // input event is handled in cValue
          if (eventName === 'input') return carry
          carry[eventName] = val => eventFn(val, this)
          return carry
        }, {})
    },
    cDisable () {
      const { readonly } = this.$attrs
      if (readonly) return false
      const { disable } = this
      return disable
    },
  },
  methods: {
    updateValue (val) {
      const { parseInput, events } = this
      if (isFunction(parseInput)) val = parseInput(val, this)
      if (isFunction(events.input)) events.input(val, this)
      this.$emit('input', val)
    },
  }
}
</script>
