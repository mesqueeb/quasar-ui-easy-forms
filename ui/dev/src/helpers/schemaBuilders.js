import { isArray, isUndefined } from 'is-what'
import copy from 'copy-anything'
import merge from 'merge-anything'
import EasyForms from 'ui'
import { slugify, kebabCase, capitalize, stringToJs } from './conversion'
const { dependencyMap } = EasyForms
const { getPassedProps } = dependencyMap

export function getRawComponent (selectedField) {
  return EasyForms[`Ef${capitalize(selectedField)}`] || {}
}

export function getAllComponentProps (selectedField) {
  const component = getRawComponent(selectedField) || {}
  const componentProps = component.props || {}
  const EasyField = EasyForms['EasyField'] || {}
  const EasyFieldProps = EasyField.props || {}
  const quasarComponentProps = getPassedProps(selectedField) || {}
  return copy(merge(
    quasarComponentProps,
    EasyFieldProps,
    componentProps,
  ))
}

export function createInfoCardSchemaFromProp (propKey, propInfo, selectedField) {
  const { desc, type, quasarProp, examples, default: _df, values, category } = propInfo
  // make the raw prop info from the components into an EasyForm:
  // whatever the prop is, default to an 'input' EasyField
  let fieldType = 'input'
  let options, outlined, standout, disable, parseInput, format, autogrow
  let contentStyle = 'padding: 1em;'
  // If it's a quasarProp, add a specific indentifier
  if (quasarProp) contentStyle += 'background: whitesmoke'
  // If the prop has no description, it's a quasarProp and it has a different default value, create a description here on the fly
  let subLabel = quasarProp && !isUndefined(_df) && isUndefined(desc)
    ? `Same as Quasar, but defaults to: ${_df}`
    : desc
  // if the prop is a Boolean, show this as a 'toggle' EasyField
  if (type === Boolean) fieldType = 'toggle'
  // if the prop has a fixed set of possible values, show this as an 'option' EasyField
  const propHasValues = isArray(values) && values.length
  if (propHasValues) {
    fieldType = 'select'
    options = values.map(v => ({label: v, value: v}))
  }
  // Create a special input for defining arrays and/or objects
  if (
    type === Array ||
    type === Object ||
    (isArray(type) && [Array, Object].some(t => type.includes(t)) && type.length === 2)
  ) {
    outlined = false
    standout = true
    parseInput = stringToJs
    format = JSON.stringify
    autogrow = true
    if (isArray(examples)) subLabel += `\nEg.\n${examples.join(', ')}`
  }
  // Don't allow editing props that accept functions.
  if (type === Function) disable = true
  // Create the EfField schema for the prop
  return {
    id: propKey,
    fieldType,
    valueType: type === Number ? 'number' : undefined,
    // schema,
    label: propKey,
    subLabel,
    placeholder: !isArray(examples) ? '' : examples.join(', '),
    quasarProp,
    options,
    outlined,
    standout,
    disable,
    parseInput,
    format,
    autogrow,
    category,
    contentStyle,
  }
}

export function getInfoCardSchema (selectedField) {
  const allComponentProps = getAllComponentProps(selectedField)
  return Object.entries(allComponentProps)
    .reduce((carry, [propKey, propInfo]) => {
      // fields to not include in the InfoCard settings:
      if (
        propKey === 'fieldType' ||
        (propKey === 'value' && !['link', 'btn'].includes(selectedField))
      ) {
        return carry
      }
      carry[propKey] = createInfoCardSchemaFromProp(propKey, propInfo, selectedField)
      return carry
    }, {})
}
