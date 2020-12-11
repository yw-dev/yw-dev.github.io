---
author: ""
description: ""
discussionId: "2019-04-07-page-slug"
path: "/2019-04-07-page-slug-01"
cover: "../2019-04-07/20190225002804.jpg"
date: "2019-04-07"
title: "JavaScript基础回顾-函数、对象、类、原型链和继承"
published: true
subtitle: ""
type: "dev"
typeID: "2"
typeTitle: "技术杂谈"
special: "Web"
categores: "Web"
tags: ['JavaScript']
---

###

&nbsp;&nbsp;&nbsp;&nbsp;JavaScript作为web领域最流行的编程语言，作为web开发领域的一员必须要深入理解并牢牢掌握，本文只是回顾一遍JavaScript中比较基础的核心知识,并由浅入深，一步步深入理解JavaScript原型链和作用域。内容会涵盖ES6\ES7新标准中的内容，会尽量沿着一条线深入JS。

### 文中涉及到的知识点

- **函数和对象** 
- **类型检查typeof、instanceof和Object.prototype** 
- **prototype、__proto__和constructor属性** 
- **JS中的继承** 

### JavaScript

JavaScript(JS)是一种具有函数优先的轻量级解释型或即时编译型的编程语言；它是一种基于`原型编程`、多范式的`动态脚本语言`，并且支持面向对象、命令式和声明式（如函数式编程）风格。

- **函数：** 函数是由事件驱动的或者当它被调用时执行的可重复使用的代码块。使用 function 关键字声明。
- **对象：** 在 JavaScript 中，对象是拥有属性和方法的数据。使用 new 关键字实例化。（JavaScript中的所有事物都是对象：String、Number、Array、Boolean，Global等等。）
- **类：** 类声明使用基于原型的继承创建具有给定名称的新类。使用 class 关键字声明。

#### 函数

定义：函数是一组可以随时随地运行的语句。
声明：关键字 function、函数名、一组参数，以及置于括号中的待执行代码。  

在JavaScript中，函数是作为对象使用的(Function对象，一切皆对象，后面会有详细分析)，最简单最直观的做法，打开浏览器开发者工具（f12）→ debug面板 → Scope选项 → Global → [你的全局函数名]，便能看到函数包含的两个属性：显式的`prototype`属性和隐式的`__proto__`属性; 每一个函数都有一个显式的`prototype`属性，每一个对象都有一个名为`__proto__`的隐式属性；而JS中的函数既是对象(Function对象)也可以作为执行特定代码的片段使用，所以JS中的函数既包含函数独有的`prototype`属性也包含对象独有的`__proto__`属性；而原型链正是基于对象的`__proto__`属性才形成的。

- **函数声明式/预处理：** 使用`function`关键字声明一个函数，并指定函数名，以这种方式定义的函数在`JS词法环境`（LexicalEnvironment，LE）中会被提升（函数声明提升，函数表达式不具备这种特点）;

```javascript
mFun();
function mFun() {
    console.log("a function");
}
```
这是一个简单的函数声明，函数在定义之前调用，代码依然正常执行。因为在JS环境中它会预先扫描JS中声明的变量和函数并将它们加到预处理阶段的词法环境中去，函数的优先级高于变量。这种方式比较传统，代码量庞大了就显得啰嗦也容易污染全局命名空间。

- **函数表达式** 

```javascript
let mFun = function() {
    console.log("a function");
}
mFun();
```
函数表达式的引用必须放在函数定义后面，否则会得到错误提示；与声明式函数不同，函数表达式只有在JS执行到表达式定义的位置的时候才会把匿名函数赋值给mFun，所以两者之间在执行时机上是有区别的。另外我们可以使用函数表达式实现函数的立即执行。`立即执行函数`(IIFE)：

```javascript
let mFun = (function() {
    console.log("a function");
})();
```
是不是看上去简洁很多，还可以在简化，下面的经典写法

```javascript
(function() {
    console.log("a function");
})();
// or
void function(global) {
    console.log("a function");
}(this);
// or
~function() {
    console.log("a function");
}();
// or
!function() {
    console.log("a function");
}();
```
以上就是JS中函数中最简单用法。

#### 对象

对象的定义：ECMA-262 把对象（object）定义为“属性的无序集合，每个属性存放一个原始值、对象或函数”，这意味着对象是无特定顺序的值的数组。对象是由 new 运算符加上要实例化的对象的名字创建的。   

Object 对象：ECMAScript 中的所有对象都由这个对象继承而来，Object 对象中的所有属性和方法都会出现在其他对象中。  

