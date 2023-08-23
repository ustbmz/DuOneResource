(async () => {
  /**
   * 远程获取省市区数据，当获取完成后，得到一个数组
   * @returns Promise
   */
  async function getDatas() {
    return fetch('https://study.duyiedu.com/api/citylist')
      .then((resp) => resp.json())
      .then((resp) => resp.data);
  }

  const doms = {
    selProvince: document.getElementById('selProvince'),
    selCity: document.getElementById('selCity'),
    selArea: document.getElementById('selArea'),
  };

  /* 
    初始化：
    生成很多的li，加到对应的列表中去
  */
  const datas = await getDatas(); // 远程拿数据
  console.log(datas);
  fillSelect(doms.selProvince, datas);
  fillSelect(doms.selCity, []); // 一开始，无法填充城市
  fillSelect(doms.selArea, []); // 一开始，无法填充地区
  /**
   * 填充某个下拉列表
   * 该方法极具通用性，不仅是初始化可以调用，之后在某些事件中也可以调用
   * @param select 要填充的下拉列表
   * @param list 被填充的数据，数组，如果数组为空，则表示不填充，禁用
   */
  function fillSelect(select, list) {
    select.className = `select ${list.length ? '' : 'disabled'}`;
    const tipName = select.dataset.name; //获取提示文字
    const span = select.querySelector('.title span');
    span.innerText = `请选择${tipName}`;

    select.datas = list; // 将目前填充的数据，添加到dom对象的属性datas中

    const ul = select.querySelector('.options');
    ul.innerHTML = list.map((obj) => `<li>${obj.label}</li>`).join('');
  }

  // 注册事件
  regCommonEvent(doms.selProvince);
  regCommonEvent(doms.selCity);
  regCommonEvent(doms.selArea);
  regProvinceEvent();
  regCityEvent();
  /**
   * 注册公共的事件处理
   */
  function regCommonEvent(select) {
    // 1. title点击事件
    const title = select.querySelector('.title');
    title.addEventListener('click', () => {
      // 禁用状态下无法操作
      if (select.classList.contains('disabled')) {
        return;
      }
      // 先找到所有目前已展开的下拉列表
      const expands = document.querySelectorAll('.select.expand');
      for (const sel of expands) {
        if (sel !== select) {
          sel.classList.remove('expand');
        }
      }
      select.classList.toggle('expand');
    });
    // 2. ul点击事件
    const ul = select.querySelector('.options');
    ul.addEventListener('click', (e) => {
      if (e.target.tagName !== 'LI') {
        return; // 必须要点击LI才进行处理
      }
      // 拿到之前的选中的li，去掉它的active
      const beforeActiveLi = select.querySelector('li.active');
      beforeActiveLi && beforeActiveLi.classList.remove('active');
      // 选中当前的li
      const li = e.target;
      li.classList.add('active');
      // 更改title的文本
      const span = select.querySelector('.title span');
      span.innerText = li.innerText;
      // 折叠起来
      select.classList.remove('expand');
    });
  }

  /**
   * 注册省份的特殊点击事件
   */
  function regProvinceEvent() {
    const ul = doms.selProvince.querySelector('.options');
    ul.addEventListener('click', (e) => {
      if (e.target.tagName !== 'LI') {
        return;
      }
      const li = e.target;
      // 填充城市
      const pr = doms.selProvince.datas.find(
        (obj) => obj.label === li.innerText
      );
      fillSelect(doms.selCity, pr.children);
      // 填充地区
      fillSelect(doms.selArea, []);
    });
  }

  /**
   * 注册城市的特殊点击事件
   */
  function regCityEvent() {
    const ul = doms.selCity.querySelector('.options');
    ul.addEventListener('click', (e) => {
      if (e.target.tagName !== 'LI') {
        return;
      }
      const li = e.target;
      // 填充地区
      const city = doms.selCity.datas.find((obj) => obj.label === li.innerText);
      fillSelect(doms.selArea, city.children);
    });
  }
})();
