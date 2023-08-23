(async function () {
  /**
   * 从网络获取当前的英雄数据
   * @returns Promise
   */
  async function getHeroes() {
    return fetch('https://study.duyiedu.com/api/herolist')
      .then((resp) => resp.json())
      .then((resp) => resp.data.reverse());
  }

  const doms = {
    ul: document.querySelector('.list'),
    radios: document.querySelectorAll('.radio'),
    txtKeyword: document.querySelector('.input input'),
  };
  // 1. 初始化：加载所有的英雄数据，生成li，加入到ul中
  const allHeroes = await getHeroes();
  setHeroHTML(allHeroes);
  /**
   * 根据指定的英雄数组，生成对应的html，放入到ul中
   * @param {*} heroes
   */
  function setHeroHTML(heroes) {
    doms.ul.innerHTML = heroes
      .map(
        (
          h
        ) => `<li><a href="https://pvp.qq.com/web201605/herodetail/${h.ename}.shtml" target="_blank">
    <img
      src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/${h.ename}/${h.ename}.jpg"
      alt=""
    />
    <span>${h.cname}</span>
  </a></li>`
      )
      .join('');
  }

  // 2. 交互事件
  for (const radio of doms.radios) {
    radio.addEventListener('click', function () {
      //1. 更改radio的样式
      setChoose(this);
      //2. 更改ul中的数据
      searchHeros(this);
    });
  }

  doms.txtKeyword.addEventListener('input', function () {
    const heroes = allHeroes.filter((h) => h.cname.includes(this.value));
    setHeroHTML(heroes);
    // 设置「全部」选中
    setChoose(document.querySelector(".radio[data-type='all']"));
  });

  /**
   * 根据radio中提供的自定义属性，查询英雄数据，然后设置html
   * @param {*} radio
   */
  function searchHeros(radio) {
    let heroes;
    // const type = radio.getAttribute('data-type');
    const type = radio.dataset.type;
    const value = radio.dataset.value;
    if (type === 'all') {
      heroes = allHeroes;
    } else if (type === 'pay_type') {
      heroes = allHeroes.filter((h) => h.pay_type === +value);
    } else {
      heroes = allHeroes.filter(
        (h) => h.hero_type === +value || h.hero_type2 === +value
      );
    }
    setHeroHTML(heroes);
  }

  /**
   * 设置某个被选中的radio
   */
  function setChoose(radio) {
    // 找到之前被选中的radio
    const checkedRadio = document.querySelector('.radio.checked');
    checkedRadio && checkedRadio.classList.remove('checked');
    // 给当前的radio添加类样式
    radio.classList.add('checked');
  }
})();
