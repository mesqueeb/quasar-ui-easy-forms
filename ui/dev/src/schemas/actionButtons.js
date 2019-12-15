const description = `EasyForm has a prop called 'actionButtons' with which you can specify which buttons you want your EasyForm to include.
Some buttons are already set up for you and can be included by just passing the string of the button you want:

- \`'edit'\`: Adds a button that puts the form in "edit" mode
- \`'cancel'\`: Adds a button that puts the form back into "view" mode & reverts the content to its original state
- \`'save'\`: Adds a button that puts the form back into "view" mode & keeps the modified content
- \`'delete'\` & \`'archive'\`: Adds a button that emits a delete or archive event (you must implement your own logic)

The buttons above emits the events: \`@edit\`, \`@cancel\`, \`@save\`, \`@delete\`, \`@archive\`

Only \`@save\` receives a payload with the new and old form data.
- \`@save="onSave"\`
\`\`\`js
import merge from 'merge-anything' // my merge util 😉
{
  onSave ({newData, oldData}) {
    console.log(newData) // an object with only the updated fields
    console.log(oldData) // the original object with all the field values
    // if you need a combination of both:
    const newFormData = merge(oldData, newData)
  }
}
\`\`\`

When you don't specify the action buttons it will default to:
- \`:action-buttons="['archive', 'cancel', 'edit', 'save']"\`

When you want no buttons to show you can pass:
- \`:action-buttons="[]"\`

You can also pass custom buttons with a schema just like an EasyField button (see the \`EasyField > button\` documentation).

The function you set to \`events.click\` of custom buttons will receive the native event payload as first parameter and the EasyForm context (the component instance) as second: \`($event, context) => {}\`
An example of a custom button could be:
\`\`\`js
actionButtons: [{
  btnLabel: 'log the data',
  events: {
    click: (event, {formDataNested}) => console.log(formDataNested),
  },
}]
\`\`\`

For more information on the \`context\` prop passed to a click event see the "Evaluated Props" and "Events" documentation.
`

export const exampleForms = [
  {
    mode: 'view',
    actionButtons: [
      'delete',
      'archive',
      'cancel',
      'edit',
      'save',
      {
        btnLabel: 'log the data',
        push: true,
        events: {
          click: (event, { formDataNested }) => console.log(formDataNested),
        },
      },
    ],
    schema: [
      {
        id: 'name',
        fieldType: 'input',
        valueType: 'string',
        label: 'Superhero name',
        subLabel: 'Think of something cool.',
      },
      {
        id: 'powerOrigin',
        fieldType: 'btn-toggle',
        label: 'Power origin',
        subLabel: 'Where does your power come from?',
        options: [
          { label: 'Mutation', value: 'mutation' },
          { label: 'Self taught', value: 'self' },
          { label: 'By item', value: 'item' },
        ],
      },
    ],
  },
]

export const pageForm = {
  mode: 'edit',
  actionButtons: [],
  schema: [
    {
      fieldType: 'markdown',
      src: description,
    },
  ],
}

export default {
  exampleForms,
  pageForm,
}
