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
                    <td>{{name}}</td>
                    <td>{{nickname}}</td>
                    <td>{{teammoney}}</td>
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
            data1: [],
            name: '',
            nickname: '',
            teammoney: ''
        }
    },
    methods:{
        updateInfo(){
            getgroupbalance({ uid: this.uid }).then(res => {
                (this.name = res.data.user.username),
                    (this.nickname = res.data.user.nickname),
                    (this.teammoney = res.data.teammoney)
            })
        }
    },
    mounted(){
        this.updateInfo()
    },
    watch: {
        uid() {
            this.updateInfo()
        },
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
