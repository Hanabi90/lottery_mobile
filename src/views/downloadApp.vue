<template>
    <div class="downloadApp">
        
    </div>
</template>

<script>
export default {
    data() {
        name: 'download'
        return {}
    },
    methods: {
        isIosAnd() {
            var UA = window.navigator.userAgent
            if (
                /Android|HTC/i.test(UA) ||
                !!(window.navigator['platform'] + '').match(/Linux/i)
            )
                UA = 'Android'
            else if (/iPad/i.test(UA) || /iPod|iPhone/i.test(UA)) UA = 'iOS'
            else UA = 'other'
            return UA
        },
    },
    created(){
        var UA = this.isIosAnd()
        if(UA=='Android'){
            window.location.href = 'https://www.ods168.com/download/ods168.apk'
        }
    }
}
</script>

<style lang="stylus" scoped>
.downloadApp
    color #fff
    background-image url('../assets/images/downloadapp.png')
    height 100vh
    width 100%
    background-repeat no-repeat
    background-position center
    background-size contain
</style>
