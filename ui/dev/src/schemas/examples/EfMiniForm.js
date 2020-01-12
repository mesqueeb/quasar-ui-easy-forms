export default {
  component: 'EfMiniForm',
  label: 'Expenses',
  subLabel: "fill in this month's expenses",
  schema: [
    {
      component: 'QBtn',
      events: {
        click: (e, { $attrs, $parent }) => {
          const { rowIndex } = $attrs
          const { value = [] } = $parent
          const valueCopy = [...value]
          valueCopy.splice(rowIndex, 1)
          $parent.$emit('input', valueCopy)
        },
      },
      disable: (val, { $attrs, $parent }) => {
        const { rowIndex } = $attrs
        const { value = [] } = $parent
        return rowIndex === value.length
      },
      span: '26px',
      // component props:
      icon: 'remove_circle',
      color: 'negative',
      size: 'sm',
      flat: true,
      dense: true,
    },
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
      id: 'paid for',
      label: 'Paid for',
      component: 'QToggle',
      default: false,
      span: 'auto',
    },
  ],
  default: () => [],
}
