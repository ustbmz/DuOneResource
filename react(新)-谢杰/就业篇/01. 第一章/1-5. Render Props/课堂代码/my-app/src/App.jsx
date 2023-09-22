import ChildCom1 from "./components/ChildCom1";
import ChildCom2 from "./components/ChildCom2";
// import MouseMove from "./components/MouseMove";

import withMouseMove from "./HOC/withMouseMove"

const NewChildCom1 = withMouseMove(ChildCom1);
const NewChildCom2 = withMouseMove(ChildCom2);

function App() {

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: "850px"
      }}
    >
      {/* 这边就不再是直接使用 ChildCom1、ChildCom2 */}
      {/* <ChildCom1 />
      <ChildCom2 /> */}
      {/* 改为使用 MouseMove */}
      {/* MouseMove 的 render 这个 props 属性对应的值是一个函数
      该函数表明了我要渲染的视图 */}
      {/* <MouseMove>
        {(props) => <ChildCom1 {...props} />}
      </MouseMove>
      <MouseMove>
        {(props) => <ChildCom2 {...props} />}
      </MouseMove> */}

      {/* 下面是使用高阶组件的方式 */}
      <NewChildCom1/>
      <NewChildCom2/>
    </div>
  )
}

export default App;