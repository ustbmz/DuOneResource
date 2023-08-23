// // import a from './a';
// // import b from './b';
// // require('./index.less');
// // import url from './a.png';
// // import './a.less';
// // import $ from 'jquery';
// // import home from './home';
// // import createImg from './movie/a/b';

// // console.log(home);

// // $('<h1>').text('hello webpack!!!!!!!').appendTo(document.body);
// // $('<h2>').text('你好 webpack！').appendTo(document.body);
// // createImg();
// // async function test() {}

// // test();
// // const t = 1;
// // console.log(t ?? 2);

// var number = 1;

// function increase() {
//   number++;
//   if (number > 5) {
//     throw new Error('err');
//   }
// }

// setInterval(function () {
//   increase();
// }, 1000);

// setInterval(function () {
//   console.log(number);
// }, 1000);

import styles1 from './b.module.less';
import styles2 from './c.module.less';
import $ from 'jquery';

$('<h1>')
  .text('b.module.less样式中的类样式a')
  .addClass(styles1.a)
  .appendTo(document.body);
$('<h1>')
  .text('c.module.less样式中的类样式a')
  .addClass(styles2.a)
  .appendTo(document.body);
