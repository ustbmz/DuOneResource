var user1 = {
  name: 'monica',
  addr: {
    province: '黑龙江',
    city: '哈尔滨',
  },
  loves: ['音乐', '电影'],
};

var address = user1.addr;

address = {
  province: '四川',
  city: '成都',
};

console.log(address.city, user1.addr.city);
