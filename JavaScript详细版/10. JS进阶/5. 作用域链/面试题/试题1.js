var foo = { n: 1 };
(function (foo) {
    console.log(foo.n); // 1
    foo.n = 3;
    var foo = { n: 2 };
    console.log(foo.n); // 2
})(foo);
console.log(foo.n); // 3