<template>
    <div class="accountSet">
        <van-sidebar :active-key="activeKey" @change="onChange">
          <van-sidebar-item title="开户中心"  />
          <van-sidebar-item title="用户列表"  />
          <van-sidebar-item title="我的奖金"  />
          <van-sidebar-item title="找回资金密码"  />
          <van-sidebar-item title="密保设置"  />
          <van-sidebar-item title="修改登录密码"  />
          <van-sidebar-item title="修改资金密码"  />
          <van-sidebar-item title="联系信息管理"  />
          <van-sidebar-item title="团队余额"  />
        </van-sidebar>
        <div class="components">
          <KaiHuZhongXin v-if="activeKey==0"></KaiHuZhongXin>
          <YongHuLieBiao v-if="activeKey==1"></YongHuLieBiao>
          <WoDeJiangJin v-if="activeKey==2"></WoDeJiangJin>
          <ZhaoHuiZiJin v-if="activeKey==3"></ZhaoHuiZiJin>
          <MiBaoSheZhi v-if="activeKey==4"></MiBaoSheZhi>
          <XiuGaiDengLu v-if="activeKey==5"></XiuGaiDengLu>
          <XiuGaiZiJin v-if="activeKey==6"></XiuGaiZiJin>
          <LianXiXinXi v-if="activeKey==7"></LianXiXinXi>
          <TuanDuiYue v-if="activeKey==8"></TuanDuiYue>
        </div>
    </div>
</template>

<script>
import {Sidebar,SidebarItem} from 'vant'
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
    XiuGaiZiJin
  },
    data() {
        return {
          activeKey: 0
        }
    },
    methods: {
       onChange(key) {
         console.log('key')
        this.activeKey = key;
      }
    },
}
</script>

<style lang="stylus" scoped>
.accountSet
    display flex
    .van-sidebar
        flex 0.25
    .components
        flex 0.75

</style>
