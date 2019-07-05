<template>
    <div class="accountSet">
        <van-popup
        ref="popup"
        v-model="slideshow"
        position="left"
        @closed=fixPop
        class="slidebar"
       >
            <van-sidebar  :active-key="activeKey" @change="onChange" >
                <van-sidebar-item v-show="!$store.state.ishuiyuan" title="开户中心" />
                <van-sidebar-item title="用户列表"  />
                <van-sidebar-item title="我的奖金"  />
                <van-sidebar-item title="找回资金密码"  />
                <van-sidebar-item title="密保设置"  />
                <van-sidebar-item title="修改登录密码"  />
                <van-sidebar-item title="修改资金密码"  />
                <van-sidebar-item title="联系信息管理"  />
                <van-sidebar-item title="团队余额"  />
            </van-sidebar>
        </van-popup>
          <van-icon class="btn" @click="slide_ctrl" color="#f44" name="arrow" />
        <div :class="[{flex_1:!slideshow},'components']">
          <KaiHuZhongXin v-if="activeKey==0"></KaiHuZhongXin>
          <YongHuLieBiao v-else-if="activeKey==1"></YongHuLieBiao>
          <WoDeJiangJin v-else-if="activeKey==2"></WoDeJiangJin>
          <MiBaoSheZhi :zhaohuizijin="true" v-else-if="activeKey==3"></MiBaoSheZhi>
          <MiBaoSheZhi v-else-if="activeKey==4"></MiBaoSheZhi>
          <XiuGaiDengLu v-else-if="activeKey==5"></XiuGaiDengLu>
          <XiuGaiZiJin v-else-if="activeKey==6"></XiuGaiZiJin>
          <LianXiXinXi v-else-if="activeKey==7"></LianXiXinXi>
          <TuanDuiYue v-else></TuanDuiYue>
        </div>
    </div>
</template>

<script>
import {Sidebar,SidebarItem,Icon,Popup} from 'vant'
import KaiHuZhongXin from './accountSet/KaiHuZhongXin'
import MiBaoSheZhi from './accountSet/MiBaoSheZhi'
import LianXiXinXi from './accountSet/LianXiXinXi'
import TuanDuiYue from './accountSet/TuanDuiYue'
import WoDeJiangJin from './accountSet/WoDeJiangJin'
import XiuGaiDengLu from './accountSet/XiuGaiDengLu'
import XiuGaiZiJin from './accountSet/XiuGaiZiJin'
import YongHuLieBiao from './accountSet/YongHuLieBiao'
import ZhaoHuiZiJin from './accountSet/ZhaoHuiZiJin'
export default {
  components:{
    "van-sidebar":Sidebar,
    "van-sidebar-item":SidebarItem,
    KaiHuZhongXin,
    MiBaoSheZhi,
    LianXiXinXi,
    TuanDuiYue,
    WoDeJiangJin,
    XiuGaiDengLu,
    YongHuLieBiao,
    ZhaoHuiZiJin,
    XiuGaiZiJin,
    'van-icon':Icon,
    'van-popup':Popup
  },
    data() {
        return {
          activeKey: 1,
          slideshow:false
        }
    },
    mounted(){
        setTimeout(() => {
            this.slideshow = true
        }, 300);
    },
    methods: {
       onChange(key) {
        this.activeKey = key;
      },
      slide_ctrl(){
          this.slideshow = !this.slideshow
      },
      fixPop(){
            setTimeout(() => {
                this.$refs.popup.inited = false
            }, 100);
        },
    },
}
</script>

<style lang="stylus" scoped>
.accountSet
    display flex
    .btn
        position absolute
        top 50%
        transform translateY(-50%)
        left 0
        z-index: 1;
        font-size 20px
        animation float 1s infinite
        animation-direction alternate
    .van-sidebar
        flex 0.25
        .btn
            position absolute
            top 50%
            transform translateY(-50%)
            right -20px
            z-index: 1;
            font-size 20px
    .components
        flex 1
        
@keyframes float {
    from {
        left -4px
    }
    to {
        left 0
    }
}
.slidebar
    height 100%

</style>
