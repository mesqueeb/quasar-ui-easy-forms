export default {
  schema: [
    {
      id: 'name',
      component: 'QInput',
      valueType: 'string',
      label: 'Superhero name',
      subLabel: 'Think of something cool.',
    },
    {
      id: 'powerOrigin',
      component: 'QBtnToggle',
      label: 'Power origin',
      subLabel: 'Where does your power come from?',
      options: [
        { label: 'Mutation', value: 'mutation' },
        { label: 'Self taught', value: 'self' },
        { label: 'By item', value: 'item' },
      ],
      spread: true,
    },
  ],
}
