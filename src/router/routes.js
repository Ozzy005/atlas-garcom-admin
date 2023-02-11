
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/guest/MainLayout.vue'),
    children: [
      { path: '', name: 'login', component: () => import('src/pages/guest/LoginPage.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('src/layouts/auth/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('src/pages/auth/HomePage.vue') },
      { path: 'users', name: 'users', component: () => import('src/pages/auth/users/ListPage.vue') },
      { path: 'users/create', name: 'users-create', component: () => import('src/pages/auth/users/CreatePage.vue') },
      { path: 'users/:id', name: 'users-show', component: () => import('src/pages/auth/users/ShowPage.vue') },
      { path: 'users/:id/edit', name: 'users-edit', component: () => import('src/pages/auth/users/EditPage.vue') }
    ],
    meta: {
      auth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
