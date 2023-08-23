<template>
  <div v-show="imgs.length" class="carousel">
    <div
      class="imgs"
      :style="{
        transform: `translateX(-${index}00%)`,
      }"
    >
      <img v-for="(item, i) in imgs" :key="i" :src="item" alt="" />
    </div>
    <div class="indicators">
      <span
        v-for="(item, i) in imgs"
        :key="i"
        :class="{
          active: i === index,
        }"
        @click="switchTo(i)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  imgs: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(['change']);
const index = ref(0);
function switchTo(i) {
  if (i < 0) {
    i = 0;
  } else if (i > props.imgs.length - 1) {
    i = props.imgs.length - 1;
  }
  if (i === index.value) {
    return;
  }
  index.value = i;
  emit('change', i);
}
</script>

<style scoped>
.carousel {
  width: 500px;
  height: 300px;
  overflow: hidden;
  position: relative;
}
.imgs {
  width: 100%;
  height: 100%;
  display: flex;
  transition: 0.3s;
}
.imgs img {
  width: 100%;
  height: 100%;
}

.indicators {
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  display: flex;
  column-gap: 7px;
}
.indicators span {
  width: 10px;
  height: 10px;
  background: #aaa;
  border-radius: 50%;
  cursor: pointer;
}
.indicators span.active {
  background: #fff;
}
</style>
