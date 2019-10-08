
const parentalConsentFn = (val, {formDataNested}) => formDataNested.over18
parentalConsentFn.prototype.stringifiedFn = `(val, {formDataNested}) => formDataNested.over18`

const carTypeFn = (val, {formDataNested}) => formDataNested.car
carTypeFn.prototype.stringifiedFn = `(val, {formDataNested}) => formDataNested.car`

const colorFn = val => (val === 'red') ? 'like the sun' : (val === 'blue') ? 'like the sky' : (val === 'green') ? 'green is not a creative color' : (val === 'other') ? 'oh, come on, just pick one' : 'pick a color!'
colorFn.prototype.stringifiedFn = `val => (val === 'red') ? 'like the sun' : (val === 'blue') ? 'like the sky' : (val === 'green') ? 'green is not a creative color' : (val === 'other') ? 'oh, come on, just pick one' : 'pick a color!'`

const telFn = (val, {fieldInput}) => fieldInput({id: 'telClean', value: !val ? '' : val.replace(/[^\d]/g, '').trim()})
telFn.prototype.stringifiedFn = `(val, {fieldInput}) => fieldInput({id: 'telClean', value: !val ? '' : val.replace(/[^\d]/g, '').trim()})`

export default [
  [
    {
      label: 'Dynamic prop based on the value of the field',
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
  [
    {
      label: 'Dynamic prop based on the value of another field',
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
      label: 'Dynamic "conditional rendering" of a field',
      subLabel: `
Eg. \`showCondition: ${carTypeFn.prototype.stringifiedFn}\`

\`showCondition\` is a special prop that can only be used inside the schema of an EasyForm.
`.trim(),
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
      label: 'Programatically update other fields on user input',
      subLabel: `
Eg. \`onInput: ${telFn.prototype.stringifiedFn}\`

\`onInput\` is a prop that can receive a function that will be triggered every time the field is updated. It will receives the updated value as first param and the EasyForm context as the second. \`(val, context)\`

\`fieldInput\` is a method available on 'context'. It can be executed to update other fields inside your form. It receives a single param which should be an object that looks like \`{id, value}\` with the \`id\` of the field you want to update and a \`value\` you want to update it with.
`.trim(),
      fieldType: 'title',
    },
    {
      id: 'tel',
      fieldType: 'input',
      label: 'Phone nr (hyphenated)',
      subLabel: 'Type any number with `-` or `(  )`',
      onInput: telFn,
    },
    {
      id: 'telClean',
      fieldType: 'input',
      label: 'Phone nr (only numbers)',
      subLabel: 'This field is automatically updated when you type in a phone nr on the left.',
      disable: true,
    },
  ],

]
