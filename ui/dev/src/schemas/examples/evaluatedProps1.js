export default {
  mode: 'edit',
  actionButtons: [],
  columnCount: 1,
  schema: [
    {
      id: 'color',
      span: true,
      component: 'QBtnToggle',
      label: 'What is your favorite color?',
      evaluatedProps: ['subLabel'],
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
      // component props:
      options: [
        { label: 'red', value: 'red' },
        { label: 'blue', value: 'blue' },
        { label: 'green', value: 'green' },
        { label: 'other', value: 'other' },
      ],
      spread: true,
    },
  ],
}
