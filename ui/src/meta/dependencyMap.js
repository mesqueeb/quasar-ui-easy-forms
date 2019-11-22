import merge from 'merge-anything'
import {
  QBtn,
  QBtnToggle,
  QImg,
  QInput,
  QRange,
  QSelect,
  QSlider,
  QToggle,
  QUploader,
  QVideo,
} from './quasarPropsJson'

export const dependencyMap = {
  btn: {
    componentName: 'EfBtn',
    fieldType: 'btn',
    passedProps: { QBtn },
  },
  btnToggle: {
    componentName: 'EfBtnToggle',
    fieldType: 'btnToggle',
    passedProps: { QBtnToggle },
  },
  form: {
    componentName: 'EfForm',
    fieldType: 'form',
    passedProps: {  },
  },
  img: {
    componentName: 'EfImg',
    fieldType: 'img',
    passedProps: { QImg },
  },
  inputDate: {
    componentName: 'EfInputDate',
    fieldType: 'inputDate',
    passedProps: { QInput },
  },
  input: {
    componentName: 'EfInput',
    fieldType: 'input',
    passedProps: { QInput },
  },
  link: {
    componentName: 'EfLink',
    fieldType: 'link',
    passedProps: {  },
  },
  markdown: {
    componentName: 'EfMarkdown',
    fieldType: 'markdown',
    passedProps: {  },
  },
  pdf: {
    componentName: 'EfPdf',
    fieldType: 'pdf',
    passedProps: {  },
  },
  range: {
    componentName: 'EfRange',
    fieldType: 'range',
    passedProps: { QRange },
  },
  select: {
    componentName: 'EfSelect',
    fieldType: 'select',
    passedProps: { QSelect },
  },
  slider: {
    componentName: 'EfSlider',
    fieldType: 'slider',
    passedProps: { QSlider },
  },
  toggle: {
    componentName: 'EfToggle',
    fieldType: 'toggle',
    passedProps: { QToggle },
  },
  uploaderFirebase: {
    componentName: 'EfUploaderFirebase',
    fieldType: 'uploaderFirebase',
    passedProps: { QUploader },
  },
  video: {
    componentName: 'EfVideo',
    fieldType: 'video',
    passedProps: { QVideo },
  },
}

export function getPassedProps (fieldType) {
  const info = dependencyMap[fieldType] || {}
  const { passedProps } = info
  return merge(...Object.values(passedProps))
}

export default {...dependencyMap, getPassedProps}
