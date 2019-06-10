import service from './axios'
import qs from 'qs'
//登录
export const login = formData =>
    service.request({
        method: 'post',
        url: 'default/userlogin',
        data: qs.stringify(formData)
    })
//登出
export const logout = formData =>
    service.request({
        method: 'post',
        url: 'default/logout'
    })

//获取金额
export const getbalance = formData =>
    service.request({
        method: 'post',
        url: 'user/getbalance'
    })


//获取彩票菜单
export const getMenu = formData =>
    service.request({
        method: 'post',
        url: 'lottery/getmenu/'
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

export const getCaizhong = formData =>
    service.request({
        method: 'post',
        url: 'lottery/getinfo',
        data: qs.stringify(formData)
    })

export const betting = (formData) =>{
    console.log(formData);
    return service.request({
        method: 'post',
        url: 'lottery/betting',
        data:qs.stringify(formData)
    })
}
export const getissue = formData =>
    service.request({
        method: 'post',
        url: 'getissue',
        data: qs.stringify(formData)//lotteryid:33
    })
    
export const getbankreporthistory = formData =>//非遊戲帳變記錄
    service.request({
        method: 'post',
        url: 'report/getbankreporthistory',
        data: qs.stringify(formData)
    })
export const checksecpassexist = formData =>//查询有无资金密码
    service.request({
        method: 'post',
        url: 'security/checksecpassexist',
        data: qs.stringify(formData)
    })
export const setsecpass = formData =>//设定资金密码
    service.request({
        method: 'post',
        url: 'security/setsecpass',
        data: qs.stringify(formData)
    })
export const checksecpass = formData =>//验证资金密码是否正确
    service.request({
        method: 'post',
        url: 'security/checksecpass',
        data: qs.stringify(formData)
    })
export const getbanklist = formData =>//获取银行列表
    service.request({
        method: 'post',
        url: 'bankmanage/getbanklist',
        data: qs.stringify(formData)
    })
export const getprovincelist = formData =>//获取行政区列表
    service.request({
        method: 'post',
        url: 'area/getprovincelist',
        data: qs.stringify(formData)
    })
export const getcitylist = formData =>//获取城市列表
    service.request({
        method: 'post',
        url: 'area/getcitylist',
        data: qs.stringify(formData)
    })
export const getuserbankinfo = formData =>//查询银行卡
    service.request({
        method: 'post',
        url: 'user/getuserbankinfo',
        data: qs.stringify(formData)
    })
export const updatenickname = formData =>//修改昵称
    service.request({
        method: 'post',
        url: 'user/updatenickname',
        data: qs.stringify(formData)
    })
export const adduserbank = formData =>//添加银行卡
    service.request({
        method: 'post',
        url: 'user/adduserbank',
        data: qs.stringify(formData)
    })
export const changeuserloginpass = formData =>//修改登入密码
    service.request({
        method: 'post',
        url: 'user/changeuserloginpass',
        data: qs.stringify(formData)
    })
export const changeusersecpass = formData =>//资金密码重置
    service.request({
        method: 'post',
        url: 'user/changeusersecpass',
        data: qs.stringify(formData)
    })
export const setsequestion = formData =>//设置密保问题
    service.request({
        method: 'post',
        url: 'user/setsequestion',
        data: qs.stringify(formData)
    })
export const checksequestion = formData =>//验证密保问题
    service.request({//flag%string && ques_num%ini &&  dna_ques%int && ans%string
        method: 'post',
        url: 'security/checksequestion',
        data: qs.stringify(formData)
    })
export const getuserlottery = formData =>//验证密保问题
    service.request({//flag%string && ques_num%ini &&  dna_ques%int && ans%string
        method: 'post',
        url: 'user/getuserlottery',
        data: qs.stringify(formData)
    })
export const getuserlotterymethod = formData =>//验证密保问题
    service.request({//flag%string && ques_num%ini &&  dna_ques%int && ans%string
        method: 'post',
        url: 'user/getuserlotterymethod',
        data: qs.stringify(formData)
    })
export const getchildlist = formData =>//验证密保问题
    service.request({//flag%string && ques_num%ini &&  dna_ques%int && ans%string
        method: 'post',
        url: 'user/getchildlist',
        data: qs.stringify(formData)
    })
export const getbethistory = formData =>//验证密保问题
    service.request({//flag%string && ques_num%ini &&  dna_ques%int && ans%string
        method: 'post',
        url: 'gameinfo/getbethistory',
        data: qs.stringify(formData)
    })
export const getprize = formData =>//验证密保问题
    service.request({//flag%string && ques_num%ini &&  dna_ques%int && ans%string
        method: 'post',
        url: 'getprize',
        data: qs.stringify(formData)
    })



/* {
    "betparams": {
        "iWalletType": 1,
        "curmid": 3535,
        "lt_issue_start": "20190522-33",
        "lt_project": {
        "type": "digital",
        "methodid": 3364,
        "point": 0,
        "codes": "5&6&7&8&9",
        "nums": 5,
        "times": 1,
        "money": 10,
        "mode": 1,
        "desc": "[特殊_一帆风顺] 5,6,7,8,9",
        "buqsno": "buqsno5ce3a094c4706"
        }
    },
    "bettraceparams": {
        "lt_trace_if": "no",
        "lt_trace_stop": "",
        "lt_trace_money": "",
        "lt_trace_issues": ""
    }
    }
 */
