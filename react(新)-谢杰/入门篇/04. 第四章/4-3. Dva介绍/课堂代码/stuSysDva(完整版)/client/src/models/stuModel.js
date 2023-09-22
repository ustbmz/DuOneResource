import {
  getStuListApi,
  deleteStuApi,
  addStuApi,
  editStuByIdApi,
} from "../services/stu";

export default {
  namespace: "stuModel",
  state: {
    stuList: [],
  },
  effects: {
    *_getStuList(_, { call, put }) {
      const { data } = yield call(getStuListApi);
      yield put({
        type: "initStuList",
        data,
      });
    },
    *_deleteStuById({ data }, { call, put }) {
      // 远端删除
      yield call(deleteStuApi, data.id);
      // 更新本地仓库
      yield put({
        type: "deleteStu",
        data,
      });
    },
    *_addStu({ data }, { call, put }) {
      // 远端新增
      const result = yield call(addStuApi, data);
      // 更新本地仓库
      yield put({
        type: "addStu",
        data: result.data,
      });
    },
    *_editStu({ data }, { call, put }) {
      // 远端新增
      const result = yield call(editStuByIdApi, data);
      // 更新本地仓库
      yield put({
        type: "editStu",
        data: result.data,
      });
    },
  },
  reducers: {
    initStuList(state, action) {
      let obj = { ...state };
      obj.stuList = [...action.data];
      return obj;
    },
    deleteStu(state, action) {
      let obj = { ...state };
      for (let i = 0; i < obj.stuList.length; i++) {
        if (obj.stuList[i].id === ~~action.data.id) {
          obj.stuList.splice(i, 1);
          break;
        }
      }
      return obj;
    },
    addStu(state, action) {
      let obj = { ...state };
      obj.stuList.push(action.data);
      return obj;
    },
    editStu(state, action){
      let obj = { ...state };
      for (let i = 0; i < obj.stuList.length; i++) {
        if (obj.stuList[i].id === ~~action.data.id) {
          obj.stuList.splice(i, 1, action.data);
          break;
        }
      }
      return obj;
    }
  },
};
