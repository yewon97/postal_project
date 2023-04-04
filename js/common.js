$(document).ready(function () {
  // header js
  $('.gnb_wrap').mouseover(function () {
    $('nav ul ul').stop().slideDown('fast');
  });
  $('.gnb_wrap').mouseout(function () {
    $('nav ul ul').stop().slideUp('fast');
  });

  $('.family_site h3').click(function () {
    $('.family_site ul').slideToggle('fast');
  });

  // footer js
  $('.family_site ul li').hover(
    function () {
      $(this).stop().animate({ 'padding-left': '5px' }, 'fast');
    },
    function () {
      $(this).stop().animate({ 'padding-left': '0px' }, 'fast');
    }
  );
  $('.family_site').mouseleave(function () {
    $('.family_site ul').slideUp(500);
  });
}); // 마지막 괄호