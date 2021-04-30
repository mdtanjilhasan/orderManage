import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Login from '../views/Login.vue'
import Dashboard from '../views/admin/Dashboard'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true,
            onlyAdmin: true
        }
    },
    {
        path: '/products',
        name: 'Products',
        component: () => import('@/views/admin/Products'),
        meta: {
            requiresAuth: true,
            onlyAdmin: true
        }
    },
    {
        path: '/product/create',
        name: 'ProductCreate',
        component: () => import('@/views/admin/product/Create'),
        meta: {
            requiresAuth: true,
            onlyAdmin: true
        }
    },
    {
        path: "/product/:id",
        name: "ProductDetails",
        component: () => import("@/views/admin/product/Details"),
        meta: {
            requiresAuth: true,
            onlyAdmin: true
        }
    },
    {
        path: "/product/edit/:id",
        name: "ProductEdit",
        component: () => import("@/views/admin/product/Update"),
        meta: {
            requiresAuth: true,
            onlyAdmin: true
        }
    },
    {
        path: "/home",
        name: "Home",
        component: () => import("@/views/Home"),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/access/denied",
        component: () => import('@/components/AccessDenied')
    },
    {
        path: "/page-not-found",
        component: () => import('@/components/PageNotFound')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
// auth check
router.beforeEach((to, from, next) => {
    if (!to.matched.length) {
        next('/page-not-found');
    }

    if(to.matched.some(record => record.meta.requiresAuth) && to.matched.some(record => record.meta.onlyAdmin)) {
        if (store.getters['authentication/isLoggedIn'] && store.getters['authentication/isAdmin']) {
            next()
            return
        }
        next('/')
    } else {
        if (store.getters['authentication/isLoggedIn']) {
            if (to.name === 'Login') {
                router.back()
                return
            }
        }
        next()
    }
})

export default router
