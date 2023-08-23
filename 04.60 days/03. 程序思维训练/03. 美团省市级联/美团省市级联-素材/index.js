/**
 * 远程获取省市区数据，当获取完成后，得到一个数组
 * @returns Promise
 */
async function getDatas() {
  return fetch('https://study.duyiedu.com/api/citylist')
    .then((resp) => resp.json())
    .then((resp) => resp.data);
}
