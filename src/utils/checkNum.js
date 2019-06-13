function inArray(n,arr){
    var bool = arr.findIndex((item)=>{
        return item==n
    })
    return bool
}
//验证号码合法性以及计算单笔投注注数以及金额(输入型检测)
var _HHZXcheck = function (n, len) {//混合组选合法号码检测，合法返回TRUE，非法返回FALSE,n号码，len号码长度
    var a = ['000', '111', '222', '333', '444', '555', '666', '777', '888', '999'];
    if (len == 2) {//两位
        a = ['00', '11', '22', '33', '44', '55', '66', '77', '88', '99'];
    }
    n = n.toString();
    return inArray(n, a) == -1;

};
var _SDinputCheck = function (n, len) {//11選5的手动输入型的检测[不能重复，只能是01-11的数字]
    var t = n.split(" ");
    var l = t.length;
    for (var i = 0; i < l; i++) {
        if (Number(t[i]) > 11 || Number(t[i]) < 1) {//超过指定范围
            return false;
        }
        for (var j = i + 1; j < l; j++) {
            if (Number(t[i]) == Number(t[j])) {//重复的号码
                return false;
            }
        }
    }
    return true;
};
var _ZU2inputCheck = function (n, len) {//組2的手动输入型的检测[一組重复]
    var t = n.split("");
    if( t[0]==t[1] )
    {
        return false;
    }
    return true;
};
var _ZU3inputCheck = function (n, len) {//組三的手动输入型的检测[一組重复]
    var t = n.split("");
    if((t[0]==t[1] && t[1]==t[2]) || (t[0]!=t[1] && t[1]!=t[2] && t[0]!=t[2]))
    {
        return false;
    }
    return true;
};
var _ZU6inputCheck = function (n, len) {//組六的手动输入型的检测[沒重复]
    var t = n.split("");
    if(t[0]!=t[1] && t[1]!=t[2] && t[0]!=t[2])
    {
        return true;
    }
    return false;
};


