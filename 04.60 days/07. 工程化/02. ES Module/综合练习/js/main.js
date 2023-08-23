// js入口模块
import login from './login.js';
import { formContainer } from './doms.js';

formContainer.onsubmit = function (e) {
  e.preventDefault();
  login();
};
