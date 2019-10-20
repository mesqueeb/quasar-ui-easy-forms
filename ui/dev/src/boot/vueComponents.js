import InfoCard from '../components/InfoCard'
import TabsPanelSource from '../components/TabsPanelSource'
import TabsPanelProps from '../components/TabsPanelProps'
import TabsPanelCss from '../components/TabsPanelCss'
import InfoBoxWrapper from '../components/InfoBoxWrapper'

export default ({ Vue }) => {
  Vue.component(InfoCard.name, InfoCard)
  Vue.component(TabsPanelSource.name, TabsPanelSource)
  Vue.component(TabsPanelProps.name, TabsPanelProps)
  Vue.component(TabsPanelCss.name, TabsPanelCss)
  Vue.component(InfoBoxWrapper.name, InfoBoxWrapper)
}
