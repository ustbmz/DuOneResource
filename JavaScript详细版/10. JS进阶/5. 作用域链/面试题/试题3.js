var food = "rice";
(function () {
    var food = "noodle";
    var eat = function () {
        console.log(`eat ${food}`);
    };
    eat();//eat noodle
})();