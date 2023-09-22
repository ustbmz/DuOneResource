
// 移动鼠标，可以记录当前鼠标的位置
// 仔细观察下面的代码，我们会发现两个组件的逻辑一模一样
// 仅仅是渲染的视图不一样
function ChildCom1(props) {
    return (
        <div style={{
            width: '400px',
            height: '400px',
            backgroundColor: 'red'
        }} onMouseMove={props.mouseMoveHandle}>
            <h1>移动鼠标</h1>
            <p>当前鼠标的位置：x {props.points.x} y {props.points.y}</p>
        </div>
    );
}

export default ChildCom1;