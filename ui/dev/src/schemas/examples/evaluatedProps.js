const colorFn = val =>
  val === 'red'
    ? 'like the sun'
    : val === 'blue'
    ? 'like the sky'
    : val === 'green'
    ? 'green is not a creative color'
    : val === 'other'
    ? 'oh, come on, just pick one'
    : 'pick a color!'
colorFn.prototype.stringifiedFn = `val => (val === 'red') ? 'like the sun' : (val === 'blue') ? 'like the sky' : (val === 'green') ? 'green is not a creative color' : (val === 'other') ? 'oh, come on, just pick one' : 'pick a color!'`

const parentalConsentFn = (val, { formDataNested }) => formDataNested.over18
parentalConsentFn.prototype.stringifiedFn = `(val, {formDataNested}) => formDataNested.over18`

const carTypeFn = (val, { formDataNested }) => formDataNested.car
carTypeFn.prototype.stringifiedFn = `(val, {formDataNested}) => formDataNested.car`

const carNrPlateFn = (val, { formDataNested, formMode }) =>
  formDataNested.car && formMode === 'edit'
carNrPlateFn.prototype.stringifiedFn = `(val, {formDataNested, formMode}) => formDataNested.car && formMode === 'edit'`

const carData = [
  {
    year: 2015,
    make: 'Audi',
    model: 'A3',
    trim: '2.0',
  },
  {
    year: 2015,
    make: 'Audi',
    model: 'A3',
    trim: '1.8',
  },
  {
    year: 2015,
    make: 'Audi',
    model: 'A6',
    trim: '2.5',
  },
  {
    year: 2015,
    make: 'Audi',
    model: 'A6',
    trim: '3.0',
  },
  {
    year: 2015,
    make: 'BMW',
    model: 'M3',
    trim: 'b2.0',
  },
  {
    year: 2015,
    make: 'BMW',
    model: 'M3',
    trim: 'b1.8',
  },
  {
    year: 2015,
    make: 'BMW',
    model: 'M5',
    trim: 'b2.5',
  },
  {
    year: 2015,
    make: 'BMW',
    model: 'M5',
    trim: 'b3.0',
  },
  {
    year: 2016,
    make: 'Chevy',
    model: 'Impala',
    trim: 'c2.0',
  },
  {
    year: 2016,
    make: 'Chevy',
    model: 'Impala',
    trim: 'c1.8',
  },
  {
    year: 2016,
    make: 'Chevy',
    model: 'Malibu',
    trim: 'c2.5',
  },
  {
    year: 2016,
    make: 'Chevy',
    model: 'Malibu',
    trim: 'c3.0',
  },
  {
    year: 2016,
    make: 'Dodge',
    model: 'RAM',
    trim: 'd2.0',
  },
  {
    year: 2016,
    make: 'Dodge',
    model: 'RAM',
    trim: 'd1.8',
  },
  {
    year: 2016,
    make: 'Dodge',
    model: 'Challanger',
    trim: 'd2.5',
  },
  {
    year: 2016,
    make: 'Dodge',
    model: 'Challanger',
    trim: 'd3.0',
  },
]

export default [
  {
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
        subLabel: colorFn,
      },
    ],
  },
  {
    mode: 'edit',
    actionButtons: [],
    columnCount: 2,
    schema: [
      {
        id: 'over18',
        fieldType: 'toggle',
        label: 'Are you over 18?',
      },
      {
        id: 'parentalConsent',
        fieldType: 'toggle',
        label: 'Do you have parental consent?',
        subLabel: 'This will be disabled when the first question is `true`.',
        disable: parentalConsentFn,
      },
    ],
  },
  {
    mode: 'edit',
    actionButtons: ['edit', 'save'],
    columnCount: 2,
    schema: [
      {
        id: 'car',
        fieldType: 'toggle',
        label: 'Do you have a car?',
      },
      {
        id: 'carType',
        fieldType: 'input',
        label: 'What is the brand?',
        subLabel: 'This is only shown when the first question is `true`.',
        showCondition: carTypeFn,
      },
      {
        id: 'carNrPlate',
        fieldType: 'input',
        label: 'Enter your license plate brand?',
        subLabel: "This is hidden when the form is set to 'view' mode. Try clicking 'save'.",
        showCondition: carNrPlateFn,
      },
    ],
  },
  {
    mode: 'edit',
    actionButtons: [],
    columnCount: 4,
    schema: [
      {
        id: 'year',
        label: 'Year',
        fieldType: 'select',
        emitValue: true,
        options: [...new Set(carData.map(d => d.year))].map(value => ({ value, label: value })),
      },
      {
        id: 'make',
        label: 'Make',
        fieldType: 'select',
        emitValue: true,
        options: (val, { formDataNested }) => {
          const { year } = formDataNested || {}
          return [...new Set(carData.filter(car => car.year === year).map(d => d.make))].map(
            value => ({ value, label: value })
          )
        },
      },
      {
        id: 'model',
        label: 'Model',
        fieldType: 'select',
        emitValue: true,
        options: (val, { formDataNested }) => {
          const { year, make } = formDataNested || {}
          return [
            ...new Set(
              carData.filter(car => car.year === year && car.make === make).map(d => d.model)
            ),
          ].map(value => ({ value, label: value }))
        },
      },
      {
        id: 'trim',
        label: 'Trim',
        fieldType: 'select',
        emitValue: true,
        options: (val, { formDataNested }) => {
          const { year, make, model } = formDataNested || {}
          return [
            ...new Set(
              carData
                .filter(car => car.year === year && car.make === make && car.model === model)
                .map(d => d.trim)
            ),
          ].map(value => ({ value, label: value }))
        },
      },
    ],
  },
]
