// 请求方法
import TypeController from '@/services/type';

export default {
  namespace: 'type',
  state: {
    typeList: [],
  },
  reducers: {
    initTypeList: (state, { payload }) => {
      const newObj = { ...state };
      newObj.typeList = payload;
      return newObj;
    },
    addType: (state, { payload }) => {
      const newObj = { ...state };
      const arr = [...state.typeList];
      arr.push(payload);
      newObj.typeList = arr;
      return newObj;
    },
    deleteType: (state, { payload }) => {
      const newObj = { ...state };
      const index = newObj.typeList.indexOf(payload);
      const arr = [...state.typeList];
      arr.splice(index, 1);
      newObj.typeList = arr;
      return newObj;
    },
  },
  effects: {
    // 初始化管理员列表
    *_initTypeList(_, { put, call }) {
      // 从服务器获取数据
      const { data } = yield call(TypeController.getType);
      // 调用 reducer 方法更新本地仓库
      yield put({ type: 'initTypeList', payload: data });
    },
    // 新增类型
    *_addType({ payload }, { put, call }) {
      // 和服务器通信，进行新增
      const { data } = yield call(TypeController.addType, payload);
      // 调用 reducer 方法更新本地仓库
      yield put({ type: 'addType', payload: data });
    },
    // 删除类型
    *_deleteType({ payload }, { put, call }) {
      // 和服务器通信，进行删除
      yield call(TypeController.deleteType, payload._id);
      // 本地仓库也需要同步更新
      yield put({ type: 'deleteType', payload });
    },
  },
};
