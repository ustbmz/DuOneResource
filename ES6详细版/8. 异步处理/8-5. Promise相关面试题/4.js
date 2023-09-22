async function m() {
  console.log(0);
  const n = await 1;
  console.log(n);
}

// function m() {
//   return Promise.resolve(1).then((n) => {
//     console.log(n);
//   });
// }

m();
console.log(2);
