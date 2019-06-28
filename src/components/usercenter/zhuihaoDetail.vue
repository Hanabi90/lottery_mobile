<template>
    <div class="zhuihaoDetail">
            <van-cell-group title="追号详情" >
                <van-cell-group class="detail-group">
                    <Cell>
                    游戏用户:
                    <span class="cell_span">{{detailData.task.username}}</span>
                </Cell>
                <Cell>
                    追号编号:
                    <span class="cell_span">{{detailData.task.username}}</span>
                </Cell>
                <Cell>
                    追号时间:
                    <span class="cell_span">{{detailData.task.begintime}}</span>
                </Cell>
                <Cell>
                    游戏:
                    <span class="cell_span">{{detailData.task.cnname}}</span>
                </Cell>
                <Cell>
                    玩法:
                    <span class="cell_span">{{detailData.task.methodname}}</span>
                </Cell>
                <Cell>
                    模式:
                    <span class="cell_span">{{detailData.task.modes}}</span>
                </Cell>
                <Cell>
                    奖金组:
                    <span class="cell_span">{{detailData.task.prizegroup}}</span>
                </Cell>
                <Cell>
                    追号内容:
                    <span class="cell_span">{{detailData.task.codes}}</span>
                </Cell>
                <Cell>
                    开始期号:
                    <span class="cell_span">{{detailData.task.beginissue}}</span>
                </Cell>
                <Cell>
                    追号期数:
                    <span class="cell_span">{{detailData.task.issuecount}}</span>
                </Cell>
                <Cell>
                    完成期数:
                    <span class="cell_span">{{detailData.task.finishedcount}}</span>
                </Cell>
                <Cell>
                    取消期数:
                    <span class="cell_span">{{detailData.task.cancelcount}}</span>
                </Cell>
                <Cell>
                    完成金额:
                    <span class="cell_span">{{detailData.task.finishprice}}</span>
                </Cell>
                <Cell>
                    取消金额:
                    <span class="cell_span">{{detailData.task.cancelprice}}</span>
                </Cell>
                <Cell>
                    中奖后停止追号:
                    <span class="cell_span" v-if="detailData.task.stoponwin==1">是</span>
                    <span class="cell_span" v-else>否</span>
                </Cell>
                <Cell>
                    追号状态:
                    <span class="cell_span">{{detailData.task.status}}</span>
                </Cell>
                <Cell>
                    追号总金额:
                    <span class="cell_span">{{detailData.task.taskprice}}</span>
                </Cell>
                </van-cell-group>
            </van-cell-group>
            <van-cell-group>
                <table class="table">
                    <tbody>
                        <tr>
                            <th>奖期</th>
                            <th>追号倍数</th>
                            <th>追号状态</th>
                            <th>注单状态</th>
                        </tr>
                        <tr v-for="(item, index) in detailData.aTaskdetail" :key="index" class="center">
                            <td>{{item.issue}}</td>
                            <td>{{item.multiple}}</td>
                            <td>{{status(item)}}</td>
                            <td>{{kaijiangStatus(item)}}</td>
                        </tr>
                    </tbody>
                </table>
            </van-cell-group>
            <van-button type="danger" @click="$emit('closedetail')">
                返回
            </van-button>
    </div>
</template>
<script>
import myHeader from './header'
import {
    DropdownMenu,
    DropdownItem,
    DatetimePicker,
    Field,
    Popup,
    Button,
    List,
    Collapse,
    CollapseItem,
    Cell,
    CellGroup,
    Notify,
    Tag
} from 'vant'
export default {
    components: {
        DropdownMenu,
        DropdownItem,
        DatetimePicker,
        Field,
        Popup,
        myHeader,
        'van-list': List,
        vanButton: Button,
        vanCollapse: Collapse,
        vanCollapseItem: CollapseItem,
        Cell,
        'van-cell-group':CellGroup,
        'van-tag':Tag
    },
    data() {
        return {
            activeNames: ['1']
        }
    },
    created() {},
    props: ['detailData'],
    methods: {
        kaijiangStatus(item){
            if(item.iscancel==0){
                if(item.isgetprize==0){
                    return '未开奖'
                }
                else if (item.isgetprize==2){
                    return '未中奖'
                }
                else if (item.isgetprize==1){
                    if(item.prizestatus==0){
                        return '未派奖'
                    }else{
                        return '已派奖'
                    }
                }
            }else if(item.iscancel==1){
                return '本人撤单'
            }else if (item.iscancel==2){
                return '管理员撤单'
            }else if(item.iscancel==3){
                return '开错奖撤单'
            }
        },
        status(item){
            if(item.status==0){
                return '进行中'
            }else if(item.status==1){
                if(item.can==1){
                    return '已完成、可撤单'
                }else{
                    return '已完成、不可撤单'
                }
            }else{
                return '已取消'
            }
        }
    },
}
</script>

<style lang="stylus" scoped>
.zhuihaoDetail
    text-align: center;
.table
    width 100%
    text-align center
    th
        background: #3067a0;
        color: #fff;
        border: solid 1px #3067a0;
    td
        height 20px
        background: #fff;
        border: solid 1px #3067a0;
        color: #000;
.center
    text-align: center;

</style>
