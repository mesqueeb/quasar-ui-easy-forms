import { validateFormPerSchema } from 'ui'
// You must write:
// import { validateFormPerSchema } from 'quasar-ui-easy-forms'

const data = {
  age: undefined,
  consent: undefined,
}

const schema = [
  {
    id: 'age',
    label: 'Age',
    fieldType: 'input',
    valueType: 'number',
    rules: [val => val >= 18 || 'You must be over 18'],
  },
  {
    id: 'consent',
    label: 'Do you agree with our terms?',
    fieldType: 'toggle',
    valueType: 'boolean',
    rules: [val => val || 'You must accept our terms'],
    required: true,
  },
]

export default {
  columnCount: 2,
  schema: [
    {
      fieldType: 'btn',
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
      fieldType: 'btn',
      btnLabel: 'set data',
      subLabel: 'Click this to set the correct data and then try "validate" again!',
      events: {
        click: e => {
          data.age = 18
          data.consent = true
        },
      },
    },
  ],
}
