import React from 'react';
import { useParams } from "react-router-dom";

/**
 * /users/:id
 */
function $id(props) {

    const { id } = useParams();

    return (
        <div>
            获取到的 id 为 {id}
        </div>
    );
}

export default $id;