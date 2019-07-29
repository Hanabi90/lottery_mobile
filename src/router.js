import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
Vue.use(Router)
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkExactActiveClass: 'is-active',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import(/* webpackChunkName: "login" */ './views/login.vue')
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (!sessionStorage.getItem('token')) {
        if (from.fullPath != '/login' && to.name != 'login') {
            router.push({ name: 'login' })
        }
    }
    next()
})

export default router
