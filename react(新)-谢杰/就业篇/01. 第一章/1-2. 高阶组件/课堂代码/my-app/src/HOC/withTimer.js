import { useState, useEffect } from "react";

/**
 * 为组件添加 timer
 * @param {*} Com 旧组件
 * @returns 新的组件
 */
export default function withTimer(Com){
    return function NewCom(props){
        // 抽离公共逻辑
        const [counter, setCounter] = useState(1);

        useEffect(()=>{
            const stopTimer = setInterval(()=>{
                console.log(counter);
                setCounter(counter + 1);
            },1000);

            return function(){
                clearInterval(stopTimer);
            }
        },[counter]);

        return <Com {...props}/>
    }
}