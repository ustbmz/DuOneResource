# 1. 属性默认值和类型验证

在 *Vue* 中，我们可以针对 *props* 属性进行类型验证，那么在 *React* 中同样也能对 *props* 进行验证。

>官网文档地址：*https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html*

从 *React v15.5* 开始，*React.PropTypes* 已移入另一个包中。因此首先我们需要安装 *prop-types* 库。

>*prop-types* 库文档地址：*https://www.npmjs.com/package/prop-types*

有关 *props* 验证这一块，我们主要需要搞清楚以下几个知识点：

- 提供了哪些验证类型
- 如何设置默认值

## 验证类型

有关 *props* 能够验证的类型，官网实际上已经全部罗列出来了。

>对应地址：*https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html#proptypes*

下面是一个简单示例。

在根组件中我们使用到了子组件，并向子组件传递了 *name* 和 *age* 这两个 *props* 属性：

```js
import ChildCom from "./components/ChildCom"

function App() {
  return (
    <div className="App">
      Hello React
      <ChildCom name="xiejie" age={18}/>
      <ChildCom name="xiejie" age="18"/>
    </div>
  );
}

export default App;
```

在子组件中，我们针对 *props* 做了类型的限制，要求 *name* 为 *string* 类型，*age* 为 *number* 类型：

```js
import React from 'react';
import PropTypes from 'prop-types'

function ChildCom(props) {
    return (
        <div>
            这是子组件
            <span>姓名：{props.name} 年龄：{props.age}</span>
        </div>
    );
}

ChildCom.propTypes = {
    name: PropTypes.string,
    age : PropTypes.number,
  }

export default ChildCom;
```

浏览器效果如下：

![image-20221130134739845](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-30-054740.png)

如果官方为你提供的验证规则不够用？没关系，我们还可以自定义验证器，它在验证失败时应返回一个 *Error* 对象。例如：

```js
ChildCom.propTypes = {
    /**
     * 
     * @param {*} props 传入的整体 props 对象
     * @param {*} propName 当前所验证的 props 属性
     * @param {*} componentName 组件名
     */
    name: function (props, propName, componentName) {
        if (!/-stu/.test(props[propName])) {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
        }
    },
    age: PropTypes.number,
}
```

在上面的代码中，我们为 *name* 这个 *props* 属性自定义了验证器，要求传入的属性值必须包含 *-stu* 字符，因此在使用子组件时，下面的用法无法通过验证

```js
<ChildCom name="xiejie" age={18}/>
```

![image-20221130134801788](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-30-054801.png)

在 *name* 对应的值中需要包含 *-stu* 字符，例如：

```js
<ChildCom name="xiejie-stu" age={18}/>
```

另外，针对 *props* 是数组或者对象时，如果要验证的不仅仅是否是数组或对象类型，而是要验证数组和对象的每一项，那么可以使用 arrayOf 或 objectOf 验证器。

例如，我们现在有一个需求，要求数组的每一项为数字，验证器示例如下：

```js
/**
 * @param {*} propValue props 对象的数组或对象值
 * @param {*} key 数组或者对象的 key
 * @param {*} componentName 组件名
 * @param {*} location 位置
 * @param {*} propFullName arr[index] or object.xx
 */
score: PropTypes.arrayOf(function (propValue, key, componentName, location, propFullName) {
    console.log(propValue, key, componentName, location, propFullName);
    if (typeof propValue[key] !== 'number') {
        return new Error(
            'Invalid prop `' + propFullName + '` supplied to' +
            ' `' + componentName + '`. Validation failed.'
        );
    }
})
```

子组件下面的 *props* 是无法通过验证的：

```js
<ChildCom name="xiejie-stu" age={18} score={[98,"97",100]}/>
```

![image-20221130134828620](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-11-30-054829.png)

*score* 对应的数组值每一项都应该为 *number* 类型，以下的用法能够通过验证：

```js
<ChildCom name="xiejie-stu" age={18} score={[98, 97, 100]} />
```

## 插槽的验证

之前在入门篇我们介绍过 *React* 的插槽也是使用 *props* 来实现的。

针对插槽，使用 *prop-types* 可以进行插槽元素的单一验证，例如：

```js
import React from 'react';
import PropTypes from 'prop-types'

function ChildCom(props) {
    return (
        <div>
            下面是插槽显示的内容
            {props.children}
        </div>
    );
}

ChildCom.propTypes = {
    children: PropTypes.element.isRequired
}

export default ChildCom;
```

在上面的示例中，我们为 *ChildCom* 设置了一个插槽，并且设置了一个验证，要求父组件在使用 *ChildCom* 子组件时，必须要插入一个根元素。

以下的使用方式无法通过验证：

```js
<ChildCom />
```

```js
<ChildCom>
    <div>Hello</div>
    <div>World</div>
</ChildCom>
```

以下的方式可以通过验证：

```js
<ChildCom>
    <div>Hello</div>
</ChildCom>
```

## 默认值

*props* 属性还可以设置默认值，这一点官网已经有了很好的示例，请参阅：

>*https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html#default-prop-values*

-*EOF*-