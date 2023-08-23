# 原型链

## 什么是原型链

**所有的对象都是通过`new 函数`的方式创建的**

```js
var u1 = new User('邓', '旭明'); // 对象 u1 通过 new User 创建
var u2 = { // 对象 u2 通过 new Object 创建
  firstName: '莫',
  lastName: '妮卡'
}
// 等效于
var u2 = new Object(); 
u2.firstName = '莫';
u2.lastName = '妮卡';
```

上面的代码形成的原型图如下

![image-20210903081220607](http://mdrs.yuanjin.tech/img/20210903081220.png)

原型对象本身也是一个对象，默认情况下，是通过`new Object`创建的，因此，上面的两幅原型图是可以发生关联的

<img src="http://mdrs.yuanjin.tech/img/20210903082540.png" alt="image-20210903082540379" style="zoom:50%;" />

> `Object.prototype.__proto__`比较特殊，它固定指向null

可以看出，u1的隐式原型形成了一个链条，称之为**原型链**

当读取对象成员时，会先看对象自身是否有该成员，如果没有，就依次在其原型链上查找

## 完整的链条

![image-20210903152359095](http://mdrs.yuanjin.tech/img/20210903152359.png)

## 对开发的影响

### 在原型上更改会产生多大影响

更改构造函数的原型会对所有原型链上有该构造函数的原型的对象产生影响

### 学会利用原型链判断类型

1. `instanceof`关键字【常用】

   ```js
   object instanceof constructor
   // 判断object的原型链中，是否存在constructor的原型
   ```

2. `Object.getPrototypeOf()`【不常用】

   ```js
   Object.getPrototypeOf(object);
   // 返回object的隐式原型
   ```

### 学会创建空原型的对象

1. 利用`Object.create()`

   ```js
   Object.create(target);
   // 返回一个新对象，新对象以target作为隐式原型
   ```

2. 利用`Object.setPrototypeOf()`

   ```js
   Object.setPrototypeOf(obj, prototype);
   // 设置obj的隐式原型为prototype
   ```

   

