export default (initialState) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://next.umijs.org/docs/max/access

  // initialState 是自动传入的，对应的是在 getInitialState 方法中返回的全局初始化值
  console.log(initialState, 'initialState');

  // 在该函数中，我们需要返回一个对象，对象里面对应一个一个权限项目，每个权限项目对应的值是一个布尔值
  // true 代表有权限 false 代表没有权限

  // 假设现在是超管登录 adminInfo.permission ---> 1
  // { SuperAdmin : true, NormalAdmin : true}
  // 假设现在登录的是普通管理员 adminInfo.permission ---> 2
  // { SuperAdmin : false, NormalAdmin : true}

  if (initialState) {
    return {
      SuperAdmin: initialState.adminInfo.permission === 1,
      NormalAdmin:
        initialState.adminInfo.permission === 1 ||
        initialState.adminInfo.permission === 2,
    };
  } else {
    return {
      SuperAdmin : false, 
      NormalAdmin : false
    }
  }

  // const canSeeAdmin = !!(
  //   initialState && initialState.name !== 'dontHaveAccess'
  // );
  // return {
  //   canSeeAdmin,
  // };
};
