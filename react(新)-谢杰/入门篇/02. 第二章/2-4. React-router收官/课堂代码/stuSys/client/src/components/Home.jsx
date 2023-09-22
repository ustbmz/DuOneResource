import { useState, useEffect } from 'react';
import { getStuListApi } from "../api/stuApi";
import Alert from "./Alert";
import { useLocation, NavLink } from "react-router-dom"

function Home(props) {

    const [stuList, setStuList] = useState([]); // 存储所有的数据
    const [searchItem, setSearchItem] = useState(""); // 存储用户输入的搜索信息
    const [alert, setAlert] = useState(null);
    const [searchList, setSearchList] = useState([]); // 存储搜索后的数据

    const location = useLocation();

    // 注意，这里需要添加依赖性为空数组，代表只执行一次
    useEffect(() => {
        getStuListApi().then(({ data }) => {
            setStuList(data);
        });
    }, []);

    // 再来一个副作用，用于获取跳转到 Home 组件时传递的 state 数据
    useEffect(() => {
        if (location.state) {
            setAlert(location.state)
        }
    }, [location])

    const showAlert = alert ? <Alert {...alert} /> : null;


    function changeHandle(name){
        // 用户要搜索的内容，就存储到了 searchItem 里面
        setSearchItem(name);
        // 接下来我们简单进行一下过滤
        const arr = stuList.filter((item)=>{
            return item.name.match(name);
        });
        setSearchList(arr);
    }

    // list 就是最终要显示的列表
    const list = searchItem ? searchList : stuList;

    const trs = list.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.phone}</td>
                <td>
                    <NavLink to={`/detail/${item.id}`}>详情</NavLink>
                </td>
            </tr>
        )
    })

    return (
        <div>
            {showAlert}
            <h1>学生列表</h1>
            {/* 搜索框 */}
            <input
                type="text"
                placeholder='搜索'
                className="form-control"
                value={searchItem}
                onChange={(e)=>changeHandle(e.target.value)}
            />
            {/* 表格 */}
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>年龄</th>
                        <th>联系方式</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {trs}
                </tbody>
            </table>
        </div>
    );
}

export default Home;