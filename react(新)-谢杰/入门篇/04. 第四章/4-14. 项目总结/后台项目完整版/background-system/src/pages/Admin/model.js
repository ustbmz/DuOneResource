// 请求方法
import AdminController from '@/services/admin';

export default {
  namespace: 'admin',
  state: {
    adminList: [], // 存储所有管理员列表信息
  },
  reducers: {
    initAdminList: (state, { payload }) => {
      const newState = { ...state };
      newState.adminList = payload;
      return newState;
    },
    initAdminInfo: (state, { payload }) => {
      const newObj = { ...state };
      newObj.adminInfo = payload;
      return newObj;
    },
    addAdmin: (state, { payload }) => {
      const newState = { ...state };
      const arr = [...state.adminList];
      arr.push(payload);
      newState.adminList = arr;
      return newState;
    },
    deleteAdmin: (state, { payload }) => {
      const newObj = { ...state };
      const index = newObj.adminList.indexOf(payload);
      const arr = [...state.adminList];
      arr.splice(index, 1);
      newObj.adminList = arr;
      return newObj;
    },
    updateAdmin: (state, { payload }) => {
      const newObj = { ...state };
      const admin = newObj.adminList.find((item) => item._id === payload._id);
      for (let key in payload) {
        if (payload.hasOwnProperty(key)) {
          admin[key] = payload[key];
        }
      }
      return newObj;
    },
  },
  effects: {
    // 初始化管理员列表
    *_initAdminList(_, { put, call }) {
      // 从服务器获取数据
      const { data } = yield call(AdminController.getAdmin);
      // 调用 reducer 方法更新本地仓库
      yield put({ type: 'initAdminList', payload: data });
    },
    // 新增管理员
    *_addAdmin({ payload }, { put, call }) {
      // 和服务器通信，进行新增
      const { data } = yield call(AdminController.addAdmin, payload);
      // 调用 reducer 方法更新本地仓库
      yield put({ type: 'addAdmin', payload: data });
    },
    // 删除管理员
    *_deleteAdmin({ payload }, { put, call }) {
      // 和服务器通信，进行删除
      yield call(AdminController.deleteAdmin, payload._id);
      // 本地仓库也需要同步更新
      yield put({ type: 'deleteAdmin', payload });
    },
    // 修改管理员信息
    *_editAdmin({ payload }, { put, call }) {
      // 和服务器通信，进行修改
      yield call(
        AdminController.editAdmin,
        payload.adminInfo._id,
        payload.newAdminInfo,
      );
      // 从服务器获取该 id 的管理员最新的数据
      const { data } = yield call(
        AdminController.getAdminById,
        payload.adminInfo._id,
      );
      yield put({ type: 'updateAdmin', payload: data });
    },
    // 初始化登录的管理员信息到仓库
    *_initAdminInfo({ payload }, { put }) {
      yield put({ type: 'initAdminInfo', payload });
    },
  },
};
