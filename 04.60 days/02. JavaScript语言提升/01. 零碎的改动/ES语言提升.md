# 零碎的改动

## 严格模式

此为ES5新增语法

参考：https://www.runoob.com/js/js-strict.html

参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode

## let 和 const

ES6建议不再使用`var`定义变量，而使用`let`定义变量，`const`定义常量

```js
let a = 1; // 使用 let 定义变量
a = 2; // 变量的值是可修改的

const b = 1; // 使用 const 定义常量
b = 2; // ❌ 报错，常量的值不可修改
```

**对于开发的影响：均使用const，实在需要修改变量，再改为let**

无论是let还是const，它们均解决了长久以来变量定义的问题，使用它们定义变量，具有以下特点：

- 全局定义的变量不再作为属性添加到全局对象中

- 在变量定义之前使用它会报错

- 不可重复定义同名变量

- 使用`const`定义变量时，必须初始化

- 变量具有块级作用域，在代码块之外不可使用

  注意，在for循环中使用let定义变量，变量所在的作用域是循环体，因此在循环外不能使用。另外，for循环会对该变量做特殊处理，让每次循环使用的都是一个独立的循环变量，这可以解决JS由来已久的问题。

  ```js
  // 过去的问题
  for(var i = 0; i < 3; i++){
    setTimeout(function(){
      console.log(i)
    }, 1000)
  }
  // 输出：3 3 3
  
  // 过去的解决办法：IIFE
  for(var i = 0; i < 3; i++){
    (function(i){
      setTimeout(function(){
        console.log(i)
      }, 1000)
    })(i)
  }
  // 输出：0 1 2
  
  // 现在的做法
  for(let i = 0; i < 3; i++){
    setTimeout(function(){
      console.log(i)
    }, 1000)
  }
  // 输出：0 1 2
  ```

## 幂运算

```js
2 ** 3  // 8
2 ** 4  // 16
```

## 字符串新增API

| API                                                          | 含义                         |
| ------------------------------------------------------------ | ---------------------------- |
| [String.prototype.includes(s)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/includes) | 字符串中是否包含某个子串     |
| [String.prototype.trim()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trim) | 去掉字符串首尾空白字符       |
| [String.prototype.trimStart()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimstart) | 去掉字符串开始的空白字符     |
| [String.prototype.trimEnd()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimend) | 去掉字符串末尾的空白字符     |
| [String.prototype.replaceAll(s, t)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replaceall) | 将字符串中**所有**的s替换为t |
| [String.prototype.startsWith(s)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/startswith) | 判断字符串是否以s开头        |
| [String.prototype.endsWith(s)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/endswith) | 判断字符串是否以s结尾        |
|                                                              |                              |

## 模板字符串

ES6提供了一种新的字符串字面量的书写方式，即模板字符串，写法为

```js
`字符串内容`
```

模板字符串可以轻松的实现换行和拼接

```js
const user = { name: 'monica', age: 17 }
const s1 = `姓名：${user.name}，年龄：${user.age}
my name is ${user.name}`;
// 等同于
const s2 = '姓名：' + user.name + '，年龄：' + user.age + '\nmy name is ' + user.name

/* 
 * s1和s2均为：
 * 姓名：monica，年龄：17
 * my name is monica
 */
```

在需要换行或拼接时，模板字符串远胜于普通字符串

通常，我们可以使用模板字符串拼接html

```js
const user = { name: 'monica', age: 17 }
const html = `
<div>
	<p><span class="k">姓名</span><span class="v">${user.name}</span></p>
	<p><span class="k">年龄</span><span class="v">${user.age}</span></p>
</div>
`;
/* 
 * <div>
 *  <p><span class="k">姓名</span><span class="v">monica</span></p>
 *  <p><span class="k">年龄</span><span class="v">17</span></p>
 * </div>
 */
```



# 数组

## for-of 循环

ES6提供了一种爽翻天的方式遍历各种数组和伪数组

示例1：

```js
const arr = ['a', 'b', 'c']
// 过去的方式——垃圾
for(let i = 0; i < arr.length; i++){
  const item = arr[i]
  console.log(item)
}

// for of 的方式，结果一样
for(const item of arr){
  console.log(item)
}
```



示例2:

```js
const elements = document.querySelectorAll('.item');
// for of 的方式
for(const elem of elements){
  // elem 为获取到的每一个元素
}
```



## 新增API

