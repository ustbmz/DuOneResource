function User(name, age) {
  this.name = name;
  this.age = age;
}

User.prototype.sayHi = function () {
  console.log('你好，我是' + this.name + '，今年' + this.age + '岁了');
};

var u1 = new User('monica', 17);
var u2 = new User('邓哥', 77);
var u3 = new User('成哥', 18);
