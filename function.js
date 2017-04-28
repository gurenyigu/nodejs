/*
函数的参数只接受基本的数据类型或对象引用，返回值也只是基本数据类型和对象引用
下面的代码为常规的参数传递和返回
*/
function foo(x){
  return x;
}
var s = foo;
console.log(s);
// [Function: foo]
var a = foo('a');
console.log(a);
// a
var b = new foo(b);
console.log(b);
// foo{}


// 高阶函数则是可以把函数作为参数，或者将函数作为返回值的函数
function Foo(a){
  return function(){
    return a;
  };
}
var d = foo;
console.log(d);
var f = foo(2);
console.log(f);
var t = new foo(3);
console.log(t);