Function 对象（类）：Function 类可以表示开发者定义的任何函数。

```javascript
function Sub(a) {
  this.name = a;
  this.myName = myName;

  function myName(){
    console.log("auth name is " + this.name);
  }
  console.log("haha，auth name is " + this.name); 
}
Sub("扬帆");
let mSub = new Sub("扬帆");
mSub.myName();
```

这样一个简单的函数对象就定义好了(JS中的函数都可以作为构造函数)，对象(类)只是比普通函数多了属性和内部函数，只需要使用new关键字实例化就行了，例子中就是把Sub的实例存入mSub变量中了，mSub就是对Sub对象(类)实例的引用；对象的定义方式和普通的函数代码块并没什么区别。(从面向对象的角度来说，声明的 Sub 函数对象属于对实例化对象(new Sub("扬帆")的定义，变量 mSub 只是对这个实例对象的引用)的定义，这和Java中的Class类的作用是一样的。这个地方比较容易产生歧义。但是JS是基于对象原型的编程语言，在JS中 function 声明的函数就是一个Function对象，后面有分析说明，Function、Object、class和function之间的关系)

#### 类(ES6)

类(class)：每个对象都由类定义，可以把类看做对象的配方。类不仅要定义对象的接口（interface）（开发者访问的属性和方法），还要定义对象的内部工作（使属性和方法发挥作用的代码）。编译器和解释程序都根据类的说明构建对象。(注意：从传统意义上来说，ECMAScript 并不真正具有类。事实上，除了说明不存在类，在 ECMA-262 中根本没有出现“类”这个词。ECMAScript 定义了“对象定义”，逻辑上等价于其他程序设计语言中的类。)以上是ES5中给出的有关JS类的说明，在ES6中才开始正式使用` calss `关键字进行类声明，它使用基于原型的继承创建具有给定名称的新类。

```javascript
class Sub {
  toString(){
    console.log("Sub class");
  }
}
var pol = new Sub();
pol.toString();
```
除了声明部分，在使用方式上和介绍对象部分的示例并没有多大区别，这样定义对象可能更符合我们的逻辑习惯吧，需要注意的是：使用 class 关键字的时候 constructor()可选，在class 内定义的函数/方法不能使用 function 声明。

我们通过对函数、对象(构造器实例)和类做类型检查的方式一步一步深入理解JS中的函数、对象和类：

- **typeof：** 通过返回一个字符串，来表示数据的类型。
- **instanceof：** 用来判断某个构造函数的`prototype属性`是否存在于另外一个要检测对象的原型链上。

#### 先了解一下JS中的数据类型

最新的 ECMAScript 标准定义了7种数据类型(MDN)：
- **六种基本数据类型：** 
>- **Boolean：** 
>- **Number：** 
>- **String：** 
>- **null：** 表明 null 值的特殊关键字。 JavaScript 是大小写敏感的，因此 null 与 Null、NULL或变体完全不同。
>- **undefined：** 和 null 一样是一个特殊的关键字，undefined 表示变量未定义时的属性。
>- **Symbol：**  ( 在 ES6 中新添加的类型).。一种实例是唯一且不可改变的数据类型。
- **Object类型：** 

以上是JavaScript中的数据类型，下面先对数据类型和函数使用类型检查继续深入JavaScript。

#### typeof

```javascript
class Sub { }
console.log(
  typeof null                      // object
  +typeof undefined                // undefined
  +typeof Symbol()                 // symbol
  +typeof new Function()           // function
  +typeof Function                 // function
  +typeof function(){}             // function
  +typeof Object                   // function
  +typeof new Object()             // object
  +typeof Sub                      // function
  +typeof {a:1, b:'1', c:'abc'}    // object
  +typeof [1, '1', 'abc']          // object
);
```

由此可见`function(){}`、`Function对象`、`class`和`Object`同属一个类型，(根据Function对象的定义：`每个函数实际上都是一个Function对象.`)而Object自身也是function类型，只有经过实例化的Object对象才会是object类型(普通对象)，`class`本质上呢也是一个函数对象。从例子中的json和数组检查不难看出typeof判断数据类型虽然抽象，但是却足以确定`function(){}`、`Function对象`、`Object对象`和`class`之间是有关联关系的，但是还不够明确，继续深入。

#### instanceof

instanceof运算符可以用来判断某个构造函数的`prototype属性`是否存在于另外一个要检测对象的原型链上。

