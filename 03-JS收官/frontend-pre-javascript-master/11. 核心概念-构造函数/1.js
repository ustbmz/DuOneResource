function Person(firstName, lastName) {
  // var this = {};

  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = firstName + lastName;
  this.sayHi = function () {
    console.log('我的名字叫做：' + this.fullName);
  };

  // return this;
}

var person1 = new Person('邓', '旭明');
person1.sayHi();

var person2 = new Person('姬', '成');
person2.sayHi();
