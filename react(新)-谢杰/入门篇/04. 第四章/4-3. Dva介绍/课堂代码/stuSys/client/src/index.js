import dva from 'dva';
import './index.css';
import { createBrowserHistory as createHistory } from "history";

// 1. Initialize
// 在 dva 中，前端路由默认是 hash 模式
// 如果要修改为 history 模式，需要在创建 dva 应用时进行配置
const app = dva({
    history : createHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
// 在应用上面挂在我们的 model
app.model(require('./models/stuModel').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
