import { useState } from "react";
import { Layout } from 'antd';
import NavHeader from "./components/NavHeader";
import PageFooter from "./components/PageFooter";
import "./css/App.css";

import RouterConfig from "./router/index.jsx"
import LoginForm from "./components/LoginForm"

const { Header, Footer, Content } = Layout;


function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);


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