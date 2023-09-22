import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 引入仓库
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));

function render(){
    root.render(
        <App store={store}/>
    );
}
render();


// 让 redux 和 react 建立关联
// subscribe 叫做订阅，在仓库的状态发生改变的时候
store.subscribe(render);
