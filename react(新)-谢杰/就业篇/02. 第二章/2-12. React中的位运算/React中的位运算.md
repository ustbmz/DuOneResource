# React 中的位运算

> 面试题：React 中哪些地方用到了位运算？



## 位运算的基础知识

所谓二进制，指的就是以二为底的一种计数方式。

| 十进制   |  0   |  1   |  2   |  3   |  4   |  5   |  6   |  7   |  8   |  9   |  10  |  11  |  12  |  13  |  14  |  15  |
| -------- | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 二进制   | 0000 | 0001 | 0010 | 0011 | 0100 | 0101 | 0110 | 0111 | 1000 | 1001 | 1010 | 1011 | 1100 | 1101 | 1110 | 1111 |
| 八进制   |  0   |  1   |  2   |  3   |  4   |  5   |  6   |  7   |  10  |  11  |  12  |  13  |  14  |  15  |  16  |  17  |
| 十六进制 |  0   |  1   |  2   |  3   |  4   |  5   |  6   |  7   |  8   |  9   |  A   |  B   |  C   |  D   |  E   |  F   |

我们经常会使用二进制来进行计算，基于二进制的位运算能够很方便的表达“增、删、查、改”。

例如一个后台管理系统，一般的话会有针对权限的控制，一般权限的控制就使用的是二进制：

```js
# 各个权限
permissions = {
    "SYS_SETTING" : {
        "value" : 0b10000000,
        "info" : "系统重要设置权限"
    },
    "DATA_ADMIN" : {
        "value" : 0b01000000,
        "info" : "数据库管理权限"
    },
    "USER_MANG" : {
        "value" : 0b00100000,
        "info" : "用户管理权限"
    },
    "POST_EDIT" : {
        "value" : 0b00010000,
        "info" : "文章编辑操作权限"
    },
    "POST_VIEW" : {
        "value" : 0b00001000,
        "info" : "文章查看权限"
    }
}
```

再例如，在 linux 操作系统里面，x 代表可执行权限，w代表可写权限，r 代表可读权限，对应的权限值分别就是1、2、4（2 的幂次方）

使用二进制来表示权限，首先速度上面会更快一些，其次在表示多种权限的时候，会更加方便一些。

比如，现在有 3 个权限 A、B、C...

根据不同的权限做不同的事情：

```js
if(value === A){
  // ...
} else if(value === B){
  // ...
}
```

在上面的代码中，会有一个问题，目前仅仅只是一对一的关系，但是在实际开发中，往往有很多一对多的关系，一个 value 可能会对应好几个值。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-01-03-055329.png" alt="image-20230103135329257" style="zoom: 33%;" />

复习一下和二进制相关的运算：

- 与（ & ）：只要有一位数为 0，那么最终结果就是 0，也就是说，必须两位都是 1，最终结果才是 1
- 或（ | ）: 只要有一位数是 1，那么最终结果就是 1，也就是说必须两个都是 0，最终才是 0
- 非 （ ~ ）: 对一个二进制数逐位取反，也就是说 0、1 互换
- 异或（ ^ ）: 如果两个二进制位不相同，那么结果就为 1，相同就为 0

```js
1 & 1 = 1

0000 0001
0000 0001
---------
0000 0001

1 & 0 = 0

0000 0001
0000 0000
---------
0000 0000

1 | 0 = 1

0000 0001
0000 0000
---------
0000 0001

1 ^ 0 = 1

0000 0001
0000 0000
---------
0000 0001

~3
0000 0011
// 逐位取反
1111 1100
// 计算结果最终为 -4（涉及到补码的知识）
```

接下来我们来看一下位运算在权限系统里面的实际运用：

| 下载 | 打印 | 查看 | 审核 | 详细 | 删除 | 编辑 | 创建 |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
|  0   |  0   |  0   |  0   |  0   |  0   |  0   |  0   |

如果是 0，代表没有权限，如果是 1，代表有权限

0000 0001 代表只有创建的权限，0010 0011 代表有查看、编辑以及创建的权限



**添加权限**

直接使用或运算即可。

0000 0011 目前有创建和编辑的权限，我们要给他添加一个查看的权限 0010 0000

```js
0000 0011
0010 0000
---------
0010 0011
```



**删除权限**

可以使用异或

0010 0011 目前有查看、编辑和创建，取消编辑的权限 0000 0010

```js
0010 0011
0000 0010
---------
0010 0001
```



**判断是否有某一个权限**

可以使用与来进行判断

0011 1100（查看、审核、详细、删除），判断是否有查看（0010 0000）权限、再判断是否有创建（0000 0001）权限

```js
0011 1100
0010 0000
---------
0010 0000

// 判断是否有“查看”权限，做与操作时得到了“查看”权限值本身，说明有这个权限
```

```js
0011 1100
0000 0001
---------
0000 0000

// 最终得到的值为 0，说明没有此权限
```



通过上面的例子，我们会发现使用位运算确确实实非常的方便，接下来我们就来看一下 React 中针对位运算的使用。



## React 中的位运算

- fiber 的 flags
- lane 模型
- 上下文



**fiber 的 flags**

在 React 中，用来标记 fiber 操作的 flags，使用的就是二进制：

```js
export const NoFlags = /*                      */ 0b000000000000000000000000000;
export const PerformedWork = /*                */ 0b000000000000000000000000001;
export const Placement = /*                    */ 0b000000000000000000000000010;
export const DidCapture = /*                   */ 0b000000000000000000010000000;
export const Hydrating = /*                    */ 0b000000000000001000000000000;
// ...
```

