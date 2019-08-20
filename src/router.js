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
            name: '首页',
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
            name: '个人中心',
            props:true,
            component: () =>
                import(/* webpackChunkName: "usercenter" */ './views/usercenter.vue')
        },
        {
            path: '/openAccountLine',
            name: '注册开户',
            component: () =>
                import(/* webpackChunkName: "openAccountLine" */ './views/openAccountLine.vue')
        },
        {
            path: '/openLine',
            name: '推广链接',
            component: () =>
                import(/* webpackChunkName: "openLine" */ './views/openLine.vue')
        },
        {
            path: '/changePassword',
            name: '登录密码',
            component: () =>
                import(/* webpackChunkName: "changePassword" */ './views/changePassword.vue')
        },
        {
            path: '/changeSecPassword',
            name: '提款密码',
            props:true,
            component: () =>
                import(/* webpackChunkName: "changeSecPassword" */ './views/changeSecPassword.vue')
        },
        {
            path: '/bindquestion',
            name: '密保设定',
            component: () =>
                import(/* webpackChunkName: "bindquestion" */ './views/bindquestion.vue')
        },
        {
            path: '/bank',
            name: '绑定银行卡',
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
            name: '系统公告',
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
            name: '站内信',
            component: () =>
                import(/* webpackChunkName: "information" */ './views/information.vue')
        },
        {
            path: '/agentManagement',
            name: '团队管理',
            component: () =>
                import(/* webpackChunkName: "agentManagement" */ './views/agentManagement.vue')
        },
        {
            path: '/wallet',
            name: '钱包查询',
            component: () =>
                import(/* webpackChunkName: "wallet" */ './views/wallet.vue')
        },
        {
            path: '/withdrawal',
            name: '提现',
            component: () =>
                import(/* webpackChunkName: "withdrawal" */ './views/withdrawal.vue')
        },
        {
            path: '/transfer',
            name: '转账',
            component: () =>
                import(/* webpackChunkName: "transfer" */ './views/transfer.vue')
        },
        {
            path: '/deposit',
            name: '充值',
            component: () =>
                import(/* webpackChunkName: "deposit" */ './views/deposit.vue')
        },
        {
            path: '/activity',
            name: '活动',
            props:true,
            component: () =>
                import(/* webpackChunkName: "activity" */ './views/activity.vue')
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
