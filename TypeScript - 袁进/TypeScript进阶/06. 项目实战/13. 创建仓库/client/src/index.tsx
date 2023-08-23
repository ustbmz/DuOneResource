import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './redux/store';
import MovieAction from './redux/actions/MovieAction';

store.dispatch(MovieAction.setLoadingAction(true));

store.dispatch(MovieAction.setConditionAction({
    page:2
}))

ReactDOM.render(<App />, document.getElementById('root'));

// redux
// 大型项目中使用
// 不是所有的状态数据都需要放到redux中
// action：平面对象，plain object，它描述了数据变化的方式
// reducer：数据变化的具体内容，它需要一个action来触发
// store：存储数据的仓库
