var foo = 1;
function bar() {
    console.log(foo);  //undefined
    if (!foo) {
        var foo = 10;
    }
    console.log(foo); //10
}

bar();