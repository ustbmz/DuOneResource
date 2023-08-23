$(function () {
  /**
   * 设置汇总信息
   */
  function setTotal() {
    // 获取所有选中的多选框
    let sum = 0;
    const checked = $(':checked:not(.checkAll)');
    checked.each((i, dom) => {
      sum += +$(dom).parents('.item').find('.sum em').text().replace('￥', '');
    });
    $('.footer .right .nums em').text(checked.length);
    $('.footer .right .sums em').text(`￥${sum.toFixed(2)}`);
  }
  // 找到全选的多选框，给它注册change事件
  $('.checkAll').change(function () {
    // 设置其他所有的多选框的选中状态
    $(':checkbox').not(this).prop('checked', $(this).prop('checked'));
    setTotal();
  });
  $('.checkItem').change(function () {
    setTotal();
  });

  // 改变数量
  $('.incr').click(function (e) {
    e.preventDefault();
    const inp = $(this).prevAll('input');
    const newNumber = +inp.val() + 1;
    changeNumber(newNumber, inp);
  });
  $('.decr').click(function (e) {
    e.preventDefault();
    const inp = $(this).nextAll('input');
    const newNumber = +inp.val() - 1;
    changeNumber(newNumber, inp);
  });

  function changeNumber(newNumber, inp) {
    if (newNumber < 1) {
      newNumber = 1;
    }
    inp.val(newNumber);
    const unitPrice = +inp
      .parents('.item')
      .find('.price em')
      .text()
      .replace('￥', '');
    const sum = unitPrice * newNumber;
    inp
      .parents('.item')
      .find('.sum em')
      .text(`￥${sum.toFixed(2)}`);
    setTotal();
  }

  // 删除
  $('.del a').click(function (e) {
    e.preventDefault();
    $(this).parents('.item').remove();
    setTotal();
  });

  $('.delChecked').click(function (e) {
    e.preventDefault();
    $(':checked:not(.checkAll)').parents('.item').remove();
    setTotal();
  });

  $('.clearAll').click(function (e) {
    e.preventDefault();
    $('.item').remove();
    setTotal();
  });
});
