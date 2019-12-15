const notifyInputFn = (val, { $q }) => $q.notify(val)
notifyInputFn.prototype.stringifiedFn = `(val, {$q}) => $q.notify(val)`

const notifyFocusFn = (val, { id, label, $q }) => $q.notify(`focussed: 「${label}」 (id: ${id})`)
notifyFocusFn.prototype.stringifiedFn =
  '(val, {id, label, $q}) => $q.notify(`focussed: 「${label}」 (id: ${id})`)'

const telFn = (val, { fieldInput, formDataNested }) =>
  fieldInput({ id: 'telClean', value: !val ? '' : val.replace(/[^\d]/g, '').trim() })
telFn.prototype.stringifiedFn = `(val, {fieldInput}) => fieldInput({id: 'telClean', value: !val ? '' : val.replace(/[^\d]/g, '').trim()})`

export default [
  {
    mode: 'edit',
    actionButtons: [],
    columnCount: 1,
    schema: [
      {
        id: 'testField',
        fieldType: 'input',
        label: 'Type something',
        events: { input: notifyInputFn, focus: notifyFocusFn },
      },
    ],
  },
  {
    mode: 'edit',
    actionButtons: [],
    columnCount: 2,
    schema: [
      {
        id: 'tel',
        fieldType: 'input',
        label: 'Phone nr (hyphenated)',
        subLabel: 'Type any number with `-` or `(  )`',
        events: { input: telFn },
      },
      {
        id: 'telClean',
        fieldType: 'input',
        label: 'Phone nr (only numbers)',
        subLabel: 'This field is automatically updated when you type in a phone nr on the left.',
        disable: true,
      },
    ],
  },
]
