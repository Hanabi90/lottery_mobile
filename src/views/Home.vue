<template>
    <div id="home">
        <div class="header">
            <div class="leng">
                <i class="flag"></i>
                <span>简中</span>
                <i class="b_icon"></i>
            </div>
            <div class="logo"></div>
            <div class="right">
                <div class="btn-sign">
                    <span>签到</span>
                </div>
                <div class="msg"></div>
            </div>
        </div>
        <div class="banner">
            <!-- <swiper :options="swiperOption" class="slide-container">
                <swiper-slide class="slide-1"></swiper-slide>
                <swiper-slide class="slide-2"></swiper-slide>
                <swiper-slide class="slide-3"></swiper-slide>
                <swiper-slide class="slide-4"></swiper-slide>
                <swiper-slide class="slide-5"></swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper> -->
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(imgUrl, index) in swiperImgs" :key="imgUrl">
                    <van-image
                        width="100%"
                        height="187.5px"
                        fit="cover"
                        :src="imgUrl"
                    />
                </van-swipe-item>
            </van-swipe>
            <div class="marquee">
                <div class="box">
                   <van-notice-bar mode="link" :speed="noticeStr.length/50">
                        {{noticeStr}}
                    </van-notice-bar>
                    <!-- <marquee-text :duration="15">{{this.test_text}}</marquee-text> -->
                </div>
            </div>
        </div>
        <GameList></GameList>
        <my-fotter @popCtrl=popCtrl></my-fotter>
        <Popup ref="popup" @closed="fixPop" class="popup" v-model="show" position="bottom">
            <div class="form">
                <form>
                    <div class="form_group">
                        <input type="text" placeholder="用户名" value="" v-model="userInfo.username" @change="save_userInfo">
                    </div>
                    <div class="form_group pwd_group">
                        <input type="password" placeholder="密码" value="" v-model="userInfo.loginpass" @change="save_userInfo">
                        <a class="check_btn material-icons"></a>
                    </div>
                    <div class="form_tip"></div>
                    <div class="form_ctl">
                        <label class="label" >
                            <i :class="[{'active':isCheckBoxActive},'form_ckeckbox']" @click="rememberInfo">
                                <input type="checkbox"  checked>
                            </i>
                            <!-- -->
                            记住用户名
                        </label>
                        <a class="fr forget_pwd">找回密码</a>
                    </div>
                    <button type="button" class="button submit" style="visibility:initial" @click="handlelogin()">登录</button>
                </form>
            </div>
             <div class="login_foot">没有账号？<router-link to="/register">请新建一个账号</router-link></div>
        </Popup>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// import MarqueeText from 'vue-marquee-text-component'
import GameList from '../components/home/GameList'
import { Popup,Notify,Swipe, SwipeItem,Image,NoticeBar } from 'vant'
import 'vant/lib/popup/style/'
import {login,config,getbalance,getnotice} from '../Api/api'
import {mapMutations} from 'vuex'
import fotter from '../components/common/footer'
export default {
    data() {
        return {
            userInfo:{
                username:'',
                loginpass:''
            },
            isCheckBoxActive:false,
            show: false,
            swiperOption: {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            },
            swiperImgs:[
                require('../assets/images/banner1803.jpg'),
                require('../assets/images/banner1809.jpg'),
                require('../assets/images/banner1818.jpg'),
                require('../assets/images/banner1819.jpg'),
                require('../assets/images/banner1820.jpg')
            ],
            noticeStr:'***'.repeat(100)
        }
    },
    created(){
        console.log('asdasd');
        this.getbalance()
        this.isCheckBoxActive = localStorage.getItem('isCheckBoxActive')
        if(this.isCheckBoxActive){
            var username = localStorage.getItem('username')
            var loginpass = localStorage.getItem('loginpass')
            this.$set(this.userInfo,'username',username)
            this.$set(this.userInfo,'loginpass',loginpass)
        }
    },
    methods:{
        ...mapMutations([
            'updateToken',
            'updateUserInfo',
            'updateLogin'
        ]),
        getbalance(){
            getbalance().then((res)=>{
                if(res.code==0){
                    const userBalance = res.data.money
                    this.updateUserInfo({userBalance})
                    this.updateLogin(true)
                    this.getnotice()
                }
            })
        },
        handlelogin() {
            sessionStorage.removeItem('token')
            login(this.userInfo).then((res) => {
                if (res.code == 0) {
                    this.show = false
                    const token = res.data.token
                    this.updateToken({token,method:'login',nickname:res.data.nickname})
                    Notify({
                        message: '登录成功',
                        duration: 2000,
                        background: '#33ad35'
                    });
                    this.getnotice()
                } else {
                    this.login = {
                        username: '',
                        loginpass: ''
                    }
                }
                this.getbalance()
            })
        },
        getnotice(){
            getnotice().then((res)=>{
                if(res.code == 0){
                    var str = ''
                    var noticeArr = res.data.results
                    for (let i = 0; i < noticeArr.length; i++) {
                        const item = noticeArr[i];
                        str= str + item.subject+'    '+item.content+'          '
                    }
                    this.noticeStr = str
                    this.$store.commit('UpdateNoticeData',noticeArr)
                }
            })
        },
        fixPop(){
            setTimeout(() => {
                this.$refs.popup.inited = false
            }, 100);
        },
        save_userInfo(){
            var username = this.userInfo['username']
            var loginpass = this.userInfo['loginpass']
            if(this.isCheckBoxActive){
                var username = this.userInfo['username']
                var loginpass = this.userInfo['loginpass']
                this.$set(this.userInfo,'username',username)
                this.$set(this.userInfo,'loginpass',loginpass)
                localStorage.setItem('username',username)
                localStorage.setItem('loginpass',loginpass)
            }
        },
        rememberInfo(){
            this.isCheckBoxActive = !this.isCheckBoxActive
            if(this.isCheckBoxActive){
                var username = this.userInfo['username']
                var loginpass = this.userInfo['loginpass']
                this.$set(this.userInfo,'username',username)
                this.$set(this.userInfo,'loginpass',loginpass)
                localStorage.setItem('username',username)
                localStorage.setItem('loginpass',loginpass)
                localStorage.setItem('isCheckBoxActive',true)
            }else{
                this.$set(this.userInfo,'username','')
                this.$set(this.userInfo,'loginpass','')
                localStorage.removeItem('username')
                localStorage.removeItem('loginpass')
                localStorage.removeItem('isCheckBoxActive')
            }
        },
        popCtrl(param){
            this.show = param
        }
    },
    components: {
        "van-swipe":Swipe, "van-swipe-item":SwipeItem,
        "van-image":Image,
        swiper,
        swiperSlide,
        "van-notice-bar":NoticeBar,
        // MarqueeText,
        GameList,
        Popup,
        Notify,
        "myFotter":fotter
    }
}
</script>

