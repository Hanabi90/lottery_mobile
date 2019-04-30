<template>
  <div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {

  }
}

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";";
}

/**
 * 选号页面 jS处理
 * author lin
 * Sep 3th 2015
 */

function GameModel(issue,methods,userid,lotteryid){
	
	this.issue = issue;
	this.methods = methods;
    this.userid = userid;
    
    this.lotteryid = lotteryid;

    this.currentMethodCrowdIndex = 0;
	this.currentMethodGrupIndex = 0;
	this.currentMethodIndex = 0;
	
	this.currentIssueIndex = -1;
    
    this.multible = 1; //倍数
    
    this.mode = 1; //1 元 2 角 3分

    this.prizegroup = $('#id_prizegroup_input').attr('max');

    this.max_prizegroup = $('#id_prizegroup_input').attr('max');
    
    this.section_ball_model = null;
    
    this.section_size = 0;

    this.replacements={
        'K3HZDXDS':{'big':'大','small':'小','single':'单','double':'双'},
        'K3HZFH':{'dd':'大单','xs':'小双','xd':'小单','ds':'大双'},
        'K3FUN':{'aab':'对子','aaa':'豹子','abc':'顺子','acb':'杂六'}
    };

    this.init = function(methodcrowdindex,methodgroupindex,methodindex){

        this.currentIssueIndex = getCurrentIssueIndex(this.issue);
        this.currentMethodCrowdIndex = 0;
        if(methodcrowdindex!='')
        {
            this.currentMethodCrowdIndex = methodcrowdindex;
        }
        this.currentMethodGrupIndex = 0;
        if(methodgroupindex!='')
        {
            this.currentMethodGrupIndex = methodgroupindex;
        }
        this.currentMethodIndex = 0;
        if(methodindex!='')
        {
            this.currentMethodIndex = methodindex;
        }

        this.initSectionBallModel();
    
    };
    
    this.initSectionBallModel = function(){

        var layouts = this.methods[this.currentMethodGrupIndex].methods[this.currentMethodIndex].layout;
        var methodname = this.methods[this.currentMethodGrupIndex].methods[this.currentMethodIndex].methodname;
        this.section_size = layouts.length; //section的个数

        this.section_ball_model = [];
        for(i=0;i<layouts.length;i++){

            var numbers = layouts[i].no.split('|');

            var section_ball_model_i = [];

            for(j=0;j<numbers.length;j++){

                var ball = new Object();
                ball.select = 0;
                if(methodname=='pkdxds')
                {
                    numbers[j]=numbers[j].substr(0, 1);
                }
                if(this.replacements[methodname])
                {
                    ball.number=this.replacements[methodname][numbers[j]];
                }
                else
                {
                    ball.number = numbers[j];
                }

                section_ball_model_i.push(ball);
            }
            this.section_ball_model.push(section_ball_model_i);
        }
        $.each($('li[name="location"]'),function(i,n){
            if($(this).hasClass('locationButtonselect')){
                $(this).removeClass('locationButtonselect');
                $(this).addClass('locationButton');
            }
        });
    };

    this.getCurrentMethodCrowdIndex = function(){

        return this.currentMethodCrowdIndex;
    }
    
    this.getCurrentMethodGroupIndex = function(){
    
        return this.currentMethodGrupIndex;
    }
    
    
    this.changeMethod = function(cindex,gindex,mindex){
        
        if(this.currentMethodCrowdIndex == cindex && this.currentMethodGrupIndex == gindex && this.currentMethodIndex == mindex){
            return;
        }

        this.currentMethodCrowdIndex = cindex;
        this.currentMethodGrupIndex = gindex;
        this.currentMethodIndex = mindex;

        this.initSectionBallModel();
    };
    
    
    this.getCurrentMethodIndex = function(){
       return this.currentMethodIndex;
      
    }
    
    
    this.getCurrentMethod = function(){

       return this.methods[this.currentMethodGrupIndex].methods[this.currentMethodIndex];
    
    }
    
    this.getCurrentMethodGroup = function(){
    
       return this.methods[this.currentMethodGrupIndex];
    }
    
    
    this.getCurrentMothodGroupName= function(){
       return this.methods[this.currentMethodGrupIndex].gtitle;
      
    };    
    
    this.getCurrentMothodName= function(){
       return this.methods[this.currentMethodGrupIndex].methods[this.currentMethodIndex].title;
      
    };
    
    this.getCurrentIssueIndex = function(){
       
        if(this.currentIssueIndex > (this.issue.length-1)){
            this.currentIssueIndex = -1;
        }
        
        return this.currentIssueIndex;
        
        
    };
    
    //判读是否为最后1期
    this.isLastIssue = function(){
        return  (this.currentIssueIndex+1) > (this.issue.length-1);
      
    };
    
    this.setCurrentIssueIndex = function(index){
        this.currentIssueIndex = index;
    
    };
    
    
    this.getCurrentIssue = function(){
      
        
        if(this.currentIssueIndex == -1){
           return null;
        }
        
        return this.issue[this.currentIssueIndex].issue;
      
    };
    
    this.getCurrentIssueEndTime = function(){
    
        if(this.currentIssueIndex == -1){
           return null;
        }
        return parseInt(this.issue[this.currentIssueIndex].saleend) * 1000;
    
    };
    
    
    this.getSectionBallModel = function(section){
        return this.section_ball_model[section-1];
    }
    
    this.selectBall = function(section,index){

       if(this.getCurrentMethod().type === 'digital'){
         this.checkOnSelect(section,this.getSectionBallModel(section)[index]);
       
       }else{
          if(this.getSectionBallModel(section)[index].number.split("\r\n").length == 2){
          
              this.getSectionBallModel(section)[index].number = this.getSectionBallModel(section)[index].number.substring(0,1);
             
          }
       }
       this.section_ball_model[section-1][index].select = 1;
    }
    
    
    this.getChoosedCountInSection = function(section){
    
       var i = 0;
        
       var sectionmodel  = this.getSectionBallModel(section);
        
       for(var j=0;j<sectionmodel.length;j++){
       
           if(sectionmodel[j].select == 1){
                i++;
           }
       }
        
        return i;
       
    
    }
    
    
    
    this.getTotal = function(toCart){
    
       var choose = [];
        if(this.section_size>0){
            for(var i = 0 ; i< this.section_size;i++){

                var choose_i = [];

                for(var j = 0;j<this.section_ball_model[i].length;j++){

                    if(this.section_ball_model[i][j].select === 1)
                        choose_i.push(this.section_ball_model[i][j].number);

                }

                choose.push(choose_i);

            }
        }else if(this.section_ball_model[0]){
            //單式
            choose=this.section_ball_model[0];
        }

        var total = getTotals(this.getCurrentMethod().type,this.getCurrentMethod().methodname,choose,toCart);
        return total;
    
    }
    
    //获取选号
    this.getSelectNumber = function(){
        
        var project = {};
        project.times = this.multible;   //倍数
        project.mode = this.mode;
        project.methodid = this.getCurrentMethod().methodid;
        project.methodname = this.getCurrentMethod().methodname;
        project.nums = this.getTotal(false);
        project.money = this.getTotalAmount(project.nums);
        SelectCodes = this.getSelectCodes();
        project.codes = SelectCodes[0];
        nos = SelectCodes[1];

        var re = /,{1,}|&/g;
        nos = nos.replace(re, ',').replace(/^,/, "").replace(/,$/, "");

        //胆拖
        if (this.getCurrentMethod().selectarea.isDanTuo) {
            nos = "[胆 " + nos
        }

        tmp_location=[];
        $.each($('li[name="location"].locationButtonselect'), function () {
            tmp_location.push($(this).attr('id'));
        });
        project.location=tmp_location.join(",");
        if(project.location)
        {
            nos='['+tmp_location.join(",")+'] '+nos;
        }

        var noshtml = '[' + this.getCurrentMethodGroup().gtitle + '_' + this.getCurrentMethod().title + '] ' + nos.substring(0, 37);

        project.desc = noshtml;
        project.type =  this.getCurrentMethod().type;
        project.point = (this.max_prizegroup-this.prizegroup)/20;
        project.point=project.point.toFixed(1);

        return project;
        
        
    };

    
    //总金额
    this.getTotalAmount = function(nums){
        
        
        if(nums == 0){return 0.00;}
        
        var amount = 0.00;
        var straightbet = 2.00;
        if(this.mode === 1){
        }else if(this.mode === 2){
            straightbet = 0.20;
        }else if(this.mode === 3){
            straightbet = 0.02;
        }
        
        amount = nums * this.multible * straightbet;
        
        amount = parseFloat(amount.toFixed(2));        
        
        return amount;
    
    }

    //选号
    var type='';
    this.getSelectCodes = function(){

        var method = this.getCurrentMethod();//获取当前玩法
        var methodname = method.methodname;
        var nos = method.show_str;
        var sp= method.code_sp;
        type = method.type;
        var temp = [];

        if(type=='input'){
            this.section_size=1;
        }
        for (var i = 0; i < this.section_size; i++)
        {
            var data_sel = [];
            for (var j = 0; j < this.section_ball_model[i].length; j++) {
                if (this.section_ball_model[i][j].select === 1) {
                    data_sel.push(this.section_ball_model[i][j].number);
                }
                else if(type=='input'){
                    data_sel.push(this.section_ball_model[i][j]);
                }
            }

            // 快三 大小/单双、趣味特殊处理
            if(['SSCL4ZX','SSCL3ZX','SSCL2ZX'].indexOf(methodname)!=-1){
                if(data_sel!='') {
                    nos = nos.replace('X', data_sel.sort(_SortNum).join(sp));
                } else {
                    nos = nos.replace('X', '-');
                }
                temp.push(data_sel.sort(_SortNum).join("&"));
            } else {
                nos = nos.replace('X', data_sel.sort(_SortNum).join(sp));
                temp.push(data_sel.sort(_SortNum).join("&"));
            }
        }

        return [temp.join("|"),nos];
    }

    //数字大小排序
    _SortNum = function (a, b) {
        if (type != 'input') {
            a = a.replace(/5单0双/g, 0).replace(/4单1双/g, 1).replace(/3单2双/g, 2).replace(/2单3双/g, 3).replace(/1单4双/g, 4).replace(/0单5双/g, 5);
            a = a.replace(/大/g, 0).replace(/小/g, 1).replace(/单/g, 2).replace(/双/g, 3).replace(/\s/g, "");
            a = a.replace(/豹子/g, 0).replace(/顺子/g, 1).replace(/对子/g, 2).replace(/半顺/g, 3).replace(/杂六/g, 4);
            a = a.replace(/大单/g, 0).replace(/小双/g, 1).replace(/小单/g, 2).replace(/大双/g, 3);
            b = b.replace(/5单0双/g, 0).replace(/4单1双/g, 1).replace(/3单2双/g, 2).replace(/2单3双/g, 3).replace(/1单4双/g, 4).replace(/0单5双/g, 5);
            b = b.replace(/大/g, 0).replace(/小/g, 1).replace(/单/g, 2).replace(/双/g, 3).replace(/\s/g, "");
            b = b.replace(/豹子/g, 0).replace(/顺子/g, 1).replace(/对子/g, 2).replace(/半顺/g, 3).replace(/杂六/g, 4);
            b = b.replace(/大单/g, 0).replace(/小双/g, 1).replace(/小单/g, 2).replace(/大双/g, 3);
        }
        a = parseInt(a, 10);
        b = parseInt(b, 10);
        if (isNaN(a) || isNaN(b)) {
            return true;
        }
        return (a - b);
    }

    
    this.getLastSelectNumIndexInModel = function(model){
    
        for(var i=model.length-1;i>=0;i--){
          
            if(model[i].select === 1){
               return i;
            }
        
        }
        
        return -1;
    
    }
    
    
    this.checkOnSelect = function(section,ball){
        
        var section_1_model = this.getSectionBallModel(1);
        
        var section_2_model = this.getSectionBallModel(2);

        var methodname = this.getCurrentMethod();
            
        if(this.getCurrentMothodGroupName().indexOf('胆拖') !== -1){
        
        
            if(section === 1){
            
                var methodname = this.getCurrentMothodName();
                
                var choosedCountInSection = this.getChoosedCountInSection(section);
                
                if((methodname.indexOf('二')!==-1 && choosedCountInSection>= 1)
                    ||(methodname.indexOf('三')!==-1 && choosedCountInSection>= 2)
                    ||(methodname.indexOf('四')!==-1 && choosedCountInSection>= 3)
                      ||(methodname.indexOf('五中五')!==-1 && choosedCountInSection>= 4)
                        ||(methodname.indexOf('六')!==-1 && choosedCountInSection>= 5)
                          ||(methodname.indexOf('七')!==-1 && choosedCountInSection>= 6)
                            ||(methodname.indexOf('八')!==-1 && choosedCountInSection>= 7)){
                
                   section_1_model[this.getLastSelectNumIndexInModel(section_1_model)].select = 0;
                   
                   this.unSelectNumInModel(section_2_model,ball.number);
                   
                
                }else if(this.isModelContainSelectNum(section_2_model,ball.number)){
                    
                   this.unSelectNumInModel(section_2_model,ball.number);
                    
                }
            
            }else if(section === 2){
            
                if(this.isModelContainSelectNum(section_1_model,ball.number)){
                    
                   this.unSelectNumInModel(section_1_model,ball.number);
                    
                }
            }
            
        }else if (['Q3BD','H3BD','Z3BD','Q2BD','H2BD'].indexOf(methodname.methodname) !== -1) {
            var choosedCountInSection = this.getChoosedCountInSection(section);

            if (choosedCountInSection >= 1){
                section_1_model[this.getLastSelectNumIndexInModel(section_1_model)].select = 0;
            }
        }
    
    }
    
    
    this.unselectBall = function(section,index){
        
       if(this.getCurrentMethod().type !== 'digital'){
       
          if(this.getSectionBallModel(section)[index].number.split("\r\n").length == 2){
          
              this.getSectionBallModel(section)[index].number = this.getSectionBallModel(section)[index].number.substring(0,1);
             
          }           
           
       }
        
       this.section_ball_model[section-1][index].select = 0;
    
    }
    
    
    this.unSelectNumInModel = function(sectionmodel,num){
        for(var i=0;i<sectionmodel.length;i++){
           if(sectionmodel[i].number === num){
               sectionmodel[i].select = 0;
               //break;
           }
        }    
    }
    
    this.isModelContainSelectNum = function(sectionmodel,num){
        
        for(var i=0;i<sectionmodel.length;i++){
           if(sectionmodel[i].number === num && sectionmodel[i].select === 1){
                return true;
           }
        }
        
        return false;
    
    }
    
    
    this.checkDangTuo = function(number,section){
        var section_1_model = this.getSectionBallModel(1);

        var section_2_model = this.getSectionBallModel(2);

        if(this.getCurrentMothodGroupName().indexOf('胆拖') !== -1){
            if(section==2) {
                this.unSelectNumInModel(section_1_model,number);
            }else if(section==1){
                this.unSelectNumInModel(section_2_model,number);
            }
        }
    
    }
    
    
    this.selectBigInSection = function(section){

        var section_i = this.section_ball_model[section-1];
        
        var count = 0;
        for(var i=0;i<section_i.length;i++){
            
            if((count++)>=(Math.ceil(section_i.length/2))){
            
                //TODO 胆拖的特别处理......
                
                this.checkDangTuo(section_i[i].number,section);
                section_i[i].select = 1;
            }else{
                section_i[i].select = 0;
            }
        
        }    
    }
    
    
    this.selectSmallInSection = function(section){
            
        var section_i = this.section_ball_model[section-1];
        
        var count = 0;
        
        for(var i=0;i<section_i.length;i++){
            
            if((count++)<(Math.floor(section_i.length/2))){
            
                //TODO 胆拖的特别处理......
                this.checkDangTuo(section_i[i].number,section);
                section_i[i].select = 1;
            }else{
                section_i[i].select = 0;
            }
        
        }    
    }    
    
    
    this.selectEvenInSection = function(section){
    
        var section_i = this.section_ball_model[section-1];
        
        
        for(var i=0;i<section_i.length;i++){
            
            if(parseInt(section_i[i].number)%2!==0){
            
                //TODO 胆拖的特别处理......
                this.checkDangTuo(section_i[i].number,section);
                section_i[i].select = 1;
            }else{
                section_i[i].select = 0;
            }
        
        }      
    };
    
    
    this.selectOddInSection = function(section){
    
        var section_i = this.section_ball_model[section-1];
        
        
        for(var i=0;i<section_i.length;i++){
            
            if(parseInt(section_i[i].number)%2===0){
            
                //TODO 胆拖的特别处理......
                this.checkDangTuo(section_i[i].number,section);
                section_i[i].select = 1;
            }else{
                section_i[i].select = 0;
            }
        
        }      
    };
        
    
    
    
    this.selectAllInSection = function(section){
        
        var section_i = this.section_ball_model[section-1];
        
        
        //TODO 拖胆特别处理
        
        for(var i=0;i<section_i.length;i++){
            this.checkDangTuo(section_i[i].number,section);
            section_i[i].select = 1;
            
            
            if(section_i[i].number.split("\r\n").length==2){
                 section_i[i].number = section_i[i].number.substring(0,1);
            }
        
        }
    
    };
    
    this.unselectAllInSection = function(section){
        
        var section_i = this.section_ball_model[section-1];
        
        for(var i=0;i<section_i.length;i++){
            section_i[i].select = 0;
        
        }
    
    };    
    

}





