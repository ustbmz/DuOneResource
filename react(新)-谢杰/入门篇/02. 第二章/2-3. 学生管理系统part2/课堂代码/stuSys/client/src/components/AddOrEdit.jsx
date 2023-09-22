import { useState, useEffect } from 'react';
import { addStuApi } from "../api/stuApi";
import { useNavigate, useParams } from "react-router-dom";
import { getStuByIdApi, editStuByIdApi } from "../api/stuApi";

/**
 * 该组件有两个功能，一个是添加学生，另一个是修改学生
 * @param {*} props 
 * @returns 
 */
function AddOrEdit(props) {


    const navigate = useNavigate();

    // 后期我们就根据是否有 id 来决定是添加还是修改
    const { id } = useParams();

    // 创建一个表单状态
    const [stu, setStu] = useState({
        name: "",
        age: "",
        phone: "",
        email: "",
        education: "本科",
        graduationschool: "",
        profession: "",
        profile: "",
    });

    useEffect(() => {
        // 如果有 id，我们需要根据该 id 获取学生的详细信息，并且回填到表单里面
        if (id) {
            getStuByIdApi(id).then(({ data }) => {
                setStu(data);
            })
        }
    }, [id])


    function updateStuInfo(newInfo, key) {
        // 根据对应的 key 来更新信息
        if (key === "age" && isNaN(newInfo)) {
            return;
        }

        const newStuInfo = { ...stu };
        newStuInfo[key] = newInfo.trim();
        setStu(newStuInfo);
    }

    function submitStuInfo(e) {
        e.preventDefault();

        for (const key in stu) {
            if (!stu[key]) {
                alert("请完善表单的每一项");
                return;
            }
        }

        if (id) {
            // 编辑
            editStuByIdApi(id, stu).then(()=>{
                navigate("/home", {
                    state: {
                        alert: "学生修改成功",
                        type: "info",
                    }
                });
            })
        } else {
            // 接下来就需要发送请求
            addStuApi(stu).then(() => {
                // 需要做跳转
                navigate("/home", {
                    state: {
                        alert: "学生添加成功",
                        type: "success",
                    }
                });
            })
        }
    }


    return (
        <div className="container">
            {/* 标题 */}
            <h1 className="page-header">{id ? "修改学生" : "添加学生"}</h1>
            <form id="myForm" onSubmit={submitStuInfo}>
                <div className="well">
                    <div className="form-group">
                        <label>姓名</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="请填写用户姓名"
                            value={stu.name}
                            onChange={(e) => updateStuInfo(e.target.value, 'name')}
                        />
                    </div>
                    <div className="form-group">
                        <label>年龄</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="请填写用户年龄"
                            value={stu.age}
                            onChange={(e) => updateStuInfo(e.target.value, 'age')}
                        />
                    </div>
                    <div className="form-group">
                        <label>电话</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="请填写用户电话号码"
                            value={stu.phone}
                            onChange={(e) => updateStuInfo(e.target.value, 'phone')}
                        />
                    </div>
                    <div className="form-group">
                        <label>邮箱</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="请填写用户邮箱地址"
                            value={stu.email}
                            onChange={(e) => updateStuInfo(e.target.value, 'email')}
                        />
                    </div>
                    <div className="form-group">
                        <label>学历</label>
                        <select
                            className="form-control"
                            value={stu.education}
                            onChange={(e) => updateStuInfo(e.target.value, 'education')}
                        >
                            <option>小学</option>
                            <option>初中或职中</option>
                            <option>高中或职高</option>
                            <option>专科</option>
                            <option>本科</option>
                            <option>硕士</option>
                            <option>博士</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>毕业学校</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="请填写用户毕业院校"
                            value={stu.graduationschool}
                            onChange={(e) => updateStuInfo(e.target.value, 'graduationschool')}
                        />
                    </div>
                    <div className="form-group">
                        <label>职业</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="请填写用户从事的相关职业"
                            value={stu.profession}
                            onChange={(e) => updateStuInfo(e.target.value, 'profession')}
                        />
                    </div>
                    <div className="form-group">
                        <label>个人简介</label>
                        <textarea
                            className="form-control"
                            rows="10"
                            placeholder="请简单的介绍一下你自己，包括兴趣、爱好等信息..."
                            value={stu.profile}
                            onChange={(e) => updateStuInfo(e.target.value, 'profile')}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">{id ? "确认修改" : "确认添加"}</button>
                </div>
            </form>
        </div>
    );
}

export default AddOrEdit;