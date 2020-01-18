import { InfoCard } from 'quasar-ui-component-info-card'
import InfoBoxWrapper from '../components/InfoBoxWrapper'
import PrimaryColorPicker from '../components/PrimaryColorPicker'
import QMarkdown from '@quasar/quasar-ui-qmarkdown/src/index.js'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'

export default ({ Vue }) => {
  Vue.component('InfoCard', InfoCard)
  Vue.component(InfoBoxWrapper.name, InfoBoxWrapper)
  Vue.component(PrimaryColorPicker.name, PrimaryColorPicker)
  Vue.use(QMarkdown)
}
