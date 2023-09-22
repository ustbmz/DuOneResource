import { Layout } from 'antd';
import NavHeader from "./components/NavHeader";
import PageFooter from "./components/PageFooter";
import "./css/App.css";

import RouterConfig from "./router/index.jsx"

const { Header, Footer, Content } = Layout;


function App() {

  return (
    <div className="App">
      {/* 头部 */}
      <Header className="header">
        <NavHeader />
      </Header>
      {/* 匹配上的路由页面 */}
      <Content className="content">
        <RouterConfig />
      </Content>
      {/* 底部 */}
      <Footer className="footer">
        <PageFooter />
      </Footer>
    </div>
  )

}

export default App;