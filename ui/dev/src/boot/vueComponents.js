import { InfoCard } from 'quasar-ui-component-info-card'
import InfoBoxWrapper from '../components/InfoBoxWrapper'
import PrimaryColorPicker from '../components/PrimaryColorPicker'
import Snarkdown from '../components/Snarkdown'

export default ({ Vue }) => {
  Vue.component('InfoCard', InfoCard)
  Vue.component(InfoBoxWrapper.name, InfoBoxWrapper)
  Vue.component(PrimaryColorPicker.name, PrimaryColorPicker)
  Vue.component(Snarkdown.name, Snarkdown)
}
