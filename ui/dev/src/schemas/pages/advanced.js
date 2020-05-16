const description = `This is a more advanced example so you can see the full power of EasyForms. All fields you see here are just regular Quasar components.

You can use any Quasar component, but you need to be sure to register the components in \`quasar.conf.js\`.
\`\`\`js
{
  framework: {
    // you can use auto for components other than those you use in EasyForm
    all: 'auto',

    // you need to register components you use in EasyForm because Quasar can't auto detect them
    components: ['QInput'],
  }
}
\`\`\`

You can check the source code of the example to see what kind of properties are used in the schema to generate this advanced form. Something you can notice is that the form's v-model is updated with the default values specified in the form's schema.
`

export default {
  mode: 'edit',
  actionButtons: [],
  schema: [
    {
      component: 'QMarkdown',
      noLineNumbers: true,
      src: description,
    },
  ],
}
