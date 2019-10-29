import merge from 'merge-anything'
import { isArray } from 'is-what'

// prop categories:
//   behavior
//   content
//   general
//   model
//   state
//   style

export const big = {
  category: 'style',
  type: Boolean,
  desc: 'DO NOT USE! Will be deprecated soon!!',
}

export const componentStyle = {
  category: 'style',
  type: [Object, String, Array],
  desc: 'Style to be applied to the component (not including the label etc.). Uses `:style="componentStyle"`',
  examples: ['border: thin solid black'],
}

export const externalLabels = {
  category: 'style',
  type: Boolean,
  desc: `By default labels are external to allow similar label styling for any type of field.

When the fieldType is 'input' or 'select' and \`externalLabels: false\` it will use an internal label on 'input' fields and pass the subLabel as 'hint' underneath the input field.`,
  default: true,
}

export const valueDescImgPdf = `Accepts a single or multiple files as its \`value\`. The downloadURL (or "source" of the files) can be formatted as
- a \`String\`
- an object which looks like \`{downloadURL: String}\`
- an array of \`{downloadURL: String}\``

export function getGenericValueType(types = [], extraDescription = '') {
  if (!isArray(types)) types = [types]
  const defaultType = types.length === 1
    ? {default: types[0]}
    : {}
  return merge(defaultType, {
    category: 'model',
    type: String,
    desc: `valueType is the type of the model of the field. For this fieldType it can only be: ${types.join(' | ')}. If your actual underlying valueType is different, you must provide a 'format' function (see prop: 'format') to make sure your value becomes the correct valueType.${ extraDescription ? '\n\n' + extraDescription : '' }`,
    examples: types,
    values: types,
  })
}
