/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import test from 'ava'
import { flattenObject } from 'flatten-anything'
import nestify from 'nestify-anything'
import parseFieldValue from '../src/helpers/parseFieldValue.js'

const parseObject = (target, schema) => {
  const flat = flattenObject(target)
  const parsed = Object.entries(flat).reduce((carry, [key, value]) => {
    const blueprint = schema.find(bp => bp.id === key) || {}
    carry[key] = parseFieldValue(value, blueprint)
    return carry
  }, {})
  return nestify(parsed)
}

test('options', t => {
  let res, target, schema
  target = { chargeCycle: 2 }
  schema = [{
    id: 'chargeCycle',
    label: '充電サイクル',
    fieldType: 'buttons',
    valueType: 'number',
    options: [
      { label: '1回', value: 1 },
      { label: '2回', value: 2 }
    ]
  }]
  res = parseObject(target, schema)
  t.deepEqual(res, { chargeCycle: '2回' })
})

test('suffix', t => {
  let res, target, schema
  target = { batteryCapacity: 1 }
  schema = [{
    id: 'batteryCapacity',
    label: '定格容量',
    fieldType: 'input',
    valueType: 'number',
    suffix: 'kWh'
  }]
  res = parseObject(target, schema)
  t.deepEqual(res, { batteryCapacity: '1kWh' })
})

test('prefix', t => {
  let res, target, schema
  target = { price: 1 }
  schema = [{
    id: 'price',
    fieldType: 'input',
    valueType: 'number',
    prefix: '¥'
  }]
  res = parseObject(target, schema)
  t.deepEqual(res, { price: '¥1' })
})

test('nested props', t => {
  let res, target, schema
  target = { sizes: { d: 1, h: 2 } }
  schema = [{
    id: 'sizes.d',
    suffix: 'm'
  }]
  res = parseObject(target, schema)
  t.deepEqual(res, { sizes: { d: '1m', h: 2 } })
})

test('options, suffix & prefix', t => {
  let res, target, schema
  target = { chargeCycle: 2 }
  schema = [{
    id: 'chargeCycle',
    options: [
      { label: '1回', value: 1 },
      { label: '2回', value: 2 }
    ],
    prefix: 'a',
    suffix: 'z',
  }]
  res = parseObject(target, schema)
  t.deepEqual(res, { chargeCycle: 'a2回z' })
})
