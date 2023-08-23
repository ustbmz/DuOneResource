import { formContainer } from './doms.js';
import { login } from './login.js';

formContainer.onsubmit = function (e) {
  e.preventDefault();
  login();
};
