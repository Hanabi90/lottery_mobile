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
        },
        {
            path: '/bettingRecord',
            name: 'bettingRecord',
            component: () =>
                import(/* webpackChunkName: "bettingRecord" */ './components/userCenter/bettingRecord.vue')
        },
        {
            path: '/usercenter',
            name: 'usercenter',
            component: () =>
                import(/* webpackChunkName: "bettingRecord" */ './views/usercenter.vue')
        },
        {
            path: '/openAccountLine',
            name: 'openAccountLine',
            component: () =>
                import(/* webpackChunkName: "bettingRecord" */ './views/openAccountLine.vue')
        },
        {
            path: '/openLine',
            name: 'openLine',
            component: () =>
                import(/* webpackChunkName: "bettingRecord" */ './views/openLine.vue')
        },
        {
            path: '/changePassword',
            name: 'changePassword',
            component: () =>
                import(/* webpackChunkName: "bettingRecord" */ './views/changePassword.vue')
        },
        {
            path: '/changeSecPassword',
            name: 'changeSecPassword',
            component: () =>
                import(/* webpackChunkName: "bettingRecord" */ './views/changeSecPassword.vue')
        },
        {
            path: '/bindquestion',
            name: 'bindquestion',
            component: () =>
                import(/* webpackChunkName: "bettingRecord" */ './views/bindquestion.vue')
        },
        {
            path: '/bank',
            name: 'bank',
            component: () =>
                import(/* webpackChunkName: "bettingRecord" */ './views/bank.vue')
        },
        {
            path: '/editBank',
            name: 'editBank',
            component: () =>
                import(/* webpackChunkName: "bettingRecord" */ './views/editBank.vue')
        },
        {
            path: '/notice',
            name: 'notice',
            component: () =>
                import(/* webpackChunkName: "bettingRecord" */ './views/notice.vue')
        },
        {
            path: '/agentManagement',
            name: 'agentManagement',
            component: () =>
                import(/* webpackChunkName: "bettingRecord" */ './views/agentManagement.vue')
        },
    ]
})
router.beforeEach((to, from, next) => {
    console.log(to)
    if (!sessionStorage.getItem('token')) {
        if (to.name != 'login') {
            router.push({ name: 'login' })
        }
    }
    next()
})

export default router
