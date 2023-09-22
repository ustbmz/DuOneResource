// 表示当前菜单状态(打开、关闭)：默认 true 表示打开
let flag = ["打开", "打开", "打开"];

// 方法一：为最外层wrap盒子添加点击事件
wrap.addEventListener("click", (e) => {
	if (e.target.className === "title") {
		let nextEle = e.target.nextElementSibling;
		let i = e.target.getAttribute("_id"); // 获取到dt的id值，值的范围为0 1 2
		if (flag[i] === "打开") {
			nextEle.style.display = "none";
			flag[i] = "关闭";
		} else {
			nextEle.style.display = "block";
			flag[i] = "打开";
		}
	}
}, false);

// 方法二：为每一个dt盒子添加点击事件
/*

let dtArr = document.getElementsByClassName("title");
for(let i = 0; i < dtArr.length; i++){
	dtArr[i].addEventListener("click", (e) => {
		let nextEle = e.target.nextElementSibling;
		if(flag[i] === "打开"){
			nextEle.style.display = "none";
			flag[i] = "关闭";
		}else{
			nextEle.style.display = "block";
			flag[i] = "打开";
		}
	}, false);
}

*/