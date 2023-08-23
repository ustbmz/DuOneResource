function getDom(index) {
  return document.querySelectorAll('.item')[index];
}

// 图表1：折线图
(function () {
  const myChart = echarts.init(getDom(0)); // 初始化，获得echart实例
  // 给当前图表实例添加配置
  myChart.setOption({
    title: {
      text: 'ECharts 折线图', // 图表标题
    },
    tooltip: {}, // 配置了该项，则鼠标移动上去后会有提示
    legend: {
      // 配置图例
      data: ['手机销量', '平板销量'],
    },
    xAxis: {
      // 配置横坐标
      data: Array(12)
        .fill(0)
        .map((it, i) => `${i + 1}月`),
    },
    yAxis: {}, // 纵坐标让其自动生成
    series: [
      {
        name: '手机销量', // 对应到图例
        type: 'line', // 类型：线图
        // 配置数据
        data: Array(12)
          .fill(0)
          .map(() => Math.floor(Math.random() * 1000 + 800)),
        // smooth: true, // 添加此项可以让曲线变得平滑
      },
      {
        name: '平板销量', // 对应到图例
        type: 'line', // 类型：线图
        // 配置数据
        data: Array(12)
          .fill(0)
          .map(() => Math.floor(Math.random() * 1000 + 800)),
        smooth: true, // 添加此项可以让曲线变得平滑
      },
    ],
  });
})();

// 图表2：柱状图
(function () {
  const myChart = echarts.init(getDom(1)); // 初始化，获得echart实例
  // 给当前图表实例添加配置
  myChart.setOption({
    title: {
      text: 'ECharts 柱状图', // 图表标题
    },
    tooltip: {}, // 配置了该项，则鼠标移动上去后会有提示
    legend: {
      // 配置图例
      data: ['手机销量', '平板销量'],
    },
    xAxis: {
      // 配置横坐标
      data: Array(12)
        .fill(0)
        .map((it, i) => `${i + 1}月`),
    },
    yAxis: {}, // 纵坐标让其自动生成
    series: [
      {
        name: '手机销量', // 对应到图例
        type: 'bar', // 类型：柱状图
        // 配置数据
        data: Array(12)
          .fill(0)
          .map(() => Math.floor(Math.random() * 1000 + 800)),
      },
      {
        name: '平板销量', // 对应到图例
        type: 'bar', // 类型：柱状图
        // 配置数据
        data: Array(12)
          .fill(0)
          .map(() => Math.floor(Math.random() * 1000 + 800)),
      },
    ],
  });
})();

// 图表3：饼图
(function () {
  const myChart = echarts.init(getDom(2)); // 初始化，获得echart实例
  // 给当前图表实例添加配置
  myChart.setOption({
    title: {
      text: 'ECharts 饼图', // 图表标题
    },
    tooltip: {}, // 配置了该项，则鼠标移动上去后会有提示
    series: [
      {
        name: '访问来源', // 图表名称
        type: 'pie', // 图标类型：饼图
        radius: '50%', // 圆半径：最大半径的50%
        roseType: 'radius', // 南丁格尔图的类型，若不设置此项，则为普通饼图
        data: [
          // 饼图数据
          { value: 235, name: '视频广告' },
          { value: 274, name: '联盟广告' },
          { value: 310, name: '邮件营销' },
          { value: 335, name: '直接访问' },
          { value: 400, name: '搜索引擎' },
        ],
      },
    ],
  });
})();

