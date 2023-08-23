<template>
  <div class="container">
    <!-- 第一组 -->
    <p class="group-title">普通增加</p>
    <div class="btn-group">
      <button class="btn" @click="num--">-</button>
      <!-- 这里我们希望这个数据来源于状态仓库 -->
      <div class="num">{{ num }}</div>
      <button class="btn" @click="increment">+</button>
    </div>

    <!-- 第二组 -->
    <p class="group-title">Getters数据</p>
    <div class="btn-group">
      <button class="btn" @click="num--">-</button>
      <!-- 这里我们希望这个数据来源于状态仓库 -->
      <div class="num">{{ doubleCount }}</div>
      <button class="btn" @click="increment">+</button>
    </div>

    <!-- 第三组 -->
    <p class="group-title">异步的增加</p>
    <div class="btn-group">
      <button class="btn" @click="asyncDecrement">-</button>
      <!-- 这里我们希望这个数据来源于状态仓库 -->
      <div class="num">{{ num }}</div>
      <button class="btn" @click="asyncIncrement">+</button>
    </div>

    <!-- 第四组 -->
    <p class="group-title">store.$reset方法</p>
    <div class="btn-group">
      <button class="btn" @click="store.$reset">重置</button>
    </div>

    <!-- 第五组 -->
    <p class="group-title">store.$patch方法</p>
    <div class="btn-group">
      <input type="text" class="numInput" v-model="newnum">
      <button class="btn" @click="setHandle">设置</button>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/store/useCounterStore.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";

// 这个数据和输入框做双向绑定
const newnum = ref("");

const store = useCounterStore(); // 拿到仓库
// 检验插件添加上去的全局属性是否已经成功添加上去
console.log("Counter>>>",store.secret);
console.log("Counter>>>",store.test);
console.log("Counter>>>",store.name);


// 接下来我们可以从仓库中解构数据出来
const { num, doubleCount } = storeToRefs(store);
// 从仓库将方法解构出来
const { increment, asyncIncrement, asyncDecrement } = store;

function setHandle(){
  // 拿到用户在输入框输入的值，设置为仓库的值
  store.$patch({
    num : ~~newnum.value
  });
  newnum.value = "";
}
</script>

<style scoped>
.container > .btn-group {
  /* outline: 1px solid red; */
  width: 280px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.num {
  font-size: 32px;
  font-weight: 300;
}
.btn {
  height: 30px;
  outline: none;
  font-size: 16px;
  font-weight: 100;
  cursor: pointer;
  padding: 0 10px;
}

.numInput {
  width: 200px;
  height: 30px;
  margin-right: 10px;
}

.group-title {
  text-align: center;
  margin-bottom: 0;
  font-weight: 200;
  font-size: 20px;
}
</style>