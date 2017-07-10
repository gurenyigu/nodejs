var cookies = document.cookie.length;


function auto_Login() {
  if (localStorage.getItem('autoLogin') == 'false') {
    localStorage.setItem('autoLogin', true);
  } else if (localStorage.getItem('autoLogin') == 'true') {
    localStorage.setItem('autoLogin', false);
  }
}

function getCookie() {
  // 如果 cookie 存在, 必填, 这里提交前会设置, 所以有长度, 就存在
  if (cookies) {
    // user 的起始位置匹配
    var user_s = document.cookie.indexOf('user=');
    // user 长度 + 'user=' 起始位置 == 用户输入位置
    user_s = 'user='.length + user_s;
    // 用户输入的结束位置 ';' 索引, 结束从前面的结束位置开始查找
    user_e = document.cookie.indexOf(';', user_s);
    // 截取用户输入的 username
    // console.log(document.cookie.substring(user_s, user_e));
    var pwd_s = document.cookie.indexOf('passwd=');
    pwd_s = pwd_s + 'passwd='.length;
    pwd_e = document.cookie.length;
    // console.log(document.cookie.substring(pwd_s, pwd_e));
    return [document.cookie.substring(user_s, user_e), document.cookie.substring(pwd_s, pwd_e)];
  }
  return '';
}

function setCookie() {
  document.cookie = 'user=' + $('.user').val();
  document.cookie = 'passwd=' + $('.pwd').val();
}

function delAllCookie() {
  var myDate = new Date();
  myDate.setTime(-1000); //设置时间
  var data = document.cookie;
  var dataArray = data.split("; ");
  for (var i = 0; i < dataArray.length; i++) {
    var varName = dataArray[i].split("=");
    document.cookie = varName[0] + "=''; expires=" + myDate.toGMTString();
  }
}
