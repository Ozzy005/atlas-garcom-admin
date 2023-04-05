
const routes = [
  {
    path: '',
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
    path: '',
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
        component: () => import('src/pages/auth/change-password/EditPage.vue')
      },
      {
        path: 'tenants',
        name: 'tenants',
        component: () => import('src/layouts/crud/MainLayout.vue'),
        children: [
          {
            path: '',
            name: 'tenants-list',
            component: () => import('src/pages/auth/tenants/ListPage.vue')
          },
          {
            path: 'create',
            name: 'tenants-create',
            component: () => import('src/pages/auth/tenants/CreatePage.vue')
          },
          {
            path: ':id',
            name: 'tenants-view',
            component: () => import('src/pages/auth/tenants/ViewPage.vue')
          },
          {
            path: ':id/edit',
            name: 'tenants-edit',
            component: () => import('src/pages/auth/tenants/EditPage.vue')
          }
        ]
      },
      {
        path: 'signatures',
        name: 'signatures',
        component: () => import('src/layouts/crud/MainLayout.vue'),
        children: [
          {
            path: '',
            name: 'signatures-list',
            component: () => import('src/pages/auth/signatures/ListPage.vue')
          },
          {
            path: 'create',
            name: 'signatures-create',
            component: () => import('src/pages/auth/signatures/CreatePage.vue')
          },
          {
            path: ':id',
            name: 'signatures-view',
            component: () => import('src/pages/auth/signatures/ViewPage.vue')
          },
          {
            path: ':id/edit',
            name: 'signatures-edit',
            component: () => import('src/pages/auth/signatures/EditPage.vue')
          }
        ]
      },
      {
        path: 'complements',
        name: 'complements',
        component: () => import('src/layouts/crud/MainLayout.vue'),
        children: [
          {
            path: '',
            name: 'complements-list',
            component: () => import('src/pages/auth/complements/ListPage.vue')
          },
          {
            path: 'create',
            name: 'complements-create',
            component: () => import('src/pages/auth/complements/CreatePage.vue')
          },
          {
            path: ':id',
            name: 'complements-view',
            component: () => import('src/pages/auth/complements/ViewPage.vue')
          },
          {
            path: ':id/edit',
            name: 'complements-edit',
            component: () => import('src/pages/auth/complements/EditPage.vue')
          }
        ]
      },
      {
        path: 'due-days',
        name: 'due-days',
        component: () => import('src/layouts/crud/MainLayout.vue'),
        children: [
          {
            path: '',
            name: 'due-days-list',
            component: () => import('src/pages/auth/due-days/ListPage.vue')
          },
          {
            path: 'create',
            name: 'due-days-create',
            component: () => import('src/pages/auth/due-days/CreatePage.vue')
          },
          {
            path: ':id',
            name: 'due-days-view',
            component: () => import('src/pages/auth/due-days/ViewPage.vue')
          },
          {
            path: ':id/edit',
            name: 'due-days-edit',
            component: () => import('src/pages/auth/due-days/EditPage.vue')
          }
        ]
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('src/layouts/crud/MainLayout.vue'),
        children: [
          {
            path: '',
            name: 'categories-list',
            component: () => import('src/pages/auth/categories/ListPage.vue')
          },
          {
            path: 'create',
            name: 'categories-create',
            component: () => import('src/pages/auth/categories/CreatePage.vue')
          },
          {
            path: ':id',
            name: 'categories-view',
            component: () => import('src/pages/auth/categories/ViewPage.vue')
          },
          {
            path: ':id/edit',
            name: 'categories-edit',
            component: () => import('src/pages/auth/categories/EditPage.vue')
          }
        ]
      },
      {
        path: 'payment-methods',
        name: 'payment-methods',
        component: () => import('src/layouts/crud/MainLayout.vue'),
        children: [
          {
            path: '',
            name: 'payment-methods-list',
            component: () => import('src/pages/auth/payment-methods/ListPage.vue')
          },
          {
            path: 'create',
            name: 'payment-methods-create',
            component: () => import('src/pages/auth/payment-methods/CreatePage.vue')
          },
          {
            path: ':id',
            name: 'payment-methods-view',
            component: () => import('src/pages/auth/payment-methods/ViewPage.vue')
          },
          {
            path: ':id/edit',
            name: 'payment-methods-edit',
            component: () => import('src/pages/auth/payment-methods/EditPage.vue')
          }
        ]
      },
      {
        path: 'measurement-units',
        name: 'measurement-units',
        component: () => import('src/layouts/crud/MainLayout.vue'),
        children: [
          {
            path: '',
            name: 'measurement-units-list',
            component: () => import('src/pages/auth/measurement-units/ListPage.vue')
          },
          {
            path: 'create',
            name: 'measurement-units-create',
            component: () => import('src/pages/auth/measurement-units/CreatePage.vue')
          },
          {
            path: ':id',
            name: 'measurement-units-view',
            component: () => import('src/pages/auth/measurement-units/ViewPage.vue')
          },
          {
            path: ':id/edit',
            name: 'measurement-units-edit',
            component: () => import('src/pages/auth/measurement-units/EditPage.vue')
          }
        ]
      },
      {
        path: 'ncms',
        name: 'ncms',
        component: () => import('src/layouts/crud/MainLayout.vue'),
        children: [
          {
            path: '',
            name: 'ncms-list',
            component: () => import('src/pages/auth/ncms/ListPage.vue')
          },
          {
            path: ':id',
            name: 'ncms-view',
            component: () => import('src/pages/auth/ncms/ViewPage.vue')
          }
        ]
      },
      {
        path: 'states',
        name: 'states',
        component: () => import('src/layouts/crud/MainLayout.vue'),
        children: [
          {
            path: '',
            name: 'states-list',
            component: () => import('src/pages/auth/states/ListPage.vue')
          },
          {
            path: ':id',
            name: 'states-view',
            component: () => import('src/pages/auth/states/ViewPage.vue')
          }
        ]
      },
      {
        path: 'cities',
        name: 'cities',
        component: () => import('src/layouts/crud/MainLayout.vue'),
        children: [
          {
            path: '',
            name: 'cities-list',
            component: () => import('src/pages/auth/cities/ListPage.vue')
          },
          {
            path: ':id',
            name: 'cities-view',
            component: () => import('src/pages/auth/cities/ViewPage.vue')
          }
        ]
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('src/layouts/crud/MainLayout.vue'),
        children: [
          {
            path: '',
            name: 'users-list',
            component: () => import('src/pages/auth/users/ListPage.vue')
          },
          {
            path: 'create',
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
          }
        ]
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('src/layouts/crud/MainLayout.vue'),
        children: [
          {
            path: '',
            name: 'roles-list',
            component: () => import('src/pages/auth/roles/ListPage.vue')
          },
          {
            path: 'create',
            name: 'roles-create',
            component: () => import('src/pages/auth/roles/CreatePage.vue')
          },
          {
            path: ':id',
            name: 'roles-view',
            component: () => import('src/pages/auth/roles/ViewPage.vue')
          },
          {
            path: ':id/edit',
            name: 'roles-edit',
            component: () => import('src/pages/auth/roles/EditPage.vue')
          }
        ]
      },
      {
        path: 'permissions',
        name: 'permissions',
        component: () => import('src/layouts/crud/MainLayout.vue'),
        children: [
          {
            path: '',
            name: 'permissions-list',
            component: () => import('src/pages/auth/permissions/ListPage.vue')
          },
          {
            path: ':id',
            name: 'permissions-view',
            component: () => import('src/pages/auth/permissions/ViewPage.vue')
          },
          {
            path: ':id/edit',
            name: 'permissions-edit',
            component: () => import('src/pages/auth/permissions/EditPage.vue')
          }
        ]
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
