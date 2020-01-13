const description = `Computed fields are fields that can represent data which doesn't neccesarily exist in your data. They have a "caluculated value" based on the form data.

Do not confuse this concept with "Evaluated Props".
- Evaluated Props: a calculated prop of a field
- Computed Fields: a field with a calculated value

An example of a Computed Field could be a full name of a person which exists of \`\${formData.firstName} \${formData.lastName}\`

There are three ways we could create such a field:
`

export default {
  mode: 'edit',
  actionButtons: [],
  schema: [
    {
      component: 'QMarkdown', noContainer: true,
      noLineNumbers: true,
      src: description,
    },
    {
      id: 'chosenExample',
      component: 'QBtnToggle',
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
      component: 'QMarkdown', noContainer: true,
      showCondition: (value, { formData }) => formData.chosenExample === 0,
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
      component: 'QMarkdown', noContainer: true,
      showCondition: (value, { formData }) => formData.chosenExample === 1,
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
}
\`\`\`

This method has pro's and con's though:

- PRO: you don't need to include the Computed Field (\`fullName\`) on the form at all
- CON: this is quite verbose...
- CON: it cannot be used if you need a computed field _not_ based on other fields (eg. a timestamp returning \`new Date()\`)
- CON: you cannot use this method to add a new "caluculated field" at a later time, when your database already has some data

There is also a third way we can create a computed field (see the last tab).
`.trim(),
    },
    {
      component: 'QMarkdown', noContainer: true,
      showCondition: (value, { formData }) => formData.chosenExample === 2,
      noLineNumbers: true,
      src: `
### Combine \`parseInput\` & \`fieldInput\`

The third way to create a computed field is this:

\`\`\`js
{
  id: 'fullName',
  component: 'QInput', // or any other component
  parseValue: (val, {formData, fieldInput}) => {
    const value = \`\${formData.firstName || ''} \${formData.lastName || ''}\`.trim()
    if (val !== value) fieldInput({id: 'fullName', value})
    return value
  },
  // If you want to hide the computed field you can set:
  // showCondition: false
}
\`\`\`

Basically you write your logic inside the \`parseValue\` prop of your computed field, and also trigger a \`fieldInput\` action from within here.

However, as the more experienced developers will notice...
:::
This is the same as introducing a side-effect to a computed property! By design this is discouraged, so isn't this bad?
:::

I say "nay". The reason it is discouraged is because side-effects to computed properties that modify data are impossible to track. In a few months if you don't know why a certain value is being modified, you'll have a hard time finding eventually it was the side-effect from a computed property.

If we understand this reason, then in our case, it is perfectly valid to do so, because we are only modifying the data of the field we are describing right there. We are simply doing something equivalent to triggering a \`emit('input', val)\` on a component manually, nothing wrong with that.

However, keep in mind that also this method has its own pro's and con's:
- PRO: it can be used as stand-alone, without relying on other fields & without the need to render other fields
- PRO: because it just uses \`parseInput\` it's less verbose (opposed to listening to input events of other fields)
- PRO: the logic for this field is contained in its own options object
- PRO: even if your database already has data, a computed field like this can be added at a later date
- CON: you have to include this "Computed Field" in all forms the user can edit the related fields (and probably with \`showCondition: false\`)
`.trim(),
    },
  ],
}
