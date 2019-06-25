<template>
    <div>
        <swiper ref="mySwiper" :options="swiperOption" class="slide-container" @slideChange="haha">
            <swiper-slide class="slide-1">
                <div class="gametitle">{{gameTitle}}</div>
                <div class="selectGameType" @click="show = true">{{currentGameType}}</div>
                <div class="content-wrapper">
                    <div v-if="1===0" class="market-name">超级快3(45秒)</div>
                    <flip-countdown
                        ref="flip"
                        v-if="countdown!==''"
                        class="clock"
                        :deadline="countdown"
                    ></flip-countdown>
                    <!-- <div class="note">等待开奖</div> -->
                </div>
                <div class="history left" @click="popCtrl('open','prizeHistory')">开奖历史</div>
                <div class="history right" @click="popCtrl('open','bethistory')">投注历史</div>
            </swiper-slide>
            <swiper-slide class="slide-2">
                <div class="lotteryInfo">
                    <span>{{gameTitle}}</span>
                    <span>{{currentIssue}}</span>
                </div>
                <ul :class="[{kuaisan:lotteryResultsStyleFlag==3},'lotteryResults']">
                    <li
                        class="ball"
                        :class="[{['ball_'+index]:result.active},{anim:result.anim}]"
                        ref="balls"
                        v-for="(result,index) in lotteryHistory[1].result"
                        v-if="result.num!= ''"
                    >{{ result.num }}</li>
                </ul>
            </swiper-slide>
            <swiper-slide class="slide-3">
                <div class="lotteryInfo">
                    <span>{{gameTitle}}</span>
                    <span>{{currentIssue}}</span>
                </div>
                <ul :class="[{kuaisan:lotteryResultsStyleFlag==3},'lotteryResults']">
                    <li
                        class="ball"
                        :class="[{static:result.num},'ball_'+index]"
                        v-for="(result,index) in lotteryHistory[2].result"
                        v-if="result.num!= ''"
                    >{{result.num}}</li>
                </ul>
            </swiper-slide>
        </swiper>
        <ul class="slide-content-title">
            <li
                v-for="(item, index) in lotteryHistory"
                :key="item.num +index"
                @click="tabSlide(index)"
            >
                <i :class="{active:nowIndex==index}">{{item.state}}</i>
                <span class="jiangqi">{{item.num | etc(nowIndex==index)}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: ''
        }
    },
    methods: {}
}
</script>

<style scoped>
</style>
