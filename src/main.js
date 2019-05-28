import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {RSAencrypt} from './utils/index'
Vue.config.productionTip = false
Vue.prototype.$RSAencrypt= RSAencrypt
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
