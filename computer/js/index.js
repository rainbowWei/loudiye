$(function(){
  //弹窗的隐藏
 $(".alert-close").click(function(){
  cancel();
})

function showSelectBox() {
  $("#alertBox").css("display","block");
  $("#shelter").css("display","block");
}
function cancel() {
  $("#alertBox").css("display","none");
  $("#shelter").css("display","none");
}


//获得焦点
$( '.phone-from #phone' ).focus( function(){
  $(".header-error").text("");
  })
})
//点击免费领取体验课
$(".phone-from #btn").click(function(){
  var Phone = $("#phone").val();
  var contac = /^1[345789]\d{9}$/g;
  var count = 5;
 if((Phone == "")){
   $(".header-error").text("手机号码不能为空");
  }else if(!contac.exec(Phone)){
    $(".header-error").text("请输入正确的手机号码");
  }else{
    $(".header-error").text("");
    //弹窗显示
    // showSelectBox();
    $("#alertBox .phone").val(Phone);

      //开始计时  
      $(".get_captcha").attr('disabled','disabled');  
      $(".get_captcha").html(count + "s后再次获取");  
      var timer = setInterval(function(){  
        count--;
        $(".get_captcha").html( count + "s后再次获取"); 
        if (count==0) {
          clearInterval(timer);
          $(".get_captcha").attr("disabled",false);//启用按钮  
          $(".get_captcha").html("重新发送验证码");
          $(".get_captcha").addClass('on');
          code = "";//清除验证码。如果不清除，过时间后，输入收到的验证码依然有效 
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
              showSelectBox();
            }
          }  
      });
  }
 
})

//点击重新发送验证码
$(".get_captcha").click(function(){
  var Phone = $(".from .phone").val();
    $.ajax({  
    type: "get", //用POST方式传输  
    url: 'http://t.xingxiwang.com/sendcode', //目标地址 
    data:{
      phone:Phone
    }
  });
})

//点击立即提交
$("#code-submit").click(function(){
 var Phone = $(".from .phone").val();
 var Code = $(".form_code .text").val();
 if(!Code){
  $(".code-error").html("请输入您的验证码") 
 }
  $.ajax({  
  type: "get", //用POST方式传输  
  url: 'http://t.xingxiwang.com/checkcode', //目标地址 
  data:{
    phone:Phone,
    code:Code
  },  
  success: function (msg){
   if(msg == 1){
     alert("提交成功")
   }else{
     $(".code-error").html("您输入的验证码有误！！！") 
  } 
} 
});
})



