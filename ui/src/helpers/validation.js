import flattenPerSchema from './flattenPerSchema'
import { isArray } from 'is-what'
import defaultLang from '../meta/lang'

/**
 * Validates a field data based on its blueprint
 *
 * @export
 * @param {*} payload
 * @param {Blueprint} { rules = [], required }
 * @param {StringObject} lang
 * @returns {ValidationResultField}
 */
export function validateFieldPerSchema (payload, { rules = [], required }, lang = defaultLang) {
  const requiredRule = val => !!val || lang.requiredField
  const testRules = !required ? rules : [requiredRule, ...rules]
  const results = testRules.reduce((carry, rule) => {
    carry.push(rule(payload))
    return carry
  }, [])
  const hasAnError = Object.values(results).some(result => result !== true)
  return !hasAnError || results
}

/**
 * Validates a form data based on its schema
 *
 * @export
 * @param {PlainObject} formData the form data in an object that looks like: `{[fieldId: string]: any}`
 * @param {Schema} schema
 * @param {StringObject} lang the lang object with at least the key `requiredField` used as error message for required fields
 * @returns {ValidationResultForm}
 */
export function validateFormPerSchema (formData, schema, lang) {
  const schemaObject = !isArray(schema)
    ? schema
    : schema.reduce((carry, blueprint) => {
        carry[blueprint.id] = blueprint
        return carry
      }, {})
  const formDataFlatEmpty = Object.keys(schemaObject)
    .reduce((carry, key) => ({ ...carry, [key]: null }), {}) // prettier-ignore
  const formDataFlatCurrent = flattenPerSchema(formData, schema)
  const formDataFlat = { ...formDataFlatEmpty, ...formDataFlatCurrent }
  const resultPerField = Object.entries(formDataFlat).reduce((carry, [fieldId, fieldValue]) => {
    const blueprint = schemaObject[fieldId]
    carry[fieldId] = !blueprint || validateFieldPerSchema(fieldValue, blueprint, lang)
    return carry
  }, {})
  return resultPerField
}
