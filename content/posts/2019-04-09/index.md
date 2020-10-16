---
author: ""
description: ""
discussionId: "2019-04-09-page-slug"
path: "/2019-04-09-page-slug-01"
cover: "../2019-04-09/20190225003347.jpg"
date: "2019-04-09"
title: "JavaScript基础回顾-作用域、this、 call/apply/bind方法与闭包"
published: true
subtitle: ""
type: "dev"
typeID: "2"
typeTitle: "技术杂谈"
special: ""
categores: "JavaScript"
tags: ['JavaScript']
---

###

&nbsp;&nbsp;&nbsp;&nbsp;在ES5标准中JS作用域只有全局作用域和局部作用域(函数作用域)，在ES6标准中新增了块级作用域，即let、const等声明的变量。如果要彻底理解JavaScript的作用域，还需要理解JavaScript的预编译机制的词法环境(Lexical Environments .LE)才行。

### 作用域

- **词法环境(LE)：** 简单理解就是JS在执行代码代码之前，会先把要执行的代码进行预处理，就是从代码中先挑出 var 和 function声明的变量或函数对象作为标识符分解编译解释给浏览器环境，然后浏览器根据解释做出相应的反馈，嗯 大致就这么个作用；需要注意的是声明的变量、函数的提升。
- **全局作用域：** 一个在任何地方都能访问，函数外定义的变量拥有全局作用域。 
- **函数作用域：** 自然就是指的function声明的函数对象体内了。
- **块级作用域：** ES6新增，使用let、const 关键字声明的变量，也就是从let声明的代码位置开始到其所在作用域的结束位置，这一部分范围的代码块。

#### 词法环境(LE)

&nbsp;&nbsp;&nbsp;&nbsp;官方说明：词法环境（Lexical Environments）是一种规范类型，用于根据ECMAScript代码的词法嵌套结构来定义标识符与特定变量和函数的关联。词法环境由一个环境记录（Environment Record）和一个可能为空的外部词法环境（outer Lexical Environment）引用组成。通常，词法环境与ECMAScript代码的特定语法结构相关联。环境记录记录了在其关联的词法环境作用域内创建的标识符绑定。它被称为词法环境的环境记录。环境记录也是一种规范类型。规范类型对应于在算法中用来描述ECMAScript语言结构和ECMAScript语言类型的语义的元值。   
说了一大堆也不好理解... 😶，就是说JS引擎会把你的代码结构、关键字声明的变量表达式等拆分成一个个可以使用特殊flag标识可以描述的字符串，然后再把这些带有特殊flag标识的字符串根据其记录的代码结构、嵌套等编译转换成代表程序语法结构的树这个树被称为“抽象语法树” (Abstract Syntax Tree, AST)；这个语法树就是JS引擎的大致翻译过程，然后再把AST转换成机器能理解的指令。这里面涉及到变量和函数的声明提升预处理。   

一起看看JS引擎解析代码的例子(来自网络)：   

比如对 var a = 1; 做解析大概是下面的样子：

```javascript
[
  "var" : "keyword",
  "a" : "identifier",
  "="   : "assignment",
  "undefined"  : "undefined",
  ";"   : "eos" (end of statement)
]
```

然后对上面拆分的字符串对象做编译解析，大概是这个样子：

```javascript
{
  operation: "=",
  left: {
    keyword: "var",
    right: "a"
  }
  right: "1"
}
```
以上只是简单的说明一下，实际解析的过程肯定要复杂的多，理解就好，预处理阶段的函数对象和变量总是会被优先加载，而函数对象的优先级总是高于变量，变量在此阶段总是会被赋予undefined默认值，只有执行到变量赋值表达式的时候才会真正的给变量赋实际值；而函数体的执行时机，是由调用它的位置决定的。


#### 全局作用域

一个在任何地方都能访问，函数外定义的变量拥有全局作用域。但是有一种情况需要注意：
 
```javascript
console.log(a);	            // undefined
console.log(Per);		        // 输出整个Per函数体
var a = 5;
function Per() {
  console.log(sid);        // 1
  var sid=1;
  console.log(b);          // b is not defined
  b = "abcdefg";
  function say(){
    c = 10;
    console.log(b);        // abcdefg
  }
  console.log(b);          // abcdefg
  console.log(c);          // 10
}
console.log(b);	           // abcdefg
console.log(c);	           // 10
console.log(sid);	         // sid is not defined	
```

