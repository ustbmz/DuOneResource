<template>
  <div class="app-container">
    <div class="block">关于我</div>
    <el-input
      v-model="url"
      placeholder="请输入内容"
      :disabled="isDisabled"
    ></el-input>
    <el-button type="primary" style="margin-top: 15px" @click="clickHandle">{{btnContent}}</el-button>
  </div>
</template>

<script>
import { getAbout, editAbout } from "@/api/about.js";
export default {
  data() {
    return {
      url: "",
      isDisabled: true,
      btnContent : '编辑'
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getAbout().then(({ data }) => {
        this.url = data;
      });
    },
    clickHandle(){
        if(this.btnContent == '编辑'){
            // 用户要编辑内容
            this.btnContent = '完成';
            this.isDisabled = !this.isDisabled;
        } else {
            // 用户编辑完成了，要更新内容
            if(this.url){
                this.btnContent = '编辑';
                this.isDisabled = !this.isDisabled;
                editAbout({url : this.url}).then(res=>{
                    console.log(res,'cvdf');
                })
                this.$message({
                    message: '更改成功',
                    type: 'success'
                });
            } else {
                this.$message({
                    message: '输入框不能为空',
                    type: 'warning'
                });
            }
        }
    }
  },
};
</script>

<style scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
}
</style>