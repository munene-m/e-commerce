import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/Account.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/LoginComponent.vue')
    }
    ,
    {
      path: '/categories/',
      name: 'categories',
      component: () => import('../views/Categories.vue')
    },
    {
      path: "/categories/:category",
      name: 'category',
      component: () => import("../components/Category.vue"),
      props: true
    },
    {
      path: '/new-items',
      name: 'new-items',
      component: () => import('../views/NewItems.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/Cart.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue'),
      meta: {
        isAdmin: true
      }
    },
    {
      /* Wildcard path to catch other paths */
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: () => import('../views/NotFound.vue')
  }
  ]
})

const currentUser = () => {
  return new Promise(( resolve, reject ) => {
    const authStore = useAuthStore();
    const token = authStore.user;
    resolve(token);
    reject
  })
}

const isAdmin = () => {
  return new Promise(( resolve, reject ) => {
    const authStore = useAuthStore();
    const admin = authStore.admin;
    resolve(admin);
    reject
  })
}

router.beforeEach( async (to, from, next) => {
  if(to.matched.some((record) => record.meta.auth)) {
    if(await currentUser()) {
      next();
    } else {
      next("/login")
    }
  } else {
    next();
  }

})

router.beforeEach(async (to, from, next) => {
  if(to.matched.some((record) => record.meta.isAdmin)){
    if(await isAdmin()) {
      next()
    } else {
      next("/")
    }
  } else {
    next();
  }
})

export default router
