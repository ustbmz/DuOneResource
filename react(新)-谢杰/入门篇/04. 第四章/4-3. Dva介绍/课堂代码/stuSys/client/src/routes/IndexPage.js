import React from "react";
import { connect } from "dva";
import { NavLink, Switch, Route, Redirect } from "dva/router";
import Home from "./Home.jsx";
import About from "./About.jsx";
import Detail from "./Detail.jsx";
import AddOrEdit from "./AddOrEdit.jsx";

import styles from "../css/IndexPage.css";

function IndexPage() {
  return (
    // 最外层容器
    <div id="app" className="container">
      {/* 导航栏 */}
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div className="navbar-brand">学生管理系统</div>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <NavLink to="/home" className={styles.navigation}>
                主页
              </NavLink>
              <NavLink to="/about" className={styles.navigation}>
                关于我们
              </NavLink>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <NavLink to="/add" className={styles.navigation}>
                添加学生
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
      {/* 匹配上的路由所对应的组件显示在这个位置 */}
      <div className={styles.content}>
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/about" component={About} />
          <Route path="/add" component={AddOrEdit} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/edit/:id" component={AddOrEdit} />
          <Redirect to="/home" />
        </Switch>
      </div>
    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
