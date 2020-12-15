import $ from 'jquery';

$(document).ready(function () {
  $('.nav-control').click(function () {
    $('#main-wrapper').toggleClass('menu-toggle');

    $('.hamburger').toggleClass('is-active');
    $('.deznav').toggleClass('d-none');
    $('.content-body').toggleClass('ml-0');
  });
});
