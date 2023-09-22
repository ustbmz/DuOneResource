const mongoose = require("mongoose");

// 定义对应的 Schema
const issueSchema = new mongoose.Schema(
  {
    id: String, // mongodb 自动生成的 id
    issueTitle: String, // 问题标题
    issueContent: String, // 问题描述
    issuePic: String, // 问题图片
    scanNumber: Number, //	问题浏览量
    commentNumber: Number, //	评论数
    issueStatus: Boolean, //	问题状态
    issueDate: String, //	问题时间
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel", // 关联的模型
    }, //	用户 id
    typeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "typeModel", // 关联的模型
    }, //  所属分类
  },
  {
    versionKey: false,
  }
);

// 通过 Schema 来创建相应的数据模型
// 创建数据模型的方法为 mongoose.model，只传一个名字，代表查找到对应名字的模型
// 如果传入 Schema，代表创建模型 (1) 给模型取一个名字 （2）对应的 Schema （3）对应的集合

mongoose.model("issueModel", issueSchema, "issues");

// 将此模型进行导出
module.exports = mongoose.model("issueModel");
