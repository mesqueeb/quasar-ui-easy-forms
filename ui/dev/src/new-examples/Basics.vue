<template>
  <EasyForm :schema="schema" />
</template>

<script>
const schema = [
  {
    id: 'name',
    component: 'QInput',
    label: 'Superhero name',
    subLabel: 'Think of something cool.',
  },
  {
    id: 'powerOrigin',
    component: 'QBtnToggle',
    label: 'Power origin',
    subLabel: 'Where does your power come from?',
    // component props:
    options: [
      { label: 'Mutation', value: 'mutation' },
      { label: 'Self taught', value: 'self' },
      { label: 'By item', value: 'item' },
    ],
    spread: true,
  },
]

/**
 * **EasyForm** is a component that allows you to easily create forms by passing an object with a schema on how you want the form to look. By merely passing a schema array you can easily generate entire forms! No more writing clunky HTML forms! 🎉
 *
 * ###### Schema
 *
 * The schema of an EasyForm is an array of objects that usually looks something like this:
 *
 * Eg.:
 * ```js
 * [
 *   // you can use custom Vue components
 *   { id: 'myField', label: 'My Field', component: 'MyFieldVueComponent' },
 *
 *   // you can use quasar components
 *   { id: 'name', label: 'Name', component: 'QInput' },
 * ]
 * ```
 *
 * Besides 'id', 'label' and 'component' there are many more props you can pass: subLabel; required; labelPosition; fieldClasses; componentClasses; parseValue; parseInput; events and many more.
 */
export default {
  data () {
    return { schema }
  },
}
</script>
