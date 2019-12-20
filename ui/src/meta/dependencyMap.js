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
  EfBtn: {
    componentName: 'EfBtn',
    component: 'EfBtn',
    passedProps: { QBtn },
  },
  EfBtnToggle: {
    componentName: 'EfBtnToggle',
    component: 'EfBtnToggle',
    passedProps: { QBtnToggle },
  },
  EfDiv: {
    componentName: 'EfDiv',
    component: 'EfDiv',
    passedProps: {},
  },
  EfForm: {
    componentName: 'EfForm',
    component: 'EfForm',
    passedProps: {},
  },
  EfImg: {
    componentName: 'EfImg',
    component: 'EfImg',
    passedProps: { QImg },
  },
  EfInputDate: {
    componentName: 'EfInputDate',
    component: 'EfInputDate',
    passedProps: { QInput },
  },
  EfInput: {
    componentName: 'EfInput',
    component: 'EfInput',
    passedProps: { QInput },
  },
  EfLink: {
    componentName: 'EfLink',
    component: 'EfLink',
    passedProps: {},
  },
  EfMarkdown: {
    componentName: 'EfMarkdown',
    component: 'EfMarkdown',
    passedProps: {},
  },
  EfPdf: {
    componentName: 'EfPdf',
    component: 'EfPdf',
    passedProps: {},
  },
  EfRange: {
    componentName: 'EfRange',
    component: 'EfRange',
    passedProps: { QRange },
  },
  EfSelect: {
    componentName: 'EfSelect',
    component: 'EfSelect',
    passedProps: { QSelect },
  },
  EfSlider: {
    componentName: 'EfSlider',
    component: 'EfSlider',
    passedProps: { QSlider },
  },
  EfToggle: {
    componentName: 'EfToggle',
    component: 'EfToggle',
    passedProps: { QToggle },
  },
  EfUploaderFirebase: {
    componentName: 'EfUploaderFirebase',
    component: 'EfUploaderFirebase',
    passedProps: { QUploader },
  },
  EfVideo: {
    componentName: 'EfVideo',
    component: 'EfVideo',
    passedProps: { QVideo },
  },
}

export function getPassedProps (component) {
  const info = dependencyMap[component] || {}
  const { passedProps } = info
  return merge(...Object.values(passedProps))
}

export default { ...dependencyMap, getPassedProps }