<style lang="stylus" scoped>
//popup

.popup
    .form
        padding 26px 38px
        color: #959595;
        font-size 12px
        .form_group
            background-color: #eee
            border-radius: 3px
            overflow: hidden
            margin-bottom: 10px
            position: relative
        input
            text-indent: 10px
            border: 0
            background: 0 0
            width 300px
            height 45px
            font-size 12px
        .form_ckeckbox
            display: inline-block;
            width: 18px;
            height: 18px;
            overflow hidden
            background-repeat: no-repeat;
            background-position: center top;
            background-size: 100%;
            background-image: url('../assets/images/checkbox.png');
            vertical-align: -6px;
            &.active
                background-position center bottom
        .form_ctl
            display flex
            justify-content space-between
            line-height: 18px
            margin 22px 0 
        .submit
            width: 100%;
            background-color: #c32026;
            color: #fff;
            border: none;
            border-radius: 3px;
            font-size: 16px;
            height 49.8px
    .login_foot
        font-size: .34375rem;
        color: #959595;
        text-align: center;
        line-height: 20px;
        padding 20px 0
        background-color: #fcfcfc;
        border-top: 1px solid #eee;
        a
            color #959595
            text-decoration underline

.loginBox
    height 150px
    width 100%
    background #fff
.header
    width 375px
    height 49px
    z-index 99
    position fixed
    top 0
    left 0
    right 0
    background-color #c32026
    display flex
    .leng
        color #fff
        text-align center
        display flex
        justify-content flex-start
        margin-left 16px
        width 100px
        height 30px
        position absolute
        top 50%
        transform translateY(-50%)
        line-height 30px
        font-size 12px
        span
            height 100%
            margin-right 4px
        .b_icon
            margin-right 4px
            height 100%
            width 10.33%
            background-size contain
            background-image url('../assets/images/xiala.png')
            background-position center center
            background-repeat repeat-x
        .flag
            margin-right 4px
            height 100%
            width 18.33%
            background-size contain
            background-image url('../assets/images/ch.png')
            background-position center center
            background-repeat no-repeat
    .logo
        position absolute
        left 50%
        transform translateX(-50%)
        background-image url('../assets/images/logo.png')
        width 135px
        height 49px
        background-position center center
        background-size 100% auto
        background-repeat no-repeat
        display inline
    .right
        position absolute
        right 0
        display flex
        width 100px
        height 49px
        .btn-sign
            width 50%
            span
                background #fff
                padding 8px 11px
                border-radius 50px
                color #000
                font-size 13px
                font-weight 400
                line-height 49px
        .msg
            width 50%
            background url('../assets/images/info_icon.png') center center / 95% auto no-repeat
.banner
    margin-top 49px
    width 375px
    height 187.5px
    background-color yellowgreen
    position relative
    overflow hidden
    .marquee
        position absolute
        bottom 0
        z-index 1
        color #fff
        font-size 10px
        // height 20px
        // line-height 20px
        background-color rgba(0, 0, 0, 0.7)
        .box
            display flex
            width 375px
            overflow hidden
            span
                margin 0 6px
                font-size 12px
.container
    width 375px
    height 1100px
    background-color navy
.footer
    width 375px
    height 51px
    position fixed
    bottom 0
    left 0
    right 0
    .footer-box
        width 375px
        height 100%
        display flex
        background #fff
        .navItem
            flex 1
            display flex
            flex-direction column
            text-align center
            height 100%
            span
                font-size 12px
                margin-top 4px
                font-family 'Microsoft yahei'
            .icon
                height 50%
                background-size contain
                background-repeat no-repeat
                background-position center
        .navItem_home
            .icon
                background-image url('../assets/images/n1.png')
        .navItem_activity
            .icon
                background-image url('../assets/images/n31.png')
        .navItem_register
            line-height 51px
            font-size 14px
            color #fff
            background-color #ff3000
            .icon
                border-top 4px solid #ff7633
        .navItem_wallet
            .icon
                background-image url('../assets/images/n21.png')
        .navItem_login
            .icon
                background-image url('../assets/images/n41.png')
// slide
.swiper-slide
    height 187.5px
    background-size cover
    background-position center
.swiper-pagination
    text-align right
    padding-right 10px
    padding-bottom 14px

</style>

