import { useState, useEffect } from "react";
import { connect } from "dva";

function AddOrEdit(props) {

    // 组件状态
    const [user, setUser] = useState({
        name: '',
        age: '',
        phone: '',
        email: '',
        education: '本科',
        graduationschool: '',
        profession: '',
        profile: ''
    });

    const [userId, setUserId] = useState(null);


    useEffect(() => {
        const id = props.match.params.id;
        if (id) {
            setUserId(id);
            // 获取数据，然后进行回填
            // getUserByIdApi(id).then(({ data }) => {
            //     setUser(data);
            // })

            // 直接从仓库拿数据，然后回填
            const result = props.stuList.filter(stu => stu.id === ~~id)[0];
            setUser(result);
        }
    }, [props.match.params.id])


    // 更新用户信息
    function updateUser(newInfo, key) {
        // 对需要验证的字段可以进行信息验证
        // 比如如果是年龄的话，只允许输入数字
        if (key === "age" && isNaN(newInfo)) {
            return;
        }

        const newUserInfo = { ...user };
        newUserInfo[key] = newInfo.trim();
        setUser(newUserInfo);
    }

    // 提交用户信息
    function submitUser(e) {
        e.preventDefault();

        // 简单的判断一下是否有空项
        for (const key in user) {
            if (!user[key]) {
                window.alert("请完善表单的每一项");
                return;
            }
        }

        // 可以提交
        // 接下来需要判断究竟是新增还是修改
        // 根据 userId 是否有值来判断
        if (userId) {
            // 编辑
            // editUserApi(userId, user).then(() => {
            //     props.history.push({
            //         pathname: "/home",
            //         query: {
            //             alert: "学生修改成功！",
            //             type : "info"
            //         }
            //     });
            // })
            props.edit(userId, user);
            props.history.push({
                pathname: "/home",
                query: {
                    alert: "学生修改成功！",
                    type: "info"
                }
            });

        } else {
            // 新增
            // addUserApi(user).then(() => {
            //     props.history.push({
            //         pathname: "/home",
            //         query: {
            //             alert: "学生添加成功！",
            //             type : "success"
            //         }
            //     });
            // })

            props.add(user);
            props.history.push({
                pathname: "/home",
                query: {
                    alert: "学生添加成功！",
                    type: "success"
                }
            });
        }

    }

    return (
        <div className="add">
            <h1 className="page-header">{userId ? "修改用户" : "添加用户"}</h1>
            <form id="myForm" onSubmit={submitUser}>
                <div className="well">
                    <div className="form-group">
                        <label>姓名</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="请填写用户姓名"
                            value={user.name}
                            onChange={(e) => updateUser(e.target.value, 'name')}
                        />
                    </div>
                    <div className="form-group">
                        <label>年龄</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="请填写用户年龄"
                            value={user.age}
                            onChange={(e) => updateUser(e.target.value, 'age')}
                        />
                    </div>
                    <div className="form-group">
                        <label>电话</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="请填写用户电话号码"
                            value={user.phone}
                            onChange={(e) => updateUser(e.target.value, 'phone')}
                        />
                    </div>
                    <div className="form-group">
                        <label>邮箱</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="请填写用户邮箱地址"
                            value={user.email}
                            onChange={(e) => updateUser(e.target.value, 'email')}
                        />
                    </div>
                    <div className="form-group">
                        <label>学历</label>
                        <select
                            className="form-control"
                            value={user.education}
                            onChange={(e) => updateUser(e.target.value, 'education')}
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
                            value={user.graduationschool}
                            onChange={(e) => updateUser(e.target.value, 'graduationschool')}
                        />
                    </div>
                    <div className="form-group">
                        <label>职业</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="请填写用户从事的相关职业"
                            value={user.profession}
                            onChange={(e) => updateUser(e.target.value, 'profession')}
                        />
                    </div>
                    <div className="form-group">
                        <label>个人简介</label>
                        <textarea
                            className="form-control"
                            rows="10"
                            placeholder="请简单的介绍一下你自己，包括兴趣、爱好等信息..."
                            value={user.profile}
                            onChange={(e) => updateUser(e.target.value, 'profile')}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">{userId ? "确认修改" : "确认添加"}</button>
                </div>
            </form>
        </div>
    );
}

// 将 state 映射为 props 属性
const mapStateToProps = (state) => {
    return {
        stuList: state.stuModel.stuList
    }
}


// 直接将 dispatch 这个行为映射成一个属性
const mapDispatchToProps = dispatch => {
    return {
        add: (data) => dispatch({
            type: "stuModel/_addStu",
            data
        }),
        edit: (id, newInfo) => dispatch({
            type: "stuModel/_editStu",
            data: {
                id,
                newInfo
            }
        }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrEdit);