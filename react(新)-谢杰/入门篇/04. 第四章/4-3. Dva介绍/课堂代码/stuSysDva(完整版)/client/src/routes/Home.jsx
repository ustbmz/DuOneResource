import { useState, useEffect } from 'react';
import { connect } from 'dva';
import { NavLink } from 'dva/router';
import Alert from "../components/Alert"

function Home(props) {

    const [searchItem, setSearchItem] = useState(""); // 存储用户输入的搜索信息 
    const [searchList, setSearchList] = useState([]); // 存储搜索后的数据
    const [alert, setAlert] = useState(null); // 存储提示信息

    // 执行副作用
    // 获取提示信息
    useEffect(() => {
        const { location } = props;
        if (location.query) {
            setAlert(location.query);
        }
    }, [props]);

    useEffect(() => {
        props.dispatch({
            type: "stuModel/_getStuList"
        });
    }, []);


    // list 就是最终要显示的列表
    const list = searchItem ? searchList : props.stuList;

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

    function changeHandle(name) {
        // 用户要搜索的内容，就存储到了 searchItem 里面
        setSearchItem(name);
        // 接下来我们简单进行一下过滤
        const arr = props.stuList.filter((item) => {
            return item.name.match(name);
        });
        setSearchList(arr);
    }

    const showAlert = alert ? <Alert {...alert} /> : null;
    return (
        <div>
            {showAlert}
            <h1>学生列表</h1>
            {/* 搜索框 */}
            <input
                type="text"
                placeholder='搜索'
                className="form-control"
                style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                }}
                value={searchItem}
                onChange={(e) => changeHandle(e.target.value)}
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


const mapStateToProps = (state) => {
    return {
        stuList: state.stuModel.stuList
    }
}


export default connect(mapStateToProps)(Home);