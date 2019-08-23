import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import { AlertPlugin, ToastPlugin ,ConfirmPlugin,LoadingPlugin } from 'vux'
import VuePageTransition from 'vue-page-transition'
Vue.use(VuePageTransition)

import  Countup  from 'vux/src/components/countup'
import ConfirmPlugin  from 'vux/src/plugins/confirm'
Vue.component('countup', Countup)
Vue.use(ConfirmPlugin)

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import ToastPlugin from 'vux/src/plugins/toast'
Vue.use(ToastPlugin, {
    position: 'middle',
    width: '50%'
})
VueClipboard.config.autoSetContainer = true


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
