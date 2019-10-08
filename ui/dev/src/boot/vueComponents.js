import InfoCard from '../components/InfoCard'
import SourceTab from '../components/SourceTab'
import PropTabsPanel from '../components/PropTabsPanel'
import InfoBoxWrapper from '../components/InfoBoxWrapper'

export default ({ Vue }) => {
  Vue.component(InfoCard.name, InfoCard)
  Vue.component(SourceTab.name, SourceTab)
  Vue.component(PropTabsPanel.name, PropTabsPanel)
  Vue.component(InfoBoxWrapper.name, InfoBoxWrapper)
}
