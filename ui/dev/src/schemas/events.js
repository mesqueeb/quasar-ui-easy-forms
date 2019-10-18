
const notifyInputFn = (val, {$q}) => $q.notify(val)
notifyInputFn.prototype.stringifiedFn = `(val, {$q}) => $q.notify(val)`

const notifyFocusFn = (val, {id, label, $q}) => $q.notify(`focussed: 「${label}」 (id: ${id})`)
notifyFocusFn.prototype.stringifiedFn = '(val, {id, label, $q}) => $q.notify(`focussed: 「${label}」 (id: ${id})`)'

const telFn = (val, {fieldInput, formDataNested}) => fieldInput({id: 'telClean', value: !val ? '' : val.replace(/[^\d]/g, '').trim()})
telFn.prototype.stringifiedFn = `(val, {fieldInput}) => fieldInput({id: 'telClean', value: !val ? '' : val.replace(/[^\d]/g, '').trim()})`

export default [
  [
    {
      label: 'Notify on events',
      subLabel: `
Eg.
\`\`\`js
events: {
  input: ${notifyInputFn.prototype.stringifiedFn}
  focus: ${notifyFocusFn.prototype.stringifiedFn}
}
\`\`\``.trim(),
      fieldType: 'title',
    },
    {
      id: 'testField',
      fieldType: 'input',
      label: 'Type something',
      events: {input: notifyInputFn, focus: notifyFocusFn},
    },
  ],
  [
    {
      label: 'Update other fields on \'input\'',
      subLabel: `
Eg.
\`\`\`js
events: {
  input: ${telFn.prototype.stringifiedFn}
}
\`\`\`

The \`fieldInput\` function can be used to update other fields inside your form. It receives a single parameter which should be an object that looks like \`{id, value}\` with the \`id\` of the field you want to update and a \`value\` you want to update it with.
`.trim(),
      fieldType: 'title',
    },
    {
      id: 'tel',
      fieldType: 'input',
      label: 'Phone nr (hyphenated)',
      subLabel: 'Type any number with `-` or `(  )`',
      events: {input: telFn},
    },
    {
      id: 'telClean',
      fieldType: 'input',
      label: 'Phone nr (only numbers)',
      subLabel: 'This field is automatically updated when you type in a phone nr on the left.',
      disable: true,
    },
  ],
]