| API                                                          | 作用                                                     | 图示                                                         |
| ------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------ |
| [Array.isArray(target)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) | 判断target是否为一个数组                                 |                                                              |
| [Array.from(source)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from) | 将某个伪数组source转换为一个真数组返回                   |                                                              |
| [Array.prototype.fill(n)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) | 将数组的某些项设置为n                                    | <img src="http://mdrs.yuanjin.tech/img/20210602165516.png" alt="image-20210602165515908" style="zoom:50%;" /> |
| [Array.prototype.forEach(fn)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) | 遍历数组，传入一个函数，每次遍历会运行该函数             | <img src="http://mdrs.yuanjin.tech/img/20210602165832.png" alt="image-20210602165832725" style="zoom:50%;" /> |
| [Array.prototype.map(fn)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map) | 数组映射，传入一个函数，映射数组中的每一项               | <img src="http://mdrs.yuanjin.tech/img/20210602170025.png" alt="image-20210602170025141" style="zoom:50%;" /> |
| [Array.prototype.filter(fn)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) | 数组筛选，传入一个函数，仅保留满足条件的项               | <img src="http://mdrs.yuanjin.tech/img/20210602170149.png" alt="image-20210602170149489" style="zoom:50%;" /> |
| [Array.prototype.reduce(fn)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) | 数组聚合，传入一个函数，对数组每一项按照该函数的返回聚合 | <img src="http://mdrs.yuanjin.tech/img/20210602170451.png" alt="image-20210602170451299" style="zoom:50%;" /> |
| [Array.prototype.some(fn)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some) | 传入一个函数，判断数组中是否有至少一个通过该函数测试的项 | <img src="http://mdrs.yuanjin.tech/img/20210602171403.png" alt="image-20210602171403455" style="zoom:50%;" /> |
| [Array.prototype.every(fn)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every) | 传入一个函数，判断数组中是否所有项都能通过该函数的测试   | <img src="http://mdrs.yuanjin.tech/img/20210602171441.png" alt="image-20210602171441468" style="zoom:50%;" /> |
| [Array.prototype.find(fn)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find) | 传入一个函数，找到数组中第一个能通过该函数测试的项       | <img src="http://mdrs.yuanjin.tech/img/20210602171510.png" alt="image-20210602171510075" style="zoom:50%;" /> |
| [Array.prototype.includes(item)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) | 判断数组中是否存在item，判定规则使用的是`Object.is`      | <img src="http://mdrs.yuanjin.tech/img/20210602170615.png" alt="image-20210602170615564" style="zoom:50%;" /> |
|                                                              |                                                          |                                                              |

# 对象

## 对象成员速写

在某些场景下，ES6提供了一种更加简洁的方式书写对象成员

示例1：

```js
const name = 'monica', age = 17;
const sayHello = function(){
  console.log(`my name is ${this.name}`);
}
// 过去的方式
const user = {
  name: name,
  age: age,
  sayHello: sayHello
}

// 速写
const user = {
  name,
  age,
  sayHello
}
```

示例2：

```js
// 过去的方式
const MyMath = {
  sum: function(a, b){
    //...
  },
  random: function(min, max){
    //...
  }
}

// 速写
const MyMath = {
  sum(a, b){
    // ...
  },
  random(min, max){
    // ...
  }
}
```

## 解构

ES6提供了一种特殊的语法，通过该语法，可以轻松的从数组或对象中取出想要的部分

示例1：

```js
const user = {
  name: 'monica',
  age: 17,
  addr: {
    province: '黑龙江',
    city: '哈尔滨'
  }
}

// 取出 user 中的 name 和 age
const { name, age } = user;
console.log(name, age); //  monica 17

// 取出 user 中的 city
const { addr: { city } } = user
console.log(city); //  哈尔滨
```

示例2：

```js
const arr = [1, 2, 3, 4]
// 取出数组每一项的值，分别放到变量a、b、c、d中
const [a, b, c, d] = arr;
// 仅取出数组下标1、2的值
const [, a, b] = arr; 
// 仅取出数组下标1、3的值
const [, a, , b] = arr;
// 取出数组前两位的值，放到变量a和b中，剩下的值放到一个新数组arr2中
const [a, b, ...arr2] = arr;
```

示例3：

```js
let a = 1, b = 2;
// 交换两个变量
[b, a] = [a, b]
```

示例4：

```js
// 在参数位置对传入的对象进行解构
function method({a, b}){
  console.log(a, b)
}
const obj = {
  a:1,
  b:2,
  c:3
}
method(obj); // 1 2
```

示例5：

```js
// 箭头函数也可以在参数位置进行解构
const method = ({a, b}) => {
  console.log(a, b)
}
const obj = {
  a:1,
  b:2,
  c:3
}
method(obj); // 1 2
```

示例6：

```js
const users = [
  {name:'monica', age:17},
  {name:'邓哥', age:70}
]
// 在遍历时进行解构
for(const {name, age} of users){
  console.log(name, age)
}
```

## 展开运算符

示例1：

