<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="data"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">{{
          scope.$index + (currentPage - 1) * eachPage + 1
        }}</template>
      </el-table-column>
      <el-table-column label="头像" align="center" width="80">
        <template slot-scope="scope">
           <el-avatar shape="square" size="small" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center" width="150">
        <template slot-scope="scope">{{ scope.row.nickname }}</template>
      </el-table-column>
      <el-table-column label="内容" align="center">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>
      <el-table-column label="创建日期" align="center" width="230">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="160"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="1500"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteMessage(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        style="margin-top: 30px"
        background
        :page-size="eachPage"
        :page-sizes="[5, 10, 15, 20]"
        layout="prev, pager, next, total, ->,sizes, jumper"
        :total="count"
        :current-page.sync="pagerCurrentPage"
        @prev-click="prevClickHandle"
        @next-click="nextClickHandle"
        @current-change="currentChangeHandle"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getMessages, delMessage } from "@/api/message.js";
import { formatDate } from "@/utils/tools";
export default {
  data() {
    return {
      listLoading: false,
      currentPage: 1, // 当前页码
      eachPage: 5, // 每页显示条数
      totalPage: 0, // 总页数
      count: 0, // 数据总条数
      data: [], // 数据详情
      pagerCurrentPage: 1, // 分页栏当前页码
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getMessages(this.currentPage, this.eachPage).then(({ data }) => {
        this.data = data.rows;
        for(let i of this.data){
          i.createDate = formatDate(i.createDate);
        }
        this.count = data.total;
        this.totalPage = Math.ceil(this.count / this.eachPage);
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    // 删除留言
    deleteMessage({ id }) {
      this.$confirm("是否删除此条留言信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          delMessage(id).then((res) => {
            console.log(res);
            this.fetchData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 点击上一页，下一页，不用重新发送请求
    // 因为当前页码改变会触发 currentChangeHandle 事件，然后就会自动发送请求了
    // 点击上一页
    prevClickHandle() {
      this.currentPage -= 1;
    },
    // 点击下一页
    nextClickHandle() {
      this.currentPage += 1;
    },
    // 点击页码
    currentChangeHandle(pageNum) {
      this.currentPage = ~~pageNum;
      this.fetchData();
    },
    // 改变每页显示条数
    handleSizeChange(pagerNum) {
      this.currentPage = 1;
      this.pagerCurrentPage = 1; // 将分页组件重新回到第一页
      this.eachPage = ~~pagerNum;
      this.fetchData();
    },
  },
};
</script>

<style scoped>

</style>