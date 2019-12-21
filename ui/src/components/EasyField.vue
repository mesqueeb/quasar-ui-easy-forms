<template>
  <div
    v-if="showCondition && propsEvaluated.showCondition"
    :class="[
      'easy-field',
      `easy-field--${mode}`,
      `easy-field--${componentName}`,
      `easy-field--label-${labelPosition}`,
      {
        'easy-field--no-label': !cLabel,
        'easy-field--no-sub-label': !cSubLabel,
        'easy-field--no-component': !component,
      },
      ...cFieldClassesArray,
    ]"
    :style="cFieldStyle"
  >
    <!-- display: inline -->
    <div v-if="cLabel" class="easy-field__label text-wrap-all">{{ cLabel }}</div>
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
    <!-- no component -->
    <template v-if="!component"></template>
    <!-- raw component -->
    <EfDiv v-else-if="mode === 'raw'" class="easy-field__component" v-bind="divProps" />
    <!-- raw component -->
    <component
      v-else-if="internalErrorsCalculated"
      :is="component"
      :class="['easy-field__component', ...cComponentClassesArray]"
      v-model="cValue"
      v-bind="fieldProps"
      v-on="cEvents"
      :style="cComponentStyle"
    />
    <QField
      v-else
      v-model="cValue"
      v-bind="cQFieldProps"
      :class="['easy-field__component', ...cComponentClassesArray]"
      :style="cComponentStyle"
    >
      <template v-slot:control>
        <component
          :is="component"
          v-model="cValue"
          v-bind="fieldProps"
          v-on="cEvents"
          style="flex: 1"
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
    grid-auto-flow: row
  &--label-left
    grid-auto-flow: column
    grid-template-columns: minmax(auto, max-content)
    grid-auto-columns: minmax(50%, 1fr)
    grid-template-rows: auto
    grid-auto-rows: 1fr
    .easy-field__sub-label
      grid-row: 2 / 3
    .easy-field__component
      grid-row: 1 / 3
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
import { isFunction, isPlainObject, isString, isUndefined, isNullOrUndefined } from 'is-what'
import merge from 'merge-anything'
import defaultLang from '../meta/lang'
import {
  mode,
  labelPosition,
  hasMarkdown,
  evaluatedProps,
  internalLabels,
  internalErrors,
} from './sharedProps.js'

function evaluateProp (propValue, componentValue, componentInstance) {
  return isFunction(propValue) ? propValue(componentValue, componentInstance) : propValue
}