```javascript
class Sub { }

function Person(){ }

function Fun(){ }

let mf = new Fun();

console.log(
  (mf instanceof Fun)                                  // true
  +(mf instanceof Person)                              // false
  +(mf instanceof Object)                              // true
  +(mf instanceof Function)                            // false
  +(mf.constructor instanceof Object)                  // true
  +(mf.constructor instanceof Function)                // true
  +(mf.constructor.prototype instanceof Object)        // true
  +(mf.constructor.prototype instanceof Function)      // false
  +(mf.__proto__ instanceof Object)                    // true
  +(mf.__proto__ instanceof Function)                  // false
  +(Sub instanceof Object)                             // true
  +(Sub instanceof Function)                           // true
  +(Sub.constructor instanceof Object)                 // true
  +(Sub.constructor instanceof Function)               // true
  +(Sub.prototype instanceof Object)                   // true
  +(Sub.prototype instanceof Function)                 // false
  +(Fun instanceof Object)                             // true
  +(Fun instanceof Function)                           // true
  +(Fun.prototype instanceof Object)                   // true
  +(Fun.prototype instanceof Function)                 // false
  +(Fun.constructor instanceof Object)                 // true
  +(Fun.constructor instanceof Function)               // true
  +(Fun.constructor.prototype instanceof Object)       // true
  +(Fun.constructor.prototype instanceof Function)     // false
  +(Fun.__proto__ instanceof Object)                   // true
  +(Fun.__proto__ instanceof Function)                 // false
);
```

从上面的示例中得出什么样的信息呢？  
>mf 和 `prototype`、`__proto__`属性是Object对象，
Fun、Sub 和 `constructor`属性是Function对象，
Fun 函数和 Sub class 是一个Function对象所以也存在与Object对象原型链上；mf 作为 Fun 函数的实例化对象，并不具备函数的特性所以是没有prototype属性的，所以它只能通过对象特有的`__proto__`属性去查找原型对象。再看看下面原型链中的例子。

#### JS原型链
我们知道JS中函数和对象包含的三个关键属性：`prototype`、`__proto__`和`constructor`；那么这三个属性有着什么样的作用呢？

- **prototype：** 是一个显式的原型属性，只有函数对象才有而普通的对象(实例化的)是没有此属性的，指向原型对象。
- **__proto__：** 是一个隐式的原型属性，也是指向原型对象。
- **constructor：** 是一个Function对象,每一个Object对象都会有一个 constructor 属性指向其构造函数。

```javascript
class Sub { }

function Fun(){ }

let mf = new Fun();

console.log(
  "mf: " + typeof mf                                 // object
  + typeof mf.constructor                            // function
  + typeof mf.prototype                              // undefined
  + typeof mf.__proto__                              // object
  + "----------Fun----------- "
  + typeof Fun                                       // function
  + typeof Fun.constructor                           // function
  + typeof Fun.prototype                             // object
  + typeof Fun.__proto__                             // function
  + "----------Sub----------- "
  + typeof Sub                                       // function
  + typeof Sub.constructor                           // function
  + typeof Sub.prototype                             // object
  + typeof Sub.__proto__                             // function
  + "----------Object----------- "
  + typeof Object                                    // function
  + typeof Object.constructor                        // function
  + typeof Object.prototype                          // object
  + typeof Object.__proto__                          // function
  + typeof Object.prototype.__proto__                // object
  + typeof Object.prototype.prototype                // undefined
  + typeof Object.__proto__.__proto__                // object
  + typeof Object.__proto__.prototype                // undefined
  + "----------Function----------- "
  + typeof Function                                  // function
  + typeof Function.constructor                      // function
  + typeof Function.prototype                        // function
  + typeof Function.__proto__                        // function
  + typeof Function.prototype.__proto__              // object
  + typeof Function.prototype.prototype              // undefined
  + typeof Function.__proto__.__proto__              // object
  + typeof Function.__proto__.prototype              // undefined
  + "----------constructor----------- "
  + (mf.constructor === Fun)                         // true
  + (mf.constructor === Function)                    // false
  + (mf.constructor === Object)                      // false
  + (Fun.constructor === Function)                   // true
  + (Fun.constructor === Object)                     // false
  + (Sub.constructor === Function)                   // true
  + (Sub.constructor === Object)                     // false
  + (Object.constructor === Function)                // true
  + "----------prototype----------- "
  + (Fun.prototype === Object)                       // false
  + (Fun.prototype === Function)                     // false
  + (Sub.prototype === Object)                       // false
  + (Sub.prototype === Function)                     // false
  + (Sub.prototype === Fun.prototype)                // false
  + (Sub.prototype === Fun.__proto__)                // false
  + "----------__proto__----------- "
  + (mf.__proto__ === Object)                        // false
  + (mf.__proto__ === Function)                      // false
  + (mf.__proto__ === Fun.prototype)                 // true
  + (mf.__proto__ === Fun.__proto__)                 // false
  + (mf.__proto__ === Object.prototype)              // false
  + (mf.__proto__ === Object.__proto__)              // false
  + (mf.__proto__ === Function.prototype)            // false
  + (mf.__proto__ === Function.__proto__)            // false
  + (Fun.__proto__ === Object)                       // false
  + (Fun.__proto__ === Function)                     // false
  + (Fun.__proto__ === Object.prototype)             // false
  + (Fun.__proto__ === Object.__proto__)             // true
  + (Fun.__proto__ === Function.prototype)           // true
  + (Fun.__proto__ === Function.__proto__)           // true
  + (Sub.__proto__ === Object)                       // false
  + (Sub.__proto__ === Function)                     // false
  + (Sub.__proto__ === Object.prototype)             // false
  + (Sub.__proto__ === Object.__proto__)             // true
  + (Sub.__proto__ === Function.prototype)           // true
  + (Sub.__proto__ === Function.__proto__)           // true
  + (Sub.__proto__ === Fun.__proto__)                // true 
  + "----------Object、Function、prototype、__proto__----------- "
  + (Function.prototype === Object.prototype)        // false
  + (Function.prototype === Object.__proto__)        // true
  + (Function.__proto__ === Object.prototype)        // false
  + (Function.__proto__ === Object.__proto__)        // true
  + (Object.prototype.__proto__ === null)            // true   
);
```

