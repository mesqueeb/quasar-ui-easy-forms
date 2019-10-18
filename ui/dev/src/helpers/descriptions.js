
export const basic = `\`<EasyForm />\` is a component that allows you to easily create forms by passing an object with a schema on how you want the form to look. The only thing you need to learn is the way you can define this schema and based on this the entire form will be generated.

By default, EasyForm has buttons on the top side of the form to edit/save etc... Each of these actions will $emit an event, so you can do something appropriately. (eg. saving data to a DB when "save" is clicked)

EasyForm has three modes. 'view', 'edit' and 'add'. When in 'view' mode, EasyForm can be used to just show data. These buttons can also be disabled and by providing a custom mode you can keep the form in a certain mode forever.

Try filling in the form below and play around with the props via the interactive panel.`

export const advanced = `This is a more advanced example so you can see the full power of EasyForms.`

export const evaluatedProps = `As you know, \`<EasyForm />\` needs a 'schema' with information on each field you want to show. However, when using an EasyForm you can replace the value of any prop in any field with a function instead of the value directly. This function will be executed any time the data of any field changes. This allows you to have "dynamic" props, based on the data of the form.

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
`

export const events = `Each \`<EasyField />\` can be passed an prop called \`events\`. This prop can be passed like so: \`:events="events"\` and will set all the event listeners on the field like so: \`v-on="events"\`.

An \`events\` prop would look like so:
\`\`\`js
events: {
  input: ($event, context) => { /* do something */ },
  focus: ($event, context) => { /* do something */ },
  // etc...
}
\`\`\`

The benefits of passing your event listeners via the \`events\` prop are:
- Besides the typical \`$event\` parameter they receive as first parameter, they will receive a second \`context\` parameter.
- \`context\` is the Vue component reference of the \`<EasyField />\`, you can deconstruct this to access any other properties/values.
- \`context\` has useful props like: \`$store\`, \`$router\`, \`formDataNested\`, \`formDataFlat\`, \`formMode\`, \`formId\`, ... All of these are already explained in the "Evaluated Props" documentation, so be sure to check that.
- \`context\` has a special function called \`fieldInput\` which can be used to modify other fields programatically.
- And all this can be set from inside an \`<EasyForm />\`'s \`schema\` so you don't need add anything manually inside your templates.

Phew. That was a bit of a lot of information all at once. 😅 Let's tackle these one by one.

`

export const nestedProps = `todo...`
