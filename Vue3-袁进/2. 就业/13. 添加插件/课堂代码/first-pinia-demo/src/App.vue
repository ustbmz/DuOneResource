<template>
  <div class="container">
    <h1>Pinia 演示案例</h1>
    <div class="linkContainer">
      <router-link to="/counter">计数器</router-link>
      <router-link to="/todolist">待办事项</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
</script>

<style scoped>
.container > h1 {
  font-weight: 200;
  text-align: center;
}
.linkContainer {
  text-align: center;
}
a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
  margin: 0 40px;
}
a:hover {
  color: #535bf2;
}
</style>
