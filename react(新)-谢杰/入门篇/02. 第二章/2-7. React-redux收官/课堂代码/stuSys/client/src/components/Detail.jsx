import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { deleteStuAsync } from "../redux/stuSlice"

/**
 * 学生详情组件
 * @param {*} props 
 * @returns 
 */
function Detail(props) {

    // 获取动态参数传递过来的学生 id
    const { id } = useParams();
    const { stuList } = useSelector(state => state.stu);
    const dispatch = useDispatch();

    const [stu, setStu] = useState({
        name: "",
        age: "",
        phone: "",
        email: "",
        education: "",
        graduationschool: "",
        profession: "",
        profile: "",
    });

    const navigate = useNavigate();

    // 根据该 id 获取该学生的详细信息
    useEffect(() => {
        // 之前是根据拿到的 id，重新和服务器进行通信，获取该 id 所对应的学生数据
        // getStuByIdApi(id).then(({ data }) => {
        //     setStu(data);
        // });

        // 现在由于所有的数据都在前端仓库，所以我们直接从前端仓库取出对应 id 的学生数据即可
        const curStu = stuList.filter(stu => stu.id === ~~id);
        setStu(curStu[0]);
    }, [id, stuList])


    function deleteStu(id) {
        if (window.confirm("你是否要删除此学生？")) {

            // 之前是直接发请求进行删除
            // deleteStuByIdApi(id).then(()=>{
            //     navigate("/home", {
            //         state : {
            //             alert : "学生删除成功",
            //             type : "info"
            //         }
            //     })
            // })

            // 派发一个 action，仓库来发异步请求进行删除，仓库再更新自己的数据
            dispatch(deleteStuAsync(id));
            navigate("/home", {
                state: {
                    alert: "学生删除成功",
                    type: "info"
                }
            })
        }
    }

    return (
        <div className="details container">
            <button className="btn btn-default" onClick={() => navigate("/home")}>返回</button>
            <h1 className="page-header">
                {stu.name}
                <span className="pull-right">
                    <button className="btn btn-primary" onClick={() => navigate(`/edit/${stu.id}`)} style={{ marginRight: 10 }}>修改</button>
                    <button className="btn btn-danger" onClick={() => deleteStu(stu.id)}>删除</button>
                </span>
            </h1>
            {/* 第一组 */}
            <ul className="list-group">
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-phone">电话：{stu.phone}</span>
                </li>
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-envelope">邮箱：{stu.email}</span>
                </li>
            </ul>
            {/* 第二组 */}
            <ul className="list-group">
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-book">文化水平：{stu.education}</span>
                </li>
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-flag">毕业院校：{stu.graduationschool}</span>
                </li>
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-briefcase">专业：{stu.profession}</span>
                </li>
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-user">个人简介：{stu.profile}</span>
                </li>
            </ul>
        </div>
    );
}

export default Detail;