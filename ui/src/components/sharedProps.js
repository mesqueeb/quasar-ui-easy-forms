// prop categories:
//   behavior
//   content
//   general
//   model
//   state
//   style

const propOf = `This prop can be set on an EasyField or on an EasyForm to make it global.`

// props both on EasyForm and EasyField
export const mode = {
  category: 'state',
  type: String,
  default: 'edit',
  validator: prop => ['edit', 'add', 'view', 'raw'].includes(prop),
  values: ['edit', 'add', 'view', 'raw'],
  examples: [`'edit'`, `'add'`, `'view'`, `'raw'`],
  desc: `The mode represents how fields are rendered
- "edit" or "add" means they can be interacted with
- "view" means they can't
- "raw" means the fields are not generated, just the raw value inside a div

${propOf}`,
}
export const labelPosition = {
  category: 'style',
  type: [String, Function],
  default: 'top',
  desc: `The position of the label in comparison to the field. ${propOf}`,
  values: ['top', 'left'],
  examples: ['top', 'left'],
}
export const externalLabels = {
  category: 'style',
  type: Boolean,
  desc: `By default labels are external to allow similar label styling for any type of field.

When \`externalLabels: false\` it will use the native labels from QField, QInput & QSelect. The subLabel will be passed as 'hint' underneath the field. ${propOf}`,
  default: true,
}
export const hasMarkdown = {
  category: 'state|content',
  type: [Boolean, Function],
  default: false,
  desc: `Allows a field to have markdown in its sub-labels. ${propOf}`,
}
export const evaluatedProps = {
  category: 'behavior',
  type: Array,
  default: () => [
    'label',
    'subLabel',
    'required',
    'rules',
    'fieldStyle',
    'fieldClasses',
    'innerStyle',
    'innerClasses',
    'lang',
    'disable',
    'labelPosition',
    'externalLabels',
    'hasMarkdown',
  ],
  desc: `An array with prop names that should be treated as "Evaluated Props". ${propOf}`,
}
