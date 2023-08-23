import { getProjects } from "@/api/project";

export default {
  namespaced: true,
  state: {
    loading: false,
    data: [],
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async fetchProject(ctx) {
      if (ctx.state.data.length) {
        return;
      }
      ctx.commit("setLoading", true);
      const resp = await getProjects();
      // for(var item of resp){
        // item.thumb = "http://localhost:7001" + item.thumb
        // item.thumb = "http://47.108.144.102:7001" + item.thumb
        // item.qqQrCode = "http://localhost:7001" + item.qqQrCode
        // item.qqQrCode = "http://47.108.144.102:7001" + item.qqQrCode
        // item.weixinQrCode = "http://localhost:7001" + item.weixinQrCode
        // item.weixinQrCode = "http://47.108.144.102:7001" + item.weixinQrCode
      // }
      // console.log(resp,'qq')
      ctx.commit("setData", resp);
      ctx.commit("setLoading", false);
    },
  },
};