```js
const arr = [3, 6, 1, 7, 2];
// 对数组的展开
Math.max(...arr); // 相当于：Math.max(3, 6, 1, 7, 2)
```

示例2：

```js
const o1 = {
  a: 1, 
  b: 2,
}
const o2 = {
  a: 3, 
  c: 4,
}
// 对对象的展开
const o3 = {
  ...o1,
  ...o2
}
/*
	o3：{
		a: 3,
		b: 2,
		c: 4
	}
*/
```

示例3：

```js
const arr = [2,3,4];
const arr2 = [1, ...arr, 5]; // [1,2,3,4,5]
```

示例4：

```js
const user = {
  name: 'monica',
  age: 17
}
const user2 = {
  ...user,
  name: '邓哥'
}
// user2: { name:'邓哥', age: 17 }
```

## 属性描述符

对于对象中的每个成员，JS使用属性描述符来描述它们

```js
const user = {
  name: 'monica',
  age: 17
}
```

上面的对象，在JS内部被描述为

```js
{
  // 属性 name 的描述符
  name: {
    value: 'monica',
    configurable: true, // 该属性的描述符是否可以被重新定义
    enumerable: true, // 该属性是否允许被遍历，会影响for-in循环
    writable: true // 该属性是否允许被修改
  },
  // 属性 age 的描述符
  age: {
    value: 'monica',
    configurable: true, // 该属性的描述符是否可以被重新定义
    enumerable: true, // 该属性是否允许被遍历，会影响for-in循环
    writable: true // 该属性是否允许被修改
  },
}
```

ES5提供了一系列的API，针对属性描述符进行操作

1. `Object.getOwnPropertyDescriptor(obj, propertyName)`

   该方法用于获取一个属性的描述符

   ```js
   const user = {
     name: 'monica',
     age: 17
   }
   
   Object.getOwnPropertyDescriptor(user, 'name');
   /*
   {
       value: 'monica',
       configurable: true, // 该属性的描述符是否可以被重新定义
       enumerable: true, // 该属性是否允许被遍历，会影响for-in循环
       writable: true // 该属性是否允许被修改
   }
   */
   ```

2. `Object.defineProperty(obj, propertyName, descriptor)`

   该方法用于定义某个属性的描述符

   ```js
   const user = {
     name: 'monica',
     age: 17
   };
   
   Object.defineProperty(obj, 'name', {
     value: '邓哥', // 将其值进行修改
     enumerable: false, // 让该属性不能被遍历
     writable: false // 让该属性无法被重新赋值
   })
   ```

### getter 和 setter

属性描述符中有两个特殊的配置，分别为`get`和`set`，通过它们，可以把属性的取值和赋值变为方法调用

```js
const obj = {};
Object.defineProperty(obj, 'a', {
  get(){ // 读取属性a时，得到的是该方法的返回值
    return 1;
  },
  set(val){ // 设置属性a时，会把值传入val，调用该方法
    console.log(val)
  }
})

console.log(obj.a); // 输出：1
obj.a = 3; // 输出：3
console.log(obj.a); // 输出：1
```

## 键值对

`Object.keys(obj)`：获取对象的属性名组成的数组

`Object.values(obj)`：获取对象的值组成的数组

`Object.entries(obj)`：获取对象属性名和属性值组成的数组

`Object.fromEntries(entries)`：将属性名和属性值的数组转换为对象

示例：

```js
const user = {
  name: 'monica',
  age: 17
}
Object.keys(user); // ["name", "age"]
Object.values(user); // ["monica", 17]
Object.entries(user); // [ ["name", "monica"], ["age", 17] ]
Object.fromEntries([ ["name", "monica"], ["age", 17] ]); // {name:'monica', age:17}
```

## 冻结

使用`Object.freeze(obj)`可以冻结一个对象，该对象的所有属性均不可更改

```js
const obj = {
  a: 1,
  b: {
    c: 3,
  },
};

Object.freeze(obj); //  冻结对象obj

obj.a = 2; // 不报错，代码无效
obj.k = 4; // 不报错，代码无效
delete obj.a; // 不报错，代码无效
obj.b = 5; // 不报错，代码无效

obj.b.c = 5; // b对象没有被冻结，有效

console.log(obj); // {a:1, b:{ c: 5 } }
```

可以使用`Object.isFrozen`来判断一个对象是否被冻结

## 相同性判定

`Object.is`方法，可以判断两个值是否相同，它和`===`的功能基本一致，区别在于：

- NaN和NaN相等
- +0和-0不相等

```js
Object.is(1, 2); // false
Object.is("1", 1); // false
Object.is(NaN, NaN); // true
Object.is(+0, -0); // false
```

## Set

