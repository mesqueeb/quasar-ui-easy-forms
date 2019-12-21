const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/EasyFieldDemo', component: () => import('pages/EasyFieldDemoOld.vue') },
      {
        path: '/EasyField/:component',
        component: () => import('pages/EasyFieldDemo.vue'),
        props: true,
      },
      { path: '/:schemaId', component: () => import('pages/EasyFormDemo.vue'), props: true },
    ],
  },
]

export default routes
