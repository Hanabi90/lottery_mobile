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
            <!-- swiper -->
            <swiper :options="swiperOption" class="slide-container">
                <swiper-slide class="slide-1"></swiper-slide>
                <swiper-slide class="slide-2"></swiper-slide>
                <swiper-slide class="slide-3"></swiper-slide>
                <swiper-slide class="slide-4"></swiper-slide>
                <swiper-slide class="slide-5"></swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
                <!-- <div class="swiper-button-next" slot="button-next"></div> -->
            </swiper>
            <div class="marquee">
                <div class="box">
                    <marquee-text :duration="15">{{this.test_text}}</marquee-text>
                </div>
            </div>
        </div>
        <GameList></GameList>
        <div class="footer">
            <ul class="footer-box">
                <router-link class="navItem navItem_home" to="/" tag="li">
                    <i class="icon"></i>
                    <span>首页</span>
                </router-link>
                <router-link class="navItem navItem_activity" to="/" tag="li">
                    <i class="icon"></i>
                    <span>优惠</span>
                </router-link>
                <router-link class="navItem navItem_register" to="/register" tag="li">注册</router-link>
                <router-link class="navItem navItem_wallet" to="/" tag="li">
                    <i class="icon"></i>
                    <span>钱包</span>
                </router-link>
                <li class="navItem navItem_login" @click="show=true">
                    <i class="icon"></i>
                    <span >登录</span>
                </li>
            </ul>
        </div>
        <Popup ref="popup" @closed="fixPop" class="popup" v-model="show" position="bottom">
            <div class="form">
                <form>
                    <div class="form_group">
                        <input type="text" placeholder="用户名" value="" v-model="userInfo.username">
                    </div>
                    <div class="form_group pwd_group">
                        <input type="password" placeholder="密码" value="" v-model="userInfo.password">
                        <a class="check_btn material-icons"></a>
                    </div>
                    <div class="form_tip"></div>
                    <div class="form_ctl">
                        <label class="label" >
                            <i :class="[{'active':isCheckBoxActive},'form_ckeckbox']" @click="rememberInfo">
                                <input type="checkbox" value="on" checked>
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
import MarqueeText from 'vue-marquee-text-component'
import GameList from '../components/home/GameList'
import { Popup,Notify } from 'vant'
import 'vant/lib/popup/style/'
import {login,config} from '../Api/api'
import {mapMutations} from 'vuex'

export default {
    data() {
        return {
            userInfo:{
                username:'devpeter',
                loginpass:'1234qwer'
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
            test_text:
                '<<沙巴体育维护公告》沙巴体育将于 4 月 24 日 13:30 至 16:00 进行维护>>                              '
        }
    },
    methods:{
        ...mapMutations([
            'updateToken',
        ]),
        // login(){
        //     login(this.userInfo).then((res)=>{
        //         console.log(res);
        //         this.updateToken(res.data.token)
        //         this.show = false
        //     })

        // },
        handlelogin() {
            login(this.userInfo).then((res) => {
                if (res.data.code == 0) {
                    sessionStorage.setItem('token', res.data.data.token)
                    sessionStorage.setItem('nickname', res.data.data.nickname)
                    this.show = false
                    this.updateToken(res.data.data.token)
                    Notify({
                        message: '登录成功',
                        duration: 2000,
                        background: '#c32026'
                    });
                } else {
                    // this.$Message.error(res.msg)
                    this.login = {
                        username: '',
                        loginpass: ''
                    }
                }
            })
        },

        fixPop(){
            setTimeout(() => {
                this.$refs.popup.inited = false
            }, 100);
        },
        rememberInfo(){
            this.isCheckBoxActive = !this.isCheckBoxActive
        }
    },
    components: {
        swiper,
        swiperSlide,
        MarqueeText,
        GameList,
        Popup,
        Notify
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
            height: 1.20313rem;
            font-size: .3125rem;
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
        height 20px
        line-height 20px
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
.slide-1
    background-image url('../assets/images/banner1803.jpg')
.slide-2
    background-image url('../assets/images/banner1809.jpg')
.slide-3
    background-image url('../assets/images/banner1818.jpg')
.slide-4
    background-image url('../assets/images/banner1819.jpg')
.slide-5
    background-image url('../assets/images/banner1820.jpg')
</style>

