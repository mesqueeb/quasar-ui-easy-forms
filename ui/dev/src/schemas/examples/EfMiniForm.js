export default {
  component: 'EfMiniForm',
  label: 'Expenses',
  subLabel: "fill in this month's expenses",
  schema: [
    {
      id: 'type',
      label: 'Type',
      component: 'QSelect',
      span: 2,
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
      span: 2,
      // component props:
      type: 'number',
      parseInput: Number,
      prefix: '€',
    },
    {
      id: 'paid for',
      label: 'Paid for',
      component: 'QToggle',
      default: false,
      span: 1,
    },
  ],
  default: () => [],
}
