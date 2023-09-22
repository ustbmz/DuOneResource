/**
 * 模拟导航守卫
 */
import RouteConfig from "./index.jsx";
import RouteBeforeConfig from "./RouteBeforeConfig";
import {Alert} from "antd";
/**
 * 该组件也是一个容器组件，不做任何 JSX 的展示，完全是为了实现一些功能
 */
function  RouteBefore(){
    // 根据 location.pathname 获取到 RouteBeforeConfig 所匹配的对象
    const currentPath = RouteBeforeConfig.filter(item=>item.path === location.pathname)[0]
    
    function closeHandle(){
        location.pathname = "/";
    }


    if(currentPath){
        if(currentPath.needLogin && !localStorage.getItem("userToken")){
            return (
                <Alert 
                    message="请先登录"
                    type="warning"
                    closable
                    onClose={closeHandle}
                    style={{
                        marginTop : "30px",
                        marginBottom : "30px"
                    }}
                />
            )
        }
    }

    return <RouteConfig />
}

export default RouteBefore;