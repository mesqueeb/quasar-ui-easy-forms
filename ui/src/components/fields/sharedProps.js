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
  desc: 'Display as "big" element.',
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
    validator: prop => types.includes(prop),
    desc: `valueType is the type of the model of the field. For this fieldType it can only be: ${types.join(' | ')}.${ extraDescription ? '\n\n' + extraDescription : '' }`,
    examples: types,
    values: types,
  })
}
