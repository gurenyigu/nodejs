var emitter = require('events').EventEmitter;

var event = new emitter();

event.addListener('event_emitter',function(){
  console.log('发生一个事件...');
});
setTimeout(function(){
  event.emit("event_emitter");
},3000);