以上我们需要注意的第一点就是变量和函数的声明提升，另外JS允许我们重名定义，对于变量与变量重名，后声明的覆盖先声明，函数对象与函数对象之间也是；但是对于变量和函数对象之间重名定义，无论先后函数对象总是会覆盖变量，即函数的优先级总是高于变量；前面我们已经在JS词法环境部分说过了。   
还有就是未使用var 或者let、const 等关键字声明变量，这种变量会被提升为全局变量，为什么呢？看代码，在 b 变量定义之前的` console.log `输出的是` b is not defined`，说明代码执行到这一句的时候，并没有在 Per 函数作用域和外层全局作用域找到有关变量 b 的定义。而在执行过` b = "abcdefg"; `之后，后面的 log 都输出了  b 的值，说明实在执行到` b = "abcdefg"; `这一句代码的时候才创建了变量 b 。那么为什么会提升为全局变量呢？因为没有使用关键字声明，JS就会认为它是已经声明过的变量，然后开始寻找，先在 Per 函数内寻找，结果没找到，然后到 Per 函数的外层去找，结果还是没找到，根据代码我们知道此时已经是找到全局作用域范围了(全局作用域就是整个作用域链的最顶端了)，发现原来变量 b 并不存在，于是JS就干脆新创建了 b ，到此 b 就落户到了全局域。 


#### 函数作用域

顾名思义函数体内的作用范围。

```javascript
function Per(arg) {
    var sid=1;
    this.arg = arg;
    function counter(a){
      var age = 10;
    }
    b = "abcdefg";
    console.log(i);                         // undefined
    for (var i = 0; i < b.length; i++) {
      var y = b[i];
      console.log(y);                       // 循环输出：a  b  c  d  e  f  g
    }
}
```
函数内的作用域范围还是要注意 var 变量的声明提升和 this 问题, this 放到后面单独介绍。

#### 块级作用域

某一块代码范围内，let/const 声明的代码位置开始到其所在作用域的结束位置，这一部分范围的代码块。

```javascript
function Per() {
  console.log(sid);                         // undefined
  //console.log(b);                         // b is not defined	
  //console.log(i);                         // i is not defined	
  console.log(x);                           // undefined
  //console.log(y);                         // y is not defined	
  //console.log(con);                       // con is not defined	
  var sid=1;
  let b = "abcdefg";
  const con = "222";
  for (let i = 0; i < b.length; i++) {
    let y = b[i];
    var x = b[i];
    console.log(con);                       // 循环输出：222
  }
  function say(){
    console.log(con);                       // 222
    console.log(b);                         // abcdefg
  }
  console.log(con);                         // 222
  console.log(b);                           // abcdefg
  console.log(x);                           // g
  //console.log(y);                         // y is not defined	
  console.log(sid);                         // 1
}
console.log(con);                           // con is not defined		
```
从输出结果来看，和 var 变量不同的是，let和const声明的变量都没由被提升，而是从其定义的位置开始一直到其所在作用域范围结束。for 循环中 let 声明的 i只能作用域循环体内。就相当于: 

```javascript
function Per() {
  ...        // 省略部分不变
  { 
    let b = "abcdefg";
    const con = "222";
    ...       // 省略部分不变
    console.log(sid);                         // 1
  }
}
console.log(con); 
```
这样看就更清晰了吧。好了，以上就是JS中作用域部分的基础知识了。接下来我们来看看JS作用域知识中的核心 this ，这个也是最容易出错的部分。


### this 与 globalThis

在JS中 this 根据不同的使用环境，它可以代表着指向不同作用域的指针。MDN中对于访问全局范围在不同JavaScript环境下的`globalThis`说明：在Web网络中你可以使用` window `, ` self ` 或者` frames `， 但是在Web Workers 中只有使用` self `可以正常使用。在Node.js中以上提到的都不起作用，你必须使用` global `代替它们。` this ` 关键字只在非严格模式下运行的` 函数中` 使用，但是在模块和严格模式下运行的` 函数中` ，` this ` 是undefined的。另，在全局作用域中` this ` 的值就是`globalThis`。

JavaScript运行时环境的全局上下文对象, globalThis的使用：

```javascript
function canMakeHTTPRequest() {
    return typeof globalThis.XMLHttpRequest === 'function';
}

console.log(canMakeHTTPRequest());      // true
```

这种方式是MDN目前提供的最新的方式，仅Chrome和FF支持。

兼容旧版的使用方式：

