import InfoCard from '../components/InfoCard'
import SourceTab from '../components/SourceTab'
import PropTabsPanel from '../components/PropTabsPanel'

export default ({ Vue }) => {
  Vue.component(InfoCard.name, InfoCard)
  Vue.component(SourceTab.name, SourceTab)
  Vue.component(PropTabsPanel.name, PropTabsPanel)
}
