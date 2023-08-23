// 完成表单验证

function validateHelper(id, callback) {
  var div = document.getElementById(id);
  var inp = div.querySelector('input');
  var msg = div.querySelector('.msg');

  var value = inp.value.trim();
  var err = callback(value); // 错误消息
  msg.innerText = err; // 设置错误消息到p元素中
  // 判断是否有错误
  div.className = err ? 'form-item err' : 'form-item';

  return !err;
}

/**
 * 验证邮箱
 */
function validateEmail() {
  return validateHelper('email', function (value) {
    // 验证邮箱，返回错误消息，value为邮箱文本框的值
  });
}

/**
 * 验证库存
 */
function validateStock() {
  return validateHelper('stock', function (value) {
    // 验证库存，返回错误消息，value为库存文本框的值
  });
}

/**
 * 验证价格
 */
function validatePrice() {
  return validateHelper('price', function (value) {
    // 验证价格，返回错误消息，value为价格文本框的值
  });
}

/**
 * 验证整个表单，设置元素内容和状态
 * @return {boolean} 验证通过返回true，不通过返回false
 */
function validateForm() {
  var r1 = validateEmail();
  var r2 = validateStock();
  var r3 = validatePrice();
  return r1 && r2 && r3;
}

// 注册事件

var email = document.querySelector('#email input');
var stock = document.querySelector('#stock input');
var price = document.querySelector('#price input');

email.addEventListener('input', validateEmail);
stock.addEventListener('input', validateStock);
price.addEventListener('input', validatePrice);

var form = document.querySelector('.form-container');

form.addEventListener('submit', function (e) {
  var result = validateForm();
  if (!result) {
    // 验证未通过，阻止提交
    e.preventDefault();
  }
});
