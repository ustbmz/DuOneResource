/**
 * 从网络获取歌词数据
 * @returns Promise
 */
async function getLrc() {
  return await fetch('https://study.duyiedu.com/api/lyrics')
    .then((resp) => resp.json())
    .then((resp) => resp.data);
}
