// 根据下面的调用示例，编写User类
// function User(account, pwd) {
//   this.account = account;
//   this.pwd = pwd;
// }

// User.prototype.sayHello = function () {
//   console.log(`账号 —— ${this.account}，密码 —— ${this.pwd}`);
// };

class User {
  constructor(account, pwd) {
    this.account = account;
    this.pwd = pwd;
  }

  sayHello() {
    console.log(`账号 —— ${this.account}，密码 —— ${this.pwd}`);
  }
}

const u = new User('account', 'pwd123'); // 创建用户
u.sayHello(); // 输出：账号 —— account，密码 —— pwd123
