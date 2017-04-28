var event = require('events').EventEmitter;

var emitter = new event();

emitter.once('event_emitter',function(){
  // 指定一个事件注册一个一次性监听器，接受一个字符串event和一个回调函数。
  // 一旦触发，立即销毁。
  a = 0;
  console.log('once = ',a+=1);
});

emitter.emit('event_emitter');
emitter.emit('event_emitter');

var emitter2 = new event();
function callback(){
    b = 0;
    console.log('addListener = ',b+=1);
}
emitter2.addListener('event_',callback);
emitter2.emit('event_');
emitter2.emit('event_');
emitter2.removeListener('event_',callback);
// 删除一个事件监听器 ，这个监听器必须是已经注册过得监听器。
emitter2.emit('event_');
