import { useState, useEffect } from "react";
import { getUserByIdApi, deleteUserApi } from "../api/userApi"

export default function Detail(props) {

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
        const id = props.match.params.id;
        getUserByIdApi(id).then(({ data }) => {
            setUser(data);
        })
    }, [props.match.params.id]);


    function deleteUser(id) {
        if (window.confirm('你确定要删除此名用户么？')) {
            deleteUserApi(id).then(() => {
                
                props.history.push({
                    pathname: "/home",
                    query: {
                        alert: "用户删除成功！",
                        type : "info"
                    }
                });
            })
        }
    }

    function backHome() {
        props.history.push('/home');
    }

    return (
        <div className="details container">
            <button className="btn btn-default" onClick={backHome}>返回</button>
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