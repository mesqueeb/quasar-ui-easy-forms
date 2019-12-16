export default {
  mode: 'edit',
  actionButtons: [],
  columnCount: 1,
  schema: [
    {
      id: 'color',
      span: true,
      fieldType: 'btn-toggle',
      label: 'What is your favorite color?',
      options: [
        { label: 'red', value: 'red' },
        { label: 'blue', value: 'blue' },
        { label: 'green', value: 'green' },
        { label: 'other', value: 'other' },
      ],
      subLabel: val =>
        val === 'red'
          ? 'like the sun'
          : val === 'blue'
          ? 'like the sky'
          : val === 'green'
          ? 'green is not a creative color'
          : val === 'other'
          ? 'oh, come on, just pick one'
          : 'pick a color!',
    },
  ],
}
