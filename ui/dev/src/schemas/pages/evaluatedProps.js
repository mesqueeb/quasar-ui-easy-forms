const description = `## Evaluated Props

As you know, \`<EasyForm />\` needs a 'schema' with information on each field you want to show. However, when using an EasyForm you can replace the value of any prop in any field with a function instead of the value directly. This function will be executed any time the data of any field changes. This allows you to have "dynamic" props, based on the data of the form.

For example, when you pass \`disable: true\` to a certain field, it will appear as disabled inside the form. You can instead also pass \`disable: (val, context) => context.formData.myCheckBox\` to be able to only disable that field when \`myCheckBox\` is truthy.

Evaluated props will receive 2 params: \`(val, context)\`.
- \`val\` is the current value of the field
- \`context\` is the Vue component reference of the \`<EasyField />\`, you can deconstruct this to access any other properties/values.

The most important props you can access from \`context\`:
- \`formData\` This is the *nested* data of all the fields inside an EasyForm.
- \`formDataFlat\` This is the *flattened* data of all the fields inside an EasyForm.
- \`mode\` The current mode of the EasyForm. Can be \`'view'\` | \`'edit'\` | \`'add'\` | \`raw\`
- \`formId\` An 'id' of the EasyForm. This is only present when manually set.
- Other common Vue props like: \`$store\`, \`$router\`, \`$q\` (for Quasar apps) etc.

Try to refrain from accessing props other than the ones listed above, because these are mainly used internal and could have behaviour changes that could break your app.
`

export default {
  mode: 'edit',
  actionButtons: [],
  schema: [
    {
      component: 'QMarkdown',
      noLineNumbers: true,
      src: description,
    },
    {
      id: 'chosenExample',
      component: 'QBtnToggle',
      spread: true,
      noCaps: true,
      unelevated: true,
      options: [
        { label: 'Dynamic prop based on the value of the field', value: 0 },
        { label: 'Dynamic prop based on the value of "another" field', value: 1 },
        { label: 'Dynamic "conditional rendering" of a field', value: 2 },
        { label: 'Dynamic "options" of a select-field', value: 3 },
      ],
    },
    {
      component: 'QMarkdown',
      noLineNumbers: true,
      showCondition: (value, { formData }) => formData.chosenExample === 0,
      src: `
### Dynamic prop based on the value of the field
Eg. \`subLabel: val => val === 'purple' ? 'nice!' : 'choose a color'\`
`.trim(),
    },
    {
      component: 'QMarkdown',
      noLineNumbers: true,
      showCondition: (value, { formData }) => formData.chosenExample === 1,
      src: `
### Dynamic prop based on the value of "another" field
Eg. \`disable: (val, {formData}) => formData.over18\`
`.trim(),
    },
    {
      component: 'QMarkdown',
      noLineNumbers: true,
      showCondition: (value, { formData }) => formData.chosenExample === 2,
      src: `
### Dynamic "conditional rendering" of a field

Eg. \`showCondition: (val, {formData}) => formData.car\`

\`showCondition\` is a special prop that can only be used inside the schema of an EasyForm.
`.trim(),
    },
    {
      component: 'QMarkdown',
      noLineNumbers: true,
      showCondition: (value, { formData }) => formData.chosenExample === 3,
      src: `
### Dynamic "options" of a select-field
`.trim(),
    },
  ],
}