// 图表4：K线图（蜡烛图）
(function () {
  const myChart = echarts.init(getDom(3)); // 初始化，获得echart实例
  // 给当前图表实例添加配置
  myChart.setOption({
    title: {
      text: 'ECharts K线图（蜡烛图）', // 图表标题
    },
    xAxis: {
      // 配置横坐标
      data: Array(12)
        .fill(0)
        .map((it, i) => `${i + 1}月`),
    },
    yAxis: {}, // 纵坐标让其自动生成
    tooltip: {}, // 配置了该项，则鼠标移动上去后会有提示
    series: [
      {
        type: 'k', // 图表类型：k线图
        data: [
          // 每个数组为一根k线，数值含义为[开盘价, 收盘价, 最高价, 最低价]
          [20, 34, 38, 10],
          [34, 35, 50, 30],
          [35, 38, 44, 33],
          [38, 33, 40, 30],
          [33, 27, 32, 22],
          [27, 26, 29, 22],
          [26, 27, 28, 25],
          [27, 33, 34, 32],
          [33, 37, 44, 32],
          [37, 30, 39, 28],
          [30, 26, 33, 22],
          [26, 18, 28, 13],
        ],
        encode: {
          // 设置提示对应的dimensions索引
          tooltip: [1, 2, 3, 4],
        },
        // 设置五个维度的名称
        // 含义分别为：日期、开盘价, 收盘价, 最高价, 最低价
        dimensions: [null, '开盘价', '收盘价', '最高价', '最低价'],
      },
    ],
  });
})();

// 图表5：远程加载数据
(async function () {
  // 模拟远程数据
  Mock.mock('/api/pie-datas', 'get', {
    datas: [
      { value: 235, name: '视频广告' },
      { value: 274, name: '联盟广告' },
      { value: 310, name: '邮件营销' },
      { value: 335, name: '直接访问' },
      { value: 400, name: '搜索引擎' },
    ],
  });
  Mock.setup({
    timeout: 2000, // 模拟2秒钟网络通信
  });
  const myChart = echarts.init(getDom(4)); // 初始化，获得echart实例
  myChart.setOption({
    title: {
      text: 'ECharts 饼图，远程数据加载中...', // 图表标题
    },
  });
  myChart.showLoading(); // 显示加载效果
  const resp = await axios.get('/api/pie-datas'); // 获取远程数据
  // // 给当前图表实例添加配置
  myChart.setOption({
    title: {
      text: 'ECharts 饼图', // 图表标题
    },
    tooltip: {}, // 配置了该项，则鼠标移动上去后会有提示
    series: [
      {
        name: '访问来源', // 图标名称
        type: 'pie', // 图标类型：饼图
        radius: '50%', // 圆半径：最大半径的50%
        roseType: 'radius', // 南丁格尔图的类型，若不设置此项，则为普通饼图
        data: resp.data.datas, // 数据来自于服务器响应
      },
    ],
  });
  // // 隐藏加载效果
  myChart.hideLoading();
})();

// 图表6：地图数据
/**
 * 使用地图需要两部分数据：
 * 1. GEOJSON格式的地理信息，该信息将作为地图背景板
 * 2. 在地图背景板上要进行显示或交互的数据
 */
(async function () {
  const myChart = echarts.init(getDom(5)); // 初始化，获得echart实例
  myChart.showLoading();
  const resp = await axios.get('./china.geojson.json'); // 获取中国GEOJSON数据
  const users = await axios.get('./user.json'); // 获取用户数据
  // 注册地图数据
  echarts.registerMap('China', resp.data);
  myChart.setOption({
    title: {
      text: 'ECharts 用户地图', // 图表标题
    },
    // 配置了该项，则鼠标移动上去后会有提示
    // formatter 为文字提示格式，在此例中，{b}表示数据名，{c}表示数据值
    tooltip: { formatter: '{b} 注册用户 {c}人' },
    visualMap: {
      // 虚拟地图，一般用户设置不同颜色来展现数据的差异
      left: 'right', // 虚拟地图显示的位置
      min: 0, // 区间的最小值
      max: 10000, // 区间数据的最大值
      text: ['高', '低'], // 文本，默认为数值文本
      calculable: true, // 是否允许控制区间
    },
    series: [
      {
        type: 'map', // 图表类型：地图
        map: 'China', // 使用注册的地图
        roam: true, // 是否开启鼠标缩放和平移漫游
        scaleLimit: {
          // 缩放比例控制
          min: 0.7, // 最小缩放到0.7倍
          max: 3, // 最大缩放到3倍
        },
        data: users.data,
      },
    ],
  });
  myChart.hideLoading();
})();
