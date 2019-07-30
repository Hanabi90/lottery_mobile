<template>
    <div class="login">
        <img src="../assets/images/logo.png" alt class="logo" />
        <group>
            <x-input v-model="userName"></x-input>
        </group>
    </div>
</template>

<script>
import { Group, XInput } from 'vux'
export default {
    data() {
        return {
            userName: ''
        }
    },
    components: {
        Group,
        XInput
    }
}
</script>

<style lang="stylus" scoped>
.login
    background #222
    height 100%
    overflow hidden
    .logo
        display block
        width 372px
        margin auto
        margin-top 100px
</style>
