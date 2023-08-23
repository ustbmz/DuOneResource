# Pinia部分源码解析

养成阅读源码的习惯，有如下的好处：

- 阅读源码可以帮助我们扩宽自己的视野，可以看到优秀的程序员是如何书写代码的，从而提升我们自己的编码水平
- 知其然知其所以然。如果你阅读过源码，那么你自然能够知道某一个 API 是如何实现，背后的实现原理是什么，那么你也就能够自然的避免在使用该 API 时可能会遇到的一些 bug，会有一些自己独特的优化心得
- 最后一点就是阅读源码能够冲击大厂，大厂在面试的时候不会考察某个 API 如何使用，没什么意义，因为 API 经常也在变化，一般都是考察 API 背后的原理



阅读源码时的一些注意事项

- 阅读源码基于你已经使用过了该库或者该框架，对里面的 API 已经很熟悉了，是一种自发的行为
- 阅读源码一定要**耐心**
- 不要**陷入于细节**，在阅读源码的时候往往需要你站在一个更高的角度



## defineStore 方法

回顾 defineStore 方法的使用。defineStore 方法支持两种变成风格，一种是 option store，另一种是 setup store

option store 风格：

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

option store 风格可以将 id 写到选项里面：

```js
export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

setup store 风格：

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

defineStore 对应的源码如下：

```js
function defineStore(
// TODO: add proper types from above
idOrOptions, setup, setupOptions) {
    let id;
    let options;
    // isSetupStore 会是一个布尔值，如果是 setup 函数，isSetupStore 为 true，否则为 false
    const isSetupStore = typeof setup === 'function';
    if (typeof idOrOptions === 'string') {
        // 如果进入此 if，说明 idOrOptions 是该仓库的 id
        // id 是 defineStore 函数内部的变量，存储仓库 id
        id = idOrOptions;
        // the option store setup will contain the actual options in this case
        // 如果是 setup 风格，就将第三个参数（如果有）赋值给 options，否则就将配置对象赋值给 options
        options = isSetupStore ? setupOptions : setup;
    }
    else {
        // idOrOptions 参数为配置对象
        options = idOrOptions;
        id = idOrOptions.id;
    }
    // 这个函数就是最终返回给外部的函数
    // 外部通过执行这个函数拿到 store 仓库 
    function useStore(pinia, hot) {
        const currentInstance = getCurrentInstance();
        pinia =
            // in test mode, ignore the argument provided as we can always retrieve a
            // pinia instance with getActivePinia()
            (pinia) ||
                (currentInstance && inject(piniaSymbol, null));
        if (pinia)
            setActivePinia(pinia);
        if (!activePinia) {
            throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?\n` +
                `\tconst pinia = createPinia()\n` +
                `\tapp.use(pinia)\n` +
                `This will fail in production.`);
        }
        pinia = activePinia;
        if (!pinia._s.has(id)) {
            // creating the store registers it in `pinia._s`
            // 创建一个仓库，并且将这个仓库注册到 pinia._s
            // 根据不同的风格开始创建仓库
            if (isSetupStore) {
                // 如果是 setup 风格，调用的是 createSetupStore
                createSetupStore(id, setup, options, pinia);
            }
            else {
                // 如果是 option 风格，调用的是 createOptionsStore
                // createOptionsStore 方法背后实际上也是在调用 createSetupStore，内部会创建一个名为 setup 的函数
                // 将选项转为 setup 函数内部的项目，然后调用 createSetupStore 方法，将 setup 函数作为第二个参数传递过去
                // 因此理论上来讲，setup 实践上要更加高效一些，因为 option store 背后也是转为 setup，这些是你不阅读源码无法知道的
                createOptionsStore(id, options, pinia);
            }
            /* istanbul ignore else */
            {
                // @ts-expect-error: not the right inferred type
                useStore._pinia = pinia;
            }
        }
        const store = pinia._s.get(id);
        if (hot) {
            const hotId = '__hot:' + id;
            const newStore = isSetupStore
                ? createSetupStore(hotId, setup, options, pinia, true)
                : createOptionsStore(hotId, assign({}, options), pinia, true);
            hot._hotUpdate(newStore);
            // cleanup the state properties and the store from the cache
            delete pinia.state.value[hotId];
            pinia._s.delete(hotId);
        }
        // save stores in instances to access them devtools
        if (IS_CLIENT &&
            currentInstance &&
            currentInstance.proxy &&
            // avoid adding stores that are just built for hot module replacement
            !hot) {
            const vm = currentInstance.proxy;
            const cache = '_pStores' in vm ? vm._pStores : (vm._pStores = {});
            cache[id] = store;
        }
        // StoreGeneric cannot be casted towards Store
        return store;
    }
    useStore.$id = id; // 在 useStore 函数上面还挂了一个 $id，存储了该仓库的 id
    return useStore; // 在向外部返回这个函数
}
```



## storeToRefs 方法

首先我们还是回顾该方法的用法：

```vue
<script setup>
import { storeToRefs } from 'pinia'
const store = useCounterStore()
const { name, doubleCount } = storeToRefs(store)
const { increment } = store
</script>
```

源码如下：

```js
function storeToRefs(store) {
    // See https://github.com/vuejs/pinia/issues/852
    // It's easier to just use toRefs() even if it includes more stuff
    // 针对 Vue2 版本的处理
    if (isVue2) {
        // @ts-expect-error: toRefs include methods and others
        return toRefs(store);
    }
    else {
        store = toRaw(store);
        // 创建了一个空对象
        const refs = {};
        // 遍历仓库对象
        for (const key in store) {
            // 拿到仓库对象对应的每一项的值
            const value = store[key];
            if (isRef(value) || isReactive(value)) {
                // @ts-expect-error: the key is state or getter
                // 如果这个值本身是响应式的，将这个值以原本的 key 添加到 refs 对象上面
                refs[key] =
                    // ---
                    toRef(store, key);
            }
        }
        // 整个 for 循环完了之后，所有响应式的值被添加到了 refs 对象上面
        // 向外部返回这个 refs 对象
        return refs;
    }
}
```

