
const parentalConsentFn = (val, {formDataNested}) => formDataNested.over18
parentalConsentFn.prototype.stringifiedFn = `(val, {formDataNested}) => formDataNested.over18`

const carTypeFn = (val, {formDataNested}) => formDataNested.car
carTypeFn.prototype.stringifiedFn = `(val, {formDataNested}) => formDataNested.car`

const colorFn = val => (val === 'red') ? 'like the sun' : (val === 'blue') ? 'like the sky' : (val === 'green') ? 'green is not a creative color' : (val === 'other') ? 'oh, come on, just pick one' : 'pick a color!'
colorFn.prototype.stringifiedFn = `val => (val === 'red') ? 'like the sun' : (val === 'blue') ? 'like the sky' : (val === 'green') ? 'green is not a creative color' : (val === 'other') ? 'oh, come on, just pick one' : 'pick a color!'`

export default [
  [
    {
      label: 'Preview with conditional \'disable\'',
      subLabel: `Eg. \`disable: ${parentalConsentFn.prototype.stringifiedFn}\``,
      fieldType: 'title',
    },
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
  [
    {
      label: 'Preview with conditional \'rendering\'',
      subLabel: `Eg. \`showCondition: ${carTypeFn.prototype.stringifiedFn}\``,
      fieldType: 'title',
    },
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
  ],
  [
    {
      label: 'Dynamically modify props based on the value',
      subLabel: `Eg. \`subLabel: val => val === 'purple' ? 'nice!' : 'choose a color'\``,
      fieldType: 'title',
    },
    {
      id: 'color',
      span: true,
      fieldType: 'btn-toggle',
      label: 'What is your favorite color?',
      options: [{label: 'red', value: 'red'}, {label: 'blue', value: 'blue'}, {label: 'green', value: 'green'}, {label: 'other', value: 'other'}],
      subLabel: colorFn,
    },
  ],
]
