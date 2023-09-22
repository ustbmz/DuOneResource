import AdminController from "@/services/admin";

export default {
    // 命名空间
    namespace: 'admin',
    // 仓库数据
    state : {
        adminList : [], // 存储所有的管理员信息
        adminInfo : null, // 存储当前登录的管理员信息
    },
    // 同步更新仓库状态数据
    reducers : {
        initAdminList(state, {payload}){
            const newState = {...state};
            newState.adminList = payload;
            return newState;
        }
    }, 
    // 处理异步副作用
    effects : {
        *_initAdminList(_, {put, call}){
            // 和服务器进行通信，拿到所有的数据
            const { data } = yield call(AdminController.getAdmin);
            // 调用 reducer 更新本地仓库
            yield put({
                type : "initAdminList",
                payload : data
            });
        }
    }
}