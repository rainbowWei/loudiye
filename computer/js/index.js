$(function(){
  //弹窗的隐藏
 $(".alert-close").click(function(){
  cancel();
})

//弹窗显示
$(".phone-from .btn").click(function(){
  showSelectBox();
})

function showSelectBox() {
  $("#alertBox").css("display","block");
  $("#shelter").css("display","block");
}
function cancel() {
  $("#alertBox").css("display","none");
  $("#shelter").css("display","none");
}

})

