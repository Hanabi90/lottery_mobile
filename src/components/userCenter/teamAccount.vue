<template>
    <div class="teamAccount">
        <x-table class="table" :cell-bordered="false" style="background-color:#fff;">
            <thead>
            <tr>
                <th>用户名称</th>
                <th>用户昵称</th>
                <th>团队余额</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>devip000</td>
                <td>123</td>
                <td>1658269.000</td>
            </tr>
            </tbody>
        </x-table>
    </div>
</template>

<script>
import { getgroupbalance } from '@/api/index'
import { XTable } from 'vux'
export default {
    name: 'teamAccount',
    props: ['uid'],
    data() {
        return {
            columns1: [
                {
                    title: '用户名称',
                    key: 'name'
                },
                {
                    title: '用户昵称',
                    key: 'nickname'
                },
                {
                    title: '团队余额',
                    key: 'teammoney'
                }
            ],
            data1: []
        }
    },
    mounted() {
        getgroupbalance({ uid: this.uid }).then(res => {
            this.data1 = [
                {
                    name: res.data.user.username,
                    nickname: res.data.user.nickname,
                    teammoney: res.data.teammoney
                }
            ]
        })
    },
    components: {
        XTable
    }
}
</script>

<style lang="stylus" scoped>
.teamAccount
    min-height 400px
    padding 20px
    box-sizing border-box
    .table
        th
            background #eeeeee
</style>
