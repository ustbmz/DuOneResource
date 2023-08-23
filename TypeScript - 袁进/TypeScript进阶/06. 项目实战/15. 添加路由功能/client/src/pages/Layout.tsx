import React from "react";
import { NavLink, Route } from "react-router-dom"
import Home from "./Home";
import MovieList from "./movie/MovieList"
import AddMovie from "./movie/AddMovie"
import EditMovie from "./movie/EditMovie"

const Layout: React.FC = function () {
    return (
        <div>
            <header>
                <ul>
                    <li><NavLink to="/">首页</NavLink></li>
                    <li><NavLink to="/movie">电影列表</NavLink></li>
                    <li><NavLink to="/movie/add">添加电影</NavLink></li>
                    <li><NavLink to="/movie/edit/234srfwer">修改电影</NavLink></li>
                </ul>
                <div>
                    <Route path="/" component={Home} exact={true}></Route>
                    <Route path="/movie" exact={true} component={MovieList}></Route>
                    <Route path="/movie/add" component={AddMovie}></Route>
                    <Route path="/movie/edit/:id" component={EditMovie}></Route>
                </div>
            </header>
        </div>
    );
}

export default Layout;