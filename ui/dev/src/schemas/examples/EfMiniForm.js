export default {
  component: 'EfMiniForm',
  label: 'Expenses',
  subLabel: "fill in this month's expenses",
  schema: [
    {
      id: 'type',
      label: 'Type',
      component: 'QSelect',
      // component props:
      emitValue: true,
      mapOptions: true,
      options: [
        { label: 'Home', value: 'home' },
        { label: 'Work', value: 'work' },
      ],
    },
    {
      id: 'amount',
      label: 'Amount',
      component: 'QInput',
      // component props:
      type: 'number',
      parseInput: Number,
      prefix: '€',
    },
    {
      id: 'notify',
      label: 'Notify',
      component: 'QToggle',
      default: false,
    },
  ],
  default: [],
}
