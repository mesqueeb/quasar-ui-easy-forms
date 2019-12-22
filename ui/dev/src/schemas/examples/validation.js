export default {
  columnCount: 3,
  actionButtons: ['delete', 'archive', 'cancel', 'edit', 'save'],
  schema: [
    {
      id: 'name',
      label: 'Name',
      component: 'QInput',
      // component props:
      required: true,
    },
    {
      id: 'age',
      label: 'Age',
      component: 'QInput',
      parseInput: Number,
      rules: [val => val >= 18 || 'You must be over 18'],
      // component props:
      type: 'number',
    },
    {
      id: 'consent',
      label: 'Do you agree with our terms?',
      component: 'QToggle',
      rules: [val => val || 'You must accept our terms'],
      default: false,
    },
  ],
}