```javascript
var getGlobal = function () { 
  if (typeof self !== 'undefined') { return self; } 
  if (typeof window !== 'undefined') { return window; } 
  if (typeof global !== 'undefined') { return global; } 
  throw new Error('unable to locate global object'); 
}; 

var globals = getGlobal(); 
```

上面代码中的` self `：指的是web workers API全局上下文环境；` window `：指的是浏览器全局上下文环境；` global `：指的是Node.js中的全局上下文环境;以上就是JS运行时环境的全局上下文，下面主要说说this在函数中的使用。

函数的 this 关键字在大多数情况下，它的值由函数的调用方式决定。它不能在执行期间通过赋值来设置，而且每次调用函数时它可能是不同的。既然函数中的 this 的值是由调用方式决定的，那么我们来看看JS中函数的调用方式有哪些？    

直接调用方式：  

```javascript
function Fun(){
	console.log(this);      // window对象
	function bun(){
		console.log(this);      // window对象
	}
}
Fun();
```

作为构造方法的方式：  

```javascript
function Fun(){
	console.log(this);      // 指向当前 Fun 函数对象
	function bun(){
		console.log(this);      // window对象
  }
  bun();
  new bun();                // bun 函数对象
}
new Fun();
```

作为对象的属性或方法使用：

```javascript
function Fun(){
	console.log(this);                  // 指向当前 Fun 函数对象
	this.say = function say(){
		console.log(this);                // 指向当前 Fun 函数对象
	}
}
var fun = new Fun();
fun.say();
```

还有最后一种就是call()/apply()的方式：

```javascript
function eat(fruit, num){
	console.log(this.name + " eat "+ num + " 个 " + fruit);     // funs吃了2个苹果
}
function Fun(){
	this.name = "func";
	console.log(this);
	function say(){
		console.log(this);
	}
  say();
  new say();
	say.apply(this);
}
var fun = new Fun();
Fun.call(this);
eat.call(fun, "苹果", 2);
```
截断调用者的上下文环境，使用指定的上下文对象代替，以达到偷天换日的目的。call()/apply()的第一个参数就是指定的上下文环境对象。   
分析：第一点` say.apply(this); `， say 函数虽然作为Fun()函数的内部函数，但是我们通过前面的几种函数使用方式知道在此例中 new Fun() 函数内 this 的值是 Fun 函数自身，而执行`  say(); `时 say 函数内的 this 的值是 window 对象，执行` new say() ` 函数时 say 函数内的 this 是 say 函数自身，执行` say.apply(this); ` 时 因为传入的 this 是在 Fun 函数体内所以` say.apply(this); ` 中的 this 此时指的是 Fun 函数自身（别忘了是 new Fun()）,所以在执行` say.apply(this); ` 之后 say 函数的上下文被截断并使用 Fun 函数的上下文对象代替。所以会输出 Fun 函数。   
第二点` Fun.call(this);`：有了第一点后面的就容易理解了, call 方法中this 此时是指向整个全局上下文环境（浏览器window对象）的，所以执行` Fun.call(this);` Fun 函数的当前上下文就变成了浏览器的 window 对象,同理整个函数体内 除了` new say(); `全部会输出 window 对象。   
第三点` eat.call(fun, "苹果", 2); ` 和前面两点没啥区别，只是把 this 变成了 fun 对象。所以在 eat 函数中可以使用 fun 对象的所有属性和方法。    

在ES6标准中新出的箭头函数(Arrow functions)，语法简单，使用方便，用了都说好..😄(地球人儿都知道 哈哈)  
来自MDN的描述：箭头函数表达式的语法比函数表达式更简洁，并且没有自己的this，arguments，super或 new.target。这些函数表达式更适用于那些本来需要匿名函数的地方，并且它们不能用作构造函数。

我们来看下对象中的箭头函数：

```javascript
var obj = {
  age : 23,
  dou : (a, b) => {
    console.log(this);          // window
    console.log(this.age);      // undefined
    console.log(this.b);        // undefined
    console.log(a);         
    console.log(b);         
  },
  say : function (x=0){
    var fn = ( y )=>  {
				console.log(this);      // obj
				x - y;
    }
    console.log(this);          // obj
    return fn.call(this, this.age);
  },
  eat : (m=1) => {
    var fns = ( n )=> m + n;
    console.log(this);          // window
    return fns.apply(this, this.age);
  }
};

obj.dou(1);
obj.dou.call(this, 1, 3);
console.log(obj.say.call(obj, 50));     // 27
console.log(obj.say.call(this, 50));    // NaN
console.log(obj.eat.call(obj, 50));     // NaN
console.log(obj.eat.call(this, 50));    // NaN
```

