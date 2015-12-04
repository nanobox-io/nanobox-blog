//= require_tree .
//= require "_jquery-2.1.4.min.js"

$(document).ready( function() {

  /////////////////// CONTENT FADE-IN ///////////////////

  setTimeout(function() {
    $(".fade-in").addClass('show');
  }, 10);

  //////////////////// SMOOTH SCROLL ////////////////////

  $('a[href^="#"]').on('click',function (e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 400, 'swing', function () {
      window.location.hash = target;
    });
  });

})