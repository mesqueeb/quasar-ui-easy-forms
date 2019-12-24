const description = `Computed fields are fields that don't neccesarily exist in your data, but are calculated based on the data.

Do not confuse this concept with "Evaluated Props" which is about specific props of a field, whereas "Computed Fields" are about the "value" of a field.

An example of a calculated field could be a full name of a person which exists of \`\${formData.firstName} \${formData.lastName}\`

There are three ways we could create such a field.
`

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
    {
      id: 'chosenExample',
      component: 'QBtnToggle',
      internalErrors: true,
      spread: true,
      noCaps: true,
      unelevated: true,
      options: [
        { label: 'The parseValue prop', value: 0 },
        { label: 'Update via fieldInput', value: 1 },
        { label: 'Combine parseInput & fieldInput', value: 2 },
      ],
    },
    {
      component: 'QMarkdown',
      showCondition: (value, { formData }) => formData.chosenExample === 0,
      internalErrors: true,
      noContainer: true,
      noLineNumbers: true,
      src: `
### The \`parseValue\` prop

\`\`\`js
{
  id: 'fullName',
  component: 'QInput', // or any other component
  parseValue: (val, {formData}) => \`\${formData.firstName || ''} \${formData.lastName || ''}\`
}
\`\`\`

So even though the field \`fullName\` has no \`value\` at all, it will always stay in sync with the current \`formData\`.

When implementing a computed field this way however, \`fullName\` will never have that computed value emitted. This means that it won't be included in the EasyForm events: \`@input\`, \`@field-input\` and \`@save\`. So it's difficult to capture and save this calculated value alongside your other data. See the next tab for another method.
`.trim(),
    },
    {
      component: 'QMarkdown',
      showCondition: (value, { formData }) => formData.chosenExample === 1,
      internalErrors: true,
      noContainer: true,
      noLineNumbers: true,
      src: `
### Update via \`fieldInput\`

It can be handy to also save the calculated value in your database so you can filter/search/sort on this field. (This is required when using eg. an [EasyTable](https://quasar-easy-tables.web.app) or QTable.)

In this case we can use the method called \`fieldInput()\` which is accessible on the context and first explained on the [events documentation page](/events).

\`\`\`js
{
  id: 'firstName',
  events: {
    input: (val, {formData, fieldInput}) => {
      const { lastName = '' } = formData
      const value = \`\${val} \${lastName}\`.trim()
      fieldInput({id: 'fullName', value})
    }
  },
},
{
  id: 'lastName',
  events: {
    input: (val, {formData, fieldInput}) => {
      const { firstName = '' } = formData
      const value = \`\${firstName} \${val}\`.trim()
      fieldInput({id: 'fullName', value})
    }
  },
},
{
  id: 'fullName',
}
\`\`\`

However, this is quite verbose... And it cannot be used if you need a computed field _not_ based on other fields, but eg. a timestamp returning \`new Date()\` or something.

Luckily there is a third way we can create a computed field (see the last tab).
`.trim(),
    },
    {
      component: 'QMarkdown',
      showCondition: (value, { formData }) => formData.chosenExample === 2,
      internalErrors: true,
      noLineNumbers: true,
      src: `
### Combine \`parseInput\` & \`fieldInput\`

The third way to create a computed field has the best of both worlds.
- It has the non-verbosity by using \`parseInput\` opposed to listening to input events of other fields
- It has the ability to also save this data back to your model

\`\`\`js
{
  id: 'fullName',
  component: 'QInput', // or any other component
  parseValue: (val, {formData, fieldInput}) => {
    const value = \`\${formData.firstName || ''} \${formData.lastName || ''}\`.trim()
    fieldInput({id: 'fullName', value})
    return value
  }
}
\`\`\`

Basically you write your logic inside the \`parseValue\` prop of your computed field, and also trigger a \`fieldInput\` action from within here.

However, as the more experienced developers will notice...
:::
This is the same as introducing a side-effect to a computed property! By design this is discouraged, so isn't this bad?
:::

I say "nay". The reason it is discouraged is because side-effects to computed properties that modify data are impossible to track. In a few months if you don't know why a certain value is being modified, you'll have a hard time finding eventually it was the side-effect from a computed property.

If we understand this reason, then in our case, it is perfectly valid to do so, because we are only modifying the data of the field we are describing right there. We are simply doing something equivalent to triggering a \`emit('input', val)\` on a component manually, nothing wrong with that.

::: warning
The only thing you need to be careful with is executing \`fieldInput\` to modify **other** fields, besides the one you are describing. Because this _would_ result in a situation where it will be difficult to track why a certain field was modified and from where.
:::`.trim(),
    },
  ],
}
