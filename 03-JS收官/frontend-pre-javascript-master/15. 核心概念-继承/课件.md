# 继承

## 会员系统

视频网站有两种会员：

- 普通会员
  - 属性：用户名、密码
  - 方法：观看免费视频
- VIP会员
  - 属性：普通会员的所有属性、会员到期时间
  - 方法：普通会员的所有方法、观看付费视频

如果我们需要使用构造函数来创建会员，如何书写构造函数才能实现上面的需求？

```js
// 普通会员的构造函数
function User(username, password){
  this.username = username;
  this.password = password;
}
User.prototype.playFreeVideo = function(){
  console.log('观看免费视频')
}

// VIP会员的构造函数
function VIPUser(username, password, expires){
  this.username = username;
  this.password = password;
  this.expires = expires;
}
VIPUser.prototype.playFreeVideo = function(){
  console.log('观看免费视频')
}
VIPUser.prototype.playPayVideo = function(){
  console.log('观看付费视频')
}
```

上面的代码出现了两处重复代码：

1. VIPUser的构造函数中包含重复代码

   ```js
   this.username = username;
   this.password = password;
   ```

   这段代码和User构造函数并没有区别，可以想象得到，将来也不会有区别，即：**普通用户该有的属性，VIP用户一定有**

2. VIPUser的原型上包含了重复代码

   ```js
   VIPUser.prototype.playFreeVideo = function(){
     console.log('观看免费视频')
   }
   ```

   这个方法和User上的同名方法逻辑完全一致，可以想象得到，将来也不会有区别，即：**普通用户该有的方法，VIP用户一定有**

> 如何解决上述两处重复？

## 处理构造器内部的重复

可以将VIPUser构造器改写为

```js
function VIPUser(username, password, expires){
  User.call(this, username, password);
  this.expires = expires;
}
```

## 处理原型上的重复

只需要将原型链设置为下面的结构即可

<img src="http://mdrs.yuanjin.tech/img/20211214155347.png" alt="image-20211214155342118" style="zoom:50%;" />

仅需一句代码即可

```js
Object.setPrototypeOf(VIPUser.prototype, User.prototype)
```

至此，完美的解决了之前提到的两处重复代码的问题

## 这和继承有什么关系

继承是面向对象的概念，它描述了两个对象类型（类，构造函数）之间的关系

如果在逻辑上可以描述为：A不一定是B，但B一定是A，则：B继承A、A派生B、A是B的父类、B是A的子类

**子类的实例应该自动拥有父类的所有成员**

继承具有两个特性：

- 单根性：子类最多只有一个父类
- 传递性：间接父类的成员会传递到子类中

## 如何在JS中封装继承

```js
function inherit(Child, Parent){
  // 在原型链上完成继承 
  Object.setPrototypeOf(Child.prototype, Parent.prototype);
}
```

> 过去，由于没有提供更改隐式原型的方法，因此这一过程会比较复杂。那时候，我们使用一种称之为「圣杯模式」的办法来达到相同的目的，这里不做介绍。