从代码中可以看出Function和Object对象最终的`__proto__`属性和`prototype`属性都是指向Object类型；mf 是一个普通的实例对象所以`prototype`属性是undefined，mf 对象本身就是由Fun函数构造出来的所以 mf.constructor = Fun函数，mf 对象的`__proto__`属性指向Fun函数，Fun函数和 Sub 类的`__proto__`属性又指向Function对象，Function对象的`prototype`和`__proto__`属性又都指向Object，而Object最终的原型属性指向`null`至此这条链到此结束，这就是JS的原型链。
总结一下就是：
>在JS中`function`声明的函数既是函数也是对象即函数对象(Function),Object自身和 class 声明的类也是一个函数对象；每一个函数对象都包含`prototype`和`__proto__`属性；而每一个实例化对象仅包含`__proto__`属性；每一个对象都会有一个指向其构造函数的`constructor`属性（`__proto__`和`prototype`属性中）。`prototype`和`__proto__`属性都是指向其父原型对象，null位于JS原型链的最顶端。我们现在应该彻底弄明白了JS是基于原型的编程语言的原委啦。  

### JS中的继承  

&nbsp;&nbsp;&nbsp;&nbsp;既然我们已经搞明白了JavaScript中的函数、Function、Object和 class 之间的关联关系了，那么我们再进一步,通过上面的示例中我们得知，JS中的对象是通过`prototype`和`__proto__`原型属性来建立对象之间的关系。那么当然也可以通过原型属性访问原型对象的方法和属性了。这样其实就是JS中的继承。只不过表面上看起来不像Java中那么直接。下面我们通过一个示例看看：

```javascript
// ES6 中的继承实现 
class Sub {
  constructor() {
    this.name = 'Sub';
  }
  toString(){
    console.log(this.name);
  }
} 
class Child extends Sub {			
  constructor() {
    super();
    this.name = 'Square';
  }
}

var c = new Child();
c.toString();               // Square
var s = new Sub();
s.toString();               // Sub
```

这种方式看着直观比较好理解，但是如果要明白其中原理还是需要借助ES5中的几种继承方式，在ES5中实现继承还需要知道两个常用的函数：
- **call(this, arg1, arg2, ...)方法：** 第一个参数用作 this 的对象。其他参数都直接传递给函数自身。
- **apply(this, [arg1, arg2, ...])方法：** 方法有两个参数，用作 this 的对象和要传递给函数的参数的数组。

这两个函数的作用是一样的，都是为了改变函数体内部 this 的指向。区别只在参数不同，另外还有一个 bind() 方法和这两个类似，涉及到作用域和 this 的有关知识，会在另外一篇文章中详细解释。

- **构造函数继承：** 

```javascript
// ES5 中的继承
function Sub(name) {
    this.name=name;    
    this.say=function(){
      console.log(this.name + "/" + this.age);
    }
}
function Child(age, name) {
    Sub.call(this, name);
    this.age = age;
}

var s = new Child(20, "js");              // js
s.say();                                  // js/20
console.log(s instanceof Sub);            // false   
```
结果：方法没有被继承，有缺陷。

