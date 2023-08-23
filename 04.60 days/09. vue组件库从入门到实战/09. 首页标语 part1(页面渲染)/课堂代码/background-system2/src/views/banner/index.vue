<template>
  <div class="app-container">
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column prop="description" label="描述">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column label="中图预览" align="center">
        <template slot-scope="scope">
            <el-image
                style="width: 100px;"
                :src="scope.row.midImg2"
                fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="大图预览" align="center">
        <template slot-scope="scope">
             <el-image
                style="width: 100px;"
                :src="scope.row.bigImg2"
                fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import { getBanner } from "@/api/banner.js";
import { server_URL } from '@/urlConfig.js';
export default {
  data() {
    return {
      data: [], // 存储数据
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getBanner().then((res) => {
        this.data = res.data;
        for(var item of this.data){
            item.midImg2 = server_URL + item.midImg;
            item.bigImg2 = server_URL + item.bigImg;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>