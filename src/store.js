import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        hotOrLeak:'leak',
        keyboardshow:false,
        myPopShow:false,
        betArr:[],
        ispending:false,
        delayTimeToClose:3000,
        isPopResults:false,
        timer:null
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
            state.keyboardshow = status
        },
        myPopCtrl(state,flag){
            if(flag==false){
                state.myPopShow = false
                state.isPopResults = false
                state.keyboardshow = false
                clearTimeout(state.timer)
            }else{
                state.myPopShow = true
            }
        },
        updateBetArr(state,betArr){
            state.betArr = betArr
            console.log('state.betArr',state.betArr);
        },
        updateIspending(state,status){
            state.ispending = status
        },
        updateIsPopResults(state){
            state.isPopResults = true
            state.timer = setTimeout(() => {
                state.isPopResults = false
                state.myPopShow = false
            }, 3000);
        },
    },
    actions: {
        'UPDATEDELAYTIMETOCLOSE'(){
            state.timer = setTimeout(() => {
                updateDelaytimeToClose(0)
            }, 3000);
        }
    }
})
