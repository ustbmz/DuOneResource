/**
 * 面试题模块对应二级路由
 */

const express = require("express");
const router = express.Router();

const {
  findInterviewByPageService,
  findInterviewTitleByTypeService,
  findInterviewByIdService,
  addInterviewService,
  deleteInterviewService,
  updateInterviewService,
} = require("../services/interviewService");

const { formatResponse } = require("../utils/tools");

/**
 * 根据分页获取面试题
 */
router.get("/", async function (req, res) {
  const result = await findInterviewByPageService(req.query);
  res.send(formatResponse(0, "", result));
});

/**
 * 获取所有分类的面试题标题
 */
router.get("/interviewTitle", async function (req, res) {
  const result = await findInterviewTitleByTypeService();
  res.send(formatResponse(0, "", result));
});




/**
 * 根据 id 获取面试题
 */
router.get("/:id", async function (req, res) {
  const result = await findInterviewByIdService(req.params.id);
  res.send(formatResponse(0, "", result));
});

/**
 * 新增面试题
 */
router.post("/", async function (req, res, next) {
  const result = await addInterviewService(req.body);
  if (result && result._id) {
    res.send(formatResponse(0, "", result));
  } else {
    next(result);
  }
});

/**
 * 删除面试题
 */
router.delete("/:id", async function (req, res) {
  const result = await deleteInterviewService(req.params.id);
  res.send(formatResponse(0, "", result));
});

/**
 * 修改面试题
 */
router.patch("/:id", async function (req, res) {
  const result = await updateInterviewService(req.params.id, req.body);
  res.send(formatResponse(0, "", result));
});

module.exports = router;
