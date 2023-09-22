import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from "../redux/todolistSlice"

function Input() {

    const [value, setValue] = useState("");
    const dispatch = useDispatch();


    function clickHandle(){
        // 将用户填写的内容提交到仓库
        // dispatch 方法会派发一个 action 对象到 reducer 里面
        // addListAction(value) ===> { type : ADD, data : value} 
        // 这个就是我们的 action 描述对象，该对象会被 dispatch（派发）到 reducer 里面
        // props.store.dispatch(addListAction(value));

        // 之前使用纯 redux 的时候，dispatch 是通过 store 拿到的
        // 现在是通过 useDispatch 来拿到

        dispatch(add(value));
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