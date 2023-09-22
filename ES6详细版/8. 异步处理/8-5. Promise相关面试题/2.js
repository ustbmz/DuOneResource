setTimeout(() => {
  console.log(1);
});

const promise = new Promise((resolve, reject) => {
  console.log(2);
  resolve();
});

promise.then(() => {
  console.log(3);
});

console.log(4);
