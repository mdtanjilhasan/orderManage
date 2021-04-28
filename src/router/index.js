import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
// import Home from '../views/Home.vue'
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
