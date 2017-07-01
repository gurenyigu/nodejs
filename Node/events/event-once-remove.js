var event = require('events').EventEmitter;

var emitter = new event();

emitter.once('event_emitter', function() {
  // 指定一个事件注册一个一次性监听器，接受一个字符串event和一个回调函数。
  // 一旦触发，立即销毁。
  console.log('once');
});

setInterval(function() {
  emitter.emit('event_emitter');
}, 1000);

var b = 0;

var callback = function(value) {
  if (value !== undefined) {
    console.log('addListener = ', value);
  } else {
    console.log(b += 1);
  }
};

emitter.addListener('event_', callback);
emitter.emit('event_', 'fuck!!!');
emitter.emit('event_');
emitter.removeListener('event_', callback);
// 删除一个事件监听器 ，这个监听器必须是已经注册过得监听器。
emitter.emit('event_');
