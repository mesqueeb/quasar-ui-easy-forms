export default {
  id: 'btn',
  component: 'EfBtn',
  btnLabel: 'Touch me',
  events: {
    click: (val, context) => console.log('@CLICK\nval → ', val, '\ncontext → ', context),
  },
}