export default {
  name: 'EasyField',
  inheritAttrs: false,
  components: { QMarkdown, QField },
  props: {
    // prop categories: behavior content general model state style
    // EF props used here:
    value: {
      category: 'model',
      type: undefined,
    },
    component: {
      category: 'general',
      type: [String, Object, Function],
      desc: `Each EasyField has a label, sublabel and a component rendered via \`<component :is="component" />\`. You can pass (1) the name of a registered component, or (2) a component’s options object.`,
      examples: ['QInput', 'MyCustomField'],
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
      type: [Boolean, Function],
      desc: `Wether or not the field is required or not. If a field is marked 'required' it will add a default rule like so: \`[val => (val !== null && val !== undefined) || 'Field is required']\`. The default message can be set in the \`lang\` prop as \`requiredField\`.`,
    },
    rules: {
      category: 'behavior',
      type: Array,
      default: () => [],
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
    componentStyle: {
      category: 'style',
      type: [Object, Array, String, Function],
      desc:
        'Custom styling to be applied to the inner component of EasyField. Applied like so `:style="componentStyle"`. Can be an Evaluated Prop.',
      examples: [`'padding: 1em;'`],
    },
    componentClasses: {
      category: 'style',
      type: [Object, Array, String, Function],
      desc:
        'Custom classes to be applied to the inner component of EasyField. Applied like so `:class="componentClasses"`. Can be an Evaluated Prop.',
      examples: [`['dark-theme']`],
    },
    parseValue: {
      category: 'model',
      type: Function,
      desc:
        'This function can modify a value before it is passed on to the inner component. Also see `parseInput` for the reverse.',
      examples: ['val => Number(val)', 'val => Date(val)'],
    },
    parseInput: {
      category: 'model',
      type: Function,
      desc:
        'This function can modify a value upon user input, every time before the value is emitted. Also see `parseValue` for the reverse.',
      examples: ['val => String(val)', 'val => val.toISOString()'],
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
    hasMarkdown,
    evaluatedProps,
    internalLabels,
    internalErrors,
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
      default: true,
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
    const { value, default: df, lang, formDataNested, internalErrors } = this
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
    cValue: {
      get () {
        const { parseValue, innerValue } = this
        if (isFunction(parseValue)) return parseValue(innerValue, this)
        return innerValue
      },
      set (val) {
        const { parseInput, events } = this
        if (isFunction(parseInput)) val = parseInput(val, this)
        if (isFunction(events.input)) events.input(val, this)
        this.$emit('input', val)
      },
    },
    componentName () {
      const { component } = this
      if (isString(component)) return component
      const { name } = component || {}
      return name
    },
    internalErrorsCalculated () {
      const { internalErrors, componentName } = this
      if (internalErrors !== undefined) return internalErrors
      return [
        'QInput',
        'QSelect',
        'EfInput',
        'EfSelect',
        'EfInputDate',
        'q-input',
        'q-select',
      ].includes(componentName)
    },
    internalLabelsCalculated () {
      const { component, internalLabels } = this
      return internalLabels && !isNullOrUndefined(component)
    },
    propsEvaluated () {
      const { evaluatedProps, cValue } = this
      const context = this
      return evaluatedProps.reduce((carry, propKey) => {
        const propValue = propKey in context ? context[propKey] : context.$attrs[propKey]
        carry[propKey] = evaluateProp(propValue, cValue, context)
        return carry
      }, {})
    },
    divProps () {
      return merge(this.$attrs, {
        value: this.value,
      })
    },
    cFieldStyle () {
      const { fieldStyle, propsEvaluated, evaluatedProps } = this
      return evaluatedProps.includes('fieldStyle') ? propsEvaluated['fieldStyle'] : fieldStyle
    },
    cComponentStyle () {
      const { componentStyle, propsEvaluated, evaluatedProps } = this
      return evaluatedProps.includes('componentStyle')
        ? propsEvaluated['componentStyle']
        : componentStyle
    },
    cFieldClassesArray () {
      const { fieldClasses, propsEvaluated, evaluatedProps } = this
      const classes = evaluatedProps.includes('fieldClasses')
        ? propsEvaluated['fieldClasses']
        : fieldClasses
      if (isString(classes)) return classes.split(' ')
      if (isPlainObject(classes)) return [classes]
      return classes
    },
    cComponentClassesArray () {
      const { componentClasses, propsEvaluated, evaluatedProps } = this
      const classes = evaluatedProps.includes('componentClasses')
        ? propsEvaluated['componentClasses']
        : componentClasses
      if (isString(classes)) return classes.split(' ')
      if (isPlainObject(classes)) return [classes]
      return classes
    },
    cRules () {
      const { rules, required, evaluatedProps, propsEvaluated, innerLang } = this
      const req = evaluatedProps.includes('componentClasses') ? propsEvaluated.required : required
      const requiredRule = val => !isNullOrUndefined(val) || innerLang['requiredField']
      return req ? rules.concat([requiredRule]) : rules
    },
    fieldProps () {
      // props only used here: parseValue, parseInput, label
      const { cValue, $attrs, innerLang, internalLabelsCalculated, propsEvaluated, cRules } = this
      const self = this
      // should we pass on label & subLabel (as hint) or not
      const internalLabelDefaults = !internalLabelsCalculated
        ? { label: undefined }
        : { label: this.label, hint: this.subLabel }
      const mergedProps = merge($attrs, propsEvaluated, internalLabelDefaults, {
        rules: this.cRules,
        // EF props used here, but also to pass:
        formDataNested: this.formDataNested,
        formDataFlat: this.formDataFlat,
        mode: this.mode,
        formId: this.formId,
        lang: this.innerLang,
        events: this.cEvents,
        readonly: this.mode === 'view' || this.readonly,
      })
      return mergedProps
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
    cLabel () {
      const { label, cValue, internalLabelsCalculated, propsEvaluated, evaluatedProps } = this
      const _label = evaluatedProps.includes('label') ? propsEvaluated.label : label
      return internalLabelsCalculated ? undefined : _label
    },
    cSubLabel () {
      const { subLabel, cValue, internalLabelsCalculated, propsEvaluated, evaluatedProps } = this
      const _subLabel = evaluatedProps.includes('subLabel') ? propsEvaluated.subLabel : subLabel
      return internalLabelsCalculated ? undefined : _subLabel
    },
    cEvents () {
      const { propsEvaluated, evaluatedProps, events } = this
      const context = this
      const _events = evaluatedProps.includes('events') ? propsEvaluated.events : events
      return Object.entries(_events).reduce((carry, [eventName, eventFn]) => {
        // input event is handled in cValue
        if (eventName === 'input') return carry
        carry[eventName] = val => eventFn(val, context)
        return carry
      }, {})
    },
  },
}
</script>
