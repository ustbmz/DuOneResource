import React from 'react';
import PropTypes from 'prop-types';

function ChildCom(props) {
    return (
        <div>
            这是子组件
            <span>姓名:{props.name} 年龄：{props.age}</span>
            <div>{props.children}</div>
        </div>
    );
}

// 书写关于 props 类型的验证
ChildCom.propTypes = {
    /**
     * 
     * @param {*} props 整体的 props 对象 {name:... , age :...}
     * @param {*} propName 当前验证的 props 属性 name
     * @param {*} componentName 组件名
     */
    name: function (props, propName, componentName) {
        if (!/-stu/.test(props[propName])) {
            // 进入此 if， 说明验证没有通过
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            )
        }
    },
    age: PropTypes.number,
    score: PropTypes.arrayOf(function (propValue, key, componentName, location, propFullName) {
        if (typeof propValue[key] !== 'number') {
            return new Error(
                'Invalid prop `' + propFullName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
        }
    }),
    children: PropTypes.element.isRequired
}

// 书写默认值
ChildCom.defaultProps = {
    name : 'jiexie-stu'
}


export default ChildCom;
