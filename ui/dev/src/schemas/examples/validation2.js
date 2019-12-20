import { validateFormPerSchema } from 'ui'
// You must write:
// import { validateFormPerSchema } from 'quasar-ui-easy-forms'

const data = {
  name: undefined,
  age: undefined,
  consent: undefined,
}

const schema = [
  {
    id: 'name',
    label: 'Name',
    component: 'QInput',
    required: true,
  },
  {
    id: 'age',
    label: 'Age',
    component: 'QInput',
    type: 'number',
    parseInput: Number,
    rules: [val => val >= 18 || 'You must be over 18'],
  },
  {
    id: 'consent',
    label: 'Do you agree with our terms?',
    component: 'QToggle',
    default: false,
    rules: [val => val || 'You must accept our terms'],
  },
]

export default {
  columnCount: 2,
  actionButtons: ['delete', 'archive', 'cancel', 'edit', 'save'],
  schema: [
    {
      component: 'EfBtn',
      btnLabel: 'validate',
      subLabel: 'Click this and check the developer tools > console.',
      events: {
        click: e => {
          const result = validateFormPerSchema(data, schema)
          console.log('result → ', result)
        },
      },
    },
    {
      component: 'EfBtn',
      btnLabel: 'set data',
      subLabel: 'Click this to set the correct data and then try "validate" again!',
      events: {
        click: e => {
          data.name = 'name'
          data.age = 18
          data.consent = true
        },
      },
    },
  ],
}
