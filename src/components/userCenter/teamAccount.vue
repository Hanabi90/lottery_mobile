<template>
    <div class="teamAccount">
        <x-table :cell-bordered="false" style="background-color:#fff;">
            <thead>
            <tr>
                <th>用户名称</th>
                <th>用户昵称</th>
                <th>团队余额</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Apple</td>
                <td>$1.25</td>
                <td> x 1</td>
            </tr>
            <tr>
                <td>Banana</td>
                <td>$1.20</td>
                <td> x 2</td>
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
    width 500px
</style>
