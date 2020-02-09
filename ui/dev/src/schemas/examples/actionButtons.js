export default {
  mode: 'view',
  actionButtons: [
    'delete',
    'archive',
    'cancel',
    'edit',
    'save',
    {
      component: 'EfBtn',
      btnLabel: 'log the data (check console)',
      push: true,
      events: {
        click: (event, { formData }) => console.log(formData),
      },
    },
  ],
  actionButtonDefaults: {
    archive: { icon: 'archive', showCondition: (_, { mode }) => mode !== 'edit' },
    delete: { icon: 'delete', showCondition: (_, { mode }) => mode !== 'edit' },
    edit: { icon: 'edit', flat: false, outline: true },
    save: { icon: 'save' },
  },
  schema: [
    {
      id: 'name',
      component: 'QInput',
      label: 'Superhero name',
      subLabel: 'Think of something cool.',
    },
    {
      id: 'powerOrigin',
      component: 'QBtnToggle',
      label: 'Power origin',
      subLabel: 'Where does your power come from?',
      // component props:
      options: [
        { label: 'Mutation', value: 'mutation' },
        { label: 'Self taught', value: 'self' },
        { label: 'By item', value: 'item' },
      ],
      spread: true,
    },
  ],
}