结论：call()和apply()无法改变箭头函数的上下文对象，call()函数传的obj和this对象并没有起到作用，也就是说箭头函数的作用域是固定的，另外一点就是上下文对象和箭头函数定义的位置有关系。箭头函数在函数内定义那么它的 this 指向的就是函数本身，如果在变量或者代码块内，那么它的 this 指向的就是 变量或者代码块所在的作用域。( NaN 是因为 this 指向的是 window 对象，所以无法识别 age 类型)。      

好了，以上就是关于 this 在不同环境和作用域的使用方式，只要明白函数的调用方式，this 的值就很好判断了。   

### call()/apply()/bind()  

前面简单使用了call()和apply()方法，但是还其它的使用方式，比如:    

数组追加:   

```javascript
var array1 = ["fun" , 12 , {val:"JS"}]; 
var array2 = ["Sub" , 233 , 0]; 
Array.prototype.push.apply(array1, array2);   //array1["fun" , 12 , {val:"JS"} , "Sub" , 233 , 0]
```

获取数组中的最大值和最小值:

```javascript
var  numbers = [ 5, 99 , -50 , -1 ]; 
console.log(Math.max.apply(Math, numbers));           // 99
console.log(Math.min.call(Math, 5, 99 , -50 , -1 ));  // -50
```

验证数据类型：

```javascript
var  numbers = [ 5, 99 , -50 , -1 ]; 
var  obj = { a:1, b:'1', c:'abc' }; 
console.log(Object.prototype.toString.call(numbers) === '[object Array]');        // true
console.log(Object.prototype.toString.call(obj) === '[object Object]');           // true
```

以上就是apply() 和 call()的一些简单使用场景，当然还有其它的使用场景慢慢发掘。   

bind() 方法与 apply 和 call 很相似，也是可以改变函数体内 this 的指向,bind的作用就是把当前调用bind()方法的对象绑定在指定的对象上。bind()方法会创建一个新函数执行然后返回函数对象，在调用时，将其this关键字设置为提供的值，并在调用新函数时提供任何前面提供的给定参数序列。具体看看它的使用方式：

```javascript
var fun = function(){
	console.log(this.x);
}
var obj = {
	x:10
}
fun();                    // undefined
var func = fun.bind(obj);
func();                   // 10
```
分析：执行` fun(); `时 fun函数的this 指向的是全局 window 对象，所以，this.x 为` undefined `；在执行 ` fun.bind(obj) `之后，fun函数的 this 被设置为 obj ，再次调用 func() 时 this.x 就相当于obj.x 为 10.

```javascript
function list(){
	return Array.prototype.slice.call(arguments);
}
var list1 = list(1, 2, 3);
console.log(list1);                 //  [1, 2, 3]

var a = list.bind(undefined, 10); 
console.log(list.bind(undefined, 10));    // list 函数体
console.log(a());                   // [10]
var list3 = a(1, 2, 3);
console.log(list3);                 // [10, 1, 2, 3]
```

示例代码中` Array.prototype.slice.call(arguments); `arguments是一个类似数组的对象，会把arguments转化为数组；这里需要注意的执行bind()之后的函数调用，在执行 bind()的时候会先创建一个函数执行，然后会返回函数对象，而 变量 a 引用的就是 bind()返回的函数，所以在代码继续执行的时候，变量 a (即bind返回的函数对象)一直存在内存中，后面传入的（1，2，3）通过 arguments 对象就被累计到了变量 a 引用的函数 array 数组中，这里顺带提一下JS中的函数柯里化（部分求值）就是函数会接受一些参数，但是函数并不会立即计算求值，而是返回另外一个函数，而传入的参数在函数形成的闭包中被保存起来，等到函数真正需要求值的时候才会把传入的所有参数一次性计算求值。

函数柯里化处理：

```javascript
var count = (function(){
	var args = [];
	return function(){
		if (arguments.length === 0) {
			var total = 0;
			for (var i = 0, l = args.length; i < l; i++) {
				total += args[i];
			}
			return total;
		} else {
			Array.prototype.push.apply(args, arguments);
		}
	}
})();
count(1, 2, 3);
count(10);
console.log(count()); 
```

是不是很相似，传入的参数都是被持续追加，直到满足条件之后才被一次性计算求值，return 部分就是做了简单的闭包处理，这里只是简单提一下，后面的高阶函数部分会涵盖函数柯里化，好了以上就是call()/apply()/bind() 的使用，下面我们看看闭包。


