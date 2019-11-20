
const colorFn = val => (val === 'red') ? 'like the sun' : (val === 'blue') ? 'like the sky' : (val === 'green') ? 'green is not a creative color' : (val === 'other') ? 'oh, come on, just pick one' : 'pick a color!'
colorFn.prototype.stringifiedFn = `val => (val === 'red') ? 'like the sun' : (val === 'blue') ? 'like the sky' : (val === 'green') ? 'green is not a creative color' : (val === 'other') ? 'oh, come on, just pick one' : 'pick a color!'`

const parentalConsentFn = (val, {formDataNested}) => formDataNested.over18
parentalConsentFn.prototype.stringifiedFn = `(val, {formDataNested}) => formDataNested.over18`

const carTypeFn = (val, {formDataNested}) => formDataNested.car
carTypeFn.prototype.stringifiedFn = `(val, {formDataNested}) => formDataNested.car`

const carNrPlateFn = (val, {formDataNested, formMode}) => formDataNested.car && formMode === 'edit'
carNrPlateFn.prototype.stringifiedFn = `(val, {formDataNested, formMode}) => formDataNested.car && formMode === 'edit'`

export default [
  {
    value: {},
    mode: 'edit',
    actionButtons: [],
    columnCount: 2,
    titleField: {
      label: 'Dynamic prop based on the value of the field',
      subLabel: `Eg. \`subLabel: val => val === 'purple' ? 'nice!' : 'choose a color'\``,
      fieldType: 'title',
    },
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
    value: {},
    mode: 'edit',
    actionButtons: [],
    columnCount: 2,
    titleField: {
      label: 'Dynamic prop based on the value of another field',
      subLabel: `Eg. \`disable: ${parentalConsentFn.prototype.stringifiedFn}\``,
      fieldType: 'title',
    },
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
    value: {},
    mode: 'edit',
    actionButtons: [],
    columnCount: 2,
    titleField: {
      label: 'Dynamic "conditional rendering" of a field',
      subLabel: `
Eg. \`showCondition: ${carTypeFn.prototype.stringifiedFn}\`

\`showCondition\` is a special prop that can only be used inside the schema of an EasyForm.
`.trim(),
      fieldType: 'title',
      formActionButtons: ['edit', 'save'],
    },
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
