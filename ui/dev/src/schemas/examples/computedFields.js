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
      label: 'Full name (computed)',
      disable: true,
      parseValue: (val, { formData }) =>
        `${formData.firstName || ''} ${formData.lastName || ''}`.trim(),
    },
  ],
}
