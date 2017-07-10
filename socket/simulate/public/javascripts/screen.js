var resizeScroller = function() {
  // 先将各个元素高度设置为 自动
  $("#wrapper").css("height", "auto");
  $("#scroller").css("height", "auto");
  $(".message_footer").css("height", "auto");
  $(".mod_footer").css("height", "auto");
  $(".mod_bottom").css("height", "auto");

  // 获得当前浏览器高度
  var D = $(window).height();
  // 获得各个自动高度值
  var A = $("#scroller").height();
  var B = $(".mod_footer").height();
  var C = $(".mod_bottom").height();

  var G = false;
  if (B == null) {
    B = $(".message_footer").height();
    G = true
  }

  $("#wrapper").css("height", D + "px");

  if (D < (A + B + C)) {
    if (G) {
      $("#scroller").css("height", A + B + C + "px");
      $(".message_footer").css("position", "absolute");
      $(".message_footer").css("width", "100%");
      $("#scroller").css("padding-bottom", B + C + "px")
    } else {
      $(".mod_footer").css("position", "static");
      $(".mod_bottom").css("position", "static")
    }
  } else {
    $("#scroller").css("height", D + "px");
    if (G) {
      $(".message_footer").css("position", "absolute");
      $(".message_footer").css("width", "100%")
    } else {
      var H = navigator.userAgent;
      var F = H.toLowerCase().indexOf("windows phone");
      var E = F < 0 ? "60px" : "70px";
      $(".mod_footer").css("position", "absolute");
      $(".mod_bottom").css("position", "absolute");
      $(".mod_bottom").css("bottom", E)
    }
  }
};
// 旋转onorientationchange事件名, 如果没有使用 resize
var supportsOrientationChange = "onorientationchange" in window,
  orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
// 兼容性DOM添加方式, 监听宽高改变
if (window.addEventListener) {
  window.addEventListener(orientationEvent, function() {
    // console.log(orientationEvent);
    resizeScroller()
  }, false)
} else {
  if (window.attachEvent) {
    window.attachEvent("on" + orientationEvent, function() {
      resizeScroller()
    })
  } else {
    window["on" + orientationEvent] = function() {
      resizeScroller()
    }
  }
}
