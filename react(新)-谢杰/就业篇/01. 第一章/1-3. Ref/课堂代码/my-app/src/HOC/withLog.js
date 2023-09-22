// withLog.js
import React from "react";
import { formatDate } from "../utils/tools";

// 高阶组件是一个函数，接收一个组件作为参数
// 返回一个新的组件
function withLog(Com) {
  // 返回的新组件
  class WithLogCom extends React.Component {
    constructor(props) {
      super(props);
      this.state = { n: 1 };
    }
    componentDidMount() {
      console.log(
        `日志：组件${Com.name}已经创建，创建时间${formatDate(
          Date.now(),
          "year-time"
        )}`
      );
    }
    componentWillUnmount() {
      console.log(
        `日志：组件${Com.name}已经销毁，销毁时间${formatDate(
          Date.now(),
          "year-time"
        )}`
      );
    }
    render() {
      const { forwardRef, ...rest } = this.props;
      return <Com ref={forwardRef} {...rest} />;
    }
  }

  return React.forwardRef((props, ref) => {
    // props 就是上一层传递进来的属性
    // ref 就是上一层传递进来的 ref
    return <WithLogCom {...props} forwardRef={ref} />;
  });
}

export default withLog;
