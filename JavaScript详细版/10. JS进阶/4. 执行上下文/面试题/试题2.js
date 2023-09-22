var a = 1;
function b() {
    console.log(a);  // fn
    a = 10;
    return;
    function a() { }
}
b();
console.log(a); //1