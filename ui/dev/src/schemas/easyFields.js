
export const btn = {
  id: 'btn',
  fieldType: 'btn',
  btnLabel: 'Touch me',
  events: {
    click: (val, context) => console.log('@CLICK\nval → ', val, '\ncontext → ', context),
  },
}
export const btnToggle = {
  id: 'btnToggle',
  fieldType: 'btnToggle',
  options: [{label: 'one', value: 1}, {label: 'two', value: 2}],
}
export const div = {
  id: 'myRank',
  fieldType: 'div',
  options: [
    {value: '1', label: 'one'},
    {value: '2', label: 'two'},
  ],
  prefix: 'Rank ',
  value: '1',
}
export const form = {
  id: 'form',
  fieldType: 'form',
  label: 'Expenses',
  subLabel: 'fill in this month\'s expenses',
  schema: [
    {fieldType: 'select', label: 'Type', id: 'type', options: [{label: 'Home', value: 'home'}, {label: 'Work', value: 'work'}]},
    {fieldType: 'input', label: 'Amount', id: 'amount', valueType: 'number', prefix: '€'},
    {fieldType: 'toggle', label: 'Notify', id: 'notify', default: true},
  ],
  value: [],
}
export const img = {
  id: 'img',
  fieldType: 'img',
  value: [
    'https://www.dailydot.com/wp-content/uploads/146/6e/6d78ec0c8c8eaf31.png',
    {
      downloadURL: 'https://media1.tenor.com/images/14d16e998fc898010f4bf7db2a81e74c/tenor.gif',
      caption: `You're breathtaking!`,
      captionClasses: 'text-bold',
    },
  ],
  // events: { click: (...args) => console.log('on input', ...args) },
}
export const input = {
  id: 'input',
  fieldType: 'input',
}
export const inputDate = {
  id: 'inputDate',
  fieldType: 'inputDate',
}
export const link = {
  id: 'link',
  fieldType: 'link',
  href: 'https://github.com/mesqueeb',
  newWindow: true,
}
export const pdf = {
  id: 'pdf',
  fieldType: 'pdf',
  value: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
}
export const markdown = {
  id: 'markdown',
  fieldType: 'markdown',
  valueType: 'string',
  value: `# Markdowny Junior

**bold**, _italic_, all the \`bling\`!

\`\`\`js
jarvis.execute(9000)
\`\`\``,
}
export const range = {
  id: 'range',
  fieldType: 'range',
  min: 0,
  max: 100,
  value: {min: 25, max: 50},
}
export const select = {
  id: 'select',
  fieldType: 'select',
  placeholder: 'please select one',
  options: [{label: 'one', value: '1'}, {label: 'two', value: '2'}],
  // events: { focus: (...args) => console.log('on input', ...args) },
}
export const slider = {
  id: 'slider',
  fieldType: 'slider',
  min: 0,
  max: 100,
  value: 0,
}
export const toggle = {
  id: 'toggle',
  fieldType: 'toggle',
}
export const uploaderFirebase = {
  id: 'uploaderFirebase',
  fieldType: 'uploaderFirebase',
  path: 'test',
}
export const video = {
  id: 'video',
  fieldType: 'video',
  value: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
}

export default {
  btn,
  btnToggle,
  div,
  form,
  img,
  input,
  inputDate,
  link,
  markdown,
  pdf,
  range,
  select,
  slider,
  toggle,
  uploaderFirebase,
  video,
}
