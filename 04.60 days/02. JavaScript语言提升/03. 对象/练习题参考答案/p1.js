/**
 * 创建一个用户对象
 * 对象格式：
 * {
 *    firstName: xxx,
 *    lastName: xxx,
 *    fullName: xxx,
 *    sayHello: fn
 * }
 */
function createUser(firstName, lastName) {
  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    sayHello() {
      console.log(`hello, my name is ${firstName}`);
    },
  };
}

// 调用createUser函数，使用解构得到fullName

const { fullName } = createUser('邓', '哥');
console.log(fullName);
