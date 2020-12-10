"use strict";

$(function () {
  //吸顶菜单
  $(window).on("scroll", function () {
    if ($(document).scrollTop() >= 170) {
      $(".nav-top").css({
        "position": "fixed",
        "top": "0"
      });
    } else {
      $(".nav-top").css({
        position: "absolute",
        top: 40
      });
    }
  }); //顶部二级导航

  $(".col-xs-1").on("mouseenter", function () {
    $(this).children(".item-children").show().parents(".col-xs-1").siblings().children(".item-children").hide();
  });
  $(".col-xs-1").on("mouseleave", function () {
    $(".item-children").hide();
  }); //活动页

  $(".site-advertising li").on("click", function () {
    $(".site-advertising").hide();
  }); //回到顶部

  $(window).scroll(function () {
    if ($(document).scrollTop() >= 300) {
      $("#the-top").css({
        display: "inline-block"
      });
    } else {
      $("#the-top").css({
        display: "none"
      });
    }
  });
  $(".back-inner li").on("mouseenter", function () {
    $(this).children().children(".icon").hide();
    $(this).children().children(".backShow").show();
    $(this).children().children(".backShow").css({
      display: "inline-block"
    });
  });
  $(".back-inner li").on("mouseleave", function () {
    $(".icon").show();
    $(".backShow").hide();
  });
  $("#the-top").on("click", function () {
    $("body,html").animate({
      scrollTop: 0
    });
  });

  function numCart() {
    var data = get();
    var data_list = [];

    for (attr in data) {
      data_list.push(attr);
    }

    $(".iconImg span").text(data_list.length);
  }

  numCart();
  var username_cookie = $.cookie("username");

  if (username_cookie) {
    $(".login").hide();
    $(".logined").show();
    $(".logined a").text($.cookie("username"));
  } else {
    $(".login").show();
  }

  $(".logined").on("click", function () {
    $(".unlogined").show();
  });
  $(".unlogined li").eq(2).on("click", function () {
    $(".logined").hide();
    $.cookie("username", "");
    $(".login").show();
  });
});