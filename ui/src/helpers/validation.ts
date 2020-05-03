import flattenPerSchema from './flattenPerSchema'
import { isArray, isFunction } from 'is-what'
import defaultLang from '../meta/lang'
import { PlainObject, Blueprint, Schema, StringObject, ContextEasyForm } from '../types'

export function createRequiredRule (requiredFieldErrorMsg: string) {
  return (val: any) => val === 0 || !!val || requiredFieldErrorMsg
}

export type ValidationResultField = boolean | (string | boolean)[]
export type ValidationResultForm = { [fieldId: string]: ValidationResultField }

/**
 * Validates a field data based on its blueprint
 *
 * @export
 * @param {*} payload
 * @param {Blueprint} { rules = [], required }
 * @param {ContextEasyForm} context The Vue EasyForm context
 * @returns {ValidationResultField}
 */
export function validateFieldPerSchema (
  payload: any,
  { rules = [], required }: Blueprint,
  context: ContextEasyForm
): ValidationResultField {
  const lang = context.lang || defaultLang
  const rulesEvaluated = !isFunction(rules) ? rules : rules(payload, context)
  const requiredEvaluated = !isFunction(required) ? required : required(payload, context)
  const requiredRule = createRequiredRule(lang.requiredField)
  const rulesToTest = !requiredEvaluated ? rulesEvaluated : [requiredRule, ...rulesEvaluated]
  const results = rulesToTest.reduce((carry, rule) => {
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
export function validateFormPerSchema (
  formData: PlainObject,
  schema: Schema,
  lang: StringObject
): ValidationResultForm {
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
    const context = { formData, formDataFlat, lang }
    carry[fieldId] = !blueprint || validateFieldPerSchema(fieldValue, blueprint, context)
    return carry
  }, {})
  return resultPerField
}
