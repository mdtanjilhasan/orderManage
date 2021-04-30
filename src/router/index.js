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
            requiresAuth: true
        }
    },
    {
        path: '/products',
        name: 'Products',
        component: () => import('@/views/admin/Products'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/product/create',
        name: 'ProductCreate',
        component: () => import('@/views/admin/product/Create'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/product/:id",
        name: "ProductDetails",
        component: () => import("@/views/admin/product/Details"),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/product/edit/:id",
        name: "ProductEdit",
        component: () => import("@/views/admin/product/Update"),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
// auth check
router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters['authentication/isLoggedIn']) {
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
