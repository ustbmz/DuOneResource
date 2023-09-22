// function A() {
//     for (var i = 0; i < 10; i++) {
//         setTimeout(function () {
//             console.log(i);
//         }, 1000)
//     }
// }

// A();

// console.log(i);


for (var i = 0; i < 3; i++) {
    (function (i) {
        setTimeout(function () {
            console.log(i);
        }, 1000)
    }(i));
}



