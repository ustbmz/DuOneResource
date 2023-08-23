function cal() {
  // 设置选中的商品数量
  const checkedProduct = $(':checked:not(.checkAll)');
  $('.nums em').text(checkedProduct.length);
  // 设置合计
  const total = checkedProduct
    .parents('.item')
    .find('.sum em')
    .toArray()
    .reduce((a, b) => {
      return a + +b.innerText.replace('￥', '');
    }, 0);
  $('.sums em').text(`￥${total.toFixed(2)}`);
}

// 全选
$('.checkAll').change(function () {
  $(':checkbox').prop('checked', $(this).prop('checked'));
});
// 选中状态变化
$(':checkbox').change(cal);
// 改变数量
function changeNumber(inp, newNumber) {
  if (newNumber < 1) {
    newNumber = 1;
  }
  inp.val(newNumber);
  // 设置金额
  const unitPrice = +inp
    .parents('.item')
    .find('.price em')
    .text()
    .replace('￥', '');
  const total = unitPrice * newNumber;
  inp
    .parents('.item')
    .find('.sum em')
    .text(`￥${total.toFixed(2)}`);
  cal();
}
$('.decr').click(function () {
  const inp = $(this).next('input');
  changeNumber(inp, +inp.val() - 1);
  return false;
});

$('.incr').click(function () {
  const inp = $(this).prev('input');
  changeNumber(inp, +inp.val() + 1);
  return false;
});
// 删除
$('.del a').click(function () {
  $(this).parents('.item').remove();
  cal();
  return false;
});
$('.delChecked').click(function () {
  $(':checked:not(.checkAll)').parents('.item').remove();
  cal();
  return false;
});
$('.clearAll').click(function () {
  $('.item').remove();
  cal();
  return false;
});
