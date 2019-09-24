import { version } from '../package.json'

import EasyForm from './components/EasyForm'
import EasyField from './components/EasyField'

import EfBtn from './components/fields/EfBtn'
import EfButtons from './components/fields/EfButtons'
import EfDropdown from './components/fields/EfDropdown'
import EfImg from './components/fields/EfImg'
import EfInput from './components/fields/EfInput'
import EfInputDate from './components/fields/EfInputDate'
import EfPdf from './components/fields/EfPdf'
import EfRange from './components/fields/EfRange'
import EfSlider from './components/fields/EfSlider'
import EfToggle from './components/fields/EfToggle'
import EfUploaderFirebase from './components/fields/EfUploaderFirebase'
import EfVideo from './components/fields/EfVideo'

export {
  version,

  EasyForm,
  EasyField,
  EfBtn,
  EfButtons,
  EfDropdown,
  EfImg,
  EfInput,
  EfInputDate,
  EfPdf,
  EfRange,
  EfSlider,
  EfToggle,
  EfUploaderFirebase,
  EfVideo,

}

export default {
  version,

  EasyForm,
  EasyField,
  EfBtn,
  EfButtons,
  EfDropdown,
  EfImg,
  EfInput,
  EfInputDate,
  EfPdf,
  EfRange,
  EfSlider,
  EfToggle,
  EfUploaderFirebase,
  EfVideo,

  install (Vue) {
    Vue.component(EasyForm.name, EasyForm)
    Vue.component(EasyField.name, EasyField)
    Vue.component(EfBtn.name, EfBtn)
    Vue.component(EfButtons.name, EfButtons)
    Vue.component(EfDropdown.name, EfDropdown)
    Vue.component(EfImg.name, EfImg)
    Vue.component(EfInput.name, EfInput)
    Vue.component(EfInputDate.name, EfInputDate)
    Vue.component(EfPdf.name, EfPdf)
    Vue.component(EfRange.name, EfRange)
    Vue.component(EfSlider.name, EfSlider)
    Vue.component(EfToggle.name, EfToggle)
    Vue.component(EfUploaderFirebase.name, EfUploaderFirebase)
    Vue.component(EfVideo.name, EfVideo)

  }
}
