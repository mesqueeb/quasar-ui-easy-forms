export default {
  columnCount: 2,
  schema: [
    {
      id: 'age',
      label: 'Age',
      fieldType: 'input',
      valueType: 'number',
      rules: [val => val >= 18 || 'You must be over 18'],
      required: true,
    },
    {
      id: 'consent',
      label: 'Do you agree with our terms?',
      fieldType: 'toggle',
      valueType: 'boolean',
      rules: [val => val || 'You must accept our terms'],
    },
  ],
}
