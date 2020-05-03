export type PlainObject = { [key: string]: any }
export type StringObject = { [key: string]: string }
export type Schema = Blueprint[] | { [key: string]: Blueprint }

export interface Blueprint {
  rules?: ((val: any) => boolean | string)[]
  required?: PropRequired
  [key: string]: any
}

/**
 * The Vue EasyForm context
 */
export interface ContextEasyForm {
  [key: string]: any
  lang?: StringObject
}

/**
 * @typedef EvaluatedProp
 * @type {(val: any, context: ContextEasyForm) => any}
 */
export type EvaluatedProp = (val: any, context: ContextEasyForm) => any

/**
 * @typedef PropRequired
 * @type {boolean | EvaluatedProp}
 */
export type PropRequired = boolean | EvaluatedProp
