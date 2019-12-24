export default {
  columnCount: 3,
  schema: [
    {
      id: 'firstName',
      component: 'QInput',
      label: 'First name',
    },
    {
      id: 'lastName',
      component: 'QInput',
      label: 'Last name',
    },
    {
      id: 'fullName',
      component: 'QInput',
      label: 'Full name (calculated)',
      disable: true,
      parseValue: (val, { formData, fieldInput }) => {
        const value = `${formData.firstName || ''} ${formData.lastName || ''}`.trim()
        fieldInput({ id: 'fullName', value })
        return value
      },
    },
  ],
}
