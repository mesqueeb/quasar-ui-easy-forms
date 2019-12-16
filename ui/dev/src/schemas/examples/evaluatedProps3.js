export default {
  mode: 'edit',
  actionButtons: ['edit', 'save'],
  columnCount: 2,
  schema: [
    {
      id: 'car',
      fieldType: 'toggle',
      label: 'Do you have a car?',
    },
    {
      id: 'carType',
      fieldType: 'input',
      label: 'What is the brand?',
      subLabel: 'This is only shown when the first question is `true`.',
      showCondition: (val, { formDataNested }) => formDataNested.car,
    },
    {
      id: 'carNrPlate',
      fieldType: 'input',
      label: 'Enter your license plate brand?',
      subLabel: "This is hidden when the form is set to 'view' mode. Try clicking 'save'.",
      showCondition: (val, { formDataNested, formMode }) =>
        formDataNested.car && formMode === 'edit',
    },
  ],
}
