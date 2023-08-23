# CommonJS

> 标准类型：社区规范
>
> 支持环境：node
>
> 依赖类型：动态依赖

## 如何导出

```js
module.exports = 导出的值
```

## 如何导入

```js
require("模块路径") // 函数返回模块导出的值
```

# ES Module

> 标准类型：官方标准
>
> 支持环境：node，浏览器
>
> 依赖类型：静态依赖，动态依赖

## 如何导出

**ES Module**的导出

ES Module分为两种导出方式：

- 具名导出（普通导出），可以导出多个
- 默认导出，只能导出一个

一个模块可以同时存在两种导出方式，最终会合并为一个「对象」导出

```js
export const a = 1; // 具名，常用
export function b() {} // 具名，常用
export const c = () => {}  // 具名，常用
const d = 2;
export { d } // 具名
const k = 10
export { k as temp } // 具名

// export default 3 // 默认，常用
// export default function() {} // 默认，常用
// const e = 4;
// export { e as default } // 默认

const f = 4, g = 5, h = 6
export { f, g, h as default} // 基本 + 默认

// 以上代码将导出下面的对象
/*
{
	a: 1,
	b: fn,
	c: fn,
	d: 2,
	temp: 10,
	f: 4,
	g: 5,
	default: 6
}
*/
```

**注意：导出代码必须为顶级代码，即不可放到代码块中**

## 如何导入

针对具名导出和默认导出，有不同的导入语法

```js
// 仅运行一次该模块，不导入任何内容
import "模块路径"
// 常用，导入属性 a、b，放到变量a、b中。a->a, b->b
import { a, b } from "模块路径"   
// 常用，导入属性 default，放入变量c中。default->c
import c from "模块路径"  
// 常用，default->c，a->a, b->b
import c, { a, b } from "模块路径" 
// 常用，将模块对象放入到变量obj中
import * as obj from "模块路径" 


// 导入属性a、b，放到变量temp1、temp2 中
import {a as temp1, b as temp2} from "模块路径" 
// 导入属性default，放入变量a中，default是关键字，不能作为变量名，必须定义别名
import {default as a} from "模块路径" 
//导入属性default、b，放入变量a、b中
import {default as a, b} from "模块路径" 
// 以上均为静态导入

import("模块路径") // 动态导入，返回一个Promise，完成时的数据为模块对象
```

**注意：静态导入的代码必须为在代码顶端，也不可放入代码块中**

**另外，静态导入的代码绑定的符号是常量，不可更改**