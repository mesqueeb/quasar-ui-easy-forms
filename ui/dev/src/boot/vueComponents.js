import { InfoCard } from 'quasar-ui-component-info-card'
import InfoBoxWrapper from '../components/InfoBoxWrapper'

export default ({ Vue }) => {
  Vue.component(InfoCard.name, InfoCard)
  Vue.component(InfoBoxWrapper.name, InfoBoxWrapper)
}