function GameController(issue,methods,userid,lotteryid,menuid){

    this.gameModel = new GameModel(issue,methods,userid,lotteryid);
    
    this.mystorage = new MyStorage();
    
    this.userid = userid;
    
    this.lotteryid = lotteryid;
    
    this.menuid = menuid;
    
    this.intervalid = null;
    
    this.badgeintervalid = null;
    
    this.issueElement = null;
    
    this.timeElement = null;
    
    this.methodTitleElement = null;
    
    this.badgeElement = null;
    
    
    this.numlabel = null;
    
    this.multiplabel = null;
    
    this.modelabel = null;
    
    this.totalamountlabel = null;

    
    this.projectExpireDay  = 2; //选号保留的时间

    this.showNumberInCart = function(badgeElement, savedProjCount){
        badgeElement.html(''+savedProjCount);
        badgeElement.show();
    }
    
    this.begin = function(methodcrowdindex,methodgroupindex,methodindex){
         
        this.gameModel.init(methodcrowdindex,methodgroupindex,methodindex); //初始化数据
        
        //填充奖期
        this.issueElement = $('#id_issue_label');
        
        this.timeElement = $('#id_lefttime_label');
        
        this.methodTitleElement = $('#id_methodtitle_label');
        
        this.badgeElement = $('#id_card_badge_i');

        this.numlabel = $('#id_num_label');

        this.multiplabel = $('#id_multiple_label');

        this.modelabel = $('#id_mode_label');

        this.totalamountlabel = $('#id_amount_label');

        this.setCurrentPrizeGroup($('#id_prizegroup_input').val());
        this.setMaxPrizeGroup($('#id_prizegroup_input').val());

        if(this.gameModel.getCurrentIssue() == null){
            
            showPopupWindow("对不起，没有奖期.",function(){
                history.back();
            });
            return;
        }
        
        var savedProjCount = this.mystorage.getBetProjectCount(this.userid,this.lotteryid);

        this.showNumberInCart(this.badgeElement, ''+savedProjCount);

        this.issueElement.html('第<span class="strong16101">'+this.gameModel.getCurrentIssue()+'</span>期');

        var method=this.gameModel.getCurrentMethod();
        setCookie('defautlMethodId', method.methodid);
        setCookie('defautlType', method.type);
        this.initSelectNumView();//初始化选号界面
        
        var self = this;
        self.countIssueLeftTime(self.gameModel);
        this.intervalid = window.setInterval(function(){self.countIssueLeftTime(self.gameModel)},1000);
        
        this.badgeintervalid = window.setInterval(function(){
        
             self.refreshBadge();
        
        },1000);

    };
    
    
    this.refreshBadge = function(){
    
        var savedProjCount = this.mystorage.getBetProjectCount(this.userid,this.lotteryid);
        this.showNumberInCart(this.badgeElement, ''+savedProjCount);

    };
    
    
    
    this.updateSelectedDescrip = function(){
        
        var total = this.gameModel.getTotal(false);

        this.numlabel.html(total);
    
        this.multiplabel.html(this.gameModel.multible);
        
        var mode = this.gameModel.mode;
        
        var modestr =( mode == 1 ? '元':(mode == 2?'角':'分'));

        this.modelabel.html(modestr);

        this.totalamountlabel.html(this.gameModel.getTotalAmount(total));

        return total;
    }
    
    
    this.updateBallUi = function(section,model){

        var section_model = model.getSectionBallModel(section);
        
        if(typeof(section_model) === 'undefined'){
        
            return;
        }
        
        
        var ballli = $('#id_ball_container_'+section+' li');
        
        var index = 0;
        
        ballli.each(function(number,obj){
            
            
            if(section_model[index].select == 1){
            
                if($(obj).hasClass('ball')){
                    $(obj).removeClass('ball');
                    $(obj).addClass('ballselect');
                }else if($(obj).hasClass('rect')){
                    $(obj).removeClass('rect');
                    $(obj).addClass('rectselect');            
                }else if($(obj).hasClass('dicerect')){
                    $(obj).removeClass('dicerect');
                    $(obj).addClass('dicerectselect');
                }else if($(obj).hasClass('bigrect')){
                    $(obj).removeClass('bigrect');
                    $(obj).addClass('bigrectselect');
                }else if($(obj).hasClass('bigrect2')){
                    $(obj).removeClass('bigrect2');
                    $(obj).addClass('bigrect2select');
                }else if($(obj).hasClass('longrect')){
                    $(obj).removeClass('longrect');
                    $(obj).addClass('longrectselect');
                }

            }else{
            
                if($(obj).hasClass('ballselect')){
                    $(obj).removeClass('ballselect');
                    $(obj).addClass('ball');
                }else if($(obj).hasClass('rectselect')){
                    $(obj).removeClass('rectselect');
                    $(obj).addClass('rect');            
                }else if($(obj).hasClass('dicerectselect')){
                    $(obj).removeClass('dicerectselect');
                    $(obj).addClass('dicerect');
                }else if($(obj).hasClass('bigrectselect')){
                    $(obj).removeClass('bigrectselect');
                    $(obj).addClass('bigrect');
                }else if($(obj).hasClass('bigrect2select')){
                    $(obj).removeClass('bigrect2select');
                    $(obj).addClass('bigrect2');
                }else if($(obj).hasClass('longrectselect')){
                    $(obj).removeClass('longrectselect');
                    $(obj).addClass('longrect');
                }
            }
            index++;
        
        });          
        
        
    }
    

    
    this.selectClear = function(section,model,controller){

        model.unselectAllInSection(section);
        
        controller.updateBallUi(section,model);   
        
        controller.updateSelectedDescrip();
        

    }
    
    this.selectBig = function(section,model,controller){
    
        model.selectBigInSection(section);

        for(i=1;i<=model.getCurrentMethod().layout.length;i++){
            controller.updateBallUi(i,model);
        }
        
        controller.updateSelectedDescrip();
        
    
    };
    
    
    this.selectSmall = function(section,model,controller){
        
        model.selectSmallInSection(section);

        for(i=1;i<=model.getCurrentMethod().layout.length;i++){
            controller.updateBallUi(i,model);
        }

        controller.updateSelectedDescrip();
    
    };
    
    
    this.selectAll = function(section,model,controller){
    
        model.selectAllInSection(section);

        for(i=1;i<=model.getCurrentMethod().layout.length;i++){
            controller.updateBallUi(i,model);
        }

        controller.updateSelectedDescrip();
    
    };
    
    this.selectEven = function(section,model,controller){
    
        model.selectEvenInSection(section);

        for(i=1;i<=model.getCurrentMethod().layout.length;i++){
            controller.updateBallUi(i,model);
        }
        
        controller.updateSelectedDescrip();
    };
    
    
    this.selectOld = function(section,model,controller){
    
        model.selectOddInSection(section);

        for(i=1;i<=model.getCurrentMethod().layout.length;i++){
            controller.updateBallUi(i,model);
        }

        controller.updateSelectedDescrip();
    };
    
    
    this.selectBall = function(section,index,model,controller){
     
        model.selectBall(section,index);

        for(i=1;i<=model.getCurrentMethod().layout.length;i++){
            controller.updateBallUi(i,model);
        }
        
        controller.updateSelectedDescrip();

    }
    
    
    this.unselectBall = function(section,index,model,controller){
     
        model.unselectBall(section,index);
        
        controller.updateSelectedDescrip();
    
    }

    this._input_deal = function(element,model)
    {
        var method = model.getCurrentMethod();//获取当前玩法
        var methodname = method.methodname;
        var s=$.trim($(element).val());
        s = $.trim(s.replace(/[^\s\r,;，；　０１２３４５６７８９0-9]/g, ""));
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
        if (s == "") {
            model.section_ball_model[0] = []; //清空数据
        } else {
            model.section_ball_model[0] = s.split("|");
        }
        return m;
    }
    
    this.shortCutFuntion = [this.selectBig,this.selectSmall,this.selectAll,this.selectEven,this.selectOld,this.selectClear];    

    //根据当前的玩法 初始化选号界面
    this.initSelectNumView = function()
    {
        var method = this.gameModel.getCurrentMethod();//获取当前玩法
        var layouts = method.layout;
        var methodname = method.methodname;
        if(method.type=='input')
        {
            //隱藏按鈕、顯示填號表單
            for(i=1;i<=10;i++)
            {
                $('#id_section_'+i).hide();
                $('#id_shortcut_'+i+'_div ul li').hide();
            }
            $('#id_section_textarea').show();

            //隱藏隨機下注
            $('#id_rand_sel_btn').hide();

            //重置位置按鈕
            $('#id_section_98').hide();
            $('#id_ball_container_99').empty();

            //input 位置
            if(['SSCL4ZX','SSCL3ZX','SSCL3ZU3','SSCL3ZU6','SSCL3HHZX','SSCL2ZX','SSCL2ZU'].indexOf(methodname)!=-1)
            {
                $('.locationContainer').show();
                $('.inputarea').attr('rows',$('.inputarea').attr('min'));
                $('#id_ball_container_99').append(
                    '<li name="location" class="locationButton" id="万位">万</li>' +
                    '<li name="location" class="locationButton" id="千位">千</li>' +
                    '<li name="location" class="locationButton" id="百位">百</li>' +
                    '<li name="location" class="locationButton" id="十位">十</li>' +
                    '<li name="location" class="locationButton" id="个位">个</li>'
                );
            }
            else
            {
                $('.locationContainer').hide();
                $('.inputarea').attr('rows',$('.inputarea').attr('max'));
            }

            this.gameModel.section_ball_model[0]=[];

            $('textarea[name="name_input_li"]').val('');
            if(lotterytype==0) {
                $('#id_arearule').html('号码之间请不要隔开，每注之间请用一个 空格[ ]、逗号[,] 或者 分号[;] 隔开，例：123, 234');
            }else if(lotterytype==2){
                $('#id_arearule').html('号码之间请用一个 空格[ ]隔开，每注之间请用一个逗号[,] 或者 分号[;] 隔开，例：01 02 03, 03 09 11');
            }
        }else{
            //隱藏填號表單
            $('#id_section_textarea').hide();

            //顯示隨機下注
            $('#id_rand_sel_btn').show();

            //重置位置按鈕
            $('#id_ball_container_98').empty();

            //digital 位置
            if(['SSCL4ZU24','SSCL4ZU12','SSCL4ZU6','SSCL4ZU4','SSCL3ZXHZ','SSCL3ZU3','SSCL3ZU6','SSCL3ZUHZ','SSCL2ZXHZ','SSCL2ZU','SSCL2ZUHZ'].indexOf(methodname)!=-1)
            {
                $('#id_section_98').show();
                $('#id_ball_container_98').append(
                    '<li name="location" class="locationButton" id="万位">万</li>' +
                    '<li name="location" class="locationButton" id="千位">千</li>' +
                    '<li name="location" class="locationButton" id="百位">百</li>' +
                    '<li name="location" class="locationButton" id="十位">十</li>' +
                    '<li name="location" class="locationButton" id="个位">个</li>'
                );
            }
            else
            {
                $('#id_section_98').hide();
            }

            $('.shortcut ul li').show();
            for(i=1;i<=10;i++)
            {
                if(i<=layouts.length)
                {
                    var numbers = layouts[i-1].no.split('|');
                    $('#id_section_'+i).show();

                    var title='';
                    if(methodname=='K3SAME2')
                    {
                        //置換標題成骰子
                        var templayout=layouts[i-1].title.split(',');
                        for(j=0;j<templayout.length;j++)
                        {
                            title+='<span class="dice-'+templayout[j]+' smalldice" style="margin-right: 2px;">'+templayout[j]+'</span>';
                        }
                    }
                    else
                    {
                        title=layouts[i-1].title;
                    }
                    $('#id_layout_title_label_'+i).html(title);

                    $(".shortcut ul li[name='shortcut"+i+"']").show();
                    if(method.type === 'digital' || methodname=='K3SUM')
                    {
                        var ballClassName = 'ball';
                    }
                    else if(methodname=='SDDDS')
                    {
                        var ballClassName = 'longrect';
                    }
                    else
                    {
                        var ballClassName = 'rect';
                    }

                    var ballhtml = '';
                    var replaceCode='';
                    for(j=0;j<numbers.length;j++)
                    {
                        //按鈕內容換行1
                        if(methodname=='pkdxds') {
                            if(numbers[j].indexOf('&&')!=-1)
                            {
                                replaceCode=",";
                                var tnum=numbers[j].split('&&');
                                tnum[1]="<font style='font-size:25px;color:#484848;'>"+tnum[1]+"</font>";
                                numbers[j]=tnum.toString();
                            }
                        }else if(methodname=='BJHZDX' || methodname=='BJSXP' || methodname=='BJJOP')
                        {
                            replaceCode="\r\n";
                        }
                        else if(this.gameModel.replacements[methodname])
                        {
                            numbers[j]=this.gameModel.replacements[methodname][numbers[j]];
                        }

                        //按鈕內容換行2
                        if(replaceCode!='')
                        {
                            if(numbers[j].indexOf(replaceCode)!=-1)
                            {
                                ballClassName = 'bigrect';
                                numbers[j]=numbers[j].replace(replaceCode, "<br>");
                            }
                            else
                            {
                                ballClassName = 'bigrect2';
                            }
                        }

                        //按鈕賠率不同
                        if(methodname=='K3HZFH') {
                            ballClassName = 'bigrect';
                            numbers[j]+="<br><font id='special_"+j+"' style='font-size:25px;color:#484848;'>奖金 0.0000</font>";
                        }else if(methodname=='K3FUN'){
                            ballClassName = 'bigrect';
                            numbers[j]+="<br><font id='special_"+j+"' style='font-size:25px;color:#484848;'>奖金 0.0000</font>";
                        }else if(['Q3SPEC','H3SPEC','Z3SPEC'].indexOf(methodname)!=-1){
                            ballClassName = 'bigrect';
                            numbers[j]+="<br><font id='special_"+j+"' style='font-size:25px;color:#484848;'>奖金 0.0000</font>";
                        }

                        //置換骰子圖
                        if(["K3SAME3","K3SAME2","K3DIFF3","K3DIFF2","K3CONTI3","K3ONLY1"].indexOf(methodname)!=-1)
                        {
                            var tempNumber=numbers[j].split('');
                            numbers[j]='';
                            if(methodname=='K3SAME2' && tempNumber.length==2)
                            {
                                numbers.splice(j, 1);
                                continue;
                            }
                            switch(tempNumber.length)
                            {
                                case 1:
                                    ballClassName = 'dicerect countdice1';
                                    break;
                                case 2:
                                    ballClassName = 'dicerect countdice2';
                                    break;
                                default:
                                    ballClassName = 'dicerect countdice3';
                                    break;
                            }
                            for(k=0;k<tempNumber.length;k++)
                            {
                                numbers[j]+='<span class="dice-'+tempNumber[k]+' dice" style="margin-right: 2px;">'+tempNumber[k]+'</span>';
                            }
                        }

                        ballhtml+=('<li name=\"name_ball_li\" class=\"'+ballClassName+'\">'+numbers[j]+'</li>');

                    }

                    $('#id_ball_container_'+i).html(ballhtml);

                    //大小單雙全清
                    if(method.type=='jsk3' || method.type=='dxds' || method.type=='pklmp')
                    {
                        $(".redshortcutnoselect[name='shortcut"+i+"']").hide();
                    }
                    else
                    {
                        if (method.type=='dds' || method.selectarea.isButton !== true || (method.selectarea.isDanTuo==true && layouts[i-1].place != 1))
                        {
                            $('#id_shortcut_'+i+'_div ul li').hide();
                        }
                    }
                }
                else
                {
                    $('#id_section_'+i).hide();
                }
            }
        }
        this.changePrizeInbutton();

        //調整模式、倍率、獎金組欄位高
        newbottom = parseInt($('#beishuselectcontainer').css('height'));
        newbottom-= parseInt($('#id_content_container').css('height'));
        newbottom+= parseInt($('.bottomContainer').css('height'));
        if(newbottom<0)
        {
            $('#beishuselectcontainer').css('bottom',newbottom);
        }
        
        var self = this;
        
        $("li[name='name_ball_li']").click(function(){

             var section = $(this).parent().attr('section');
            
             var index = $(this).parent().children().index($(this));
            

             if($(this).hasClass('ball')){
                $(this).removeClass('ball');
                $(this).addClass('ballselect');
                self.selectBall(parseInt(section),index,self.gameModel,self);
             } else if($(this).hasClass('ballselect')){
                $(this).removeClass('ballselect');
                $(this).addClass('ball');
                self.unselectBall(parseInt(section),index,self.gameModel,self);
             } else if($(this).hasClass('rect')){
                $(this).removeClass('rect');
                $(this).addClass('rectselect');
                self.selectBall(parseInt(section),index,self.gameModel,self);
             } else if($(this).hasClass('rectselect')){
                $(this).removeClass('rectselect');
                $(this).addClass('rect');
                 self.unselectBall(parseInt(section),index,self.gameModel,self);
             } else if($(this).hasClass('dicerect')){
                 $(this).removeClass('dicerect');
                 $(this).addClass('dicerectselect');
                 self.selectBall(parseInt(section),index,self.gameModel,self);
             } else if($(this).hasClass('dicerectselect')){
                 $(this).removeClass('dicerectselect');
                 $(this).addClass('dicerect');
                 self.unselectBall(parseInt(section),index,self.gameModel,self);
             } else if($(this).hasClass('bigrect')){
                 $(this).removeClass('bigrect');
                 $(this).addClass('bigrectselect');
                 self.selectBall(parseInt(section),index,self.gameModel,self);
             } else if($(this).hasClass('bigrectselect')){
                 $(this).removeClass('bigrectselect');
                 $(this).addClass('bigrect');
                 self.unselectBall(parseInt(section),index,self.gameModel,self);
             }else if($(this).hasClass('bigrect2')){
                 $(this).removeClass('bigrect2');
                 $(this).addClass('bigrect2select');
                 self.selectBall(parseInt(section),index,self.gameModel,self);
             } else if($(this).hasClass('bigrect2select')){
                 $(this).removeClass('bigrect2select');
                 $(this).addClass('bigrect2');
                 self.unselectBall(parseInt(section),index,self.gameModel,self);
             }else if($(this).hasClass('longrect')){
                 $(this).removeClass('longrect');
                 $(this).addClass('longrectselect');
                 self.selectBall(parseInt(section),index,self.gameModel,self);
             } else if($(this).hasClass('longrectselect')){
                 $(this).removeClass('longrectselect');
                 $(this).addClass('longrect');
                 self.unselectBall(parseInt(section),index,self.gameModel,self);
             }
        });

        $("li[name='location']").click(function(){

            if($(this).hasClass('locationButton')){
                $(this).removeClass('locationButton');
                $(this).addClass('locationButtonselect');
            } else if($(this).hasClass('locationButtonselect')){
                $(this).removeClass('locationButtonselect');
                $(this).addClass('locationButton');
            }
        });
       
        
        $(".shortcut ul li").click(function(){

            var index = $(this).parent().children().index($(this));
            
            var section = $(this).parent().attr('section');
            self.shortCutFuntion[index](parseInt(section),self.gameModel,self);

        });

        $("textarea[name='name_input_li']").change(function () {//输入框时时变动处理
            var s = self._input_deal(this,self.gameModel);
            $(this).val(s);
            self.updateSelectedDescrip();
        }).keyup(function () {
            self._input_deal(this,self.gameModel);
            self.updateSelectedDescrip();
        });
        $("li[name='location']").click(function () {//位置按鈕时时变动处理
            var method=self.gameModel.getCurrentMethod();
            if(method.type=='input')
            {
                textarea="textarea[name='name_input_li']";
                var s = self._input_deal(textarea,self.gameModel);
                $(textarea).val(s);
            }
            self.updateSelectedDescrip();
        });
        $("li[name='input_duplicate']").click(function(){
            var err = self.dumpNum(true);
            if (err.length > 0) {//如果有重复号码
                self.updateSelectedDescrip();
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
                        $("textarea[name='name_input_li']").val(self.gameModel.section_ball_model[0].join(";"));
                        showPopupWindow('已删除以下重复号码:\r\n' + err.join(";"), function() {});
                        break;
                    default      :
                        $("textarea[name='name_input_li']").val(self.gameModel.section_ball_model[0].join(" "));
                        showPopupWindow('已删除以下重复号码:\r\n' + err.join(" "), function() {});
                        break;
                }
            } else {
                showPopupWindow('没有重复号码', function() {});
            }
        });
        $("li[name='input_clean']").click(function(){
            self.gameModel.section_ball_model[0] = []; //清空数据
            $("textarea[name='name_input_li']").val('');
            self.updateSelectedDescrip();
        });
    };

    this.changePrizeInbutton = function(){
        var method = this.gameModel.getCurrentMethod();//获取当前玩法
        var mode=this.getCurrentMode();
        var multiple=this.getCurrentMultiple();
        var prizegroup=this.getCurrentPrizeGroup();
        var max_prizegroup = this.getMaxPrizeGroup();

        var point=(max_prizegroup-prizegroup)/20;
        point=point.toFixed(1);
        $('#id_font_point').html(point+'%');

        var prize=0;
        if(method.prize_level_special.length==1) {
            $('#id_font_prize').html(this.getPrize(method.prize_level_special[0],mode,multiple,prizegroup));
        }else {
            var maxprize=this.getPrize(Math.max.apply(Math,method.prize_level_special),mode,multiple,prizegroup);
            var minprize=this.getPrize(Math.min.apply(Math,method.prize_level_special),mode,multiple,prizegroup);
            $('#id_font_prize').html(minprize+'~'+maxprize);

            var methodname=method.methodname;
            for(m=0;m<$('li[name="name_ball_li"]').length;m++) {
                prize=0;
                if(methodname=='K3HZFH') {
                    var pl=(m == 0 || m == 1)?0:1;
                    prize=this.getPrize(method.prize_level_special[pl],mode,multiple,prizegroup);
                }else if(['K3FUN','Q3SPEC','H3SPEC','Z3SPEC'].indexOf(methodname)!=-1){
                    prize=this.getPrize(method.prize_level_special[m],mode,multiple,prizegroup);
                }
                if(prize!=0)
                {
                    $('li[name="name_ball_li"]').children('#special_'+m).html("奖金 "+prize);
                }
            }
        }
    };

    this.getPrize = function(price,modes,times,prizegroup){
        rate=prizegroup/2000;
        price_l = price*rate;
        price_l=Math.floor(price_l*100)/100;
        if (modes == 1) {
            price_l = price_l.toFixed(2) * 1 * times;
        } else if (modes == 2) {
            price_l = price_l.toFixed(2) * 0.1 * times;
        } else if (modes == 3) {
            price_l = price_l.toFixed(2) * 0.01 * times;
        } else {
            price_l=0;
        }
        return price_l.toFixed(4);
    }
    
    this.getSavedProjectCount = function(){
    
       return this.mystorage.getBetProjectCount(this.userid,this.lotteryid);
    }

    this.getCurrentMethodCrowdIndex = function(){

        return this.gameModel.getCurrentMethodCrowdIndex();

    };

    this.getCurrentMethodGroupIndex = function(){
    
        return this.gameModel.getCurrentMethodGroupIndex();
        
    };
    
    
    this.getCurrentMethodIndex = function(){
        return this.gameModel.getCurrentMethodIndex();
    
    };
    
    
    //换玩法
    this.changeMethod = function(crowdindex,groupindex,methodindex){
        
        
        if(this.gameModel.getCurrentMethodCrowdIndex() === crowdindex
            && this.gameModel.getCurrentMethodGroupIndex() === groupindex
           && this.gameModel.getCurrentMethodIndex() === methodindex){
            return;
        }

        this.gameModel.changeMethod(crowdindex,groupindex,methodindex);

        this.methodTitleElement.html(this.gameModel.getCurrentMothodGroupName()+'-'+this.gameModel.getCurrentMothodName());
        var method=this.gameModel.getCurrentMethod();
        if(method.prize_level_special.length>1) {
        }else{
            $('#id_font_prize').html(method.prize_level_special[0]);
        }
        setCookie('defautlMethodId', method.methodid);
        setCookie('defautlType', method.type);
        this.initSelectNumView();
        
        this.updateSelectedDescrip();
        
    
    };
    
    
    this.addChoosedNumberToCart = function(bet_now)
    {

        ermsg='';
        if(this.gameModel.getCurrentMethod().type=='input')
        {
            var error = [];
            var edump = [];
            edump=this.dumpNum(true);
            if (edump.length > 0) {
                ermsg += '以下号码重复，已进行自动过滤\n' + edump.join(", ") + "\n";
            }
            var response = this.gameModel.getTotal(true);
            if (response[0].length > 0) {
                error=response[0];
                this.gameModel.section_ball_model[0]=response[1];
                ermsg+='以下号码错误，已进行自动过滤\n' + error.join(", ") + "\n";
            }
        }
        var method=this.gameModel.getCurrentMethod();

        var total = this.gameModel.getTotal(false);

        var svTotal = this.gameModel.getTotal(false);
        var svMoney = this.gameModel.getTotalAmount(svTotal);

        console.log("total = "+total);
        var selectNumber=this.gameModel.getSelectNumber();
        if(total<1)
        {
            var tcodes=selectNumber.codes.split('|');
            if(selectNumber.methodname=='SDZX3' && (tcodes[0]==tcodes[1] || tcodes[1]==tcodes[2] || tcodes[0]==tcodes[2]) && selectNumber.codes!='')
            {
                ertotalmsg='不能选择两个以上相同号码，请重新选择';
            }
            else if(selectNumber.methodname=='SDZX2' && tcodes[0]==tcodes[1] && selectNumber.codes!='')
            {
                ertotalmsg='不能选择两个相同号码，请重新选择';
            }
            else if(
                (['SSCL4ZX'].indexOf(selectNumber.methodname)!=-1 && method.type=='input') ||
                (['SSCL4ZU24','SSCL4ZU12','SSCL4ZU6','SSCL4ZU4'].indexOf(selectNumber.methodname)!=-1 && method.type!='input')
            ){
                //位置報錯4
                count=$('li[name="location"].locationButtonselect').length;
                if(count<4)
                {
                    ertotalmsg='位置选择不完整，请重新选择';
                }
                else
                {
                    ertotalmsg='未完成选号';
                }
            }
            else if(
            (['SSCL3ZX','SSCL3ZU3','SSCL3ZU6','SSCL3HHZX'].indexOf(selectNumber.methodname)!=-1 && method.type=='input') ||
            (['SSCL3ZXHZ','SSCL3ZU3','SSCL3ZU6','SSCL3ZUHZ'].indexOf(selectNumber.methodname)!=-1 && method.type!='input')
            ) {
                //位置報錯3
                count=$('li[name="location"].locationButtonselect').length;
                if(count<3)
                {
                    ertotalmsg='位置选择不完整，请重新选择';
                }
                else
                {
                    ertotalmsg='未完成选号';
                }
            }
            else if(
                (['SSCL2ZX','SSCL2ZU'].indexOf(selectNumber.methodname)!=-1 && method.type=='input') ||
                (['SSCL2ZXHZ','SSCL2ZU','SSCL2ZUHZ'].indexOf(selectNumber.methodname)!=-1 && method.type!='input')
            ) {
                //位置報錯2
                count=$('li[name="location"].locationButtonselect').length;
                if(count<2)
                {
                    ertotalmsg='位置选择不完整，请重新选择';
                }
                else
                {
                    ertotalmsg='未完成选号';
                }
            }
            else
            {
                ertotalmsg='未完成选号';
            }
            if(this.getSavedProjectCount()<1)
            {
                if(bet_now==true)
                {
                    showToast(ertotalmsg);
                }
                else
                {
                    showToast(ertotalmsg);
                }
            }
            return;
        }

        if (ermsg.length > 1) {
            showPopupWindow(ermsg, function() {});
        }

        //投注数超过70000进行提示
        if (selectNumber.nums > 70000) {
            showPopupWindow('投注注数不能超过70000注! 当前注数' + selectNumber.nums + '注!', function() {});
            return;
        }

        if(bet_now==true)
        {
            var requestUrl = './?controller=game&action=bet';

            var rq_post = {};
            rq_post.flag = 'save';
            rq_post.betnow = true;
            rq_post.lt_issue_start = this.gameModel.getCurrentIssue();
            rq_post['lt_project[]'] = rsa_encrypt($.base64.encode(JSON.stringify(selectNumber)));
            spinShow();
            $.ajax({
                type: 'POST',
                url: requestUrl,
                data: {"data": rsa_encrypt($.param(rq_post)),'menuid':this.menuid},
                success: function (data, status, xhr) {
                    spinDismiss();
                    if (!xhr.getResponseHeader("MBOStatus") || 'true' !== xhr.getResponseHeader("MBOStatus")) {
                        if (data && "" !== data) {
                            showPopupWindow($.parseJSON(data).data, function () {});
                        } else {
                            showPopupWindow('投注失败，系统繁忙', function () {});
                        }
                    } else {
                        data=JSON.parse(data);
                        window.setTimeout(function () {
                            if(data.data) {
                                showPopupWindow('投注成功！<br>注单金额：' + svMoney + ' 元<br>余额：'+data.data+' 元', function () { doNowInfo(); });
                            }else{
                                showPopupWindow('投注成功！<br>注单金额：' + svMoney+ ' 元', function () { doNowInfo(); });
                            }
                            setGaEvt('BUY', this.game.lotteryid, 'QUICKLY', '');
                        }, 0);
                    }
                },
                error: function (xhr, type) {
                    spinDismiss();
                    if (xhr.status === 401) {
                        window.setTimeout(function () {
                            showPopupWindow('有效期已过，请重新登录', function() { location.reload(); });
                            }, 0);
                        return;
                    } else if (xhr.status === 400) {
                        if (xhr.responseText) {
                            var response = $.parseJSON(xhr.responseText);
                            if (response.data && response.stats) {
                                if(response.stats=='fail') {
                                    var successText='<font style="color:green">成功'+response.data.success+'笔</font><br>';
                                    var failText='<font style="color:red">失败'+response.data.fail+'笔</font><br>';
                                    var failContent=response.data.content[0];
                                    showPopupWindow(successText+failText+failContent, function () {});
                                } else {
                                    showPopupWindow(response.data, function () {});
                                }
                            } else {
                                showPopupWindow('投注失败,系统繁忙', function () {});
                            }
                        }
                    } else
                    {
                        showPopupWindow('投注失败,系统繁忙', function () {});
                    }
                }
            });
        }else{
            var ret = this.mystorage.saveBetProject(this.userid,this.lotteryid,selectNumber);

            if(ret){

            }else{
                return;
            }

            var savedProjCount = this.mystorage.getBetProjectCount(this.userid,this.lotteryid);

            this.showNumberInCart(this.badgeElement, ''+savedProjCount);
        }
        
        
        this.gameModel.initSectionBallModel();
        
        this.initSelectNumView();
        
        this.updateSelectedDescrip();
         
    };

    /**
     * 重复号处理
     * @param isdeal
     * @returns {Array}
     */
    this.dumpNum = function (isdeal) {
        var data=this.gameModel.section_ball_model[0];
        var l = data.length;
        var err = [];
        var news = []; //除去重复号后的结果
        if (l == 0) {
            return err;
        }
        for (i = 0; i < l; i++) {
            if ($.inArray(data[i], err) != -1) {
                continue;
            }
            for (j = i + 1; j < l; j++) {
                if (data[i] == data[j]) {
                    err.push(data[i]);
                    break;
                }
            }
            news.push(data[i]);
        }
        if (isdeal) {//如果是做删除重复号的处理
            this.gameModel.section_ball_model[0] = news;
        }
        return err;
    };

    
    this.getCurrentMode = function(){
    
       return this.gameModel.mode;
    
    };
    
    
    this.getCurrentMultiple = function(){
       return this.gameModel.multible;
    
    };

    this.getCurrentPrizeGroup = function(){
        return this.gameModel.prizegroup;

    };

    this.getMaxPrizeGroup = function(){
        return this.gameModel.max_prizegroup;

    };

    this.setCurrentMode = function(mode){
        if(this.gameModel.mode != mode){
            this.gameModel.mode = mode;
            this.updateSelectedDescrip();
            
        }
    
    };
    
    this.setCurrentMultiple = function(multiple){
        
        if(this.gameModel.multible != multiple){
            this.gameModel.multible = multiple;
            this.updateSelectedDescrip();
        }
    
    };

    this.setCurrentPrizeGroup = function(prizegroup){

        if(this.gameModel.prizegroup != prizegroup){
            this.gameModel.prizegroup = prizegroup;
            this.updateSelectedDescrip();
        }

    };

    this.setMaxPrizeGroup = function(prizegroup){

        if(this.gameModel.prizegroup != prizegroup){
            this.gameModel.prizegroup = prizegroup;
            this.updateSelectedDescrip();
        }

    };

    this.randSelect = function(){

        var indexpatharray = shakeWithPlayMethod(this.gameModel.getCurrentMethod());
        var locationarray = shakeLocation(this.gameModel.getCurrentMethod());

        this.gameModel.initSectionBallModel();

        
        for(var i=0;i<indexpatharray.length;i++){
           this.gameModel.selectBall(parseInt(indexpatharray[i].section)+1,parseInt(indexpatharray[i].row));
        }

        for(var i=0;i<locationarray.length;i++){
            $("li[name='location']:nth-child("+locationarray[i]+")").click();
        }

        for(var i=1;i<=10;i++){
            this.updateBallUi(i,this.gameModel);
        }

        this.updateSelectedDescrip();
    }

    this.getServerTime = function(){
        $.ajax({
            type: 'POST',
            url: '?controller=game&action=selectnumber&getServerTime=1',
            dataType:'text',
            success: function (data)
            {
                now=parseInt(data);
            },
            error: function (xhr, type)
            {
                now=parseInt(JSON.parse(xhr.response).servertime)*1000;
            }
        });
    }
    
    this.countIssueLeftTime = function(model){
        now+=1000;

        if(now < model.getCurrentIssueEndTime()){ //当前期时间未到
            var leaveTime=model.getCurrentIssueEndTime() - now;
            if (leaveTime % 240000 == 0 || leaveTime == 60000 )
            {
                this.getServerTime();
            }
            this.timeElement.html(formatLeftTime(leaveTime));
            return;

        }else{ //当前期时间已过
            this.getServerTime();
            this.timeElement.html('00:00');
        	window.setTimeout(function(){
                showToast("当前期已截止，你将购买下一期", 3000);
        	 },0);  
            
            if(model.isLastIssue()){ //判断当前期是否为最后一期
               //最后一期了，没有下一期了.
                window.clearInterval(this.intervalid);
            	window.setTimeout(function(){
                    showToast("没有更多奖期，请刷新页面", 3000);
            	 },0);                  
                
                return;
            }
            
            model.setCurrentIssueIndex(model.getCurrentIssueIndex()+1); //进入下一期
            
            while(now >= model.getCurrentIssueEndTime() && !model.isLastIssue()){
                 
                model.setCurrentIssueIndex(model.getCurrentIssueIndex()+1);               
            }
            
            
            if(model.isLastIssue() && now >= model.getCurrentIssueEndTime()){
               window.clearInterval(this.intervalid);
               
           	window.setTimeout(function(){
                showToast("没有更多奖期，请刷新页面", 3000);
        	 },0);                     
               return;
            }

            this.issueElement.html('第<span class="strong16101">'+model.getCurrentIssue()+'</span>期');

        }
        
    
    };

}


function formatLeftTime(timestamp){
       
      var result = '';
      var leftTime = timestamp;
      var hour = Math.floor(leftTime/(60*60*1000));
      leftTime-=(hour*(60*60*1000));
      var minute = Math.floor(leftTime/(60*1000));
      leftTime-= minute * (60*1000);
      var second = Math.floor(leftTime/1000);
    
      if(hour>0){
         if(hour<10){
            result+=('0'+hour+':');
         }else{
            result+=(hour+':')
         }
      }
    
      if(minute<10){
        result+=('0'+minute+':');
      }else{
        result+=(minute+':');
      }
    
      if(second<10){
        result+=('0'+second);
      }else{
        result+=(second);
      }    
    
      return result;

}


function getCurrentIssueIndex(issue){
	
	var result = -1;
	
	if(issue && issue.length>0){
		
		for(i=0;i<issue.length;i++){
			
			var saleend = parseInt(issue[i].saleend) * 1000;
			var n = now;
            
            if(n <= saleend){
               return i;
            }
			
		}
		
	}
    
    return result;
	
	
}
</script>

<style scoped>

</style>
