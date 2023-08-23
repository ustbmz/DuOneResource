Mock.setup({
  timeout: 1000,
});

Mock.mock('/api/cart', 'get', {
  code: 0,
  msg: '',
  'data|5-10': [
    {
      productName: '@word(3, 20)',
      productUrl: '@image(100x100, #008c8c, #fff, @productName)',
      'unitPrice|1-1000.2': 0,
      'count|1-3': 0,
    },
  ],
});
