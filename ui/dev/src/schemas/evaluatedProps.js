
const description = `## Evaluated Props

As you know, \`<EasyForm />\` needs a 'schema' with information on each field you want to show. However, when using an EasyForm you can replace the value of any prop in any field with a function instead of the value directly. This function will be executed any time the data of any field changes. This allows you to have "dynamic" props, based on the data of the form.

For example, when you pass \`disable: true\` to a certain field, it will appear as disabled inside the form. You can instead also pass \`disable: (val, context) => context.formDataNested.myCheckBox\` to be able to only disable that field when \`myCheckBox\` is truthy.

Evaluated props will receive 2 params: \`(val, context)\`.
- \`val\` is the current value of the field
- \`context\` is the Vue component reference of the \`<EasyField />\`, you can deconstruct this to access any other properties/values.

The most important props you can access from \`context\`:
- \`formDataNested\` This is the *nested* data of all the fields inside an EasyForm.
- \`formDataFlat\` This is the *flattened* data of all the fields inside an EasyForm.
- \`formMode\` The current state of the EasyForm. Can be \`'view'\` | \`'edit'\` | \`'add'\`
- \`formId\` An 'id' of the EasyForm. This is only present when manually set.
- Other common Vue props like: \`$store\`, \`$router\`, \`$q\` (for Quasar apps) etc.

Try to refrain from accessing props other than the ones listed above, because these are mainly used internal and could have behaviour changes that could break your app.
`

const colorFn = val => (val === 'red') ? 'like the sun' : (val === 'blue') ? 'like the sky' : (val === 'green') ? 'green is not a creative color' : (val === 'other') ? 'oh, come on, just pick one' : 'pick a color!'
colorFn.prototype.stringifiedFn = `val => (val === 'red') ? 'like the sun' : (val === 'blue') ? 'like the sky' : (val === 'green') ? 'green is not a creative color' : (val === 'other') ? 'oh, come on, just pick one' : 'pick a color!'`

const parentalConsentFn = (val, {formDataNested}) => formDataNested.over18
parentalConsentFn.prototype.stringifiedFn = `(val, {formDataNested}) => formDataNested.over18`

const carTypeFn = (val, {formDataNested}) => formDataNested.car
carTypeFn.prototype.stringifiedFn = `(val, {formDataNested}) => formDataNested.car`

const carNrPlateFn = (val, {formDataNested, formMode}) => formDataNested.car && formMode === 'edit'
carNrPlateFn.prototype.stringifiedFn = `(val, {formDataNested, formMode}) => formDataNested.car && formMode === 'edit'`

export const exampleForms = [
  {
    mode: 'edit',
    actionButtons: [],
    columnCount: 1,
    schema: [
      {
        id: 'color',
        span: true,
        fieldType: 'btn-toggle',
        label: 'What is your favorite color?',
        options: [{label: 'red', value: 'red'}, {label: 'blue', value: 'blue'}, {label: 'green', value: 'green'}, {label: 'other', value: 'other'}],
        subLabel: colorFn,
      },
    ],
  },
  {
    mode: 'edit',
    actionButtons: [],
    columnCount: 2,
    schema: [
      {
        id: 'over18',
        fieldType: 'toggle',
        label: 'Are you over 18?',
      },
      {
        id: 'parentalConsent',
        fieldType: 'toggle',
        label: 'Do you have parental consent?',
        subLabel: 'This will be disabled when the first question is `true`.',
        disable: parentalConsentFn,
      },
    ],
  },
  {
    mode: 'edit',
    actionButtons: ['edit', 'save'],
    columnCount: 2,
    schema: [
      {
        id: 'car',
        fieldType: 'toggle',
        label: 'Do you have a car?',
      },
      {
        id: 'carType',
        fieldType: 'input',
        label: 'What is the brand?',
        subLabel: 'This is only shown when the first question is `true`.',
        showCondition: carTypeFn,
      },
      {
        id: 'carNrPlate',
        fieldType: 'input',
        label: 'Enter your license plate brand?',
        subLabel: 'This is hidden when the form is set to \'view\' mode. Try clicking \'save\'.',
        showCondition: carNrPlateFn,
      },
    ],
  },
]

export const pageForm = {
  mode: 'edit',
  actionButtons: [],
  schema: Object.values({
    _1: {
      fieldType: 'markdown',
      src: description,
    },
    get _2 () {
      return {
        id: 'chosenExample',
        fieldType: 'btn-toggle',
        noCaps: true,
        options: [this._3, this._4, this._5]
          .map((field, index) => {
            return {label: field.label, value: index}
          }),
      }
    },
    _3: {
      showCondition: (value, {formDataNested}) => formDataNested.chosenExample === 0,
      fieldType: 'title',
      label: 'Dynamic prop based on the value of the field',
      subLabel: `Eg. \`subLabel: val => val === 'purple' ? 'nice!' : 'choose a color'\``,
    },
    _4: {
      showCondition: (value, {formDataNested}) => formDataNested.chosenExample === 1,
      fieldType: 'title',
      label: 'Dynamic prop based on the value of another field',
      subLabel: `Eg. \`disable: ${parentalConsentFn.prototype.stringifiedFn}\``,
    },
    _5: {
      showCondition: (value, {formDataNested}) => formDataNested.chosenExample === 2,
      fieldType: 'title',
      label: 'Dynamic "conditional rendering" of a field',
      subLabel: `
Eg. \`showCondition: ${carTypeFn.prototype.stringifiedFn}\`

\`showCondition\` is a special prop that can only be used inside the schema of an EasyForm.
      `.trim(),
    },
  }),
}

export default {
  exampleForms,
  pageForm,
}
