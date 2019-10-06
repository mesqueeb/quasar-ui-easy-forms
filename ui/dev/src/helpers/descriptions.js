
export const descBasic = `\`<EasyForm />\` is a component that allows you to easily create forms by passing an object with a schema on how you want your form to look. The only thing you need to learn is the way you can define this schema and based on this the entire form will be generated.

By default, EasyForm has buttons on the top side of the form to edit/save etc... Each of these actions will $emit an event, so you can do something appropriately. (eg. saving data to a DB when "save" is clicked)

EasyForm has three modes. 'view', 'edit' and 'add'. When in 'view' mode, EasyForm can be used to just show data. These buttons can also be disabled and by providing a custom mode you can keep the form in a certain mode forever.

Try filling in the form below and play around with the props via the interactive panel.`

export const descAdvanced = `This is a more advanced example so you can see the full power of EasyForms.`

export const functionProps = `As you know, \`<EasyForm />\` needs a 'schema' with information on each field you want to show. However, when using an EasyForm you can replace the value of any prop in any field with a function instead of the value directly.

For example, when you pass \`disable: true\` to a certain field it will appear as disabled inside your form. You can instead also pass \`disable: (val, form, data) => data.myCheckBox\` to be able to only disable that field when \`myCheckBox\` is truthy.

When you use a function it will receive 3 params: \`(val, form, data)\`.
- \`val\` is the current value of the field
- \`form\` is the Vue component reference of \`<EasyForm />\`, you can deconstruct this to access things like the \`$store\`, or any other prop you passed to the EasyForm like 'mode' (view, edit or add).
- \`data\` is your entire EasyForm's \`value\`; an object with all the values of every field.
`

export const nestedProps = `todo...`
