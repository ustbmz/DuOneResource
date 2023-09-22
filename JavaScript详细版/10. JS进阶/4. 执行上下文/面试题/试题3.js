console.log(foo); //fn  C
var foo = "A";
console.log(foo)  //A
var foo = function () {
    console.log("B");
}
console.log(foo); //fn  B
foo(); // B
function foo(){
    console.log("C");
}
console.log(foo)  //fn B
foo(); // B