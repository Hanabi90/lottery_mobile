import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
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
        },
        {
            path: '/bettingRecord',
            name: 'bettingRecord',
            component: () =>
                import(/* webpackChunkName: "bettingRecord" */ './components/userCenter/bettingRecord.vue')
        },
    ]
})
router.beforeEach((to, from, next) => {
    console.log(to);
    if (!sessionStorage.getItem('token')) {
        if (from.fullPath != '/login' && to.name != 'login') {
            router.push({ name: 'login' })
        }
    }
    next()
})

export default router