- **原型链继承：** 

```javascript
function Sub(age, name) {
    this.name=name;
    this.age=age;
    this.say=function(){
      console.log(this.name + "/" + this.age);
    }
}
function Child(age, name) { }

Child.prototype = new Sub();
Child.prototype.constructor = Child;

var s = new Child(20, "js");
s.say();                                  // undefined/undefined
console.log(s instanceof Sub);            // true   
```
结果：方法被继承，但是属性没有，无法向父类构造函数传参，有缺陷。

- **混合方式继承：** 

```javascript
function Sub(age, name) {
    this.name=name;
    this.age=age;
    this.say=function(){
      console.log(this.name + "/" + this.age);
    }
}
function Child(age, name) {
    Sub.call(this, age, name);
}

Child.prototype = new Sub();
Child.prototype.constructor = Child;
var s = new Child(20, "js");
s.say();                                // js/20   
console.log(s.age);                     // 20                   
```
结果：方法、属性都被继承，但是父类的构造方法被执行两次，开销有点大，有弊端。

- **原型继承：** 

```javascript 
function Sub(name, age) {
    this.name="Sub";
    this.age = age;
    this.say=function(){
      console.log(this.name + "/" + this.age);
    }
}
function extend(obj){
    function pro(){}
    pro.prototype = obj;
    return new pro();
}
var sup = new Sub();
var s = new extend(sup);                    	
s.say();                                        // Sub/undefined
console.log(s.name);          					        // Sub
```
结果：与其说继承不如说复制更合适点，没法复用。

- **寄生继承：** 

```javascript 
function Sub(name, age) {
    this.name=name;
    this.age = age;
    this.say=function(){
      console.log(this.name + "/" + this.age);
    }
}
function extend(obj){
    function pro(){}
    pro.prototype = obj;
    return new pro();
}
function Child(obj){
    var ins = extend(obj);
    return ins;
}
var sub = new Sub();
var s = new Child(sub);  
s.name = "js";             
s.say();                                // js/undefined
```
结果：就是原型继承的拓展，只不过把继承的部分封装起来，但是效果并没改善多少。

- **寄生混合继承：** 

```javascript 
function Sub(name, age) {
    this.name = name;
    this.age = age;
    this.say=function(){
      console.log(this.name + "/" + this.age);
    }
}
function extend(obj){
    function pro(){}
    pro.prototype = obj;
    return new pro();
}
function Child(age, name){
    this.name = name;
    this.age = age;
  	Sub.call(this, age, name);
}
function reObj(sup, child){
    var ext = new extend(sup.prototype);
    ext.constructor = child;
    Child.prototype = ext;
}
reObj(Sub, Child);  
var s = new Child(10, "js");  
s.say();                                // 10/js
console.log(s instanceof Sub);          // true
```
结果：既修复了混合式继承的2次构造问题又解决了原型式继承复用的问题，只不过看起来过程比较复杂点，稍微处理一下：

```javascript 
function Sub(name, age) {
    this.name=name;
    this.age = age;
    this.say=function(){
      console.log(this.name + "/" + this.age);
    }
}
function Child(age, name){
    this.age = age;
    this.name = name;
  	Sub.call(this, age, name);
}
function reExtends(sup, child){
    var pro = Object.create(sup.prototype);
    pro.constructor = child;
    child.prototype = pro;
}

reExtends(Sub, Child);  
var s = new Child(10, "js");
var s2 = new Child(20, "java");
s2.say();                                // 20/java
s.say();                                 // 10/js
```
以上就是ES5中的继承实现，在ES5中是没有 类 存在的，所以从函数的角度去看，就是函数如何做到最大程度的复用，但是JS中 function 本身就属于Function对象，所以我们要用面向对象方式去看待，我们就可以使用 function 把函数式包装成一个对象类，这样也容易理解，直到ES6标准，JS开始使用 class 关键字声明类，其实就是 function 包装好的语法糖。   

不知不觉篇幅就这么长了... 😲好了，到此JavaScript中的函数、对象、类、原型链和类继承这部分的核心基础就整理完毕了，要用面向对象的视角去看待JS中的` function `，会更容易理解`function`、`Function`对象和`Object`对象，而变量就是对对象实例的引用，所以也可以当成对象看待。文中涉及到的`作用域`、`this`、`call()/apply()/bind()`函数等知识会在下一篇作用域部分中详细说明。理解JavaScript中的作用域和 this 是和原型链同等重要的核心知识。


