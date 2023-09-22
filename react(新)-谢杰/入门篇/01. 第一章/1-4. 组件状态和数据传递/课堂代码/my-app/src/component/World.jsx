import React from 'react'
import PropTypes from 'prop-types'; 

class World extends React.Component {

    // static defaultProps = {
    //     stuInfo: {
    //         name: "谢杰",
    //         age: 18
    //     }
    // }

    render() {
        return (
            <>
                <ul>
                    <li>姓名：{this.props.stuInfo.name}</li>
                    <li>年龄：{this.props.stuInfo.age}</li>
                    <li>content：{this.props.content}</li>
                </ul>
            </>
        );
    }
}

// props 的默认值
World.defaultProps ={
    stuInfo : {
        name : "谢杰",
        age : 18
    }
}

// props 的类型检测
World.propTypes = {
    content : PropTypes.string,
}



export default World;