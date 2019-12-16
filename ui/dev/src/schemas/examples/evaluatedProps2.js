export default {
  mode: 'edit',
  actionButtons: [],
  columnCount: 2,
  schema: [
    {
      id: 'over18',
      fieldType: 'toggle',
      label: 'Are you over 18?',
    },
    {
      id: 'parentalConsent',
      fieldType: 'toggle',
      label: 'Do you have parental consent?',
      subLabel: 'This will be disabled when the first question is `true`.',
      disable: (val, { formDataNested }) => formDataNested.over18,
    },
  ],
}
