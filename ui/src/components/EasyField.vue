<template>
  <div
    v-if="showConditionCalculated"
    :class="[
      'easy-field',
      `easy-field--${mode}`,
      `easy-field--${isString(component) ? component : component.name}`,
      `easy-field--label-${labelPosition}`,
      {
        'easy-field--no-label': !cLabel,
        'easy-field--no-sublabel': !cSubLabel,
      },
      ...cFieldClassesArray,
    ]"
    :style="cFieldStyle"
  >
    <!-- display: inline -->
    <div
      v-if="cLabel"
      :class="[
        'easy-field__label',
        'text-wrap-all',
        {
          'easy-field__label--title': component === 'EfTitle' || component === 'EfForm',
        },
      ]"
      >{{ cLabel }}</div
    >
    <div
      v-if="cSubLabel"
      :class="[
        'easy-field__sub-label',
        {
          'text-wrap-all': !hasMarkdown,
        },
      ]"
    >
      <q-markdown v-if="hasMarkdown" no-line-numbers no-container>{{ cSubLabel }}</q-markdown>
      <template v-else>{{ cSubLabel }}</template>
    </div>
    <template v-if="['EfTitle', 'EfSpace', undefined].includes(cComponent)"></template>
    <EfDiv v-else-if="mode === 'raw'" v-bind="divProps" />
    <component
      v-else-if="cFieldInheritsQField"
      :is="cComponent"
      :class="['easy-field__field', 'easy-field__component', ...cInnerClassesArray]"
      v-model="cValue"
      v-bind="fieldProps"
      v-on="cEvents"
      :style="cInnerStyle"
    />
    <QField class="easy-field__field" v-else v-model="cValue" v-bind="cQFieldProps">
      <template v-slot:control>
        <component
          :is="cComponent"
          :class="['easy-field__component', ...cInnerClassesArray]"
          v-model="cValue"
          v-bind="fieldProps"
          v-on="cEvents"
          :style="cInnerStyle"
        />
      </template>
    </QField>
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
  grid-gap: $sm $md
  &--label-top
    grid-template-areas: "label" "sub-label" "field"
    &.easy-field--no-sublabel
      grid-template-areas: "label" "field"
    &.easy-field--no-label
      grid-template-areas: "sub-label" "field"
    &.easy-field--no-sublabel.easy-field--no-label
      grid-template-areas: "field"
  &--label-left
    grid-template-areas: "label field" "sub-label field"
    grid-template-columns: auto 1fr
    &.easy-field--no-sublabel
      grid-template-areas: "label field"
    &.easy-field--no-label
      grid-template-areas: "sub-label field"
    &.easy-field--no-sublabel.easy-field--no-label
      grid-template-areas: "field field"
  .easy-field__label
    grid-area: label
  .easy-field__sub-label
    grid-area: sub-label
  .easy-field__field
    grid-area: field
  .easy-field__component
    flex: 1
// style
.easy-field
  .easy-field__label--title
    font-weight: 500
  .easy-field__sub-label
    opacity: 0.8
    font-weight: 300
    .q-markdown--token
      white-space: pre-wrap
      word-break: break-word
</style>

<script>
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'
import { QField } from 'quasar'
import { isFunction, isPlainObject, isArray, isString, isUndefined } from 'is-what'
import merge from 'merge-anything'
import defaultLang from '../meta/lang'
import { mode, labelPosition, externalLabels, hasMarkdown, evaluatedProps } from './sharedProps.js'

function resolveEasyFieldProp (propKey, propValue, componentValue, component) {
  // quasar props that can accept functions should be ignored:
  const propsToIgnore = [
    // EasyForm:
    'fieldInput',
    // QSelect:
    'optionValue',
    'optionLabel',
    'optionDisable',
    // QUploader:
    'filter',
    'factory',
    'url',
    'method',
    'headers',
    'fieldName',
    'formFields',
    'withCredentials',
    'sendRaw',
    'batch',
  ]
  if (propsToIgnore.includes(propKey)) return propValue
  return isFunction(propValue) ? propValue(componentValue, component) : propValue
}

