const description = `Each \`<EasyField />\` can be passed an prop called \`events\`. This prop can be passed like so: \`:events="events"\` and will set all the event listeners on the field like so: \`v-on="events"\`.

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
- \`context\` has useful props like: \`$store\`, \`$router\`, \`formData\`, \`formDataFlat\`, \`mode\`, \`formId\`, ... All of these are explained in the *"Evaluated Props" documentation*, so be sure to check that.
- \`context\` has a special function called \`fieldInput\` which can be used to modify other fields programatically.
- And all this can be set from inside an \`<EasyForm />\`'s \`schema\` so you don't need add anything manually inside your templates.

Phew. That was a bit of a lot of information all at once. 😅 Let's look at some examples:
`

export default {
  mode: 'edit',
  actionButtons: [],
  schema: [
    {
      component: 'QMarkdown', noContainer: true,
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
        { label: 'Notify on events', value: 0 },
        { label: "Update other fields on 'input'", value: 1 },
      ],
    },
    {
      component: 'QMarkdown', noContainer: true,
      showCondition: (value, { formData }) => formData.chosenExample === 0,
      noLineNumbers: true,
      src: `
### Notify on events

Here we see an example of two events being used.
\`\`\`js
events: {
  input: (val, {$q}) => $q.notify(val)
  focus: (val, {id, label, $q}) => $q.notify(\`focussed: 「\${label}」 (id: \${id})\`)
}
\`\`\``.trim(),
    },
    {
      component: 'QMarkdown', noContainer: true,
      showCondition: (value, { formData }) => formData.chosenExample === 1,
      noLineNumbers: true,
      src: `
### Update other fields on 'input'
Here we see an example of one field updating the contents of another on the input event.
\`\`\`js
events: {
  input: (val, {fieldInput}) => {
    // get only digits from input
    const value = !val ? '' : val.replace(/[^\d]/g, '').trim()

    // set field 'telClean' to this value
    fieldInput({id: 'telClean', value})
  }
}
\`\`\`

The \`fieldInput\` function can be used to update other fields inside your form. It receives a single parameter which should be an object that looks like \`{id, value}\` with the \`id\` of the field you want to update and a \`value\` you want to update it with.

Be sure to also check the documentation on \`Computed Fields\`.
`.trim(),
    },
  ],
}
