import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import AddOrEdit from "./components/AddOrEdit";
import Detail from "./components/Detail";

import "./css/App.css"

function App() {
  return (
    // 最外层容器
    <div id="app" className="container">
      {/* 导航栏 */}
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div className="navbar-brand">学生管理系统</div>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <NavLink to="/home" className="navigation">主页</NavLink>
              <NavLink to="/about" className="navigation">关于我们</NavLink>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <NavLink to="/add" className="navigation">添加学生</NavLink>
            </ul>
          </div>
        </div>
      </nav>
      {/* 匹配上的路由所对应的组件显示在这个位置 */}
      <div className="content">
        <Routes>
          {/* 在 route 组件中书写你对应的路由，以及路由所对应的组件 */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/add" element={<AddOrEdit />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/edit/:id" element={<AddOrEdit />} />
          <Route path="/" element={<Navigate replace to="/home"/>} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