var _inputCheck_Num = function (l, e, fun, sort) {
    var nums = data_sel[0].length;
    var error = [];
    var newsel = [];
    var partn = "";
    l = parseInt(l, 10);
    switch (l) {
        case 2 :
            partn = /^[0-9]{2}$/;
            break;
        case 3 :
            partn = /^[0-9\s]{3}$/;
            break;
        case 4 :
            partn = /^[0-9\s]{4}$/;
            break;
        case 5 :
            partn = /^[0-9\s]{5}$/;
            break;
        case 8 :
            partn = /^[0-9\s]{8}$/;
            break;
        case 11 :
            partn = /^[0-9\s]{11}$/;
            break;
        case 14 :
            partn = /^[0-9\s]{14}$/;
            break;
        case 17 :
            partn = /^[0-9\s]{17}$/;
            break;
        case 20 :
            partn = /^[0-9\s]{20}$/;
            break;
        case 23 :
            partn = /^[0-9\s]{23}$/;
            break;
        default:
            partn = /^[0-9]{3}$/;
            break;
    }
    var isfun = function (fun) {
        if (typeof fun == 'function') {
            return fun
        } else {
            return function (s) {
                return true;
            };
        }
    }
    // fun = $.isFunction(fun) ? fun : function (s) {
    //     return true;
    // };
    fun = isfun(fun)
    data_sel[0].forEach((n,i)=> {
        // n = $.trim(n);
        if (partn.test(n) && fun(n, l)) {//合格号码
            if (sort) {
                if (n.indexOf(" ") == -1) {
                    n = n.split("");
                    n.sort(_SortNum);
                    n = n.join("");
                } else {
                    n = n.split(" ");
                    n.sort(_SortNum);
                    n = n.join(" ");
                }
            }
            data_sel[0][i] = n;
            newsel.push(n);
        } else {//不合格则注数减
            if (n.length > 0) {
                error.push(n);
            }
            nums = nums - 1;
        }
    });
    if (e == true) {
        data_sel[0] = newsel;
        return error;
    }
    return nums;
};
export function _inptu_deal(val,methodname) {
    var s = val
    s = s.replace(/[^\s\r,;，；　０１２３４５６７８９0-9]/g, "")
    var m = s;
    switch (methodname) {
        case 'SDZX3' :
        case 'SDZU3' :
        case 'SDZX2' :
        case 'SDRX1' :
        case 'SDRX2' :
        case 'SDRX3' :
        case 'SDRX4' :
        case 'SDRX5' :
        case 'SDRX6' :
        case 'SDRX7' :
        case 'SDRX8' :
        case 'SDZU2' :
            s = s.replace(/[\r\n,;，；]/g, "|").replace(/(\|)+/g, "|");
            break;
        default      :
            s = s.replace(/[\s\r,;，；　]/g, "|").replace(/(\|)+/g, "|");
            break;
    }
    s = s.replace(/０/g, "0").replace(/１/g, "1").replace(/２/g, "2").replace(/３/g, "3").replace(/４/g, "4").replace(/５/g, "5").replace(/６/g, "6").replace(/７/g, "7").replace(/８/g, "8").replace(/９/g, "9");
    // if (s == "") {
    //     data_sel[0] = []; //清空数据
    // } else {
    var arr = []
    arr = s.split("|");
    // }
    console.log(s)
    console.log('*********')
    if (arr[arr.length-1]=='') {
        arr.pop()
    }
    console.log(arr)
    return arr;
};
var _inputCheck_Num = function (l, e, fun, sort, {data_sel}) {
    var nums = data_sel[0].length;
    var error = [];
    var newsel = [];
    var partn = "";
    l = parseInt(l, 10);
    switch (l) {
        case 2 :
            partn = /^[0-9]{2}$/;
            break;
        case 3 :
            partn = /^[0-9\s]{3}$/;
            break;
        case 4 :
            partn = /^[0-9\s]{4}$/;
            break;
        case 5 :
            partn = /^[0-9\s]{5}$/;
            break;
        case 8 :
            partn = /^[0-9\s]{8}$/;
            break;
        case 11 :
            partn = /^[0-9\s]{11}$/;
            break;
        case 14 :
            partn = /^[0-9\s]{14}$/;
            break;
        case 17 :
            partn = /^[0-9\s]{17}$/;
            break;
        case 20 :
            partn = /^[0-9\s]{20}$/;
            break;
        case 23 :
            partn = /^[0-9\s]{23}$/;
            break;
        default:
            partn = /^[0-9]{3}$/;
            break;
    }
    
    var isfun = function (fun) {
        if (typeof fun == 'function') {
            return fun
        } else {
            return function (s) {
                return true;
            };
        }
    }
    fun = isfun(fun)
    data_sel.forEach((n,i)=> {
        // n = $.trim(n);
        if (partn.test(n) && fun(n, l)) {//合格号码
            if (sort) {
                if (n.indexOf(" ") == -1) {
                    n = n.split("");
                    n.sort(_SortNum);
                    n = n.join("");
                } else {
                    n = n.split(" ");
                    n.sort(_SortNum);
                    n = n.join(" ");
                }
            }
            data_sel[0][i] = n;
            newsel.push(n);
        } else {//不合格则注数减
            if (n.length > 0) {
                error.push(n);
            }
            nums = nums - 1;
        }
    });
    if (e == true) {
        data_sel[0] = newsel;
        return error;
    }
    return nums;
};
export function checkNum(methodname, data_sel, max_place, loc, selectType) {
    console.log(data_sel);
    // console.log(max_place);
    var nums = 0;
    var times = 1    //倍数
    var otype = selectType?selectType:'asd'    //
    // var modes = parseInt($($.lt_id_data.name_selected_mode).val(), 10);//投注模式
    // var loc=$($.lt_id_data.name_selected_location).length;
    //01:验证号码合法性并计算注数
    if (otype == 'input') {//输入框形式的检测
        if (data_sel[0].length > 0) {//如果输入的有值
            switch (methodname) {
                case 'ZX5'  :
                    nums = _inputCheck_Num(5, false,{data_sel});
                    break;
                case 'ZX4'  :
                    nums = _inputCheck_Num(4, false,{data_sel});
                    break;
                case 'QZX3'  :
                case 'HZX3'  :
                case 'ZZX3'  :
                case 'SSLZX3'  :
                    nums = _inputCheck_Num(3, false,{data_sel});
                    break;
                case 'QHHZX' :
                case 'HHHZX' :
                case 'ZHHZX' :
                case 'SSLHHZX' :
                    nums = _inputCheck_Num(3, false, _HHZXcheck, true,{data_sel});
                    break;
                case 'QZX2'  :
                case 'HZX2'  :
                case 'SSLQZX2'  :
                case 'SSLHZX2'  :
                    nums = _inputCheck_Num(2, false,{data_sel});
                    break;
                case 'QZU2'  :
                case 'HZU2'  :
                case 'SSLQZU2'  :
                case 'SSLHZU2'  :
                    nums = _inputCheck_Num(2, false, _HHZXcheck, true,{data_sel});
                    break;
                case 'SDZX3':
                    nums = _inputCheck_Num(8, false, _SDinputCheck, false,{data_sel});
                    break;
                case 'SDZU3':
                    nums = _inputCheck_Num(8, false, _SDinputCheck, true,{data_sel});
                    break;
                case 'SDZX2':
                    nums = _inputCheck_Num(5, false, _SDinputCheck, false,{data_sel});
                    break;
                case 'SDZU2':
                    nums = _inputCheck_Num(5, false, _SDinputCheck, true,{data_sel});
                    break;
                case 'SDRX1':
                    nums = _inputCheck_Num(2, false, _SDinputCheck, false,{data_sel});
                    break;
                case 'SDRX2':
                    nums = _inputCheck_Num(5, false, _SDinputCheck, true,{data_sel});
                    break;
                case 'SDRX3':
                    nums = _inputCheck_Num(8, false, _SDinputCheck, true,{data_sel});
                    break;
                case 'SDRX4':
                    nums = _inputCheck_Num(11, false, _SDinputCheck, true,{data_sel});
                    break;
                case 'SDRX5':
                    nums = _inputCheck_Num(14, false, _SDinputCheck, true,{data_sel});
                    break;
                case 'SDRX6':
                    nums = _inputCheck_Num(17, false, _SDinputCheck, true,{data_sel});
                    break;
                case 'SDRX7':
                    nums = _inputCheck_Num(20, false, _SDinputCheck, true,{data_sel});
                    break;
                case 'SDRX8':
                    nums = _inputCheck_Num(23, false, _SDinputCheck, true,{data_sel});
                    break;
                case 'SSCL4ZX':
                    nums = _inputCheck_Num(4, false,{data_sel});
                    nums=nums*loc*(loc-1)*(loc-2)*(loc-3)/24;
                    break;
                case 'SSCL3ZX':
                    nums = _inputCheck_Num(3, false,{data_sel});
                    nums=nums*loc*(loc-1)*(loc-2)/6;
                    break;
                case 'SSCL3ZU3':
                    nums = _inputCheck_Num(3, false, _ZU3inputCheck,true,{data_sel});
                    nums=nums*loc*(loc-1)*(loc-2)/6;
                    break;
                case 'SSCL3ZU6':
                    nums = _inputCheck_Num(3, false, _ZU6inputCheck,true,{data_sel});
                    nums=nums*loc*(loc-1)*(loc-2)/6;
                    break;
                case 'SSCL3HHZX' :
                    nums = _inputCheck_Num(3, false, _HHZXcheck, true,{data_sel});
                    nums=nums*loc*(loc-1)*(loc-2)/6;
                    break;
                case 'SSCL2ZX':
                    nums = _inputCheck_Num(2, false,{data_sel});
                    nums=nums*loc*(loc-1)/2;
                    break;
                case 'SSCL2ZU':
                    nums = _inputCheck_Num(2, false, _ZU2inputCheck,true,{data_sel});
                    nums=nums*loc*(loc-1)/2;
                    break;
                default   :
                    break;
            }
        }
    } else {//其他选择号码形式[暂时就数字型和大小单双]
        var tmp_nums = 1;
        switch (methodname) {//根据玩法分类不同做不同处理
            case"ZH3":
                for (var i = 0; i <= max_place; i++) {
                    if (data_sel[i].length == 0) {
                        tmp_nums = 0;
                        break;
                    }
                    tmp_nums *= data_sel[i].length;
                }
                nums = tmp_nums * parseInt(methodname.charAt(methodname.length - 1));
                break;
            case 'QZXHZ' :   //直选和值特殊算法
            case 'HZXHZ' :
            case 'ZZXHZ' :
            case 'SSLZXHZ' :
                var cc = {
                    0: 1,
                    1: 3,
                    2: 6,
                    3: 10,
                    4: 15,
                    5: 21,
                    6: 28,
                    7: 36,
                    8: 45,
                    9: 55,
                    10: 63,
                    11: 69,
                    12: 73,
                    13: 75,
                    14: 75,
                    15: 73,
                    16: 69,
                    17: 63,
                    18: 55,
                    19: 45,
                    20: 36,
                    21: 28,
                    22: 21,
                    23: 15,
                    24: 10,
                    25: 6,
                    26: 3,
                    27: 1
                };
            case 'Q2ZXHZ' :   //二码直選和
            case 'H2ZXHZ' :
                if (methodname == 'Q2ZXHZ' || methodname == 'H2ZXHZ') {
                    cc = {0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 9, 11: 8, 12: 7, 13: 6, 14: 5, 15: 4, 16: 3, 17: 2, 18: 1};
                }
            case 'QZUHZ' :   //混合组选特殊算法
            case 'HZUHZ' :
            case 'ZZUHZ' :
            case 'SSLZUHZ' :
                if (methodname == 'QZUHZ' ||
                    methodname == 'HZUHZ' ||
                    methodname == 'ZZUHZ' ||
                    methodname == 'SSLZUHZ') {
                    cc = {
                        1: 1,
                        2: 2,
                        3: 2,
                        4: 4,
                        5: 5,
                        6: 6,
                        7: 8,
                        8: 10,
                        9: 11,
                        10: 13,
                        11: 14,
                        12: 14,
                        13: 15,
                        14: 15,
                        15: 14,
                        16: 14,
                        17: 13,
                        18: 11,
                        19: 10,
                        20: 8,
                        21: 6,
                        22: 5,
                        23: 4,
                        24: 2,
                        25: 2,
                        26: 1
                    };
                }
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    for (var j = 0; j < s; j++) {
                        nums += cc[parseInt(data_sel[i][j], 10)];
                    }
                }
                break;
            case 'QZUS'  :   //组三
            case 'ZZUS'  :
            case 'HZUS'  :
            case 'SSLZUS'  :
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 1) {//组三必须选两位或者以上
                        nums += s * (s - 1);
                    }
                }
                break;
            case 'BDW3' ://五星三码
            case 'QZUL'  :   //组六
            case 'HZUL'  :
            case 'ZZUL'  :
            case 'SSLZUL'  :
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 2) {//组六必须选三位或者以上
                        nums += s * (s - 1) * (s - 2) / 6;
                    }
                }
                break;
            case 'QBDW2'  :  //二码不定位
            case 'HBDW2'  :
            case 'QZU2'   :  //2位组选
            case 'HZU2'   :
            case 'SSLQZU2'   :
            case 'SSLHZU2'   :
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 1) {//二码不定位必须选两位或者以上
                        nums += s * (s - 1) / 2;
                    }
                }
                break;
            case 'DWD5'  :   //定位胆所有在一起特殊处理
            case 'DWD4'  :
            case 'DWD3'  :
            case 'DWD2'  :
            case 'DWD1'  :
            case 'SSLDWD3'  :
            case 'SSLDWD2'  :
            case 'SSLDWD1'  :
                for (var i = 0; i <= max_place; i++) {
                    nums += data_sel[i].length;
                }
                break;
            case 'SDZX3': //山东11运前三直选
                nums = 0;
                if (data_sel[0].length > 0 && data_sel[1].length > 0 && data_sel[2].length > 0) {
                    for (var i = 0; i < data_sel[0].length; i++) {
                        for (var j = 0; j < data_sel[1].length; j++) {
                            for (k = 0; k < data_sel[2].length; k++) {
                                if (data_sel[0][i] != data_sel[1][j] && data_sel[0][i] != data_sel[2][k] && data_sel[1][j] != data_sel[2][k]) {
                                    nums++;
                                }
                            }
                        }
                    }
                }
                break;
            case 'SDZU3': //山东11运前三组选
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 2) {//组六必须选三位或者以上
                        nums += s * (s - 1) * (s - 2) / 6;
                    }
                }
                break;
            case 'SDZX2': //山动十一运前二直选
                nums = 0;
                if (data_sel[0].length > 0 && data_sel[1].length > 0) {
                    for (var i = 0; i < data_sel[0].length; i++) {
                        for (j = 0; j < data_sel[1].length; j++) {
                            if (data_sel[0][i] != data_sel[1][j]) {
                                nums++;
                            }
                        }
                    }
                }
                break;
            case 'SDZU2': //山东十一运前二组选
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 1) {//组六必须选三位或者以上
                        nums += s * (s - 1) / 2;
                    }
                }
                break;
            case 'SDBDW':
            case 'SDDWD5':
            case 'SDDWD4':
            case 'SDDWD3':
            case 'SDDDS':
            case 'SDCZW':
            case 'SDRX1': //任选1中1
                for (var i = 0; i <= max_place; i++) {
                    nums += data_sel[i].length;
                }
                break;
            case 'SDRX2': //任选2中2
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 1) {//二码不定位必须选两位或者以上
                        nums += s * (s - 1) / 2;
                    }
                }
                break;
            case 'SDRX3': //任选3中3
                for (i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 2) {//必须选三位或者以上
                        nums += s * (s - 1) * (s - 2) / 6;
                    }
                }
                break;
            case 'SDRX4': //任选4中4
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 3) {//必须选四位或者以上
                        nums += s * (s - 1) * (s - 2) * (s - 3) / 24;
                    }
                }
                break;
            case 'SDRX5': //任选5中5
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 4) {//必须选四位或者以上
                        nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) / 120;
                    }
                }
                break;
            case 'SDRX6': //任选6中6
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 5) {//必须选四位或者以上
                        nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) * (s - 5) / 720;
                    }
                }
                break;
            case 'SDRX7': //任选7中7
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 6) {//必须选四位或者以上
                        nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) * (s - 5) * (s - 6) / 5040;
                    }
                }
                break;
            case 'SDRX8': //任选8中8
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 7) {//必须选四位或者以上
                        nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) * (s - 5) * (s - 6) * (s - 7) / 40320;
                    }
                }
                break;
            case 'BJRX2': //北京快乐8 任选2
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 1) {//必须选 两位到八位
                        nums += s * (s - 1) / 2;
                    }
                }
                break;
            case 'BJRX3': //北京快乐8 任选3
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 2) {//必须选 三位到八位
                        nums += s * (s - 1) * (s - 2) / 6;
                    }
                }
                break;
            case 'BJRX4': //北京快乐8 任选4
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 3) {//必须选 四位到八位
                        nums += s * (s - 1) * (s - 2) * (s - 3) / 24;
                    }
                }
                break;
            case 'BJRX5': //北京快乐8 任选5
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 4) {//必须选 五位到八位
                        nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) / 120;
                    }
                }
                break;
            case 'BJRX6': //北京快乐8 任选6
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 5) {//必须选 六位到八位
                        nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) * (s - 5) / 720;
                    }
                }
                break;
            case 'BJRX7': //北京快乐8 任选7
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 6) {//必须选 七位到八位
                        nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) * (s - 5) * (s - 6) / 5040;
                    }
                }
                break;
            case 'pkdxds': //北京PK10 2699
                for (var i = 0; i < data_sel[0].length; i++) {
                    switch (encodeURIComponent(data_sel[0][i])) {
                        case '%E5%8D%95':
                        case '%E5%8F%8C':
                        case '%E5%A4%A7':
                        case '%E5%B0%8F':
                            nums += 4;
                            break;
                        case '%E5%92%8C':
                            nums += 1;
                            break;
                        default:
                    }
                }
                break;
            case 'pksum': //北京PK10 和值玩法 2683
                for (var i = 0; i < data_sel[0].length; i++) { //只有一列可以选的时后用这方式
                    switch (parseInt(data_sel[0][i])) {
                        case 3:
                        case 4:
                        case 18:
                        case 19:
                            nums += 2;
                            break;
                        case 5:
                        case 6:
                        case 16:
                        case 17:
                            nums += 4;
                            break;
                        case 7:
                        case 8:
                        case 14:
                        case 15:
                            nums += 6;
                            break;
                        case 9:
                        case 10:
                        case 12:
                        case 13:
                            nums += 8;
                            break;
                        case 11:
                            nums += 10;
                            break;
                        default:
                            nums += 0;
                    }
                }
                break;
            case 'pkm': //北京PK10 2690
                for (var i = 0; i <= max_place; i++) {
                    nums += data_sel[i].length; //deta_sel里面包含所有列 所按下的选项 所以计算时计算长度可得到总注数
                }
                break;
            case 'K3SUM': //江苏快3 和值 2811
                for (var i = 0; i <= data_sel[0].length; i++) {
                    switch (parseInt(data_sel[0][i])) {
                        case 3:
                        case 18:
                            nums += 1;
                            break;
                        case 4:
                        case 17:
                            nums += 3;
                            break;
                        case 5:
                        case 16:
                            nums += 6;
                            break;
                        case 6:
                        case 15:
                            nums += 10;
                            break;
                        case 7:
                        case 14:
                            nums += 15;
                            break;
                        case 8:
                        case 13:
                            nums += 21;
                            break;
                        case 9:
                        case 12:
                            nums += 25;
                            break;
                        case 10:
                        case 11:
                            nums += 27;
                            break;
                        default:
                            nums += 0;
                            break;
                    }
                }
                break;
            case 'K3SAME2': //江苏快3 二同号 2815
            case 'K3DIFF3': //江苏快3 三不同号 2817
            case 'K3DIFF2': //江苏快3 二不同号 2819
            case 'K3CONTI3': //江苏快3 三连号 2821
            case 'K3ONLY1': //江苏快3 单独一骰 2821
                for (var k = 0; k < data_sel.length; k++) {
                    if (data_sel[k].length !== 0) {
                        for (i = 0; i < data_sel[k].length; i++) {
                            nums += 1;
                        }
                    }
                    else {
                        continue;
                    }
                }
                break;
            case 'LTRXDT2'://任选二胆拖
            case 'LTRXDT3'://任选三胆拖
            case 'LTRXDT4'://任选四胆拖
            case 'LTRXDT5'://任选五胆拖
            case 'LTRXDT6'://任选六胆拖
            case 'LTRXDT7'://任选七胆拖
            case 'LTRXDT8'://任选八胆拖
                var danlen = data_sel[0].length;//胆码
                var tuolen = data_sel[1].length;//拖码
                var sellen = methodname.substring(methodname.length - 1);
                if (danlen < 1 || tuolen < 1 || danlen >= sellen) {
                    nums = 0;
                } else {
                    nums = Combination(tuolen, sellen - danlen);
                }
                break;
            case 'Q3DIFF':
            case 'H3DIFF':
            case 'Z3DIFF':
                cc = {0: 10, 1: 54, 2: 96, 3: 126, 4: 144, 5: 150, 6: 144, 7: 126, 8: 96, 9: 54};
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    for (var j = 0; j < s; j++) {
                        nums += cc[parseInt(data_sel[i][j], 10)];
                    }
                }
                break;
            case 'Q2DIFF':
            case 'H2DIFF':
                cc = {0: 10, 1: 18, 2: 16, 3: 14, 4: 12, 5: 10, 6: 8, 7: 6, 8: 4, 9: 2};
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    for (var j = 0; j < s; j++) {
                        nums += cc[parseInt(data_sel[i][j], 10)];
                    }
                }
                break;
            case 'Q3BD':
            case 'H3BD':
            case 'Z3BD':
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    for (var j = 0; j < s; j++) {
                        nums += 54;
                    }
                }
                break;
            case 'Q2BD'://時時彩二碼組選包膽
            case 'H2BD':
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    for (var j = 0; j < s; j++) {
                        nums += 9;
                    }
                }
                break;
            case 'Q2ZUXHZ'://時時彩2星组选和值
            case 'H2ZUXHZ':
                cc = {1:1, 2:1, 3:2, 4:2, 5:3, 6:3, 7:4, 8:4, 9:5, 10:4, 11:4, 12:3, 13:3, 14:2, 15:2, 16:1, 17:1};
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    for (var j = 0; j < s; j++) {
                        nums += cc[parseInt(data_sel[i][j], 10)];
                    }
                }
                break;
            case 'SSCL4ZX':
                nums=data_sel[0].length*data_sel[1].length*data_sel[2].length*data_sel[3].length;
                nums+=data_sel[0].length*data_sel[1].length*data_sel[2].length*data_sel[4].length;
                nums+=data_sel[0].length*data_sel[1].length*data_sel[3].length*data_sel[4].length;
                nums+=data_sel[0].length*data_sel[2].length*data_sel[3].length*data_sel[4].length;
                nums+=data_sel[1].length*data_sel[2].length*data_sel[3].length*data_sel[4].length;
                break;
            case 'SSCL4ZU24':
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 3) {//组24必须选4位或者以上
                        nums += s * (s - 1) * (s - 2) * (s - 3) / 24;
                    }
                }
                if(loc==5)
                {
                    nums=nums*5;
                }
                else if(loc<4)
                {
                    nums=0;
                }
                break;
            case 'SSCL4ZU12':
                var double = data_sel[0].length;//重號
                var single = data_sel[1].length;//單號
                if (double < 1 || single < 2) {
                    nums = 0;
                } else {
                    data_sel[0].forEach((n,i)=> {
                        if(inArray(n, data_sel[1]) != -1)
                        {
                            nums+=(single-1)*(single-2)/2;
                        }
                        else
                        {
                            nums+=single*(single-1)/2;
                        }
                    });
                }
                if(loc==5)
                {
                    nums=nums*5;
                }
                else if(loc<4)
                {
                    nums=0;
                }
                break;
            case 'SSCL4ZU6':
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 1) {//组6必须选2位或者以上
                        nums += s * (s - 1) / 2;
                    }
                }
                if(loc==5)
                {
                    nums=nums*5;
                }
                else if(loc<4)
                {
                    nums=0;
                }
                break;
            case 'SSCL4ZU4':
                var triple = data_sel[0].length;//重號
                var single = data_sel[1].length;//單號
                if (triple < 1 || single < 1) {
                    nums = 0;
                } else {
                    data_sel[0].forEach((n,i)=> {
                        if(inArray(n, data_sel[1]) != -1)
                        {
                            nums+=single-1;
                        }
                        else
                        {
                            nums+=single;
                        }
                    });
                }
                if(loc==5)
                {
                    nums=nums*5;
                }
                else if(loc<4)
                {
                    nums=0;
                }
                break;
            case 'SSCL3ZX':
                nums=data_sel[0].length*data_sel[1].length*data_sel[2].length;
                nums+=data_sel[0].length*data_sel[1].length*data_sel[3].length;
                nums+=data_sel[0].length*data_sel[1].length*data_sel[4].length;
                nums+=data_sel[0].length*data_sel[2].length*data_sel[3].length;
                nums+=data_sel[0].length*data_sel[2].length*data_sel[4].length;
                nums+=data_sel[0].length*data_sel[3].length*data_sel[4].length;
                nums+=data_sel[1].length*data_sel[2].length*data_sel[3].length;
                nums+=data_sel[1].length*data_sel[2].length*data_sel[4].length;
                nums+=data_sel[1].length*data_sel[3].length*data_sel[4].length;
                nums+=data_sel[2].length*data_sel[3].length*data_sel[4].length;
                break;
            case 'SSCL3ZXHZ':
                var cc = {0: 1, 1: 3, 2: 6, 3: 10, 4: 15, 5: 21, 6: 28, 7: 36, 8: 45, 9: 55, 10: 63, 11: 69, 12: 73, 13: 75, 14: 75, 15: 73, 16: 69, 17: 63, 18: 55, 19: 45, 20: 36, 21: 28, 22: 21, 23: 15, 24: 10, 25: 6, 26: 3, 27: 1};
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    for (var j = 0; j < s; j++) {
                        nums += cc[parseInt(data_sel[i][j], 10)];
                    }
                }
                nums=nums*loc*(loc-1)*(loc-2)/6;
                break;
            case 'SSCL3ZU3':
                var s = data_sel[0].length;
                nums=s*(s-1);
                nums=nums*loc*(loc-1)*(loc-2)/6;
                break;
            case 'SSCL3ZU6':
                var s = data_sel[0].length;
                nums=s*(s-1)*(s-2)/6;
                nums=nums*loc*(loc-1)*(loc-2)/6;
                break;
            case 'SSCL3ZUHZ':
                cc = {1: 1, 2: 2, 3: 2, 4: 4, 5: 5, 6: 6, 7: 8, 8: 10, 9: 11, 10: 13, 11: 14, 12: 14, 13: 15, 14: 15, 15: 14, 16: 14, 17: 13, 18: 11, 19: 10, 20: 8, 21: 6, 22: 5, 23: 4, 24: 2, 25: 2, 26: 1};
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    for (var j = 0; j < s; j++) {
                        nums += cc[parseInt(data_sel[i][j], 10)];
                    }
                }
                nums=nums*loc*(loc-1)*(loc-2)/6;
                break;
            case 'WXZU120':
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 4) {//组120必须选5位或者以上
                        nums += s * (s - 1) * (s - 2) * (s - 3) * (s - 4) / 120;
                    }
                }
                break;
            case 'WXZU60':
                var double = data_sel[0].length;//2重號*1
                var single = data_sel[1].length;//單號*3
                if (double < 1 || single < 3) {
                    nums = 0;
                } else {
                    data_sel[0].forEach((n,i)=> {
                        if(inArray(n, data_sel[1]) != -1)
                        {
                            nums+=(single-1)*(single-2)*(single-3)/6;
                        }
                        else
                        {
                            nums+=single*(single-1)*(single-2)/6;
                        }
                    });
                }
                break;
            case 'WXZU30':
                var double = data_sel[0].length;//2重號*2
                var single = data_sel[1].length;//單號*1
                if (double < 2 || single < 1) {
                    nums = 0;
                } else {
                    data_sel[1].forEach((n,i)=> {
                        if(inArray(n, data_sel[0]) != -1)
                        {
                            nums+=(double-1)*(double-2)/2;
                        }
                        else
                        {
                            nums+=double*(double-1)/2;
                        }
                    });
                }
                break;
            case 'WXZU20':
                var triple = data_sel[0].length;//3重號*1
                var single = data_sel[1].length;//單號*2
                if (triple < 1 || single < 2) {
                    nums = 0;
                } else {
                    data_sel[0].forEach((n,i)=> {
                        if(inArray(n, data_sel[1]) != -1)
                        {
                            nums+=(single-1)*(single-2)/2;
                        }
                        else
                        {
                            nums+=single*(single-1)/2;
                        }
                    });
                }
                break;
            case 'WXZU10':
                var triple = data_sel[0].length;//3重號*1
                var double = data_sel[1].length;//2重號*1
                if (triple < 1 || double < 1) {
                    nums = 0;
                } else {
                    data_sel[0].forEach((n,i)=> {
                        if(inArray(n, data_sel[1]) != -1)
                        {
                            nums+=(double-1);
                        }
                        else
                        {
                            nums+=double;
                        }
                    });
                }
                break;
            case 'WXZU5':
                var quadruple = data_sel[0].length;//4重號*1
                var single = data_sel[1].length;//單號*1
                if (quadruple < 1 || single < 1) {
                    nums = 0;
                } else {
                    data_sel[0].forEach((n,i)=> {
                        if(inArray(n, data_sel[1]) != -1)
                        {
                            nums+=(single-1);
                        }
                        else
                        {
                            nums+=single;
                        }
                    });
                }
                break;
            case 'SSCL2ZX':
                nums=data_sel[0].length*data_sel[1].length;
                nums+=data_sel[0].length*data_sel[2].length;
                nums+=data_sel[0].length*data_sel[3].length;
                nums+=data_sel[0].length*data_sel[4].length;
                nums+=data_sel[1].length*data_sel[2].length;
                nums+=data_sel[1].length*data_sel[3].length;
                nums+=data_sel[1].length*data_sel[4].length;
                nums+=data_sel[2].length*data_sel[3].length;
                nums+=data_sel[2].length*data_sel[4].length;
                nums+=data_sel[3].length*data_sel[4].length;
                break;
            case 'SSCL2ZXHZ':
                cc = {0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 9, 11: 8, 12: 7, 13: 6, 14: 5, 15: 4, 16: 3, 17: 2, 18: 1};
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    for (var j = 0; j < s; j++) {
                        nums += cc[parseInt(data_sel[i][j], 10)];
                    }
                }
                nums=nums*loc*(loc-1)/2;
                break;
            case 'SSCL2ZU':
                var s = data_sel[0].length;
                nums=s*(s-1)/2;
                nums=nums*loc*(loc-1)/2;
                break;
            case 'SSCL2ZUHZ':
                cc = {1:1, 2:1, 3:2, 4:2, 5:3, 6:3, 7:4, 8:4, 9:5, 10:4, 11:4, 12:3, 13:3, 14:2, 15:2, 16:1, 17:1};
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    for (var j = 0; j < s; j++) {
                        nums += cc[parseInt(data_sel[i][j], 10)];
                    }
                }
                nums=nums*loc*(loc-1)/2;
                break;
            case 'WXBDW3':
                var s = data_sel[0].length;
                nums=s*(s-1)*(s-2)/6;
                break;
            case 'WXBDW2':
                var s = data_sel[0].length;
                nums=s*(s-1)/2;
                break;
            case 'SXBDW2':
                var s = data_sel[0].length;
                nums=s*(s-1)/2;
                break;
            case 'SXBDW1':
                var nums = data_sel[0].length;
                break;
            case 'SXZU24':
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 3) {//组24必须选4位或者以上
                        nums += s * (s - 1) * (s - 2) * (s - 3) / 24;
                    }
                }
                break;
            case 'SXZU12':
                var double = data_sel[0].length;//重號
                var single = data_sel[1].length;//單號
                if (double < 1 || single < 2) {
                    nums = 0;
                } else {
                    data_sel[0].forEach((n,i)=> {
                        if(inArray(n, data_sel[1]) != -1)
                        {
                            nums+=(single-1)*(single-2)/2;
                        }
                        else
                        {
                            nums+=single*(single-1)/2;
                        }
                    });
                }
                break;
            case 'SXZU6':
                for (var i = 0; i <= max_place; i++) {
                    var s = data_sel[i].length;
                    if (s > 1) {//组6必须选2位或者以上
                        nums += s * (s - 1) / 2;
                    }
                }
                break;
            case 'SXZU4':
                var triple = data_sel[0].length;//重號
                var single = data_sel[1].length;//單號
                if (triple < 1 || single < 1) {
                    nums = 0;
                } else {
                    data_sel[0].forEach((n,i)=> {
                        if(inArray(n, data_sel[1]) != -1)
                        {
                            nums+=single-1;
                        }
                        else
                        {
                            nums+=single;
                        }
                    });
                }
                break;
            default     : //默认情况
                for (i = 0; i <= max_place; i++) {
                    console.log(typeof data_sel[i]);
                    if (data_sel[i].length == 0) {
                        tmp_nums = 0;
                        break;
                    }
                    tmp_nums *= data_sel[i].length;
                }
                nums = tmp_nums;
                break;
        }
    }
    //03:计算金额
    // var times = parseInt($($.lt_id_data.id_sel_times).val(), 10);
    if (isNaN(times)) {
        times = 1;
        // $($.lt_id_data.id_sel_times).val(1);

    }
    return nums
    // var money = Math.round(times * nums * 2 * ($.lt_method_data.modes[modes].rate * 1000)) / 1000;//倍数*注数*单价 * 模式
    // money = isNaN(money) ? 0 : money;
    // $($.lt_id_data.id_sel_num).html(nums);   //写入临时的注数
    // $($.lt_id_data.id_sel_money).html(money);//写临时单笔价格
}
// checkNum('ZZX3',[["6", "1", "2", "3", "8"],["6", "1", "2", "3", "8"],["6", "1", "2", "3", "8"]])
// checkNum('Z3DIFF',[["0", "1", "2", "3", "4","5"]])
// checkNum('QZXHZ',[["6", "21", "10", "12", "8"]])
// checkNum('Q3DXDS',[["0", "2"],["0", "2"],["0", "2"]])
// checkNum('QZX3',[["0", "2"],["0", "1", "4", "3", "5"],["0", "3", "5"]])
// checkNum('WXZU60',[["0", "2"],["0", "1", "4", "3", "5"]])
// console.log($);
