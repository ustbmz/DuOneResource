Mock.mock('/api/cart', 'get', {
  code: 0,
  msg: '',
  'data|5-20': [
    {
      productName: '@csentence',
      productUrl: '@image(180x150, #008c8c, #fff, testimage)',
      'unitPrice|1-500.2': 0,
      'count|1-10': 0,
    },
  ],
});
