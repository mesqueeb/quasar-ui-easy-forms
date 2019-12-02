import InfoCard from '../components/InfoCard/index.vue'
import InfoBoxWrapper from '../components/InfoBoxWrapper'

export default ({ Vue }) => {
  Vue.component(InfoCard.name, InfoCard)
  Vue.component(InfoBoxWrapper.name, InfoBoxWrapper)
}
