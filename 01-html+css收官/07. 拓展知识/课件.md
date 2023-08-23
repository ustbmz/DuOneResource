# 伪类选择器

> css伪类选择器大全：
>
> https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes

| 伪类               | 含义                                                         |
| ------------------ | ------------------------------------------------------------ |
| :link              | 选中未访问过的超链接                                         |
| :visited           | 选中已访问过的超链接                                         |
| :hover             | 选中鼠标移入的元素                                           |
| :active            | 选中鼠标按下的元素                                           |
| :focus             | 选中聚焦的表单元素                                           |
| :disabled          | 选中被禁用的表单元素                                         |
| :checked           | 选中被选中的表单元素                                         |
| :first-child       | 选中第一个子元素                                             |
| :last-child        | 选中最后一个子元素                                           |
| :nth-child(an+b)   | 选中第「an+b」个子元素<br />a和b是常量，n的值会从0开始依次递增 |
| :first-of-type     | 选中第一个指定类型的子元素                                   |
| :last-of-type      | 选中最后一个指定类型的子元素                                 |
| :nth-of-type(an+b) | 选中第「an+b」个指定类型的子元素<br />a和b是常量，n的值会从0开始依次递增 |

# contenteditable属性

该属性是一个布尔属性，可以设置到任何元素上，它可以让该元素变为可编辑的状态

在实际开发中，通常用于制作富文本框

<img src="http://mdrs.yuanjin.tech/img/20211124171231.png" alt="image-20211124171230964" style="zoom:50%;" />

# table 元素

table元素用于表达一个表格，受CSS3的影响，现在已经很少使用了