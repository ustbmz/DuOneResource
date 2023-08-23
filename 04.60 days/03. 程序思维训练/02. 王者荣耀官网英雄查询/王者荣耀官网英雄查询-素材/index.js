/**
 * 从网络获取当前的英雄数据
 * @returns Promise
 */
async function getHeroes() {
  return fetch('https://study.duyiedu.com/api/herolist')
    .then((resp) => resp.json())
    .then((resp) => resp.data.reverse());
}
