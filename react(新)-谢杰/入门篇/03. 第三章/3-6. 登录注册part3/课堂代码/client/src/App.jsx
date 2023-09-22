import { useState, useEffect } from "react";
import { Layout, message } from 'antd';
import NavHeader from "./components/NavHeader";
import PageFooter from "./components/PageFooter";
import {getInfo, getUserById} from "./api/user";
import { changeLoginStatus, initUserInfo } from "./redux/userSlice";
import { useDispatch } from "react-redux";

import "./css/App.css";

import RouterConfig from "./router/index.jsx"
import LoginForm from "./components/LoginForm"

const { Header, Footer, Content } = Layout;


function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  // 加载根组件的时候，需要恢复用户的登录状态
  useEffect(() =>{
    async function fetchData(){
      const result = await getInfo();
      console.log(result);
      if(result.data){
        // 说明 token 有效
        // 获取该 id 对应的用户信息，存储到状态仓库
        const {data} = await getUserById(result.data._id);
        // 存储到状态仓库
        dispatch(initUserInfo(data));
        dispatch(changeLoginStatus(true));
      } else {
        // 说明 token 过期了
        message.warning(result.msg);
        localStorage.removeItem("userToken");
      }
    }
    if(localStorage.getItem("userToken")){
      fetchData();
    }

  },[])


  /**
   * 关闭弹框
   */
  function closeModal(){
    setIsModalOpen(false);
  }

  /**
   * 打开弹框
   */
  function loginHandle(){
    setIsModalOpen(true);
  }

  return (
    <div className="App">
      {/* 头部 */}
      <Header className="header">
        <NavHeader loginHandle={loginHandle}/>
      </Header>
      {/* 匹配上的路由页面 */}
      <Content className="content">
        <RouterConfig />
      </Content>
      {/* 底部 */}
      <Footer className="footer">
        <PageFooter />
      </Footer>
      {/* 登录弹窗 */}
      <LoginForm isShow={isModalOpen} closeModal={closeModal}/>
    </div>
  )

}

export default App;