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
      fieldType: 'input',
      valueType: 'number',
      suffix: 'cm',
    },
    {
      id: 'size.depth',
      label: 'Depth',
      fieldType: 'input',
      valueType: 'number',
      suffix: 'cm',
    },
    {
      id: 'size.height',
      label: 'Height',
      fieldType: 'input',
      valueType: 'number',
      suffix: 'cm',
    },
  ],
}
