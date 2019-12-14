const description = `An \`<EasyForm />\` can use a nested data structure on a flat form schema. When you have a nested data structure you will need to appoint each field ID with dot notation.

Eg. a field with ID \`size.width\` points to \`{size: {width}}\` in your data.

Besides writing your field IDs with dot notation, nothing further needs to be done.`

export const exampleForms = [
  {
    actionButtons: [],
    mode: 'edit',
    columnCount: 3,
    schema: [
      {
        id: 'size.width',
        label: 'Width',
        fieldType: 'input',
        valueType: 'number',
        suffix: 'cm'
      },
      {
        id: 'size.depth',
        label: 'Depth',
        fieldType: 'input',
        valueType: 'number',
        suffix: 'cm'
      },
      {
        id: 'size.height',
        label: 'Height',
        fieldType: 'input',
        valueType: 'number',
        suffix: 'cm'
      }
    ]
  }
]

export const pageForm = {
  mode: 'edit',
  actionButtons: [],
  schema: [
    {
      fieldType: 'markdown',
      src: description
    }
  ]
}

export default {
  exampleForms,
  pageForm
}
