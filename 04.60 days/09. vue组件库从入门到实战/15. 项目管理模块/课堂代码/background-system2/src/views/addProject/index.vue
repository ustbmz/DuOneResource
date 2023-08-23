<template>
  <div class="app-container">
    <!-- 项目名称 -->
    <div class="block">项目名称</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.name" placeholder="请输入项目的名称"></el-input>
    </div>

    <!-- 项目描述（每一项描述以英文逗号分割） -->
    <div class="block">项目描述（每一项描述以英文逗号分割）</div>
    <div style="margin-bottom: 15px">
      <el-input
        v-model="form.description"
        placeholder="请输入项目的描述，每一项描述以英文逗号分割"
      ></el-input>
    </div>

    <!-- 项目链接 -->
    <div class="block">项目链接</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.url" placeholder="请输入项目的链接"></el-input>
    </div>

    <!-- github 地址 -->
    <div class="block">github 地址</div>
    <div style="margin-bottom: 15px">
      <el-input
        v-model="form.github"
        placeholder="请输入项目的 github 地址"
      ></el-input>
    </div>

    <!-- 预览图 -->
    <div style="margin-bottom: 15px">
      <Upload uploadTitle="项目预览图地址" v-model="form.thumb" />
    </div>

    <!-- 项目等级 -->
    <div class="block">项目等级</div>
    <div style="margin-bottom: 15px">
      <el-select v-model="form.order" placeholder="分类等级">
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
      </el-select>
    </div>

    <el-button type="primary" plain @click="addProjectHandle"
      >发布项目</el-button
    >
  </div>
</template>

<script>
import Upload from "@/components/Upload.vue";
import {addProject} from '@/api/project.js'
export default {
  data() {
    return {
      form: {
        name: "",
        description: "",
        url: "",
        github: "",
        thumb: "",
        order: 1,
      },
    };
  },
  components: {
    Upload,
  },
  methods: {
    addProjectHandle(){
        let obj = {...this.form};
        obj.description = obj.description.split(',');
        obj.order = parseInt(obj.order);
        addProject(obj).then(()=>{
            this.$router.push('/projectsList');
            this.$message.success('添加项目成功');
        })

    }
  },
};
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
}
</style>