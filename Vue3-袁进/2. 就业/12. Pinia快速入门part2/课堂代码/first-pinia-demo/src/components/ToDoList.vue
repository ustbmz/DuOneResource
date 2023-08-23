<template>
  <div class="container">
    <div class="input-container">
      <p class="numInput">自己仓库的Getter数据：{{ doubleCounter }}</p>
      <button class="btn" @click="list.counter++">+1</button>
    </div>
    <div class="input-container">
      <p class="numInput">其他仓库的Getter数据：{{ otherCounter }}</p>
    </div>
    <!-- 添加新的待办事项 -->
    <div class="input-container">
      <input type="text" class="numInput" v-model="newItem" />
      <button class="btn" @click="addHandle">添加</button>
    </div>
    <!-- 待办事项列表 -->
    <div class="list">
      <div v-for="(it, index) in list.items" :key="index" class="item">
        <!-- 内容 -->
        <div
          :class="it.isCompleted ? 'del' : ''"
          @click="completeHandle(index)"
        >
          {{ it.text }}
        </div>
        <!-- 删除 -->
        <div class="close" @click="deleteHandle(index)">X</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useListStore } from "@/store/useListStore.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";
// 获取到仓库
const store = useListStore();
// 从仓库解构数据出来
const { list, doubleCounter, otherCounter } = storeToRefs(store);
// 从仓库解构方法出来
const { addItem, completeHandle, deleteItem } = store;

// 和输入框做双向绑定
const newItem = ref("");

// 添加新的待办事项
function addHandle() {
  // 首先拿到用户的输入，添加到状态仓库里面
  // 通过 newItem.value 就可以拿到用户所输入的值
  if (newItem.value) {
    // 添加
    addItem(newItem.value);
    newItem.value = "";
  } else {
    window.alert("请填写新增项目");
  }
}

// 删除待办事项
function deleteHandle(index) {
  if (
    window.confirm(`
        是否要删除当前的项目：\n
        ${list.value.items[index].text} \n
        完成状态：${list.value.items[index].isCompleted ? "已完成" : "未完成"}
    `)
  ) {
    deleteItem(index);
  }
}
</script>

<style scoped>
.container {
  width: 300px;
  /* outline: 1px solid blue; */
  margin: 20px auto;
}
.input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* outline: 1px solid; */
}
.numInput {
  width: 75%;
  height: 30px;
}
.btn {
  width: 20%;
  cursor: pointer;
}
.list {
  margin-top: 20px;
}
.item {
  /* outline: 1px solid; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  font-size: 20px;
  padding: 0 10px;
  box-sizing: border-box;
  cursor: pointer;
}
.close {
  width: 20px;
  height: 20px;
  /* border: 1px solid; */
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  border-radius: 4px;
  background-color: rgb(243, 83, 83);
  color: #fff;
  font-weight: 400;
  cursor: pointer;
}

.del {
  text-decoration: line-through;
}
</style>