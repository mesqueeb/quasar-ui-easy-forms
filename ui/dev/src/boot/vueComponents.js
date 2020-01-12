import { InfoCard } from 'quasar-ui-component-info-card'
import InfoBoxWrapper from '../components/InfoBoxWrapper'
import PrimaryColorPicker from '../components/PrimaryColorPicker'

export default ({ Vue }) => {
  Vue.component('InfoCard', InfoCard)
  Vue.component(InfoBoxWrapper.name, InfoBoxWrapper)
  Vue.component(PrimaryColorPicker.name, PrimaryColorPicker)
}
