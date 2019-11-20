
const schema = [
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

export default {
  schema,
  value: {},
  mode: 'view',
  actionButtons: ['delete', 'archive', 'cancel', 'edit', 'save', {
    btnLabel: 'log the data',
    push: true,
    events: {
      click: (event, {formDataNested}) => console.log(formDataNested),
    },
  }],
}
