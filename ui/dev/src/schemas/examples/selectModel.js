const formatForMarkdown = code => `\`\`\`js
${JSON.stringify(code, null, 2)}
\`\`\``

const createExample = (config, i) => [
  Object.assign(
    {
      component: 'EfSelect',
      options: [
        { label: 'Self taught', value: 'self' },
        { label: 'By item', value: 'item' },
        { label: 'Mutation', value: 'mutation' },
      ],
      id: `example${i}`,
    },
    config
  ),
  {
    id: `example${i}-m`,
    component: 'EfMarkdown',
    src: (val, { formDataNested }) => formatForMarkdown(formDataNested[`example${i}`]),
  },
  {
    id: `example${i}-o`,
    component: 'EfMarkdown',
    fieldClass: 'text-break-all',
    src: formatForMarkdown(config),
  },
]

const exampleConfigs = [
  { component: 'EfTitle', span: true, label: 'Single select' },
  { valueType: 'object' },
  { valueType: 'string', emitValue: true },
  { valueType: 'string', emitValue: true, mapOptions: true },
  { component: 'EfTitle', span: true, label: 'Multiple select', subLabel: 'Recommended model' },
  { valueType: 'object', multiple: true },
  { component: 'EfTitle', span: true, subLabel: 'Other models' },
  { valueType: 'array', multiple: true },
  { valueType: 'array', multiple: true, emitValue: true },
  { valueType: 'array', multiple: true, emitValue: true, mapOptions: true },
  {
    component: 'EfTitle',
    span: true,
    label: 'Do not do this',
    subLabel: 'Select something and see why 😉',
  },
  { valueType: 'object', multiple: true, emitValue: true },
]

export default {
  actionButtons: [],
  mode: 'edit',
  columnCount: 3,
  schema: [
    {
      component: 'EfSpace',
      subLabel: 'Select some values for each select-field down below, and see what happens.',
    },
    {
      component: 'EfTitle',
      span: 1,
      label: 'Model:',
    },
    {
      component: 'EfTitle',
      span: 1,
      label: 'Options:',
    },
    ...exampleConfigs.reduce((carry, config, i) => {
      if (config.component === 'EfTitle') {
        carry.push(config)
        return carry
      }
      carry.push(...createExample(config, i))
      return carry
    }, []),
  ],
}
