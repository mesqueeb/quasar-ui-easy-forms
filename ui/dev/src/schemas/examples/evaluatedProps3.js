export default {
  mode: 'edit',
  actionButtons: ['edit', 'save'],
  columnCount: 2,
  schema: [
    {
      id: 'car',
      component: 'QToggle',
      default: false,
      label: 'Do you have a car?',
    },
    {
      id: 'carType',
      component: 'QInput',
      label: 'What is the brand?',
      subLabel: 'This is only shown when the first question is `true`.',
      showCondition: (val, { formDataNested }) => formDataNested.car,
    },
    {
      id: 'carNrPlate',
      component: 'QInput',
      label: 'Enter your license plate brand?',
      subLabel: "This is hidden when the form is set to 'view' mode. Try clicking 'save'.",
      showCondition: (val, { formDataNested, mode }) => formDataNested.car && mode === 'edit',
    },
  ],
}
