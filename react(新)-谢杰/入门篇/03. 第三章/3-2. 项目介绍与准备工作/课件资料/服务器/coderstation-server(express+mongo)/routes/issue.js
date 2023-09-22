/**
 * 问答模块对应二级路由
 */

const express = require("express");
const router = express.Router();

// 引入业务层方法
const {
  addIssueService,
  findIssueByPageService,
  findIssueByIdService,
  updateIssueService,
  deleteIssueService,
  searchIssueByPageService,
} = require("../services/issueService");

const { formatResponse } = require("../utils/tools");

/**
 * 根据分页获取问答信息
 */
router.get("/", async function (req, res) {
  const result = await findIssueByPageService(req.query);
  res.send(formatResponse(0, "", result));
});

/**
 * 根据 id 获取其中一个问答具体信息
 */
router.get("/:id", async function (req, res) {
  const result = await findIssueByIdService(req.params.id);
  res.send(formatResponse(0, "", result));
});

/**
 * 新增问答
 */
router.post("/", async function (req, res, next) {
  const result = await addIssueService(req.body);
  if (result && result._id) {
    res.send(formatResponse(0, "", result));
  } else {
    next(result);
  }
});

/**
 * 根据 id 删除某一个问答
 */
router.delete("/:id", async function (req, res) {
  const result = await deleteIssueService(req.params.id);
  res.send(formatResponse(0, "", result));
});

/**
 * 根据 id 修改某一个问答
 */
router.patch("/:id", async function (req, res) {
  const result = await updateIssueService(req.params.id, req.body);
  res.send(formatResponse(0, "", result));
});

module.exports = router;
