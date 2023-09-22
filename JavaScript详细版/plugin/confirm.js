if (!window.myPlugin) {
    window.myPlugin = {};
}

window.myPlugin.openConfirm = (function () {
    var divModal, //朦层
        divCenter, //中间的容器
        options,
        spanTitle,
        spanClose,
        divContent,
        btnConfirm,
        btnCancel,
        isRegEvent = false; //是否注册过事件

    /**
     * 打开一个确认对话框
     */
    function openConfirm(opts) {
        if (typeof opts === "string") {
            opts = {
                content: opts
            };
        }
        if (!opts) {
            opts = {}; //默认为一个空对象
        }
        options = opts;
        initModal();
        initCenterDiv();
        regEvent();
    }

    function regEvent() {
        if (!isRegEvent) {
            isRegEvent = true;
            spanClose.onclick = function () {
                divModal.style.display = "none";
            }
            divModal.onclick = function (e) {
                if (e.target === this) {
                    divModal.style.display = "none";
                }
            }
            btnCancel.onclick = function () {
                if (options.oncancel) {
                    options.oncancel();
                }
                divModal.style.display = "none";
            }
            btnConfirm.onclick = function () {
                if (options.onconfirm) {
                    options.onconfirm();
                }
                divModal.style.display = "none";
            }
        }
    }

    /**
     * 初始化朦层
     */
    function initModal() {
        if (!divModal) {
            divModal = document.createElement("div");
            divModal.style.position = "fixed";
            divModal.style.background = "rgba(0,0,0,.2)";
            divModal.style.width = divModal.style.height = "100%";
            divModal.style.left = divModal.style.top = 0;
            document.body.appendChild(divModal);
        }
        divModal.style.display = "block";
    }

    /**
     * 初始化中间的div
     */
    function initCenterDiv() {
        if (!divCenter) {
            divCenter = document.createElement("div");
            divCenter.style.position = "absolute";
            divCenter.style.width = "260px";
            divCenter.style.height = "160px";
            divCenter.style.background = "#fff";
            divCenter.style.left = divCenter.style.right = divCenter.style.top = divCenter.style.bottom = 0;
            divCenter.style.margin = "auto";
            divCenter.style.fontSize = "14px";
            initDivCenterContent();

            divModal.appendChild(divCenter);

            btnCancel = divCenter.querySelector("[data-myplugin-id=cancel]")
            btnConfirm = divCenter.querySelector("[data-myplugin-id=confirm]")
            spanTitle = divCenter.querySelector("[data-myplugin-id=title]");
            spanClose = divCenter.querySelector("[data-myplugin-id=close]")
            divContent = divCenter.querySelector("[data-myplugin-id=content]");
        }
        //设置配置的内容
        spanTitle.innerText = options.title || "提示";
        divContent.innerText = options.content || "";

        btnConfirm.className = options.confirmClass || "";
        btnConfirm.innerText = options.confirmText || "确定";
        btnCancel.className = options.cancelClass || "";
        btnCancel.innerText = options.cancelText || "取消";
    }

    /**
     * 初始化div内部的东西
     */
    function initDivCenterContent() {
        //创建内部的标题div
        var div = document.createElement("div");
        div.style.height = "40px";
        div.style.background = "#eee";
        div.style.boxSizing = "border-box";
        div.style.padding = "10px 20px 0";
        div.innerHTML = `
            <span style="float:left;" data-myplugin-id="title"></span>
            <span  data-myplugin-id="close" style="float:right; cursor:pointer">
                <img style="width:18px;height:18px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACDklEQVRoQ+2Z/TEEQRDF30WADGSACMgAGZABkZABGSACJQMykAEyUE/dqLmpmZ2Z7rd7dsv8eXXd/X7TPR87vcLMx2rm+rFogF0ABwBetpylYwBvAD5zOnIZoPA7AGdrAxpeA7ifGOQCwA0A6uF4BHCZguQAHiLxsWYaTwVB8ZzEdBDiPP4xBSDtx8BMTwFREh9k7cVZSAFOADxXSmVMiJp4SjsC8Bo05kqINb+zBYgW8V/RmviRmANocURbZSbMMUvngNmhYadyxRo6yFyOG0HcMWonsTvAAIjEdw2A8SWBEhCZzxYANYRMfGkXKmVdEVjhY0NfawaCkUeAx7a4lHoBrOU0ivjeEopnoUcQ7XIXs3RWTQejJQO95dRyJJjEezKghDCLVwD0rIlcJlziVQBWCLd4JUAvhET8P0BU1K3barwOJFnwbKOKncgN4QWwzLzkAAtOPAAK8UGHORNWgFbxFPbnrhI94sNDmMWm5QrS/bjrEeKxlVynFQIUPkwfNMrASl9NJSQNuJ4+mc/aLiQLlCliie/FPmxJZqdpH3S+Oy3ycZcNjtDWKU2i+egfyEpL1vn0zwbH71hcg2P2LSamho2000yqxyibUkWVyukpbUCW2qy8hAUItnWuJuxQxh9Kt1G7i+IJttEvHjoHWE77cUOtcVtU/+0QwHtPo1stYFR/tavEqMEVzmcP8A0Z6ZQxBkTeYQAAAABJRU5ErkJggg==" />
            </span>
        `;
        divCenter.appendChild(div);


        //创建提示文本div
        div = document.createElement("div");
        div.dataset.mypluginId = "content";
        div.style.height = "70px";
        div.style.boxSizing = "border-box";
        div.style.padding = "20px";

        divCenter.appendChild(div);
        //创建按钮div

        div = document.createElement("div");
        div.style.height = "50px";
        div.style.boxSizing = "border-box";
        div.style.padding = "10px 20px";
        div.style.textAlign = "right";
        div.innerHTML = `
            <button data-myplugin-id="confirm"></button>
            <button data-myplugin-id="cancel"></button>
        `;

        divCenter.appendChild(div);
    }



    return openConfirm;

}())


