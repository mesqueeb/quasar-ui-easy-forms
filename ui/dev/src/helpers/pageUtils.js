
import { camelCase } from 'case-anything'

export function copyToClipboard (text) {
  const camelText = camelCase(text)
  var textArea = document.createElement('textarea')
  textArea.className = 'fixed-top'
  textArea.value = camelText
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  document.execCommand('copy')
  document.body.removeChild(textArea)
}

export function copyHeading (id) {
  const text = window.location.origin + window.location.pathname + '#' + id

  copyToClipboard(text)

  this.$q.notify({
    message: 'Anchor has been copied to clipboard.',
    color: 'white',
    textColor: 'primary',
    position: 'top',
    actions: [ { icon: 'close', color: 'primary' } ],
    timeout: 2000
  })
}
