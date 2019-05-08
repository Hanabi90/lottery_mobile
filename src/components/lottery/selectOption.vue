<template>
    <div class="selected-option">
        <div class="tt">
            <span>已选</span>
            <span class="hot" id="span_k122_betcount">{{newbets.length-1}}</span>
            <span>注</span>
        </div>
        <div class="wrap">
            <div class="area">
                <span v-for="(betitem, index) in newbets" :key="betitem+index">{{betitem}}</span>
            </div>
            <a href="javascript:void(0);" class="ok">确认</a>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            newbets: '',
            newbets2: '',
        }
    },
    methods: {
        test(h) {
            this.newbets = ''
            for (var e = 0, l; (l = h[e++]); ) {
                for (var d = 0, g; (g = h[d++]); ) {
                    for (var b = 0, f; (f = h[b++]); ) {
                        if (l == g) {
                            continue
                        }
                        if (g == f) {
                            continue
                        }
                        if (l == f) {
                            continue
                        }
                        var m = [l, g, +f]
                            .sort(function(j, i) {
                                return j > i ? 1 : -1
                            })
                            .join('')
                        if (this.newbets.indexOf(m + ',') != -1) {
                            continue
                        }
                        this.newbets += m + ','
                    }
                }
            }
            this.newbets = this.newbets.split(',')
        },
        test2(a,h) {
            this.newbets2 = ''
            for (var e = 0, f; (f = a[e++]); ) {
                for (var d = 0, c; (c = h[d++]); ) {
                    if (parseInt(f, 10) / parseInt(c, 10) == 11) {
                        continue
                    }
                    if (f.length != 2) {
                        continue
                    }
                    if (c.length != 1) {
                        continue
                    }
                    if ('11,22,33,44,55,66'.indexOf(f) == -1) {
                        continue
                    }
                    if ('1,2,3,4,5,6'.indexOf(c) == -1) {
                        continue
                    }
                    this.newbets2 += f + c + ','
                }
            }
        }
    },
    mounted() {
        this.test([1, 2, 3, 4, 5, 6])
        this.test2(["11", "22", "33", "44", "55",'66'],["1", "2", "3", "4", "5", "6"])
        console.log(this.newbets2.split(','));
    }
}
</script>

<style lang="stylus" scoped>
.selected-option
    // background-color: #fff6f5;
    // margin: 12px 0;
    // min-height: 50px;
    // padding: 6px;
    // padding-left: 11px;
    // text-align: left;
    // font-size: 14px;
    // background-color: #f3edef;
    // align-items: center;
    display flex
    flex-direction column
    .hot
        color #ff0000
        margin 0px 2px
.wrap
    display flex
    min-height 50px
    margin 2px 16px
    text-align left
    font-size 14px
    align-items center
    background-color #fff6f5
    padding 10px
    .ok
        background-color #f85d68
        width 70px
        display block
        text-align center
        color #fff
        border-radius 4px
        line-height 36px
        font-size 13px
        &.disable
            background-color #ccc
    .area
        width: 20%;
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        span
            margin-left 4px
</style>

