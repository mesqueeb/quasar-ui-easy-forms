
## All

```js
// FIELD LEVEL
fieldType: String
id: String // the field's id
label: [String, Function] // the field's label
  ()
subLabel: [String, Function] // a sub label shown below the label
  (formObject, formMode)
disable: [Boolean, Function]
  (formObject, formMode, store)

// FORM LEVEL
showCondition: [Boolean, Function]
  (formObject, formMode)
onInput: Function // triggered on every single input of this field
  (value, {
    docId,
    fieldInput,
    mode
  }, store)
```

### Input

```js
valueType: [String, Number]
prefix: String // prefix shown in the field before the value
suffix: String // prefix shown in the field after the value
format: Function // format the value shown via a function
  (value)
```

### Uploader

```js
path: [String, Function]
  (formObject, store)
```

### Slider

```js
min: Number
max: Number
step: Number
```

### Select

```js
type SelectOptionOb = {label: string, value: any}
type selectOptionFn = (store: any) => (SelectOptionOb|string)[]

options: ((SelectOptionOb|string)[]|selectOptionFn)
// ==
options: string[] // or
options: SelectOptionOb[] // or
options: selectOptionFn
```