export default {
  name: 'EasyField',
  inheritAttrs: false,
  components: { QMarkdown, QField },
  props: {
    // prop categories: behavior content general model state style
    // EF props used here:
    component: {
      category: 'general',
      type: [String, Object],
      desc: `Each EasyField has a label, sublabel and a component rendered via \`<component :is="component" />\`. You can pass (1) the name of a registered component, or (2) a component’s options object.`,
      examples: ['QInput', 'MyCustomField'],
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
      desc:
        "An 'id' is required for an `<EasyForm />` to be able to know which fields have which value. When using `<EasyField />` on its own, it is not required.",
    },
    subLabel: {
      category: 'content',
      type: [String, Function],
      desc: 'A smaller label for extra info.',
    },
    fieldStyle: {
      category: 'style',
      type: [Object, Array, String, Function],
      desc:
        'Custom styling to be applied to the EasyField. Applied like so `:style="fieldStyle"`. Can be an Evaluated Prop (this is why I opted to have a different name from `style`).',
      examples: [`'padding: 1em;'`],
    },
    fieldClasses: {
      category: 'style',
      type: [Object, Array, String, Function],
      desc:
        'Custom classes to be applied to the EasyField. Applied like so `:class="fieldClasses"`. Can be an Evaluated Prop (this is why I opted to have a different name from `class`).',
      examples: [`['dark-theme']`],
    },
    innerStyle: {
      category: 'style',
      type: [Object, Array, String, Function],
      desc:
        'Custom styling to be applied to the inner component of EasyField. Applied like so `:style="innerStyle"`. Can be an Evaluated Prop.',
      examples: [`'padding: 1em;'`],
    },
    innerClasses: {
      category: 'style',
      type: [Object, Array, String, Function],
      desc:
        'Custom classes to be applied to the inner component of EasyField. Applied like so `:class="innerClasses"`. Can be an Evaluated Prop.',
      examples: [`['dark-theme']`],
    },
    format: {
      category: 'model',
      type: Function,
      desc:
        'You can change how the value is formatted even though the underlying data might be different. Depending on the `component`, you might also need to provide a `parseInput` function to reverse the effect.',
      examples: ['val => thousandToK(val)'],
    },
    parseInput: {
      category: 'model',
      type: Function,
      desc:
        "You can change how the value is parsed before it's updated. You must return the parsed value.",
      examples: ['val => kToThousand(val)'],
    },
    events: {
      category: 'behavior',
      type: Object,
      desc:
        'An Object with an event name as key and the handler function as value. The function you pass will receive the native event payload as first parameter and the EasyField context (the component instance) as second: \`($event, context) => {}\`',
      default: () => ({}),
      examples: ["{click: (val, {$router}) => $router.push('/')}", '{focus: console.log}'],
    },
    lang: {
      category: 'content',
      type: Object,
      desc: `The text used in the UI, eg. for required fields, etc.`,
      default: () => defaultLang,
      examples: [`{requiredField: 'Don\'t forget this field!'}`],
    },
    // shared props:
    mode,
    labelPosition,
    externalLabels,
    hasMarkdown,
    evaluatedProps,
    // passed props:
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
    fieldInput: {
      category: 'easyFormProp',
      type: Function,
      desc:
        "The `fieldInput` function of EasyForm. Is passed so it can be used in the input event: `events: {input: (value, {fieldInput} => fieldInput({id: 'otherField', value}))}`",
    },
    showCondition: {
      category: 'behavior|state',
      type: [Function, Boolean],
      desc:
        'Setting to `true` or `false` can show or hide the field. When using as an Evaluated Prop it can be very powerful.',
      examples: [`false`, `(val, {mode}) => mode.edit`],
    },
    // Quasar props with modified defaults:
    // (category needs to be specified in case sub-field doesn't inherit this prop from Quasar)
    readonly: {
      category: 'state',
      inheritedProp: 'modified',
      type: [Boolean, Function],
      default: false,
      desc: "`readonly` defaults to `true` on `mode: 'view'",
    },
    // Quasar props with modified behavior:
    // (category needs to be specified in case sub-field doesn't inherit this prop from Quasar)
    label: {
      category: 'content',
      inheritedProp: 'modified',
      type: [String, Function],
      desc:
        'An EasyField label is always "external" to the field. (It replaces the Quasar label if the underlying Quasar component uses one.)',
    },
  },
  data () {
    const { value, default: df, lang, formDataNested } = this
    const innerValue = !isUndefined(value) ? value : isFunction(df) ? df(formDataNested, this) : df
    // merge user provided lang onto defaults
    const innerLang = merge(defaultLang, lang)
    return {
      innerLang,
      innerValue,
    }
  },
  watch: {
    value (newValue) {
      this.innerValue = newValue
    },
    lang (newValue) {
      this.innerLang = merge(defaultLang, newValue)
    },
  },
  computed: {
    divProps () {
      return merge(this.$attrs, {
        value: this.value,
      })
    },
    showConditionCalculated () {
      const { showCondition, id } = this
      if (!isFunction(showCondition)) return true
      return showCondition(id, this)
    },
    cFieldInheritsQField () {
      return [
        'EfSelect',
        'EfInput',
        'EfInputDate',
        'QSelect',
        'QInput',
        'q-select',
        'q-input',
      ].includes(this.cComponent)
    },
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
      const { component, externalLabels } = this
      return externalLabels === false && !['EfTitle', 'EfSpace', undefined].includes(component)
    },
    cComponent () {
      return this.component
    },
    fieldProps () {
      // props only used here: format, parseInput, label
      const { cValue, $attrs, required, innerLang, internalLabelMode } = this
      const self = this
      // add default "required" rule
      const internalLabelDefaults = !internalLabelMode
        ? {}
        : {
            label: this.label,
            hint: this.subLabel,
          }
      const requiredRule = val => !!val || innerLang['requiredField']
      const requiredRules =
        required && isArray($attrs.rules) && $attrs.rules.length
          ? { rules: $attrs.rules.concat([requiredRule]) }
          : required
          ? { rules: [requiredRule] }
          : {}
      const mergedProps = merge(
        internalLabelDefaults,
        $attrs,
        {
          // EF props used here, but also to pass:
          formDataNested: this.formDataNested,
          formDataFlat: this.formDataFlat,
          mode: this.mode,
          formId: this.formId,
          lang: this.innerLang,
          events: this.cEvents,
          readonly: this.mode === 'view' || this.readonly,
        },
        requiredRules
      )
      return Object.entries(mergedProps).reduce((carry, [propKey, propValue]) => {
        carry[propKey] = resolveEasyFieldProp(propKey, propValue, cValue, self)
        return carry
      }, {})
    },
    cQFieldProps () {
      // disable prefix suffix for QField
      return merge(this.fieldProps, {
        prefix: undefined,
        suffix: undefined,
        borderless: true,
        stackLabel: true,
      })
    },
    cValue: {
      get () {
        const { format, innerValue } = this
        if (isFunction(format)) return format(innerValue, this)
        return innerValue
      },
      set (val) {
        this.updateValue(val)
      },
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
      return Object.entries(this.events).reduce((carry, [eventName, eventFn]) => {
        // input event is handled in cValue
        if (eventName === 'input') return carry
        carry[eventName] = val => eventFn(val, this)
        return carry
      }, {})
    },
  },
  methods: {
    isString,
    updateValue (val) {
      const { parseInput, events } = this
      if (isFunction(parseInput)) val = parseInput(val, this)
      if (isFunction(events.input)) events.input(val, this)
      this.$emit('input', val)
    },
  },
}
</script>
