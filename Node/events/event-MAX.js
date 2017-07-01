/*
添加10+不同监听器、相同监听器10+不同事件，不同回调函数。均无法触发警告。

失败！！！！！！

setMaxListeners(n) 默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。
setMaxListeners 函数用于提高监听器的默认限制的数量。
*/
var event = require('events').EventEmitter;
var emitter = new event();
var a = 0;

var callback = function() {
  console.log(a += 1);
};

var callback1 = function() {
  console.log(a += 1);
};
var callback2 = function() {
  console.log(a += 1);
};
var callback3 = function() {
  console.log(a += 1);
};
var callback4 = function() {
  console.log(a += 1);
};
var callback5 = function() {
  console.log(a += 1);
};
var callback6 = function() {
  console.log(a += 1);
};
var callback7 = function() {
  console.log(a += 1);
};
var callback8 = function() {
  console.log(a += 1);
};
var callback9 = function() {
  console.log(a += 1);
};
var callback10 = function() {
  console.log(a += 1);
};
var callback11 = function() {
  console.log(a += 1);
};
emitter.addListener('event-1', callback);
emitter.addListener('event-2', callback1);
emitter.addListener('event-3', callback2);
emitter.addListener('event-4', callback3);
emitter.addListener('event-5', callback4);
emitter.addListener('event-6', callback5);
emitter.addListener('event-7', callback6);
emitter.addListener('event-8', callback7);
emitter.addListener('event-9', callback8);
emitter.addListener('event-10', callback9);
emitter.addListener('event-12', callback10);

emitter.emit("event-1");
emitter.emit("event-2");
emitter.emit("event-3");
emitter.emit("event-4");
emitter.emit("event-5");
emitter.emit("event-6");
emitter.emit("event-7");
emitter.emit("event-8");
emitter.emit("event-9");
emitter.emit("event-10");
emitter.emit("event-12");
