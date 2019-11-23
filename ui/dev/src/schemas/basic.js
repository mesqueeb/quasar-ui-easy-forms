
const description = `\`<EasyForm />\` is a component that allows you to easily create forms by passing an object with a schema on how you want the form to look. The only thing you need to learn is the way you can define this schema and based on this the entire form will be generated.

By default, EasyForm has buttons on the top side of the form to edit/save etc... Each of these actions will $emit an event, so you can do something appropriately. (eg. saving data to a DB when "save" is clicked)

EasyForm has three modes. 'view', 'edit' and 'add'. When in 'view' mode, EasyForm can be used to just show data. These buttons can also be disabled and by providing a custom mode you can keep the form in a certain mode forever.

Try filling in the form below and play around with the props via the interactive panel.`

export const exampleForms = [
  {
    schema: [
      {
        id: 'name',
        fieldType: 'input',
        valueType: 'string',
        label: 'Superhero name',
        subLabel: 'Think of something cool.'
      },
      {
        id: 'powerOrigin',
        fieldType: 'btn-toggle',
        label: 'Power origin',
        subLabel: 'Where does your power come from?',
        options: [
          {label: 'Mutation', value: 'mutation'},
          {label: 'Self taught', value: 'self'},
          {label: 'By item', value: 'item'},
        ],
      },
    ]
  }
]

export const pageForm = {
  mode: 'edit',
  actionButtons: [],
  schema: [
    {
      fieldType: 'markdown',
      src: description,
    },
  ]
}

export default {
  exampleForms,
  pageForm,
}
