const mongoose = require("mongoose");

// 定义对应的 Schema
const commentSchema = new mongoose.Schema(
  {
    id: String, // mongodb 自动生成的 id
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel", // 关联的模型
    }, //  所属分类
    issueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "issueModel", // 关联的模型
    }, //  所属分类
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bookModel", // 关联的模型
    }, //  所属分类
    typeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "typeModel", // 关联的模型
    }, //  所属分类
    commentContent: String, // 对应评论
    commentDate: String, // 评论日期
    commentType: Number, // 评论类型
  },
  {
    versionKey: false,
  }
);

// 通过 Schema 来创建相应的数据模型
// 创建数据模型的方法为 mongoose.model，只传一个名字，代表查找到对应名字的模型
// 如果传入 Schema，代表创建模型 (1) 给模型取一个名字 （2）对应的 Schema （3）对应的集合

mongoose.model("commentModel", commentSchema, "comments");

// 将此模型进行导出
module.exports = mongoose.model("commentModel");