这些 flags 就是用来标记 fiber 状态的。

之所以要专门抽离 fiber 的状态，是因为这种操作是非常高效的。针对一个 fiber 的操作，可能有增加、删除、修改，但是我不直接进行操作，而是给这个 fiber 打上一个 flag，接下来在后面的流程中针对有 flag 的 fiber 统一进行操作。

通过位运算，就可以很好的解决一个 fiber 有多个 flag 标记的问题，方便合并多个状态

```js
// 初始化一些 flags
const NoFlags = 0b00000000000000000000000000;
const PerformedWork =0b00000000000000000000000001;
const Placement =  0b00000000000000000000000010;
const Update = 0b00000000000000000000000100;

// 一开始将 flag 变量初始化为没有 flag，也就是 NoFlags
let flag = NoFlags

// 这里就是在合并多个状态
flag = flag | PerformedWork | Update

// 要判断是否有某一个 flag，直接通过 & 来进行判断即可
//判断是否有  PerformedWork 种类的更新
if(flag & PerformedWork){
    //执行
    console.log('执行 PerformedWork')
}

//判断是否有 Update 种类的更新
if(flag & Update){
    //执行
    console.log('执行 Update')
}


if(flag & Placement){
    //不执行
    console.log('执行 Placement')
}
```



**lane 模型**

lane 模型也是一套优先级机制，相比 Scheduler，lane 模型能够对任务进行更细粒度的控制。

```js
export const NoLanes: Lanes = /*                        */ 0b0000000000000000000000000000000;
export const NoLane: Lane = /*                          */ 0b0000000000000000000000000000000;

export const SyncLane: Lane = /*                        */ 0b0000000000000000000000000000001;

export const InputContinuousHydrationLane: Lane = /*    */ 0b0000000000000000000000000000010;
export const InputContinuousLane: Lane = /*             */ 0b0000000000000000000000000000100;
// ...
```

例如在 React 源码中，有一段如下的代码：

```js
// lanes 一套 lane 的组合
function getHighestPriorityLanes(lanes) {
  // 从 lanes 这一套组合中，分离出优先级最高的 lane
  switch (getHighestPriorityLane(lanes)) {
    case SyncLane:
      return SyncLane;
    case InputContinuousHydrationLane:
      return InputContinuousHydrationLane;
    case InputContinuousLane:
      return InputContinuousLane;
      // ...
      return lanes;
  }
}

// lane 在表示优先级的时候，大致是这样的：
// 0000 0001
// 0000 0010
// 0010 0000
// lanes 表示一套 lane 的组合，比如上面的三个 lane 组合到一起就变成了一个 lanes 0010 0011
// getHighestPriorityLane 这个方法要做的事情就是分离出优先级最高的
// 0010 0011 ----> getHighestPriorityLane -----> 0000 0001

export function getHighestPriorityLane(lanes) {
  return lanes & -lanes;
}
```

假设现在我们针对两个 lane 进行合并

```js
const SyncLane: Lane = /*                        */ 0b0000000000000000000000000000001;
const InputContinuousLane: Lane = /*             */ 0b0000000000000000000000000000100;
```

合并出来就是一个 lanes，合并出来的结果如下：

```js
0b0000000000000000000000000000001
0b0000000000000000000000000000100
---------------------------------
0b0000000000000000000000000000101
```

0b0000000000000000000000000000101 是我们的 lanes，接下来取负值

```js
-lanes = 0b1111111111111111111111111111011
```

最后一步，再和本身的 lanes 做一个 & 操作：

```js
0b0000000000000000000000000000101
0b1111111111111111111111111111011
---------------------------------
0b0000000000000000000000000000001
```

经过 & 操作之后，就把优先级最高的 lane 给分离出来了。



**上下文**

在 React 源码内部，有多个上下文：

```js
// 未处于 React 上下文
export const NoContext = /*             */ 0b000;
// 处于 batchedUpdates 上下文
const BatchedContext = /*               */ 0b001;
// 处于 render 阶段
export const RenderContext = /*         */ 0b010;
// 处于 commit 阶段
export const CommitContext = /*         */ 0b100;
```

当执行流程到了 render 阶段，那么接下来就会切换上下文，切换到 RenderContext

```js
let executionContext = NoContext; // 一开始初始化为没有上下文
executionContext |= RenderContext;
```

在执行方法的时候，就会有一个判断，判断当前处于哪一个上下文

```js
// 是否处于 RenderContext 上下文中，结果为 true
(executionContext & RenderContext) !== NoContext

// 是否处于 CommitContext 上下文中，结果为 false
(executionContext & CommitContext) !== NoContext
```

如果要离开某一个上下文

```js
// 从当前上下文中移除 RenderContext 上下文
executionContext &= ~RenderContext;
// 是否处于 RenderContext 上下文中，结果为 false
(executionContext & CommitContext) !== NoContext
```



## 真题解答

> 题目：React 中哪些地方用到了位运算？
>
> 参考答案：
>
> 位运算可以很方便的表达“增、删、改、查”。在 React 内部，像 flags、状态、优先级等操作都大量使用到了位运算。
>
> 细分下来主要有如下的三个地方：
>
> - fiber 的 flags
> - lane 模型
> - 上下文