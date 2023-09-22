import { useState, useEffect } from 'react';
import { connect } from "dva";
import { NavLink } from "dva/router";


function Home(props) {

    const [searchItem, setSearchItem] = useState("");
    const [searchList, setSearchList] = useState([]); // 存储搜索后的数据

    useEffect(()=>{
        // 派发 action 获取数据
        props.dispatch({
            type : "stuModel/_getStuList"
        })
    },[])


    function changeHandle(name) {
        // 用户要搜索的内容，就存储到了 searchItem 里面
        setSearchItem(name);
        // 接下来我们简单进行一下过滤
        const arr = props.stuList.filter((item) => {
            return item.name.match(name);
        });
        setSearchList(arr);
    }

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

    return (
        <div>
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

/**
 * 将仓库的状态映射为该组件的 props
 * 这样我们在从仓库获取数据的时候，就可以通过 props.xxx 的形式来获取
 * 感觉就像是从父组件传递过来的状态一样
 * @param {*} state 仓库数据
 */
const mapStateToProps = (state)=>{
    return {
        // 回头在组件中就可以通过 props.stuList 来获取仓库的数据
        stuList : state.stuModel.stuList
    }
}


export default connect(mapStateToProps)(Home);