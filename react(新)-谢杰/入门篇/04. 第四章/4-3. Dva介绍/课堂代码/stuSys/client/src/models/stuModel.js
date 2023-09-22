import {getStuListApi} from "../services/stuApi";

export default {
  namespace: "stuModel",
  // 仓库数据
  state: {
    stuList: [],
  },
  // 副作用
  effects: {
    // 从服务器获取学生数据
    // call 用来发送请求，put 用于同步更新本地仓库数据
    *_getStuList(_, { call, put }) {
        // 从服务器拿到数据
      const {data} = yield call(getStuListApi);
      // 将数据同步到本地的状态仓库
      yield put({
        type : "initStuList",
        data
      })
    },
  },
  // reducer，同步更新本地的仓库
  reducers: {
    initStuList(state, action){
       let obj = {...state};
       obj.stuList = [...action.data];
       return obj;
    }
  },
};
