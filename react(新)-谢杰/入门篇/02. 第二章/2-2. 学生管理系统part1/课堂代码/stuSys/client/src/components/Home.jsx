import { useState, useEffect } from 'react';
import { getStuListApi } from "../api/stuApi"

function Home(props) {

    const [stuList, setStuList] = useState([]);
    const [searchItem] = useState([]);

    // 注意，这里需要添加依赖性为空数组，代表只执行一次
    useEffect(() => {
        getStuListApi().then(({ data }) => {
            setStuList(data);
        });
    }, []);

    function changeHandle() { }


    const trs = stuList.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.phone}</td>
                <td>
                    详情
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
                value={searchItem}
                onChange={changeHandle}
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