<template>
    <div class="home">
        <Homeswiper />
        <Notice />
        <QuickFuc />
    </div>
</template>

<script>
import Homeswiper from '@/components/home/homeSwiper'
import Notice from '@/components/home/notice'
import QuickFuc from '@/components/home/quickFuc'
export default {
    components: {
        Homeswiper,
        Notice,
        QuickFuc
    }
}
</script>

<style lang="stylus" scoped>
.home
    height 80000px
</style>
