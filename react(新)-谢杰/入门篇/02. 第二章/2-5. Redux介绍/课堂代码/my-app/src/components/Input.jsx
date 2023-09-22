import { useState } from 'react';
import { addListAction } from "../redux/actions"

function Input(props) {

    const [value, setValue] = useState("");

    function clickHandle(){
        // 将用户填写的内容提交到仓库
        // dispatch 方法会派发一个 action 对象到 reducer 里面
        // addListAction(value) ===> { type : ADD, data : value} 
        // 这个就是我们的 action 描述对象，该对象会被 dispatch（派发）到 reducer 里面
        props.store.dispatch(addListAction(value));
        setValue("");
    }

    return (
        <div className="form-inline">
            <input
                type="text"
                className="form-control"
                placeholder="请输入待办事项"
                style={{
                    marginRight: 10
                }}
                value={value}
                onChange={(e)=>setValue(e.target.value)}
            />
            <button className="btn btn-primary" onClick={clickHandle}>提交</button>
        </div>
    );
}

export default Input;