[Set MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

ES6新增了Set结构，用于保存唯一值的序列

## Map

[Map MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

ES6新增了Map结构，用于保存键值对的映射，它和对象的最大区别在于：对象的键只能是字符串，而Map的键可以是任何类型

# 函数

## 箭头函数

所有使用**函数表达式**的位置，均可以替换为箭头函数

箭头函数语法：

```js
// 完整语法
(参数列表) => { 函数体 }
// 若有且仅有一个参数
参数 => { 函数体 }
// 若函数体有且仅有一条返回语句
(参数列表) => 返回语句
```

示例1：

```js
const sum = function(a, b) {
  return a + b;
}

// 箭头函数写法
const sum = (a, b) => a + b
```

示例2：

```js
dom.onclick = function(e){
  // ....
}

// 箭头函数写法
dom.onclick = e => {
  // ...
}
```

示例3：

```js
setTimeout(function(){
  // ...
}, 1000)

// 箭头函数写法
setTimeout(() => {
  // ...
}, 1000)
```

箭头函数有以下特点：

1. 不能使用`new`调用

2. 没有原型，即没有`prototype`属性

3. 没有`arugments`

4. 没有`this`

   > 有些教程中会说：箭头函数的`this`永远指向箭头函数定义位置的`this`，因为箭头函数会绑定`this`。
   >
   > 这个说法没错，根本原因是它没有`this`，它里面的`this`使用的是外层的`this`

   ```js
   const counter = {
     count: 0,
     start: function(){
       // 这里的 this 指向 counter
       setInterval(() => {
         // 这里的 this 实际上是 start 函数的 this
         this.count++;
       }, 1000)
     }
   }
   ```

箭头函数的这些特点，都足以说明：**箭头函数特别适用于那些临时需要函数的位置**

> 我们将来会在面试指导阶段对this指向进行总结

## 剩余参数

ES6不建议再使用`arguments`来获取参数列表，它推荐使用剩余参数来收集未知数量的参数

```js
// ...args为剩余参数
function method(a, b, ...args){
  console.log(a, b, args)
}

method(1, 2, 3, 4, 5, 6, 7); // 1 2 [3, 4, 5, 6, 7]
method(1, 2); // 1 2 []
```

**注意，剩余参数只能声明为最后一个参数**

## 参数默认值

ES6提供了参数默认值，当参数没有传递或传递为`undefined`时，会使用默认值

示例1：

```js
// 对参数 b 使用了默认值1
function method(a, b = 1){
  console.log(a, b)
}
method(1, 2); // 1  2
method(1); // 1 1
method(1, undefined); // 1 1
```

示例2：

```js
// 对参数 b 使用了默认值1， 对参数 c 使用默认值2
const method = (a, b = 1, c = 2, d) => {
  console.log(a, b, c, d)
}
method(1, 2); // 1 2 2 undefined
method(1); // 1 1 2 undefined
method(1, undefined, undefined, 4); // 1 1 2 4
```

## 类语法

过去，函数有着两种调用方式：

```js
function A(){}

A(); // 直接调用
new A(); // 作为构造函数调用
```

这种做法无法从定义上明确函数的用途，因此，ES6推出了一种全新的语法来书写构造函数

示例1：

```js
// 旧的写法
function User(firstName, lastName){
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = `${firstName} ${lastName}`;
}
User.isUser = function(u){
  return !!u && !!u.fullName
}
User.prototype.sayHello = function(){
  console.log(`Hello, my name is ${this.fullName}`);
}

// 新的等效写法
class User{
  constructor(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = `${firstName} ${lastName}`;
  }
  
  static isUser(u){
  	 return !!u && !!u.fullName
  }
  
  sayHello(){
    console.log(`Hello, my name is ${this.fullName}`);
  }
}
```

示例2：

```js
function Animal(type, name){
  this.type = type;
  this.name = name;
}

Animal.prototype.intro = function(){
  console.log(`I am ${this.type}, my name is ${this.name}`)
}

function Dog(name){
  Animal.call(this, '狗', name);
}

Dog.prototype = Object.create(Animal.prototype); // 设置继承关系

// 新的方式

class Animal{
  constructor(type, name){
    this.type = type;
    this.name = name;
  }
  
  intro(){
    console.log(`I am ${this.type}, my name is ${this.name}`)
  }
}

class Dog extends Animal{
 	constructor(name){
    super('狗', name);
  }
}
```



## 函数API

| API                                                          | 含义                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Function.prototype.call(obj, ...args)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call) | 调用函数，绑定this为obj<br />后续以列表的形式提供参数        |
| [Function.prototype.apply(obj, args)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) | 调用函数，绑定this为obj<br />args以数组的形式提供参数        |
| [Function.prototype.bind(obj, ...args)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) | 返回一个函数的拷贝<br />新函数的this被绑定为obj<br />起始参数被绑定为args |
|                                                              |                                                              |

