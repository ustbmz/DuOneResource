// 该组件的效果是一个小球会追随鼠标进行移动
function ChildCom2(props) {
    return (
        <div
            style={{
                width: '400px',
                height: '400px',
                backgroundColor: 'grey',
                position: 'relative',
                overflow: 'hidden'
            }}
            onMouseMove={props.mouseMoveHandle}
        >
            <h1>移动鼠标</h1>
            <div
                style={{
                    width: '15px',
                    height: '15px',
                    borderRadius: "50%",
                    backgroundColor: 'white',
                    position: 'absolute',
                    left: props.points.x - 5 - 460,
                    top: props.points.y - 5 - 10,
                }}
            ></div>
        </div>


    );
}

export default ChildCom2;