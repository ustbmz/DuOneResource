import { useState, useEffect } from "react";
import { getUserListApi } from "../api/userApi"
import { NavLink } from 'react-router-dom'
import Alert from "./Alert"

export default function Home(props) {

    // 组件数据
    const [userList, setUserList] = useState([]); // 存储完整的用户列表数据
    const [searchList, setSearchList] = useState([]); // 存储搜索结果
    const [searchItem, setSearchItem] = useState(""); // 搜索数据
    const [alert, setAlert] = useState(null); // 存储提示信息

    // 执行副作用
    // 获取提示信息
    useEffect(() => {
        const { location } = props;
        if (location.query) {
            setAlert(location.query);
        }
    }, [props]);

    // 获取用户列表
    useEffect(() => {
        getUserListApi().then(({ data }) => {
            setUserList(data);
        })
    }, []);

    // 搜索功能
    function filterInput(name) {
        // 同步更新搜索框
        setSearchItem(name);
        // 简单的按照姓名进行过滤
        const arr = userList.filter((item) => {
            return item.name.match(name);
        });
        setSearchList(arr);
    }

    const list = searchItem ? searchList : userList;

    const trs = list.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.education}</td>
                <td>{item.graduationschool}</td>
                <td>{item.profession}</td>
                <td>
                    <NavLink to={`/detail/${item.id}`}>详情</NavLink>
                </td>
            </tr>
        );
    });

    const showAlert = alert ? <Alert {...alert} /> : null;
    return (
        <div className="users">
            {showAlert}
            <h1 className="page-header">用户列表</h1>
            <input type="text"
                className="form-control"
                placeholder="搜索"
                onChange={(e) => filterInput(e.target.value)}
                value={searchItem}

            />
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>年龄</th>
                        <th>电话</th>
                        <th>邮箱</th>
                        <th>文化水平</th>
                        <th>毕业院校</th>
                        <th>专业</th>
                        <th>更多信息</th>
                    </tr>
                </thead>
                <tbody>
                    {trs}
                </tbody>
            </table>
        </div>
    );
}