# Breaking changes

### title

Where previously 'title' fields spanned by default, they do not.

**why:**
It's better to be explicited about how components are rendered. Magical optimizations should be kept to a minimum.

**how to update code:**
Add `span: true` to span title fields full width.

### actionButtons

Action buttons now default to an empty string.

**why:**
It's better to be explicited about the components that should be rendered. It's easier to understand that there will be buttons shown at the top of an EasyForm if you see that they are actually passed.

It's good that there are buttons pre-made for us, but it's better that these are explicitly added.

**how to update code:**
Anywhere you have not defined action buttons you can pass the previous default ones if you like: `['archive', 'cancel', 'edit', 'save']`

### fieldType

EasyForms now uses `component` instead of `fieldType`.
The "component" field can be passed any component name (string) which is globally registered, OR you can pass a component options object directly.

It's very powerful because now you can have EasyForms use _any_ Quasar component by eg. `component: 'QBtn'`. You can also define all your own custom components and use those, as long as you register them globally via `Vue.component()`

**why:**
EasyForms used to provide a wrapper component for every single component that was usable. This becomes very unwieldly very fast. I refactored the code to be able to provide plain Quasar components.

I still export the original wrapper components I did via the field names with `Ef` in front. Eg. `fieldType: 'input'` can now be used via `component: 'EfInput'`.

**how to update code:**

1. replace `fieldType: 'input'` with `component: 'EfInput'`
2. repeat for all field types

### mode & formMode

EasyForm has a `mode` which can be 'view', 'edit', 'add' and 'raw'.
EasyField used to receive this prop as `formMode` but now receives it as just `mode`.

An individual field could have a different 'mode' by passing `readonly: true` or `rawValue: true`.
Now when you want to set the 'mode' of a single field, you should just set the mode the same as EasyForms: `mode: 'raw'`

**why:**
Unified syntax. A single prop called "mode" can be set globally at the EasyForm or locally at EasyField.

**how to update code:**

1. replace `formMode` (in evaluated props) with just `mode`
2. replace `rawValue: true` with `mode: 'raw'`
3. replace `readonly: true` with `mode: 'view'`

### disable

`disable` used to be ignored in the case `readonly` is true.
`disable` now is not modified as such any more.

**why**:
To avoid magic things happening without a strong reasoning. It will make working with EasyForms more predictable and thus easier to reason about.

**how to update code:**
If you have fields you set to `disable: true` but want it to be `false` when `readonly: true` you can do:

```js
// change
{
  disable: true,
}
// to
{
  disable: (val, {mode}) => mode !== 'view',
}
```

### evaluatedProps

An EasyField used to execute any prop which was a function to allow for these "Evaluated Props". Now you need to be explicit about which props you want to use as "Evaluated Props".

**why:**
Because now any component can a "field" (EasyForm doesn't use its own field wrappers). We cannot anticipate which props of these fields can accept functions.

**how to update code:**

The new prop called "evaluatedProps" defaults to an array with some prop names by default.
If your EasyForms only use Evaluated Props for the following props, you don't need to do anything:

- label
- subLabel
- required
- rules
- fieldStyle
- fieldClasses
- innerStyle
- innerClasses
- lang
- disable
- labelPosition
- externalLabels
- hasMarkdown

If you have other props in your schemas that were "Evaluated Props" you will have to manually pass an array with _all_ props that you use as evaluated props: `evaluatedProps: ['myProp', 'subLabel']` etc.

### innerClasses, innerStyle

Both `innerClasses` and `innerStyle` are renamed to `componentClasses` & `componentStyle` to make it clear that these are applied directly to the top level of the component which is passed.

###

### When using regular Quasar components instead of the wrappers.

**EfBtnToggle 　 → 　 QBtnToggle**

```js
// change
{
  fieldValue: 'btnToggle',
}
// to
{
  component: 'QBtnToggle',
  spread: true,
}
```
