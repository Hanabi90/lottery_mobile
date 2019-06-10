<template>
    <div>
        <Popup v-model="dateShow" :overlay="false" position="top">
            <div class="dateWrap" v-if="dateShow_1">
                <p>开始日期</p>
                <DatetimePicker
                    @confirm="timeConfirm(true,currentDate,'start')"
                    @cancel="timeConfirm"
                    class="datetimepicker"
                    v-model="currentDate"
                    type="datetime"
                    :min-date="minDate"
                    :max-date="maxDate"
                />
            </div>
            <div class="dateWrap" v-if="dateShow_2">
                <p>结束日期</p>
                <DatetimePicker
                    @confirm="timeConfirm(true,currentDate_2)"
                    @cancel="timeConfirm"
                    class="datetimepicker"
                    v-model="currentDate_2"
                    type="datetime"
                    :min-date="minDate_2"
                    :max-date="maxDate_2"
                />
            </div>
        </Popup>
    </div>
</template>

<script>
import {DatetimePicker,Cell} from 'vant'
export default {
    props:['currentDate','currentDate_2'],
    components:{
        DatetimePicker,
        Cell
    },
    data() {
        return {
            dateShow_1:false,
            minHour: 10,
            maxHour: 20,
            minDate: new Date(2017, 0, 1),
            maxDate: new Date(),
            currentDate:new Date(),

            dateShow_2:false,
            minHour_2: 10,
            maxHour_2: 20,
            minDate_2: new Date(2017, 0, 1),
            maxDate_2: new Date(),
            currentDate_2: new Date(),
        }
    },
    methods: {
        timeConfirm(flag,currentDate,isStart){
            if(flag){

            }
            if(isStart){
                this.firsttime = false
            }
            this.dateShow = false
            this.dateShow_1 = false
            this.dateShow_2 = false
        }
    }
}
</script>

<style lang="stylus" scoped>
.datetimepicker
    width 100vw
.dateWrap
    p
        text-align center
        padding 10px
</style>

