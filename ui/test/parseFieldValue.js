/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import test from 'ava'
import parseFieldValue from '../src/helpers/parseFieldValue.js'

const parseObject = (target, schema) => {
  return Object.entries(target).reduce((carry, [key, value]) => {
    const blueprint = schema.find(bp => bp.id === key) || {}
    carry[key] = parseFieldValue(value, blueprint)
    return carry
  }, {})
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

test('nested props depth limitation', t => {
  let res, target, schema
  target = { sizes: { d: 1, h: 2 }, weights: { water: { iDontKnowPhysics: true } } }
  schema = [{
    id: 'sizes.d',
    suffix: 'm'
  }, {
    id: 'sizes.h',
    suffix: 'm'
  }, {
    id: 'weights.water',
    format (value) { return value.iDontKnowPhysics ? 'correct!' : 'incorrect!' }
  }]
  res = parseObject(target, schema)
  t.deepEqual(res, { sizes: { d: '1m', h: '2m' }, weights: { water: { iDontKnowPhysics: true } } })
  res = parseObject(target, schema, 1)
  t.deepEqual(res, { sizes: { d: '1m', h: '2m' }, weights: { water: 'correct!' } })
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

test('format, options, suffix & prefix', t => {
  let res, target, schema
  target = { chargeCycle: 2 }
  schema = [{
    id: 'chargeCycle',
    options: [
      { label: '1回', value: 1 },
      { label: '2回', value: 2 }
    ],
    format: v => v.replace('回', '海'),
    prefix: 'a',
    suffix: 'z',
  }]
  res = parseObject(target, schema)
  t.deepEqual(res, { chargeCycle: 'a2海z' })
})
