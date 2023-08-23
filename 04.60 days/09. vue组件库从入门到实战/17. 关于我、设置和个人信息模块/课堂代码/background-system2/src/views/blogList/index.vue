<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + (currentPage - 1) * eachPage + 1 }}</template>
      </el-table-column>

      <el-table-column prop="title" label="文章名称" width="150" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="博客预览图"
            width="230"
            trigger="hover"
          >
            <el-image
              style="width: 200px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcList"
            ></el-image>
            <a
              href="#"
              target="_blank"
              @click.prevent="goToTitleHandle(scope.row)"
              slot="reference"
              >{{ scope.row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="文章描述" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>

      <el-table-column prop="title" label="浏览数" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.scanNumber }}</template>
      </el-table-column>

      <el-table-column prop="title" label="评论量" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.commentNumber }}</template>
      </el-table-column>

      <el-table-column prop="title" label="所属分类" width="150" align="center">
        <template slot-scope="scope">{{ 
          scope.row.category === null ? '未分类' : scope.row.category.name
        }}</template>
      </el-table-column>

      <el-table-column prop="title" label="创建日期" width="230" align="center">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
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
              @click="editBlogHandle(scope.row)"
            ></el-button>
          </el-tooltip>

          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteBlog(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      style="margin-top: 30px"
      background
      :page-size="eachPage"
      :page-sizes="[5, 10, 20]"
      layout="prev, pager, next, total, ->, sizes, jumper"
      :total="count"
       :current-page.sync="pagerCurrentPage"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      @prev-click="prevClickHandle"
      @next-click="nextClickHandle"
    >
    </el-pagination>
  </div>
</template>

<script>
import { findBlog, delOneBlog } from "@/api/blog.js";
import { formatDate } from "@/utils/tools.js";
import { server_URL, frontEnd_URL } from "@/urlConfig.js";
export default {
  data() {
    return {
      data: [], // 存储数据详情
      srcList: [], // 预览图链接数组
      eachPage: 5, // 每一页显示的条数
      currentPage: 1, // 当前页码，默认进来是第一页
      totalPage: 0, // 总页数
      count: 0, // 数据总条数
      pagerCurrentPage: 1, // 分页栏当前页码
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      findBlog(this.currentPage, this.eachPage).then(({ data }) => {
        this.data = data.rows;
        for (var i of this.data) {
          i.createDate = formatDate(i.createDate);
          // i.thumb = server_URL + i.thumb;
          this.srcList.push(i.thumb);
        }
        this.count = data.total;
        this.totalPage = Math.ceil(this.count / this.eachPage);
        // 下面的 if 会在删除文章的时候可能会触发，例如最后一页只有一条数据
        // 删除之后，总页码数就会减一，当前页码数就大于了总页码数，所以要做处理
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    // 跳转到具体的文章
    goToTitleHandle(blogInfo) {
      window.open(`${frontEnd_URL}/article/${blogInfo.id}`);
    },
    // 删除文章
    deleteBlog(blogInfo) {
      this.$confirm(
        "删除该文章会将该文章下面的评论一并删除，是否继续?",
        "是否删除此篇文章",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          delOneBlog(blogInfo.id).then(() => {
            this.fetchData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 编辑文章
    editBlogHandle(blogInfo){
      this.$router.push(`/editBlog/${blogInfo.id}`)
    },
    // 分页相关事件
    sizeChangeHandle(pagerNum) {
        this.eachPage = parseInt(pagerNum);
        this.currentPage = 1;
        this.pagerCurrentPage = 1;
        this.fetchData();
    },
    currentChangeHandle(pageNum) {
        this.currentPage = parseInt(pageNum);
        this.fetchData();
    },
    prevClickHandle() {
        this.currentPage -= 1;
    },
    nextClickHandle() {
        this.currentPage += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>