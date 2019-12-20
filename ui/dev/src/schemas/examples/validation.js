export default {
  columnCount: 3,
  actionButtons: ['delete', 'archive', 'cancel', 'edit', 'save'],
  schema: [
    {
      id: 'name',
      label: 'Name',
      component: 'QInput',
      required: true,
    },
    {
      id: 'age',
      label: 'Age',
      component: 'QInput',
      type: 'number',
      parseInput: Number,
      rules: [val => val >= 18 || 'You must be over 18'],
    },
    {
      id: 'consent',
      label: 'Do you agree with our terms?',
      component: 'QToggle',
      default: false,
      rules: [val => val || 'You must accept our terms'],
    },
  ],
}
