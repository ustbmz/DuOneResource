const mongoose = require("mongoose");

// 定义对应的 Schema
const interviewSchema = new mongoose.Schema(
  {
    id: String, // mongodb 自动生成的 id
    interviewTitle: String, // 面试题标题
    interviewContent: String, // 面试题内容
    onShelfDate: String, // 上架日期
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

mongoose.model("interviewModel", interviewSchema, "interviews");

// 将此模型进行导出
module.exports = mongoose.model("interviewModel");
