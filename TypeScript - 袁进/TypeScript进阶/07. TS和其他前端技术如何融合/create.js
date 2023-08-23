var fs = require("fs");
var str = `1. 概述
2. 服务器开发环境搭建
3. 使用tslint 进行代码风格检查
4. 开发Movie实体类
5. 处理plainobject的转换
6. 定义数据库模型
7. 增删改查功能
8. 按条件查询电影
9. 完成api接口
10. 完成图片上传接口
11. 搭建客户端工程并完成ajax请求
12. 创建reducer和action
13. 创建仓库
14. 用thunk 处理副作用
15. 添加路由功能
16. 制作布局
17. 制作电影表格组件(1)
18. 制作电影表格组件(2)
19. 制作电影表格组件(3)
20. 制作图片上传组件
21. 制作电影表单组件
22. 制作修改电影页面
23. 项目打包`;

var sArr = str.split("\n");
var resArr = sArr.map((item) => item.split(". "));
console.log(resArr);
resArr.forEach(([index, title]) => {
  fs.mkdirSync('./' + index.padStart(2, "0") + ". " + title);
});
