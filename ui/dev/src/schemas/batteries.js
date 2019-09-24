import {
  name,
  maker,
  itemCode,
  price,
  priceMin,
  cost,
  constructionPrice,
  constructionPriceMin,
  constructionCost,
  extraInfo,
  addItems,
  imgData,
  imgUpload,
  pdfData,
  pdfUpload,
  video,
  isGlobal,
} from './shared'

export default Object.freeze({
  isGlobal,
  name,
  maker,
  itemCode,
  price,
  priceMin,
  cost,
  constructionPrice,
  constructionPriceMin,
  constructionCost,
  extraInfo,
  addItems,
  imgData,
  imgUpload: imgUpload('batteries'),
  pdfData,
  pdfUpload: pdfUpload('batteries'),
  video,
  chargeCycle: {
    id: 'chargeCycle',
    label: '充電サイクル',
    fieldType: 'buttons',
    valueType: 'number',
    options: [
      {label: '1回', value: '1'},
      {label: '2回', value: '2'}
    ],
  },
  batteryCapacity: {
    id: 'batteryCapacity',
    label: '実効容量',
    fieldType: 'input',
    valueType: 'number',
    suffix: 'kWh',

  },
  powerFailureVoltage: {
    id: 'powerFailureVoltage',
    label: '定格電圧（停電時使用）',
    fieldType: 'buttons',
    valueType: 'string',
    options: [
      {label: '100Vのみ', value: '100'},
      {label: '100/200V', value: 'any'}
    ],
  },
  powerFailureUse: {
    id: 'powerFailureUse',
    label: '停電時の使用範囲',
    fieldType: 'buttons',
    valueType: 'string',
    options: [
      {label: '全負荷', value: 'all'},
      {label: '特定負荷', value: 'part'},
    ],
  },
  installLocation: {
    id: 'installLocation',
    label: '蓄電システムの設置場所',
    fieldType: 'buttons',
    valueType: 'string',
    options: [
      {label: '屋内', value: 'in'},
      {label: '屋外', value: 'out'},
      {label: 'どちらでも', value: 'any'}
    ],
  },
  batteryType: {
    id: 'batteryType',
    label: '売電種類',
    fieldType: 'buttons',
    valueType: 'number',
    options: [
      {
        label: 'シングル発電のみ対応',
        value: 'single'
      },
      {
        label: 'ダブル発電も対応',
        value: 'double'
      }
    ],
  },
  pcsType: {
    id: 'pcsType',
    label: '設置するパワコン',
    fieldType: 'buttons',
    valueType: 'string',
    options: [
      {label: 'ハイブリッド', value: 'hybrid'},
      {label: '単機能', value: 'single'},
    ],
  },
})
