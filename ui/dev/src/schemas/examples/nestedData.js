export default {
  actionButtons: [],
  mode: 'edit',
  columnCount: 3,
  events: {
    'field-input': val => {
      console.log('logging @field-input payload:', val)
    },
  },
  schema: [
    {
      id: 'size.width',
      label: 'Width',
      component: 'QInput',
      parseInput: Number,
      // component props:
      type: 'number',
      suffix: 'cm',
    },
    {
      id: 'size.depth',
      label: 'Depth',
      component: 'QInput',
      parseInput: Number,
      // component props:
      type: 'number',
      suffix: 'cm',
    },
    {
      id: 'size.height',
      label: 'Height',
      component: 'QInput',
      parseInput: Number,
      // component props:
      type: 'number',
      suffix: 'cm',
    },
  ],
}
