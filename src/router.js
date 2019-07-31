import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login.vue'
Vue.use(Router)
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkExactActiveClass: 'is-active',
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            name: 'home',
            component: () =>
                import(/* webpackChunkName: "home" */ './views/home.vue')
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (!sessionStorage.getItem('token')) {
        if (to.name != 'login') {
            router.push({ name: 'login' })
        }
    }
    next()
})

export default router
