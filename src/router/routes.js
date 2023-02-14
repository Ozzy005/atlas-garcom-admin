
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/guest/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/guest/LoginPage.vue')
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('src/pages/guest/LoginPage.vue')
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('src/pages/guest/ForgotPassword.vue')
      },
      {
        path: 'password-reset/:token',
        name: 'password-reset',
        component: () => import('src/pages/guest/PasswordReset.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('src/layouts/auth/MainLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('src/pages/auth/DashboardPage.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('src/pages/auth/profile/EditPage.vue')
      },
      {
        path: 'change-password',
        name: 'change-password',
        component: () => import('src/pages/auth/password/EditPage.vue')
      },
      {
        path: 'states',
        name: 'states',
        component: () => import('src/pages/auth/states/ListPage.vue')
      },
      {
        path: 'states/:id',
        name: 'states-view',
        component: () => import('src/pages/auth/states/ViewPage.vue')
      },
      {
        path: 'cities',
        name: 'cities',
        component: () => import('src/pages/auth/cities/ListPage.vue')
      },
      {
        path: 'cities/:id',
        name: 'cities-view',
        component: () => import('src/pages/auth/cities/ViewPage.vue')
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('src/pages/auth/users/ListPage.vue')
      },
      {
        path: 'users/create',
        name: 'users-create',
        component: () => import('src/pages/auth/users/CreatePage.vue')
      },
      {
        path: 'users/:id',
        name: 'users-view',
        component: () => import('src/pages/auth/users/ViewPage.vue')
      },
      {
        path: 'users/:id/edit',
        name: 'users-edit',
        component: () => import('src/pages/auth/users/EditPage.vue')
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('src/pages/auth/roles/ListPage.vue')
      },
      {
        path: 'roles/create',
        name: 'roles-create',
        component: () => import('src/pages/auth/roles/CreatePage.vue')
      },
      {
        path: 'roles/:id',
        name: 'roles-view',
        component: () => import('src/pages/auth/roles/ViewPage.vue')
      },
      {
        path: 'roles/:id/edit',
        name: 'roles-edit',
        component: () => import('src/pages/auth/roles/EditPage.vue')
      },
      {
        path: 'permissions',
        name: 'permissions',
        component: () => import('src/pages/auth/permissions/ListPage.vue')
      },
      {
        path: 'permissions/:id',
        name: 'permissions-view',
        component: () => import('src/pages/auth/permissions/ViewPage.vue')
      },
      {
        path: 'permissions/:id/edit',
        name: 'permissions-edit',
        component: () => import('src/pages/auth/permissions/EditPage.vue')
      }
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
