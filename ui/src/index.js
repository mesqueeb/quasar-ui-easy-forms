import { version } from '../package.json'

import EasyForm from './components/EasyForm'
import EasyField from './components/EasyField'

import EfBtn from './components/fields/EfBtn'
import EfBtnToggle from './components/fields/EfBtnToggle'
import EfForm from './components/fields/EfForm'
import EfImg from './components/fields/EfImg'
import EfInputDate from './components/fields/EfInputDate'
import EfInput from './components/fields/EfInput'
import EfLink from './components/fields/EfLink'
import EfPdf from './components/fields/EfPdf'
import EfRange from './components/fields/EfRange'
import EfSelect from './components/fields/EfSelect'
import EfSlider from './components/fields/EfSlider'
import EfToggle from './components/fields/EfToggle'
import EfUploaderFirebase from './components/fields/EfUploaderFirebase'
import EfVideo from './components/fields/EfVideo'

import dependencyMap from './meta/dependencyMap'

export {
  version,

  EasyForm,
  EasyField,

  EfBtn,
  EfBtnToggle,
  EfForm,
  EfImg,
  EfInput,
  EfInputDate,
  EfLink,
  EfPdf,
  EfRange,
  EfSelect,
  EfSlider,
  EfToggle,
  EfUploaderFirebase,
  EfVideo,

  dependencyMap,
}

export default {
  version,

  EasyForm,
  EasyField,

  EfBtn,
  EfBtnToggle,
  EfForm,
  EfImg,
  EfInput,
  EfInputDate,
  EfLink,
  EfPdf,
  EfRange,
  EfSelect,
  EfSlider,
  EfToggle,
  EfUploaderFirebase,
  EfVideo,

  dependencyMap,

  install (Vue) {
    Vue.component(EasyField.name, EasyField)
    Vue.component(EasyForm.name, EasyForm)

    Vue.component(EfBtn.name, EfBtn)
    Vue.component(EfBtnToggle.name, EfBtnToggle)
    Vue.component(EfForm.name, EfForm)
    Vue.component(EfImg.name, EfImg)
    Vue.component(EfInput.name, EfInput)
    Vue.component(EfInputDate.name, EfInputDate)
    Vue.component(EfLink.name, EfLink)
    Vue.component(EfPdf.name, EfPdf)
    Vue.component(EfRange.name, EfRange)
    Vue.component(EfSelect.name, EfSelect)
    Vue.component(EfSlider.name, EfSlider)
    Vue.component(EfToggle.name, EfToggle)
    Vue.component(EfUploaderFirebase.name, EfUploaderFirebase)
    Vue.component(EfVideo.name, EfVideo)
  }
}
