const { validate } = require("validate.js");
const { findAdminByLoginId } = require("../dao/adminDao");
const { findUserByLoginId } = require("../dao/userDao");
const { findTypeByTypeName } = require("../dao/typeDao");

/**
 * 管理员验证规则
 */
exports.adminRule = {
  loginId: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
    adminLoginIdIsExist: true,
  },
  loginPwd: {
    presence: {
      allowEmpty: true,
    },
    type: "string",
  },
  permission: {
    presence: {
      allowEmpty: false,
    },
    type: "number",
  },
  loginIdIsExist: true,
};

/**
 * 扩展验证规则
 * @returns
 */
validate.validators.adminLoginIdIsExist = async function (loginId) {
  const adminInfo = await findAdminByLoginId(loginId);
  if (adminInfo.length) {
    return "loginId is already exist";
  }
  return;
};

/**
 * 用户验证规则
 */
exports.userRule = {
  loginId: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
    userLoginIdIsExist: true,
  },
};

/**
 * 扩展验证规则
 * @returns
 */
validate.validators.userLoginIdIsExist = async function (loginId) {
  const userInfo = await findUserByLoginId(loginId);
  if (userInfo.length) {
    return "loginId is already exist";
  }
  return;
};

/**
 * 类型验证规则
 */
exports.typeRule = {
  typeName: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
    typeIsExist: true,
  },
};

/**
 * 扩展验证规则
 * @returns
 */
validate.validators.typeIsExist = async function (typeName) {
  const typeInfo = await findTypeByTypeName(typeName);
  if (typeInfo.length) {
    return "type is already exist";
  }
  return;
};

/**
 * 书籍验证规则
 */
exports.bookRule = {
  bookTitle: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
  bookPic: {
    presence: {
      allowEmpty: true,
    },
    type: "string",
  },
  downloadLink: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
  bookIntro: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
  requirePoints:{
    presence: {
      allowEmpty: false,
    },
    type: "number",
  },
  typeId: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
};

/**
 * 评论验证规则
 */
exports.commentRule = {
  userId: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
  issueId: {
    presence: {
      allowEmpty: true,
    },
    type: "string",
  },
  bookId: {
    presence: {
      allowEmpty: true,
    },
    type: "string",
  },
  typeId: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
  commentContent: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
  commentType: {
    presence: {
      allowEmpty: false,
    },
    type: "number",
  },
};

/**
 * 问答验证规则
 */
exports.issueRule = {
  issueTitle: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
  issueContent: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
  userId: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
  typeId: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
};

/**
 * 面试题规则
 */
exports.interviewRule = {
  interviewTitle: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
  interviewContent: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
  typeId: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
};
