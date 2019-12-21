import { version } from '../package.json'

import EasyForm from './components/EasyForm.vue'
import EasyField from './components/EasyField.vue'

import EfBtn from './components/fields/EfBtn.vue'
import EfBtnToggle from './components/fields/EfBtnToggle.vue'
import EfDiv from './components/fields/EfDiv.vue'
import EfMiniForm from './components/fields/EfMiniForm.vue'
import EfImg from './components/fields/EfImg.vue'
import EfInputDate from './components/fields/EfInputDate.vue'
import EfInput from './components/fields/EfInput.vue'
import EfLink from './components/fields/EfLink.vue'
import EfMarkdown from './components/fields/EfMarkdown.vue'
import EfPdf from './components/fields/EfPdf.vue'
import EfRange from './components/fields/EfRange.vue'
import EfSelect from './components/fields/EfSelect.vue'
import EfSlider from './components/fields/EfSlider.vue'
import EfToggle from './components/fields/EfToggle.vue'
import EfUploaderFirebase from './components/fields/EfUploaderFirebase.vue'
import EfVideo from './components/fields/EfVideo.vue'

import dependencyMap from './meta/dependencyMap'
import { validateFormPerSchema } from './helpers/validation.js'

export {
  version,
  EasyForm,
  EasyField,
  EfBtn,
  EfBtnToggle,
  EfDiv,
  EfMiniForm,
  EfImg,
  EfInput,
  EfInputDate,
  EfLink,
  EfMarkdown,
  EfPdf,
  EfRange,
  EfSelect,
  EfSlider,
  EfToggle,
  EfUploaderFirebase,
  EfVideo,
  dependencyMap,
  validateFormPerSchema,
}

export default {
  version,

  EasyForm,
  EasyField,

  EfBtn,
  EfBtnToggle,
  EfDiv,
  EfMiniForm,
  EfImg,
  EfInput,
  EfInputDate,
  EfLink,
  EfMarkdown,
  EfPdf,
  EfRange,
  EfSelect,
  EfSlider,
  EfToggle,
  EfUploaderFirebase,
  EfVideo,

  dependencyMap,
  validateFormPerSchema,

  install (Vue) {
    Vue.component(EasyField.name, EasyField)
    Vue.component(EasyForm.name, EasyForm)

    Vue.component(EfBtn.name, EfBtn)
    Vue.component(EfBtnToggle.name, EfBtnToggle)
    Vue.component(EfDiv.name, EfDiv)
    Vue.component(EfMiniForm.name, EfMiniForm)
    Vue.component(EfImg.name, EfImg)
    Vue.component(EfInput.name, EfInput)
    Vue.component(EfInputDate.name, EfInputDate)
    Vue.component(EfLink.name, EfLink)
    Vue.component(EfMarkdown.name, EfMarkdown)
    Vue.component(EfPdf.name, EfPdf)
    Vue.component(EfRange.name, EfRange)
    Vue.component(EfSelect.name, EfSelect)
    Vue.component(EfSlider.name, EfSlider)
    Vue.component(EfToggle.name, EfToggle)
    Vue.component(EfUploaderFirebase.name, EfUploaderFirebase)
    Vue.component(EfVideo.name, EfVideo)
  },
}
