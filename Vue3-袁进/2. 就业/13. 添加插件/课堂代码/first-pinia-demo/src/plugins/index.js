// 插件
function deepClone(obj) {
  // 如果传入的参数不是对象，则直接返回该参数
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  // 根据传入的参数是数组还是对象来初始化新的变量
  const newObj = Array.isArray(obj) ? [] : {};
  // 递归遍历原始对象并复制属性和值到新对象中
  for (const key in obj) {
    newObj[key] = deepClone(obj[key]);
  }
  // 返回新对象
  return newObj;
}

export function myPiniaPlugin1() {
  // 给所有的仓库添加了一条全局属性
  return {
    secret: "the cake is a lie",
  };
}

export function myPiniaPlugin2(context) {
  //   console.log(context);
  const { store } = context;
  store.test = "this is a test";
}

/**
 * 给特定的仓库来扩展内容
 * @param {*} param0
 */
export function myPiniaPlugin3({ store }) {
  if (store.$id === "counter") {
    // 为当前 id 为 counter 的仓库来扩展属性
    return {
      name: "my name is pinia",
    };
  }
}

/**
 * 重置仓库状态
 */
export function myPiniaPlugin4({ store }) {
  // 我们首先可以将初始状态深拷贝一份
  const state = deepClone(store.$state);
  store.reset = () => {
    store.$patch(deepClone(state));
  };
}
