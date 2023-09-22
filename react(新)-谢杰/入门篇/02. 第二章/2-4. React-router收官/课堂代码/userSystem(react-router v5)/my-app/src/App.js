import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import Home from "./components/Home"
import About from "./components/About"
import Detail from "./components/Detail"
import AddOrEdit from "./components/AddOrEdit"

import "./css/App.css"

export default function App() {
  return (
    <div id="app" className="container">
      <nav className="navbar navbar-default">
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
          <div className="navbar-brand">用户管理系统</div>
        </div>
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <NavLink to="/home" className="navgation">
              主页
            </NavLink>
            <NavLink to="/about" className="navgation">
              关于我们
            </NavLink>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <NavLink to="/add" className="navgation">
              添加用户
            </NavLink>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/add" component={AddOrEdit} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/edit/:id" component={AddOrEdit} />
        <Redirect to="/home" />
      </Switch>
    </div>
  );
}
