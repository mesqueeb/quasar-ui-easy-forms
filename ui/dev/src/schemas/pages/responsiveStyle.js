const description = ``

export default {
  mode: 'edit',
  actionButtons: [],
  schema: [
    {
      component: 'QMarkdown',
      internalErrors: true,
      noContainer: true,
      noLineNumbers: true,
      src: description,
    },
  ],
}
