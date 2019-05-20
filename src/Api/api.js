import service from './axios'
import qs from 'qs'
//登录
export const login = formData =>
    service.request({
        method: 'post',
        url: 'UserLogin',
        data: qs.stringify(formData)
    })
//登出
export const loginOut = formData =>
    service.request({
        method: 'post',
        url: 'logout'
    })

//获取金额
export const getbalance = formData =>
    service.request({
        method: 'post',
        url: 'getbalance'
    })
//查询资金密码
export const getsecpass = formData =>
    service.request({
        method: 'post',
        url: 'getsecpass'
    })
//修改昵称
export const updatenickname = formData =>
    service.request({
        method: 'post',
        url: 'updatenickname',
        data: qs.stringify({ nickname: 'test001' })
    })
//查询银行卡
export const getbankinfo = formData =>
    service.request({
        method: 'post',
        url: 'getbankinfo',
        data: qs.stringify(formData)
    })
//获取彩票菜单
export const getMenu = formData =>
    service.request({
        method: 'post',
        url: 'lottery/menu/get'
    })
//獲取指定彩種的玩法羣組
export const MethodCrowd = formData =>
    service.request({
        method: 'get',
        url: `method/crowd/get/${formData}`
    })
//獲取指定羣組下的玩法
export const getmethod = formData =>
    service.request({
        method: 'get',
        url: `method/crowd/getmethod/1/${formData}`
    })
//获取系统通知
export const getnotice = formData =>
    service.request({
        method: 'get',
        url: `notice/get/${formData}`
    })
//获取行政区列表
export const getprovincelist = formData =>
    service.request({
        method: 'post',
        url: 'getprovincelist',
        data: qs.stringify(formData)
    })
//获取城市列表
export const getcitylist = formData =>
    service.request({
        method: 'post',
        url: 'getcitylist',
        data: qs.stringify(formData)
    })
//获取银行列表
export const getbanklist = formData =>
    service.request({
        method: 'post',
        url: 'getbanklist',
        data: qs.stringify(formData)
    })
export const getCaizhong = formData =>
service.request({
    method: 'post',
    url: 'lottery/info/get/3535',
})
