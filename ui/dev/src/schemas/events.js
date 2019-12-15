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
- \`context\` has useful props like: \`$store\`, \`$router\`, \`formDataNested\`, \`formDataFlat\`, \`formMode\`, \`formId\`, ... All of these are explained in the *"Evaluated Props" documentation*, so be sure to check that.
- \`context\` has a special function called \`fieldInput\` which can be used to modify other fields programatically.
- And all this can be set from inside an \`<EasyForm />\`'s \`schema\` so you don't need add anything manually inside your templates.

Phew. That was a bit of a lot of information all at once. 😅 Let's tackle these one by one.
`

const notifyInputFn = (val, { $q }) => $q.notify(val)
notifyInputFn.prototype.stringifiedFn = `(val, {$q}) => $q.notify(val)`

const notifyFocusFn = (val, { id, label, $q }) => $q.notify(`focussed: 「${label}」 (id: ${id})`)
notifyFocusFn.prototype.stringifiedFn =
  '(val, {id, label, $q}) => $q.notify(`focussed: 「${label}」 (id: ${id})`)'

const telFn = (val, { fieldInput, formDataNested }) =>
  fieldInput({ id: 'telClean', value: !val ? '' : val.replace(/[^\d]/g, '').trim() })
telFn.prototype.stringifiedFn = `(val, {fieldInput}) => fieldInput({id: 'telClean', value: !val ? '' : val.replace(/[^\d]/g, '').trim()})`

export const exampleForms = [
  {
    mode: 'edit',
    actionButtons: [],
    columnCount: 1,
    schema: [
      {
        id: 'testField',
        fieldType: 'input',
        label: 'Type something',
        events: { input: notifyInputFn, focus: notifyFocusFn },
      },
    ],
  },
  {
    mode: 'edit',
    actionButtons: [],
    columnCount: 2,
    schema: [
      {
        id: 'tel',
        fieldType: 'input',
        label: 'Phone nr (hyphenated)',
        subLabel: 'Type any number with `-` or `(  )`',
        events: { input: telFn },
      },
      {
        id: 'telClean',
        fieldType: 'input',
        label: 'Phone nr (only numbers)',
        subLabel: 'This field is automatically updated when you type in a phone nr on the left.',
        disable: true,
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
        options: [this._3, this._4].map((field, index) => {
          return { label: field.label, value: index }
        }),
      }
    },
    _3: {
      showCondition: (value, { formDataNested }) => formDataNested.chosenExample === 0,
      fieldType: 'title',
      label: 'Notify on events',
      hasMarkdown: true,
      subLabel: `
  Eg.
  \`\`\`js
  events: {
    input: ${notifyInputFn.prototype.stringifiedFn}
    focus: ${notifyFocusFn.prototype.stringifiedFn}
  }
  \`\`\``.trim(),
    },
    _4: {
      showCondition: (value, { formDataNested }) => formDataNested.chosenExample === 1,
      fieldType: 'title',
      label: "Update other fields on 'input'",
      hasMarkdown: true,
      subLabel: `
  Eg.
  \`\`\`js
  events: {
  input: ${telFn.prototype.stringifiedFn}
  }
  \`\`\`

  The \`fieldInput\` function can be used to update other fields inside your form. It receives a single parameter which should be an object that looks like \`{id, value}\` with the \`id\` of the field you want to update and a \`value\` you want to update it with.
  `.trim(),
    },
  }),
}

export default {
  exampleForms,
  pageForm,
}
