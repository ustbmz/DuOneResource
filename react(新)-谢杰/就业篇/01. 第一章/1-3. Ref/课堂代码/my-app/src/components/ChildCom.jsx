import React, { useRef, useImperativeHandle } from 'react';

function ChildCom(props, ref) {

    const childRef = useRef();

    // 自定义使用 ref 时向父组件要暴露的东西
    // 第一个是父组件传递过来的 ref
    // 第二个参数是一个回调函数，该函数返回一个对象
    // 这个对象里面就定义映射关系，也就是具体要向父组件暴露的东西
    useImperativeHandle(ref,()=>({
        click : () => {
            console.log(childRef.current)
        },
        testHandle : test
    }))

    function test(){
        console.log("这是子组件的test方法");
    }

    return (
        <div ref={childRef}>
            子组件
        </div>
    );
}

export default React.forwardRef(ChildCom);