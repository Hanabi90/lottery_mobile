<template>
    <div class="home">
        <Homeswiper />
        <Notice />
        <QuickFuc />
        <HotLottery />
        <!-- <LotteryList /> -->
    </div>
</template>

<script>
import Homeswiper from '@/components/home/homeSwiper'
import Notice from '@/components/home/notice'
import QuickFuc from '@/components/home/quickFuc'
import HotLottery from '@/components/home/hotLottery'
import LotteryList from '@/components/home/lotteryList'
export default {
    components: {
        Homeswiper,
        Notice,
        QuickFuc,
        HotLottery,
        LotteryList
    }
}
</script>

<style lang="stylus" scoped></style>
