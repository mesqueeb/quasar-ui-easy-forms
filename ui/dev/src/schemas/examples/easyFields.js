export const EfBtn = {
  id: 'btn',
  component: 'EfBtn',
  btnLabel: 'Touch me',
  events: {
    click: (val, context) => console.log('@CLICK\nval → ', val, '\ncontext → ', context),
  },
}
export const EfBtnToggle = {
  id: 'btnToggle',
  component: 'EfBtnToggle',
  options: [
    { label: 'one', value: 1 },
    { label: 'two', value: 2 },
  ],
}
export const EfDiv = {
  id: 'myRank',
  component: 'EfDiv',
  options: [
    { value: '1', label: 'one' },
    { value: '2', label: 'two' },
  ],
  prefix: 'Rank ',
  value: '1',
}
export const EfMiniForm = {
  id: 'myMiniForm',
  component: 'EfMiniForm',
  label: 'Expenses',
  subLabel: "fill in this month's expenses",
  schema: [
    {
      component: 'QSelect',
      label: 'Type',
      id: 'type',
      options: [
        { label: 'Home', value: 'home' },
        { label: 'Work', value: 'work' },
      ],
    },
    {
      component: 'QInput',
      label: 'Amount',
      id: 'amount',
      type: 'number',
      parseInput: Number,
      prefix: '€',
    },
    { component: 'QToggle', label: 'Notify', default: false, id: 'notify' },
  ],
  value: [],
}
export const EfImg = {
  id: 'img',
  component: 'EfImg',
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
export const EfInput = {
  id: 'input',
  component: 'EfInput',
}
export const EfInputDate = {
  id: 'inputDate',
  component: 'EfInputDate',
}
export const EfLink = {
  id: 'link',
  component: 'EfLink',
  href: 'https://github.com/mesqueeb',
  newWindow: true,
}
export const EfPdf = {
  id: 'pdf',
  component: 'EfPdf',
  value: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
}
export const EfMarkdown = {
  id: 'markdown',
  component: 'EfMarkdown',
  valueType: 'string',
  value: `# Markdowny Junior

**bold**, _italic_, all the \`bling\`!

\`\`\`js
jarvis.execute(9000)
\`\`\``,
}
export const EfRange = {
  id: 'range',
  component: 'EfRange',
  min: 0,
  max: 100,
  value: { min: 25, max: 50 },
}
export const EfSelect = {
  id: 'select',
  component: 'EfSelect',
  placeholder: 'please select one',
  options: [
    { label: 'one', value: '1' },
    { label: 'two', value: '2' },
  ],
  // events: { focus: (...args) => console.log('on input', ...args) },
}
export const EfSlider = {
  id: 'slider',
  component: 'EfSlider',
  min: 0,
  max: 100,
  value: 0,
}
export const EfToggle = {
  id: 'toggle',
  component: 'EfToggle',
}
export const EfUploaderFirebase = {
  id: 'uploaderFirebase',
  component: 'EfUploaderFirebase',
  path: 'test',
}
export const EfVideo = {
  id: 'video',
  component: 'EfVideo',
  value: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
}

export default {
  EfBtn,
  EfBtnToggle,
  EfDiv,
  EfMiniForm,
  EfImg,
  EfInput,
  EfInputDate,
  EfLink,
  EfMarkdown,
  EfPdf,
  EfRange,
  EfSelect,
  EfSlider,
  EfToggle,
  EfUploaderFirebase,
  EfVideo,
}
