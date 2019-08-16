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
            path: '/traceHistory',
            name: 'traceHistory',
            component: () =>
                import(/* webpackChunkName: "traceHistory" */ './components/userCenter/traceHistory.vue')
        },
        {
            path: '/usercenter',
            name: 'usercenter',
            component: () =>
                import(/* webpackChunkName: "usercenter" */ './views/usercenter.vue')
        },
        {
            path: '/openAccountLine',
            name: 'openAccountLine',
            component: () =>
                import(/* webpackChunkName: "openAccountLine" */ './views/openAccountLine.vue')
        },
        {
            path: '/openLine',
            name: 'openLine',
            component: () =>
                import(/* webpackChunkName: "openLine" */ './views/openLine.vue')
        },
        {
            path: '/changePassword',
            name: 'changePassword',
            component: () =>
                import(/* webpackChunkName: "changePassword" */ './views/changePassword.vue')
        },
        {
            path: '/changeSecPassword',
            name: 'changeSecPassword',
            props:true,
            component: () =>
                import(/* webpackChunkName: "changeSecPassword" */ './views/changeSecPassword.vue')
        },
        {
            path: '/bindquestion',
            name: 'bindquestion',
            component: () =>
                import(/* webpackChunkName: "bindquestion" */ './views/bindquestion.vue')
        },
        {
            path: '/bank',
            name: 'bank',
            props:true,
            component: () =>
                import(/* webpackChunkName: "bank" */ './views/bank.vue')
        },
        {
            path: '/editBank',
            name: 'editBank',
            component: () =>
                import(/* webpackChunkName: "editBank" */ './views/editBank.vue')
        },
        {
            path: '/notice',
            name: 'notice',
            props:true,
            component: () =>
                import(/* webpackChunkName: "notice" */ './views/notice.vue')
        },
        {
            path: '/daySalary',
            name: 'daySalary',
            component: () =>
                import(/* webpackChunkName: "daySalary" */ './views/daySalary.vue')
        },
        {
            path: '/information',
            name: 'information',
            component: () =>
                import(/* webpackChunkName: "information" */ './views/information.vue')
        },
        {
            path: '/agentManagement',
            name: 'agentManagement',
            component: () =>
                import(/* webpackChunkName: "agentManagement" */ './views/agentManagement.vue')
        },
        {
            path: '/wallet',
            name: 'wallet',
            component: () =>
                import(/* webpackChunkName: "wallet" */ './views/wallet.vue')
        },
        {
            path: '/withdrawal',
            name: 'withdrawal',
            component: () =>
                import(/* webpackChunkName: "withdrawal" */ './views/withdrawal.vue')
        },
        {
            path: '/deposit',
            name: 'deposit',
            component: () =>
                import(/* webpackChunkName: "deposit" */ './views/deposit.vue')
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
