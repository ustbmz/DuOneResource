const mongoose = require("mongoose");

// 定义对应的 Schema
const bookSchema = new mongoose.Schema(
  {
    id: String, // mongodb 自动生成的 id
    bookTitle: String, // 书籍标题
    bookPic: String, // 书籍图片
    downloadLink: String, // 下载链接
    bookIntro: String, // 书籍介绍
    scanNumber: Number, // 浏览数
    commentNumber: Number, // 评论数
    onShelfDate: String, // 上架日期
    requirePoints: Number, // 下砸所需积分
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

mongoose.model("bookModel", bookSchema, "books");

// 将此模型进行导出
module.exports = mongoose.model("bookModel");