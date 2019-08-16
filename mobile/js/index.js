$(function(){


  //获得焦点清除错误提示语
$( '.form .phone,.form .text,.form .name' ).focus( function(){
  $(".form .error").text("");
})

//弹窗的隐藏
$("#close").click(function(){
  cancel($("#alertBox"),$("#shelter"));
})

function showSelectBox(alertBox,shelter) {
  alertBox.css("display","block");
  shelter.css("display","block");
}
function cancel(alertBox,shelter) {
  alertBox.css("display","none");
  shelter.css("display","none");
}


  $("#form-btn").click(function(){
    var Phone = $(".form .phone").val();
    var Error = $(".form .error");
    var contac = /^1[345789]\d{9}$/g;
    var count = 60;
    if(Phone == ""){
      Error.text("手机号码不能为空")
    }else if(!contac.test(Phone)){
      Error.text("请输入正确的手机号码")
    }else{
    
      $(".tips").text("验证码已发送至"+ Phone );


       //开始计时 
       $(".get-captcha").removeClass('on'); 
       $(".get-captcha").attr('disabled','disabled');  
       $(".get-captcha").html(count + "s后再次获取");  
       var timer = setInterval(function(){  
         count--;
         $(".get-captcha").html( count + "s后再次获取"); 
         if (count==0) {
           clearInterval(timer);
           $(".get-captcha").attr("disabled",false);//启用按钮  
           $(".get-captcha").html("重新发送验证码");
           $(".get-captcha").addClass('on');
           code = "";//清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
           
           //点击重新发送验证码
           $(".get-captcha").click(function(){
             count = 60;  
             var Phone = $(".form .phone").val();
             $(".get-captcha").removeClass('on');
             $(".get-captcha").attr('disabled','disabled');  
             $(".get-captcha").html(count + "s后再次获取"); 
             var timer = setInterval(function(){
               count--;
               $(".get-captcha").html( count + "s后再次获取"); 
               if (count==0) {
                 clearInterval(timer);
                 $(".get-captcha").attr("disabled",false);//启用按钮  
                 $(".get-captcha").html("重新发送验证码");
                 $(".get-captcha").addClass('on');
                 code = "";//清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
               }      
             },1000)
               $.ajax({  
               type: "get", //用POST方式传输  
               url: 'http://t.xingxiwang.com/sendcode', //目标地址 
               data:{
                 phone:Phone
               }
             });
           })
         }
       },1000);
         //向后台发送处理数据  
         $.ajax({  
          type: "get", //用POST方式传输  
          url: 'http://t.xingxiwang.com/sendcode', //目标地址 
          data:{
            phone:Phone
          } ,   
          success: function (msg){
            if(msg == 1){
              $(".form-phone").css("display","none");
              $(".form-code").css("display","block");
            }else{
              Error.text("该手机号已领取！！");
            }
          }  
      });
    }
  })



  //点击立即领取
  $("#form-btn2").click(function(){

    var Phone = $(".form .phone").val();
    var Code = $(".form-code .text").val();
    var Name = $(".form-name .name").val();

    console.log(Name,"+++++++")
    if(Code == ""){
      $(".error").text("请您输入验证码！！！")
    }else if(Name == ""){
      $(".error").text("宝贝名字不能为空");
    }else{
      $.ajax({  
        type: "get", //用POST方式传输  
        url: 'http://t.xingxiwang.com/checkcode', //目标地址 
        data:{
          phone:Phone,
          code:Code,
          name:Name
        },  
        success: function (msg){
          if(msg == 1){
            
            showSelectBox($("#alertBox"),$("#shelter"))
            $(".phone,.name,.text").val("");
            $(".form-phone").css("display","block");
            $(".form-code").css("display","none");
          }
          else{
              $(".error").html("您输入的正确的验证码！！！") 
          } 
        } 
      });
    }
  })
})