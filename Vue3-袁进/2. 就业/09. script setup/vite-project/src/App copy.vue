<template>
  <div class="container">
    <Carousel ref="compRef" :imgs="datas" @change="handleChange"></Carousel>
    <div class="current">
      <button
        class="btn"
        @click="change(currentIndex - 1)"
        :disabled="currentIndex === 0"
      >
        左
      </button>
      {{ currentIndex }}
      <button
        class="btn"
        @click="change(currentIndex + 1)"
        :disabled="currentIndex === datas.length - 1"
      >
        右
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Carousel from './components/Carousel.vue';
export default {
  components: {
    Carousel,
  },
  setup() {
    const currentIndex = ref(0);
    const datas = [
      new URL(`./assets/Wallpaper1.jpg`, import.meta.url),
      new URL(`./assets/Wallpaper2.jpg`, import.meta.url),
      new URL(`./assets/Wallpaper3.jpg`, import.meta.url),
      new URL(`./assets/Wallpaper4.jpg`, import.meta.url),
    ];
    const compRef = ref(null);
    function handleChange(newIndex) {
      currentIndex.value = newIndex;
    }
    function change(i) {
      if (compRef.value) {
        compRef.value.switchTo(i);
      }
    }
    return {
      currentIndex,
      datas,
      handleChange,
      compRef,
      change,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.current {
  display: flex;
  column-gap: 10px;
  margin-top: 30px;
  align-items: center;
}
.btn {
  border: none;
  outline: none;
  background: #409eff;
  color: #fff;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
  transition: 0.1s;
  font-weight: 500;
  user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.btn:hover {
  background: #66b1ff;
}
.btn:active {
  background: #3a8ee6;
}
.btn:disabled {
  background: #66b1ff80;
  cursor: not-allowed;
}
</style>
