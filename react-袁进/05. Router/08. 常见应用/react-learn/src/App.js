import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import  routeConfig from "./RouteConfig"

function User({ match }) {
    return <div>
        <h1>User组件固定的区域</h1>
        <p>
            <Link to={routeConfig.user.update}>用户信息</Link>
            <Link to={routeConfig.user.pay.root}>充值</Link>
        </p>
        <div style={{
            width: 500,
            height: 500,
            background: "lightblue",
            border: "2px solid",
            margin: "0 auto"
        }}>
            {/* User组件变化的区域：根据地址的不同发生变化 */}
            <Route path={routeConfig.user.update} component={UserUpdate} />
            <Route path={routeConfig.user.pay.root} component={UserPay} />
        </div>

    </div>
}

function UserUpdate() {
    return <h1>修改用户信息</h1>
}

function UserPay() {
    return <h1>用户充值</h1>
}

export default function App() {
    return (
        <Router>
            <Route path={routeConfig.user.root} component={User} />
            {/* 其他组件 */}
        </Router>
    )
}
