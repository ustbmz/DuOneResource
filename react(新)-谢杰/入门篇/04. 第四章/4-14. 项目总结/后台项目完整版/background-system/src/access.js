export default (initialState) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://next.umijs.org/docs/max/access
console.log(initialState,"initialState");
  if (initialState) {
    return {
      SuperAdmin: initialState.adminInfo.permission === 1,
      NormalAdmin:
        initialState.adminInfo.permission === 1 ||
        initialState.adminInfo.permission === 2,
    };
  } else {
    return {
      SuperAdmin: false,
      NormalAdmin: false,
    };
  }
};
