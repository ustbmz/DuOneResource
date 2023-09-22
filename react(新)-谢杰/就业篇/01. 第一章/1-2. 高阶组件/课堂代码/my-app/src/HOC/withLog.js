import {useEffect} from "react";
import { formatDate } from "../utils/tools";

/**
 * 在接收的组件上面添加一些公共的逻辑
 * @param {*} Com 接收一个组件
 * @returns 返回一个新组件
 */
export default function withLog(Com){
    return function NewCom(props){
        // 抽离的公共逻辑
        useEffect(()=>{
            console.log(`日志：组件${Com.name}已经创建，创建时间${formatDate(Date.now(),"year-time")}`);
            return function(){
                console.log(`日志：组件${Com.name}已经销毁，销毁时间${formatDate(Date.now(),"year-time")}`);
            }
        },[])
        // 一般来讲，传入的组件会作为新组件的视图
        return <Com {...props} />
    }
}