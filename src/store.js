import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        hotOrLeak:'leak',
        keyboardshow:false
    },
    mutations: {
        tabHotOrLeak(state,status) {
            if (status == 'hot') {
                state.hotOrLeak = 'hot'
            } else {
                state.hotOrLeak = 'leak'
            }
        },
        updateKeyboardshow(state,status) {
            state.keyboardshow = true
        }
    },
    actions: {

    }
})
