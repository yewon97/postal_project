$(document).ready(function () {
  $('.bxslider').bxSlider({
    auto: true,
    slideWidth: 1200,
    speed: 2000,
    pager: true,
    pagerType: 'short',
    autoHover: true,
  });

  $('ul.tabs li').click(function () {
    var tab_id = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $('#' + tab_id).addClass('current');
  });
}); // 마지막 괄호
