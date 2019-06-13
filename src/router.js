import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'
Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/navview',
            name: 'navview',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ './views/NavView.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () =>
                import(/* webpackChunkName: "about" */ './views/Register.vue')
        },
        {
            path: '/pk10',
            name: 'pk10',
            component: () =>
                import(/* webpackChunkName: "about" */ './components/pk10/pk10.vue')
        },
        {
            path: '/usercenter',
            name: 'usercenter',
            component: () =>
                import(/* webpackChunkName: "about" */ './views/UserCenter.vue'),
                meta:{auth:true}
        },
        {
            path: '/zhuihao',
            name: 'zhuihao  ',
            component: () =>
                import(/* webpackChunkName: "about" */ './components/common/zhuiHao.vue')
        },

    ]
})
router.beforeEach((to, from, next) => {
    if (to.matched.some(m => m.meta.auth)) {
        // 对路由进行验证     
        if (store.state.islogin == true) { // 已经登陆       
            next()   // 正常跳转到你设置好的页面     
        }
        else {
            next({ path: '/'})
        }
    } else {
        next()
    }
})
export default router