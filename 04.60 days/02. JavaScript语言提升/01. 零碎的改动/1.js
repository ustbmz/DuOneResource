// let age = 17;

// // ....
// age; // 'monica'

// console.log(age);
// let age = 1;

// var a = 1;
// var a = 3;
// console.log(a);

// let a = 1;
// let a = 3;

// const a = 3;

// var a = 2;

// function m() {
//   var b = 3;
// }

// if (true) {
//   let a = 2;
// }

// console.log(a);

// for (let i = 0; i < 10; i++) {
//   setTimeout(function () {
//     console.log(i);
//   }, 1000);
// }

// const obj = {
//   a: 1,
//   b: 2,
// };

// obj.a = 3;

// const user = { name: 'monica', age: 17 };
// const s1 = `姓名：${user.name}，年龄：${user.age}
// my name is ${user.name}`;
// // 等同于
// // const s2 = '姓名：' + user.name + '，年龄：' + user.age + '\nmy name is ' + user.name
// console.log(s1);

const user = { name: 'monica', age: 17 };
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
console.log(html);
