import { createRouter, createWebHistory } from 'vue-router'

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
      path: "/product/:id",
      name: 'product',
      component: () => import("../components/Item.vue"),
      props: true
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
      path: '/checkout',
      name: 'Checkout',
      component: () => import('../components/Checkout.vue')
    },
    {
      path: '/reset',
      name: 'ResetPassword',
      component: () => import('../views/ResetPassword.vue')
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
    const token = JSON.parse(localStorage.getItem("token"))
    resolve(token);
    reject
  })
}

const isAdmin = () => {
  return new Promise(( resolve, reject ) => {
    const admin = localStorage.getItem("admin")
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
