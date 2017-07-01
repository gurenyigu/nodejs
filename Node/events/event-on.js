/*
node.js所有异步I/O操作在执行时都会发送一个事件到事件队列。前面提到的异步I/O操作回调函数都是通过
EventEmitter来实现的。
*/
var EventEmitter = require("events").EventEmitter;
// 调用event模块 添加一个事件监听和事件触发条件
var event = new EventEmitter();
var i = 0;
// 实例化这个事件触发器
event.on('event_emitter',function(){
  console.log('event emitter!');
});
/*
EventEmitter提供了多个属性，on函数用于绑定事件函数。原理是：
event对象注册了事件'event_emitter'的一个监听器，然后通过延时了的setTimeout在若干时间后触发emit事件
emit触发器触发'event_emitter'事件，事件绑定的函数触发
*/
setTimeout(function(){
  event.emit('event_emitter');
  clearInterval(t);
},400);

var t = setInterval(function(){
    console.log(i+=1);
  },100);
