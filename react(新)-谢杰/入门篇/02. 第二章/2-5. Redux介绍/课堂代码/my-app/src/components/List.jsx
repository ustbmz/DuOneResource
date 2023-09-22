import React from 'react';
import {delListAction,changeAction} from "../redux/actions"

function List(props) {
    // 在 redux，通过 store.getState() 来获取仓库数据
    const lis = props.store.getState().list.map((item,index)=>{
        return (
            <li key={index} className="text-primary">
                <span
                    onClick={()=>props.store.dispatch(changeAction(index))}
                    className={["item", item.status ? 'completed' : ""].join(" ")}
                >{item.content}</span>
                <button
                    type="button"
                    className='close'
                    onClick={()=>props.store.dispatch(delListAction(index))}
                >&times;</button>
            </li>
        )
    })

    return (
        <div>
            <ul style={{marginTop : 20}}>
                {lis}
            </ul>
        </div>
    );
}

export default List;