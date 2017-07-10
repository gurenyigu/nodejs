// 初始化界面

// 其他用户数据
var nickname = '???';
var imgUrl = './images/header/lol/0.png';

// 当前用户
var id = 0;
var imgSrc = "./images/header/lol/" + id + ".png";
// 判断是否登录
if (document.cookie.length > 0) {
  var user_name = document.cookie.match(/user=([^=]*);+/)[1];
  $('.display_name').text(user_name);
} else {
  alert('您还没有登录!');
  location.pathname = '/';
}

// 获取头像
$.ajax({
  url: '/getHeader',
  method: 'post',
  data: {
    user: user_name
  }
}).done(function(data, textStatus, jqXHR) {

  id = data;
  imgSrc = "./images/header/lol/" + id + ".png";
  $('#userImg').attr('src', imgSrc);
}).fail(function(jqXHR, textStatus, errorThrown) {
  console.log('获取头像失败!');
});



// 链接
// 'http://localhost:3000'
// var socket = io.connect('http://localhost:3000');
var socket = io();

// 消息泡泡
var por = true;
var msg_num = 0;

function new_msg() {
  if (por) {
    msg_num += 1;
    $('.icon').removeClass('ng-hide');
    $('.icon').text(msg_num);
  } else {
    msg_num = 0;
  }
}

// 全局时间:
var time = '';
var timeStart;
var timeEnd;
// 获得时间:
function nowTime() {
  let data = new Date();
  let hours = data.getHours();
  let min = data.getMinutes();
  return [hours, min];
}
// 消息时间:
var handler = function() {
  let now = nowTime();
  let hours = now[0];
  let min = now[1];
  min = min < 9 ? '0' + min : min;
  timeEnd = [hours, min];
  if (typeof(timeStart) === 'undefined') {
    timeStart = [hours, min];
    time = "<!-- 时间部分 --><div class='message_system ng-scope'><!-- 时间 --><div class='content ng-bingding ng-scope'>" + hours + ":" + min + "</div></div>";
    // console.log(time);
  } else if (timeStart[0] == timeEnd[0]) {
    if (timeStart[1] + 1 < timeEnd[1]) {
      time = "<!-- 时间部分 --><div class='message_system ng-scope'><!-- 时间 --><div class='content ng-bingding ng-scope'>" + hours + ":" + min + "</div></div>";
    } else {
      time = '';
    }
  } else {
    time = "<!-- 时间部分 --><div class='message_system ng-scope'><!-- 时间 --><div class='content ng-bingding ng-scope'>" + hours + ":" + min + "</div></div>";
  }
};

setInterval(handler, 60000);

// 更新列表时间函数
function item_time() {
  var now = nowTime();
  let hours = now[0];
  let min = now[1] < 9 ? '0' + now[1] : now[1];
  $('#time_item').text(hours + ":" + min);
}

// 列表更新数据函数
function updata(data) {
  $('#item_chat').text(data);
}



// 获得 其他用户数据
socket.on('broadcast_Infor', function(data) {
  console.log(data);
  nickname = data.user;
  imgUrl = data.src;
});

// 发送函数
function sendMessage() {
  no_message()
  let data = $('#editArea')[0].innerHTML;
  // console.log(data);
  var str =
    "<div class='ng-scope'><div class='clearfix'><div style='overflow: hidden'><!-- 消息内容开始 --><div class='message ng-scope me'>" + time +
    "<!-- 头像部分 --><img src=" + imgSrc +
    " alt='' class='avatar' title=''><!-- 消息主体 --><div class='content'><div class='bubble js_message_bubble ng-scope bubble_primary right'><!-- 内容主体 --><div class='bubble_cont ng-scope'><div class='plain'><pre class='js_message_plain ng-binging'>" +
    data +
    "</pre><!-- 发送中图标 --><img src='../images/chat/loding.gif' alt='正在发送...' class='ico_loading'><!-- 发送失败图标 --><i class='ng-hide ico_fail web_wechat_message_fail' title='对方已接收'></i></div></div></div></div></div></div></div></div>";
  // console.log(str);
  $('#chat_content').append(str);
  $('.scroll-content').scrollTop($('#chat_content')[0].scrollHeight);
  // console.log($('#chat_content')[0].scrollHeight);
  socket.emit('userInfor', {
    user: user_name,
    src: imgSrc
  });
  // 具有返回服务器接收到数据的 发送方法
  socket.emit('ferret', data, function() {
    // console.log('我接收到数据啦!');
    $('.ico_loading:last').addClass('ng-hide');
    $('.web_wechat_message_fail:last').removeClass('ng-hide');
    $('#editArea')[0].innerHTML = '';
    item_time();
    updata(data);
    time = '';
  });
}


// 接收别人的数据
function receiveMessage(data) {
  no_message();
  let msg =
    '<div class="ng-scope"><div class="clearfix"><div style="overflow: hidden"><!-- 消息内容开始 --><div class="message ng-scope you">' + time +
    '<!-- 头像部分 --><img src=' + imgUrl + ' alt="" class="avatar" title=""><!-- 消息主体 --><div class="content"><h4 class="nickname ng-binding ng-scope">' + nickname +
    '</h4><div class="bubble js_message_bubble ng-scope bubble_default left"><!-- 内容主体 --><div class="bubble_cont ng-scope"><div class="plain"><pre class="js_message_plain ng-binging">' +
    data + '</pre></div></div></div></div></div></div></div></div>';
  // console.log('后端发送消息: ', data);
  $('#chat_content').append(msg);
  $('.scroll-content').scrollTop($('#chat_content')[0].scrollHeight);
  item_time();
  time = '';
  updata(nickname + ': ' + data);
  new_msg();
}

// 没有消息时框框取消
function no_message() {
  $('.message_empty').addClass('ng-hide');
}



$('.btn_send').click(function() {
  let value = $('#editArea')[0].innerHTML;

  if (value == '') {
    return false;
  } else {
    sendMessage();
  }

});
$('#editArea').keydown(function(event) {

  // console.log('触发事件!');
  if (event.ctrlKey && event.keyCode == 13) {
    // console.log('触发');
    sendMessage();
  }
});

// 插入其他人的消息
socket.on('broadcast', function(data) {
  receiveMessage(data);
});

socket.on('message', function(data) {
  console.log('后端', data);
});
