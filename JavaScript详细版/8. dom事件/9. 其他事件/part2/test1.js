// window.onload = function(){
//     console.log("全部加载完毕");
//     var img = document.querySelector("img");
//     console.log(img.width, img.height);
// }

//ready事件
// document.addEventListener("DOMContentLoaded", function(){
//     console.log("dom树构建完毕");
// })

// console.log(document.readyState);

document.addEventListener("DOMContentLoaded", function () {
    var img = document.querySelector("img");
    getImgSize(img, function (size) {
        console.log(size);
    });
})

// window.onload = function(){
//     console.log(document.readyState);
// }

// document.onreadystatechange = function () {

// }


function getImgSize(img, callback) {
    if (img.width === 0 && img.height === 0) {
        img.onload = function () {
            callback({
                width: img.width,
                height: img.height
            });
        }
    }
    else {
        callback({
            width: img.width,
            height: img.height
        });
    }
}
