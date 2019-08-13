$(function(){

    // 家庭干预训练体系课选项卡
    $(".tab-menu li").click(function(){
        var _index = $(this).index();
        $(this).append("<i></i>");
        $(this).addClass("show").siblings().removeClass("show").children().filter("i").remove(); 
        
        $(".tab-box>div").eq(_index).show().siblings().hide()
    })  

    //专家团队
    $(".expert-list li").hover(function(){
        //通过 .index()方法获取元素下标，从0开始，赋值给某个变量
        var _index = $(this).index();
        $(this).addClass("show-f").siblings().removeClass('show-f');
        $(".expert-c>div").eq(_index).addClass("show-c").siblings().removeClass('show-c');
        }, function () {
            $(this).addClass("show-f").siblings().removeClass('show-f');
        }); 

    //为当前窗口添加滚动条滚动事件（适用于所有可滚动的元素和 window 对象（浏览器窗口））
	$(window).scroll(function(){
        //创建一个变量存储当前窗口下移的高度
       var scroTop = $(window).scrollTop();
       //判断当前窗口滚动高度
       //如果大于300，则显示顶部元素，否则隐藏顶部元素
       if(scroTop>100){
           $('#back').fadeIn(500);
       }else{
           $('#back').fadeOut(500);
       }
    }
   );
               
   //为返回顶部元素添加点击事件
   $('#back').click(function(){
       //将当前窗口的内容区滚动高度改为0，即顶部
       $("html,body").animate({scrollTop:0},"fast");
   });


   //提交数据

   //免费解答
   $("#submit").on("click",function(){
    var Iphone = $('#iphone').val();
    var re = /^1[345789]\d{9}$/g;

      if((Iphone == "")){
            alert("电话号码不能为空！！");
            return false;
        }else if((!re.exec(Iphone))){
            alert("电话号码输入有误！！");
            return false;
        }else{
            alert("提交成功");
        }
    
        // $.ajax({
        //         url:'',
        //         data:{},
        //         dataType:'html',
        //         type:'post',
        //         success:function(mydata){
        //             alert("提交成功");
        //             $('#iphone').val("");         
        //         }
        //     })
    })
})
