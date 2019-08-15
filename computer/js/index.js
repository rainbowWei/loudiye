$(function(){


//弹窗的隐藏
$("#close").click(function(){
  cancel($("#alertBox"),$("#shelter"));
})
//弹窗的隐藏
$("#close2").click(function(){
  cancel($("#alertBox2"),$("#shelter2"));
})

function showSelectBox(alertBox,shelter) {
  alertBox.css("display","block");
  shelter.css("display","block");
}
function cancel(alertBox,shelter) {
  alertBox.css("display","none");
  shelter.css("display","none");
}


//获得焦点清除错误提示语
$( '.phone-from #phone' ).focus( function(){
  $(".header-error").text("");
})

$( '.phone-from2 .txt' ).focus( function(){
  $(".error").text("");
})
$( '.form-code .text' ).focus( function(){
  $(".code-error").text("");
})
//点击免费领取体验课
from($(".phone-from #btn"),$("#phone"),$(".header-error"))
//点击立即领取
from($(".phone-from #btn2"),$("#phone2"),$(".error"))



function from(clickelement,phone,error){
  clickelement.click(function(){
    var Phone = phone.val();
    var contac = /^1[345789]\d{9}$/g;
    var count = 10;
   if((Phone == "")){
      error.text("手机号码不能为空");
    }else if(!contac.exec(Phone)){
      error.text("请输入正确的手机号码");
    }else{
      error.text("");
      $("#alertBox .phone").val(Phone);
  
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
              count = 10;  
              var Phone = $(".from .phone").val();
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
                showSelectBox( $("#alertBox"),$("#shelter"));
              }else{
                error.text("请您不要频繁的点击发送");
              }
            }  
        });
    }
   
  })
  
}

  //点击立即提交
  $("#code-submit").click(function(){

    var Phone = $(".from .phone").val();
    var Code = $(".form-code .text").val();

    var contac = /^1[345789]\d{9}$/g;

    if(Code == ""){
      $(".code-error").html("请您输入验证码！！！")
    }else if((Phone == "")){
      $(".code-error").text("手机号码不能为空");
    }else if(!contac.exec(Phone)){
      $(".code-error").text("请输入正确的手机号码");
    }else{
      $.ajax({  
        type: "get", //用POST方式传输  
        url: 'http://t.xingxiwang.com/checkcode', //目标地址 
        data:{
          phone:Phone,
          code:Code
        },  
        success: function (msg){
          if(msg == 1){
            
            showSelectBox( $("#alertBox2"),$("#shelter2"));
            cancel($("#alertBox"),$("#shelter"));
            $("#phone,#phone2,.form-code .text,.from .phone").val("");
          }
          else{
              $(".code-error").html("您输入的正确的验证码！！！") 
          } 
        } 
      });
    }
  })

})

