<template>
  <div class="user-name">
    <span>loading...</span>
    <span>当前登录用户</span>
    <a href="">退出</a>
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.user-name {
  display: inline-block;
}
.user-name a,
.user-name span {
  margin-right: 15px;
}
</style>
