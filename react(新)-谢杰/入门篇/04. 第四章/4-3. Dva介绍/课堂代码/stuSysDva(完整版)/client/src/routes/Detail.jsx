import { useState, useEffect } from "react";
import { connect } from 'dva';

function Detail(props) {

    // 组件状态
    const [user, setUser] = useState({
        id: '',
        name: '',
        age: '',
        phone: '',
        email: '',
        education: '本科',
        graduationschool: '',
        profession: '',
        profile: ''
    });

    useEffect(() => {
        if (!props.stuList.length) {
            props.dispatch({
                type: "stuModel/_getStuList"
            });
        }
    }, [props.stuList]);


    useEffect(() => {
        const id = props.match.params.id;
        // // 不需要发请求，直接从本地仓库获取数据
        if (props.stuList.length) {
            const currentStu = props.stuList.filter(stu => stu.id === ~~id);
            setUser(currentStu[0]);
        }

    }, [props.match.params.id, props.stuList]);


    function deleteUser(id) {
        if (window.confirm('你确定要删除此名学生么？')) {
            props.dispatch({
                type: "stuModel/_deleteStuById",
                data: { id },
            });
            props.history.push({
                pathname: "/home",
                query: {
                    alert: "用户删除成功！",
                    type: "info"
                }
            });
        }
    }

    return (
        <div className="details container">
            <button className="btn btn-default" onClick={() => props.history.push('/home')}>返回</button>
            <h1 className="page-header">
                {user.name}
                <span className="pull-right">
                    <button className="btn btn-primary" onClick={() => props.history.push(`/edit/${user.id}`)} style={{ marginRight: 10 }}>修改</button>
                    <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>删除</button>
                </span>
            </h1>
            {/* 第一组 */}
            <ul className="list-group">
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-phone">电话：{user.phone}</span>
                </li>
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-envelope">邮箱：{user.email}</span>
                </li>
            </ul>
            {/* 第二组 */}
            <ul className="list-group">
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-book">文化水平：{user.education}</span>
                </li>
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-flag">毕业院校：{user.graduationschool}</span>
                </li>
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-briefcase">专业：{user.profession}</span>
                </li>
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-user">个人简介：{user.profile}</span>
                </li>
            </ul>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        stuList: state.stuModel.stuList
    }
}

export default connect(mapStateToProps)(Detail);