import Mock from 'mockjs';
Mock.mock('/api/about', 'get', {
  code: 0,
  msg: '',
  data: 'http://resume.yuanjin.tech/',
});
