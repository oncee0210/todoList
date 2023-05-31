$(document).ready(function(){
  $(".memo_write-btn").on('click', function(){
    $(".memo_write_layout").addClass('on');
    $("input[name=memo_write-text]").focus();
  });

  // $('html').click(function(e) {   
  //   if($(e.target).parents(".memo_write_layout_contents").length < 1) {
  //     $(".memo_write_layout").removeClass('on');
  //   }
  // });
});