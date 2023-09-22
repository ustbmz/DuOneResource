import request from "./request";

/**
 * 用户相关的 api 都放在这里
 */

export function getCaptcha() {
  return request({
    url: "/res/captcha",
    method: "GET",
  });
}
