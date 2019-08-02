import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import { AlertPlugin, ToastPlugin ,ConfirmPlugin,LoadingPlugin } from 'vux'

import ToastPlugin from 'vux/src/plugins/toast'
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.use(ToastPlugin)

Vue.use(ToastPlugin, {
    position: 'middle',
    width: '50%'
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
