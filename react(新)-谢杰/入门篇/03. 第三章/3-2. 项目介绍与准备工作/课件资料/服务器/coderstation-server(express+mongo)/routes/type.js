/**
 * 类型模块对应的二级路由
 */

const express = require("express");
const router = express.Router();

const {
  findAllTypeService,
  addTypeService,
  deleteTypeService,
  updateTypeService,
} = require("../services/typeService");

const { formatResponse } = require("../utils/tools");

/**
 * 查找所有类型
 */
router.get("/", async function (req, res) {
  const result = await findAllTypeService();
  // 对返回数据进行格式化
  res.send(formatResponse(0, "", result));
});

/**
 * 新增类型
 */
router.post("/", async function (req, res, next) {
  const result = await addTypeService(req.body);
  if (result && result._id) {
    res.send(formatResponse(0, "", result));
  } else {
    next(result);
  }
});

/**
 * 根据 id 删除类型
 */
router.delete("/:id", async function (req, res) {
  const result = await deleteTypeService(req.params.id);
  res.send(formatResponse(0, "", result));
});

/**
 * 根据 id 修改类型
 */
router.patch("/:id", async function (req, res) {
  const result = await updateTypeService(req.params.id, req.body);
  res.send(formatResponse(0, "", result));
});

module.exports = router;
