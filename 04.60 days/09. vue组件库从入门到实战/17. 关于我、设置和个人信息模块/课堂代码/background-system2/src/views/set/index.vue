<template>
  <div class="app-container">
    <div class="block">网站信息</div>
    <div class="block2">网站标题</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.siteTitle" disabled></el-input>
    </div>
    <div class="block2">邮箱</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.mail" disabled></el-input>
    </div>
    <div class="block2">备案号</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.icp" disabled></el-input>
    </div>
    <el-divider></el-divider>
    <div class="block">网站头像信息</div>
    <div style="margin-bottom: 15px">
      <el-image
        style="width: 100px; height: 100px"
        :src="form.avatar"
      ></el-image>
    </div>
    <el-divider></el-divider>
    <div class="block">网址图标信息</div>
    <div class="block2">网址图标地址</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input
        v-model="form.favicon"
        placeholder="请输入图片地址"
        disabled
      ></el-input>
    </div>
    <div class="block2">网址图标预览</div>
    <div style="margin-bottom: 15px">
      <el-image
        style="width: 50px; height: 50px"
        :src="form.favicon"
      ></el-image>
    </div>
    <el-divider></el-divider>
    <div class="block">github 信息</div>
    <div class="block2">github 名字</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.githubName" disabled></el-input>
    </div>
    <div class="block2">github 地址</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.github" disabled></el-input>
    </div>
    <el-divider></el-divider>
    <div class="block">QQ 信息</div>
    <div class="block2">QQ 号码</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.qq" disabled></el-input>
    </div>
    <div class="block2">QQ 二维码图片预览</div>
    <div style="margin-bottom: 15px">
      <el-image
        style="width: 100px; height: 100px"
        :src="form.qqQrCode"
      ></el-image>
    </div>
    <el-divider></el-divider>
    <div class="block">微信信息</div>
    <div class="block2">微信号</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.weixin" disabled></el-input>
    </div>
    <div class="block2">微信二维码图片预览</div>
    <div style="margin-bottom: 15px">
      <el-image
        style="width: 100px; height: 100px"
        :src="form.weixinQrCode"
      ></el-image>
    </div>
    <el-divider></el-divider>
    <el-button type="primary" @click="openEditPanel">进入编辑模式</el-button>

    <!-- 弹出层 -->
    <el-dialog
      title="请编辑信息"
      :visible.sync="dialogFormVisible"
      width="50%"
      top="5vh"
      fullscreen
    >
      <el-form :model="form">
        <el-form-item label="网站标题">
          <el-input v-model="form2.siteTitle"></el-input>
        </el-form-item>
         <el-form-item label="邮箱">
          <el-input v-model="form2.mail"></el-input>
        </el-form-item>
         <el-form-item label="备案号">
          <el-input v-model="form2.icp"></el-input>
        </el-form-item>
         <el-form-item label="网站头像地址">
          <!-- <el-input v-model="form2.avatar"></el-input> -->
          <Upload v-model="form2.avatar"/>
        </el-form-item>
         <el-form-item label="网站图标地址">
          <el-input v-model="form2.favicon"></el-input>
        </el-form-item>
         <el-form-item label="github 名字">
          <el-input v-model="form2.githubName"></el-input>
        </el-form-item>
         <el-form-item label="github 地址">
          <el-input v-model="form2.github"></el-input>
        </el-form-item>
         <el-form-item label="QQ 号码">
          <el-input v-model="form2.qq"></el-input>
        </el-form-item>
         <el-form-item label="QQ 二维码图片地址">
          <!-- <el-input v-model="form2.qqQrCode"></el-input> -->
          <Upload v-model="form2.qqQrCode"/>
        </el-form-item>
         <el-form-item label="微信号">
          <el-input v-model="form2.weixin"></el-input>
        </el-form-item>
         <el-form-item label="微信二维码图片地址">
          <!-- <el-input v-model="form2.weixinQrCode"></el-input> -->
          <Upload v-model="form2.weixinQrCode"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditSetting">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSetting, setSetting } from "@/api/setting.js";
import Upload from '@/components/Upload.vue'
import { server_URL } from '@/urlConfig.js'
export default {
  data() {
    return {
      form: {
        avatar: "",
        favicon: "",
        github: "",
        githubName: "",
        icp: "",
        id: "",
        mail: "",
        qq: "",
        qqQrCode: "",
        siteTitle: "",
        weixin: "",
        weixinQrCode: "",
      },
      form2 : {
        avatar: "",
        favicon: "",
        github: "",
        githubName: "",
        icp: "",
        id: "",
        mail: "",
        qq: "",
        qqQrCode: "",
        siteTitle: "",
        weixin: "",
        weixinQrCode: "",
      },
      dialogFormVisible : false
    };
  },
  components : {
    Upload
  },
  created() {
    this.fetchData(); // 获取数据
  },
  methods: {
    fetchData() {
      getSetting().then(res=>{
        this.form = res.data;
        // 处理图片的链接
        // this.form.avatar2 = server_URL  + this.form.avatar;
        // this.form.qqQrCode2 = server_URL  + this.form.qqQrCode;
        // this.form.weixinQrCode2 = server_URL  + this.form.weixinQrCode;
        this.form2 = {...this.form};
      })
    },
    openEditPanel(){
      this.dialogFormVisible = true;
    },
    confirmEditSetting(){
      setSetting(this.form2).then(()=>{
        this.dialogFormVisible = false;
        this.fetchData();
        this.$message.success('修改成功！');
      })
    }
  },
};
</script>

<style scoped>
.block {
  margin: 15px 0;
  font-size: 20px;
  font-weight: 100;
}
.block2 {
  margin: 15px 0;
  font-size: 14px;
  font-weight: 100;
}
</style>