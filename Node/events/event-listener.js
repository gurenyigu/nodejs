var emitter = require('events');
var event = emitter.EventEmitter;

var Event = new event();

Event.addListener('event_A', function() {
  console.log('发生一个事件...');
  Event.emit('event_B');
});

setTimeout(function() {
  Event.emit("event_A");
}, 1000);

Event.addListener('event_B', function() {
  console.log("事件B");
});