### 闭包Closures

闭包，指的是词法表示包括不被计算的变量的函数，也就是说，函数可以使用函数之外定义的变量。简单点说就是定义一个函数，这个函数呢可以通过访问外部的变量做一些内部处理，而这个处理细节呢，又不想让外部的对象知道；外部的对象只需要知道处理结果就行了，大致就这么个意思，有点黑匣子的感觉...  在上面呢我们已经简单用过了，具体看实例吧。

```javascript
function Fun(){
   	console.log(this);          
    function clo(){
       console.log(this);      
       console.log('Hello Closure!');
    }
    return clo;
}
Fun();                              // window
var fun = Fun();
fun();                              // Hello Closure!
```

一个很简单的函数嵌套例子，直接调用 Fun() 函数 只输出了 window ，虽然Fun函数有` return clo; `但是很明显这种方式执行 return 直接被忽略;作为表达式执行正常输出，很简单，因为` var fun = Fun(); `接收了Fun()函数返回的 clo 函数，所以变量 fun 引用的是一个函数对象而不是对象实例。可以看出当一个内部函数被其所在函数之外的变量引用时，就形成了一个闭包。那么上面的函数就可以整理一下：

```javascript
var fun = function(){
   	console.log(this);
    return function(){
       console.log(this);
       console.log('Hello Closure!');
    }
}
var fun = fun();
fun();                              // Hello Closure!
```

或者

```javascript
var fun = () => {
   	console.log(this);
    return function(){
       console.log(this);
       console.log('Hello Closure!');
    }
}
var fun = fun();
fun();                              // Hello Closure!
```

或者

```javascript
var fun = () => {
	var a = 10;
    return function (){
    	a += a;
       console.log(a);
    }
}
var fun = fun();
fun();                              // 20
fun();                              // 40
```

循环赋值：

```javascript
function foo(){
    var arr = [];
    for(var i = 0; i < 3; i++){
        arr[i] = ((index)=>{
            return ()=>{
                return "index = " + index;
            }
        })(i);
    }
    return arr;
}
var bar = foo();
console.log(bar[2]);      // ()=>{  return "index = " + index; }
console.log(bar[0]);      // ()=>{  return "index = " + index; } 
console.log(bar[2]());    // index = 2
console.log(bar[0]());    // index = 0 
```       

循环体内使用闭包赋值是极容易出错的，这段代码最需要注意的是数组 arr[i] 的赋值部分，使用立即执行函数传参，为什么一定要把变量 i 再传给闭包函数呢？   
我们知道闭包执行完返回的是个函数，而闭包函数是可以访问外部变量的，但是被访问的外部变量（这里指 i ）是常驻内存的（从前面的几个例子中我们也能看出这一点），在闭包中引用的外部变量其实是引用的外部变量的内存地址而不是变量的值，当我们在执行闭包返回的函数体的时候 for 循环早已经执行完了，i 在内存地址中的值也变成3了，所以这里需要加上立即执行函数，代码中返回又是一个匿名函数所以必须要传 i 的值，如果不想传 i 的值可以只使用立即执行函数就行，但是立即执行函数内必须直接返回 i ；可以像下面这样：


```javascript
function foo(){
    var arr = [];
    for(var i = 0; i < 3; i++){
        arr[i] = (()=>{
                return "index = " + i;
        })();
    }
    return arr;
}
var bar = foo();
console.log(bar[2]);    // index = 2   
console.log(bar[0]);    // index = 0   
```           
for循环使用闭包还有其它几种解决方式，以上只是为了说明需要注意的问题点。


封装对象的方式：   

```javascript
var fun = (() => {
	var name = "JS";
    return {
    	getName : () => {
    		return name;
    	},    	
    	setName : (na) => {
    		name = na;
    	}
    }
})();

console.log(fun.getName());            // JS            
fun.setName("Java");  
console.log(fun.getName());            // Java   
```    
总结一下就是闭包大部分场景都是用于函数嵌套，在函数的内部可以引用外部的变量，并且引用的变量可以常驻内存，闭包函数内的变量完全私有化，并且可以有效避免污染全局变量，但是闭包会加大内存的使用，使用不当会造成内存泄漏。   

以上就是JS中关于作用域、this 和闭包的相关知识了；要确定当前 this 的值只要弄明白那几种函数调用方式和ES6的箭头函数就行了，另外还要明白JS的预编译机制，var变量和function函数的声明提升的特点。好了，就先这么多吧，有需要补充的话，后面再加吧.

