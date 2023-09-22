import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { del, change } from "../redux/todolistSlice"

function List() {
    const { list } = useSelector(state => state.todo);
    const dispatch = useDispatch();

    const lis = list.map((item, index) => {
        return (
            <li key={index} className="text-primary">
                <span
                    onClick={() => dispatch(change(index))}
                    className={["item", item.status ? 'completed' : ""].join(" ")}
                >{item.content}</span>
                <button
                    type="button"
                    className='close'
                    onClick={() => dispatch(del(index))}
                >&times;</button>
            </li>
        )
    })

    return (
        <div>
            <ul style={{ marginTop: 20 }}>
                {lis}
            </ul>
        </div>
    );
}

export default List;