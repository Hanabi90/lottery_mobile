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
            path: '/zhuihao',
            name: 'zhuihao  ',
            component: () =>
                import(/* webpackChunkName: "about" */ './components/common/zhuiHao.vue')
        },
        {
            path: '/usercenter',
            name: 'usercenter',
            redirect: { name: '导航' },
            component: () =>
                import(/* webpackChunkName: "about" */ './views/UserCenter.vue'),
            children: [
                {
                    path: '/usercenter',
                    name: '导航',
                    component: () =>
                        import(/* webpackChunkName: "about" */ './components/usercenter/daohang.vue')
                },
                {
                    path: 'bethistory',
                    name: '游戏帐变记录',
                    component: () =>
                        import(/* webpackChunkName: "about" */ './components/usercenter/bethistory.vue')
                },
                {
                    path: 'bank',
                    name: '银行卡管理',
                    component: () =>
                        import(/* webpackChunkName: "about" */ './components/usercenter/bank.vue')
                },

                {
                    path: 'feiyouxizhangbian',
                    name: '非游戏帐变记录',
                    component: () =>
                        import(/* webpackChunkName: "about" */ './components/usercenter/Feiyouxizhangbian.vue')
                },

                {
                    path: 'feiyouxizhangbian',
                    name: '个人盈亏记录',
                    component: () =>
                        import(/* webpackChunkName: "about" */ './components/usercenter/Feiyouxizhangbian.vue')
                },

                {
                    path: 'feiyouxizhangbian',
                    name: '团队盈亏报表',
                    component: () =>
                        import(/* webpackChunkName: "about" */ './components/usercenter/Feiyouxizhangbian.vue')
                },

                {
                    path: 'orderhistory',
                    name: '投注记录',
                    component: () =>
                        import(/* webpackChunkName: "about" */ './components/usercenter/orderhistory.vue')
                },

                {
                    path: 'zhuihaohistory',
                    name: '追号记录',
                    component: () =>
                        import(/* webpackChunkName: "about" */ './components/usercenter/zhuihaoHistory.vue')
                },

                {
                    path: 'huodongguanli',
                    name: '活动管理',
                    children: [
                        {
                            path: 'zhuihaohistory',
                            name: '追号记录',
                            component: () =>
                                import(/* webpackChunkName: "about" */ './components/usercenter/zhuihaoHistory.vue')
                        }
                    ],
                    component: () =>
                        import(/* webpackChunkName: "about" */ './components/usercenter/huodongguanli.vue')
                },

                {
                    path: 'huodongguanli',
                    name: '平台公告',
                    component: () =>
                        import(/* webpackChunkName: "about" */ './components/usercenter/huodongguanli.vue')
                },

                {
                    path: 'notice',
                    name: '重要消息',
                    component: () =>
                        import(/* webpackChunkName: "about" */ './components/usercenter/Notice.vue')
                },

                // {   
                //     path:'/',
                //     name: '在线客服',
                // component: () =>
                //         import(/* webpackChunkName: "about" */ './components/common/zhuiHao.vue')},
            ],

        },
        {
            path: '/accountset',
            name: '账户设置与团队管理',
            redirect: { name: '用户中心' },
            children: [
                {
                    path: '/accountset',
                    name: "用户中心",
                    component: () => import('./components/usercenter/accountSet/daohang.vue')
                },
                {
                    path: 'yonghuliebiao',
                    name: "用户列表",
                    component: () => import('./components/usercenter/accountSet/YongHuLieBiao.vue')
                },
                {
                    path: 'wodejiangjin',
                    name: "我的奖金",
                    component: () => import('./components/usercenter/accountSet/WoDeJiangJin.vue')
                },
                {
                    path: 'kaihuzhongxin',
                    name: "开户中心",
                    component: () => import('./components/usercenter/accountSet/KaiHuZhongXin.vue')
                },
                {
                    path: 'zhaohuizijin',
                    name: "找回资金密码",
                    component: () => import('./components/usercenter/accountSet/ZhaoHuiZiJin.vue')
                },
                {
                    path: 'mibaoshezhi',
                    name: "密保设置",
                    props: true,
                    component: () => import('./components/usercenter/accountSet/MiBaoSheZhi.vue')
                },
                {
                    path: 'xiugaidenglu',
                    name: "登录密码",
                    component: () => import('./components/usercenter/accountSet/XiuGaiDengLu.vue')
                },
                {
                    path: 'xiugaizijin',
                    name: "资金密码",
                    component: () => import('./components/usercenter/accountSet/XiuGaiZiJin.vue')
                },
                {
                    path: 'lianxixinxi',
                    name: "联系信息管理",
                    component: () => import('./components/usercenter/accountSet/LianXiXinXi.vue')
                },
                {
                    path: 'tuanduiyue',
                    name: "团队余额",
                    component: () => import('./components/usercenter/accountSet/TuanDuiYue.vue')
                },
            ],
            component: () =>
                import('./views/accountSet.vue')
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
            next({ path: '/' })
        }
    } else {
        next()
    }
})
export default router
