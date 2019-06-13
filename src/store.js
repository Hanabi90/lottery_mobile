import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token:null,
        islogin:false,
        hotOrLeak:'leak',
        keyboardshow:false,
        myPopShow:false,
        betArr:[],
        ispending:false,
        delayTimeToClose:3000,
        isPopResults:false,
        timer:null,
        userInfo:{
            nickname:'',
            money:'0'
        },
        userCenterPop:false,
        zhuihaoArr:[],
        countDown:{days:0,hours:0,minutes:0,seconds:0}
    },
    mutations: {
        UpdateCenterPop(state,flag){
            state.userCenterPop = flag
        },
        UpdateCountDown(state,params){
            state.countDown[params.key] = params.value
        },
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
            // console.log('state.betArr',state.betArr);
        },
        updateZhuihaoArr(state,params){
            if(params.type=='add'){
                // console.log('add');
                state.zhuihaoArr.push(params.data)
            }else if(params.type=='delete'){
                // console.log('delete',1,params.index);
                state.zhuihaoArr.splice(params.index,1)
            }else{
                state.zhuihaoArr = []
            }
            // console.log('state.zhuihaoArr',state.zhuihaoArr);
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
        updateToken(state,params){
            const { token,method,nickname } = { ...params }
            var newToken = null
            var newNickname = ''
            switch (method) {
                case 'login':
                // console.log(method)

                    newNickname = nickname
                    newToken = token
                    state.token = newToken
                    state.islogin = true
                    break;
                case 'logout':
                    newNickname = ''
                    newToken = null
                    state.token = newToken
                    state.islogin = false
                    break;
                default:
                    break;
            }
            state.userInfo['nickname'] = newNickname
            sessionStorage.setItem('token', newToken)
            sessionStorage.setItem('nickname', newNickname)
        },
        updateUserInfo(state, params) {
            // console.log(params)
            const {userBalance} = {...params}
            if(userBalance){
                state.userInfo.money = parseInt(userBalance)
            }
        }
    },
    actions: {
        'UPDATEDELAYTIMETOCLOSE'(){
            state.timer = setTimeout(() => {
                updateDelaytimeToClose(0)
            }, 3000);
        }
    }
})
