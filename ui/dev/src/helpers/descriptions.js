
export const descBasic = `\`<EasyForm />\` is a component that allows you to easily create forms by passing an object with a schema on how you want the form to look. The only thing you need to learn is the way you can define this schema and based on this the entire form will be generated.

By default, EasyForm has buttons on the top side of the form to edit/save etc... Each of these actions will $emit an event, so you can do something appropriately. (eg. saving data to a DB when "save" is clicked)

EasyForm has three modes. 'view', 'edit' and 'add'. When in 'view' mode, EasyForm can be used to just show data. These buttons can also be disabled and by providing a custom mode you can keep the form in a certain mode forever.

Try filling in the form below and play around with the props via the interactive panel.`

export const descAdvanced = `This is a more advanced example so you can see the full power of EasyForms.`

export const descEvaluatedProps = `As you know, \`<EasyForm />\` needs a 'schema' with information on each field you want to show. However, when using an EasyForm you can replace the value of any prop in any field with a function instead of the value directly. This function will be executed any time the data of any field changes. This allows you to have "dynamic" props, based on the data of the form.

For example, when you pass \`disable: true\` to a certain field, it will appear as disabled inside the form. You can instead also pass \`disable: (val, context) => context.formDataNested.myCheckBox\` to be able to only disable that field when \`myCheckBox\` is truthy.

Evaluated props will receive 2 params: \`(val, context)\`.
- \`val\` is the current value of the field
- \`context\` is the Vue component reference of the \`<EasyField />\`, you can deconstruct this to access any other properties/values.

The most important props you can access from \`context\`:
- \`$store\` Your Vuex store, if you have one.
- \`formDataNested\` This is the *nested* data of all the fields inside an EasyForm.
- \`formDataFlat\` This is the *flattened* data of all the fields inside an EasyForm.
- \`formMode\` The current state of the EasyForm. Can be \`'view'\` | \`'edit'\` | \`'add'\`
- \`formId\` An 'id' of the EasyForm. This is only present when manually set.
- \`fieldInput\` A method you can access to modify the value of other fields inside the form. (See the example below at the very bottom for more details.)
`

export const nestedProps = `todo...`
