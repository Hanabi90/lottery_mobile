import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
Vue.use(Router)

export default new Router({
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
            path: '/',
            name: 'login',
            component: () =>
                import(/* webpackChunkName: "login" */ './views/login.vue')
        }
    ]
})
