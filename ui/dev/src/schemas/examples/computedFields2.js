export default {
  columnCount: 3,
  schema: [
    {
      id: 'firstName',
      component: 'QInput',
      label: 'First name',
      events: {
        input: (val, { formData, fieldInput }) => {
          const { lastName = '' } = formData
          const value = `${val} ${lastName}`.trim()
          fieldInput({ id: 'fullName', value })
        },
      },
    },
    {
      component: 'QInput',
      label: 'Last name',
      id: 'lastName',
      events: {
        input: (val, { formData, fieldInput }) => {
          const { firstName = '' } = formData
          const value = `${firstName} ${val}`.trim()
          fieldInput({ id: 'fullName', value })
        },
      },
    },
    {
      id: 'fullName',
      component: 'QInput',
      label: 'Full name (computed)',
      disable: true,
    },
  ],
}
