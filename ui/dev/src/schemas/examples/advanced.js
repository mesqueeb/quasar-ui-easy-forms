export default {
  columnCount: 4,
  actionButtons: ['delete', 'archive', 'cancel', 'edit', 'save'],
  schema: [
    {
      span: 3,
    },
    {
      span: 1,
      label: 'Example component:',
    },
    {
      id: 'name',
      span: 3,
      component: 'QInput',
      label: 'Superhero name',
      subLabel: 'Think of something cool.',
      required: true,
    },
    {
      id: 'md-input',
      component: 'QMarkdown',
      span: 1,
      // component props:
      noContainer: true,
      noLineNumbers: true,
      src: "```js\n{component: 'QInput'}\n```",
    },
    {
      id: 'powerOrigin',
      span: 3,
      component: 'QBtnToggle',
      label: 'Power origin',
      subLabel: 'Where does your power come from?',
      // component props:
      spread: true,
      options: [
        { label: 'Mutation', value: 'mutation' },
        { label: 'Self taught', value: 'self' },
        { label: 'By item', value: 'item' },
      ],
    },
    {
      id: 'md-btn-toggle',
      component: 'QMarkdown',
      span: 1,
      // component props:
      noContainer: true,
      noLineNumbers: true,
      src: "```js\n{component: 'QBtnToggle'}\n```",
    },
    {
      id: 'stamina',
      span: 3,
      component: 'QSlider',
      label: 'Stamina',
      default: 50,
      // component props:
      min: 0,
      max: 100,
      labelAlways: true,
    },
    {
      id: 'md-slider',
      component: 'QMarkdown',
      span: 1,
      // component props:
      noContainer: true,
      noLineNumbers: true,
      src: "```js\n{component: 'QSlider'}\n```",
    },
    {
      id: 'power',
      span: 3,
      component: 'QInput',
      label: 'Power',
      subLabel: 'Fill in a number.',
      parseInput: Number,
      // component props:
      type: 'number',
      suffix: 'PW',
    },
    {
      id: 'md-input-nr',
      component: 'QMarkdown',
      span: 1,
      // component props:
      noContainer: true,
      noLineNumbers: true,
      src:
        "```js\n{component: 'QInput'}\n```\n↳ But the input is saved as a number instead of a string.",
    },
    {
      id: 'roleModel',
      span: 3,
      component: 'QSelect',
      label: 'Role model',
      subLabel: 'Who do you look up to?',
      // component props:
      options: [
        { label: 'Steve Rogers/Captain America', value: 'captain-america' },
        { label: 'Tony Stark/Iron Man', value: 'iron-man' },
        { label: 'Thor Odinson', value: 'thor-odinson' },
        { label: 'Bruce Banner/The Incredible Hulk', value: 'the-incredible-hulk' },
        { label: 'Natasha Romanoff/Black Widow', value: 'black-widow' },
        { label: 'Clint Barton/Hawkeye', value: 'hawkeye' },
        { label: 'Pietro Maximoff/Quicksilver', value: 'quicksilver' },
        { label: 'Wanda Maximoff/Scarlet Witch', value: 'scarlet-witch' },
        { label: 'The Vision', value: 'the-vision' },
        { label: 'James Rhodes/War Machine (Iron Patriot)', value: 'war-machine' },
        { label: 'Sam Wilson/Falcon', value: 'falcon' },
        { label: 'Bucky Barnes/The Winter Soldier (White Wolf)', value: 'the-winter-soldier' },
        { label: "T'Challa/Black Panther", value: 'black-panther' },
        { label: 'Stephen Strange/Doctor Strange', value: 'doctor-strange' },
        { label: 'Peter Parker/Spider-Man', value: 'spider-man' },
        { label: 'Scott Lang/Ant-Man (Giant-Man)', value: 'ant-man' },
        { label: 'Hope van Dyne/Wasp', value: 'wasp' },
        { label: 'Carol Danvers/Captain Marvel', value: 'captain-marvel' },
        { label: 'Peter Quill/Star-Lord', value: 'star-lord' },
        { label: 'Gamora', value: 'gamora' },
        { label: 'Drax the Destroyer', value: 'drax-the-destroyer' },
        { label: 'Rocket (Raccoon)', value: 'rocket-raccoon' },
        { label: '(Baby, Teenage) Groot', value: 'groot' },
        { label: 'Mantis', value: 'mantis' },
        { label: 'Matthew Murdock/Daredevil', value: 'daredevil' },
        { label: 'Jessica Jones (Jewel)', value: 'jessica-jones' },
        { label: 'Carl Lucas/Luke Cage (Power Man)', value: 'luke-cage' },
        { label: 'Danny Rand/Iron Fist', value: 'iron-fist' },
        { label: 'Frank Castle/The Punisher', value: 'the-punisher' },
      ],
    },
    {
      id: 'md-select',
      component: 'QMarkdown',
      span: 1,
      // component props:
      noContainer: true,
      noLineNumbers: true,
      src: "```js\n{component: 'QSelect'}\n```",
    },
    {
      id: 'checkboxes',
      span: 3,
      component: 'QOptionGroup',
      label: 'Check some boxes',
      default: () => [], // 'QOptionGroup' might not work without a default array
      // component props:
      type: 'checkbox',
      options: [
        {
          label: 'Option 1',
          value: 'op1',
        },
        {
          label: 'Option 2',
          value: 'op2',
        },
        {
          label: 'Option 3',
          value: 'op3',
        },
      ],
    },
    {
      id: 'md-option-group',
      component: 'QMarkdown',
      span: 1,
      // component props:
      noContainer: true,
      noLineNumbers: true,
      src: "```js\n{component: 'QOptionGroup'}\n```",
    },
    {
      id: 'consent',
      component: 'QToggle',
      span: 3,
      label: 'Do you agree with our terms?',
      default: false,
    },
    {
      id: 'md-toggle',
      component: 'QMarkdown',
      span: 1,
      // component props:
      noContainer: true,
      noLineNumbers: true,
      src: "```js\n{component: 'QToggle'}\n```",
    },
    {
      id: 'submissionDate',
      span: 3,
      component: 'QInput',
      label: 'Date of submission',
      parseInput: val => new Date(val),
      valueType: 'date', // see `EfDiv` documentation for more info on `valueType`
      dateFormat: 'YYYY/MM/DD', // see `EfDiv` documentation for more info on `dateFormat`
      // component props:
      mask: '####/##/##',
      placeholder: 'YYYY/MM/DD',
    },
    {
      id: 'md-input-date',
      component: 'QMarkdown',
      span: 1,
      // component props:
      noContainer: true,
      noLineNumbers: true,
      src:
        "```js\n{component: 'QInput'}\n```\n↳ But the input is saved as a date instead of a string.",
    },
  ],
}
