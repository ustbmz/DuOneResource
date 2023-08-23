import { getSetting } from "@/api/setting";
import { titleController } from "@/utils";
export default {
  namespaced: true,
  state: {
    loading: false,
    data: null,
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
    async fetchSetting(ctx) {
      ctx.commit("setLoading", true);
      const resp = await getSetting();
      // console.log(resp)
      // resp.avatar = 'http://localhost:7001' + resp.avatar;
      // resp.avatar = 'http://47.108.144.102:7001' + resp.avatar;
      // resp.qqQrCode = 'http://localhost:7001' + resp.qqQrCode;
      // resp.qqQrCode = 'http://47.108.144.102:7001' + resp.qqQrCode;
      // resp.weixinQrCode = 'http://localhost:7001' + resp.weixinQrCode;
      // resp.weixinQrCode = 'http://47.108.144.102:7001' + resp.weixinQrCode;
      ctx.commit("setData", resp);
      ctx.commit("setLoading", false);
      if (resp.favicon) {
        // <link rel="shortcut icon " type="images/x-icon" href="./favicon.ico">
        let link = document.querySelector("link[ref='shortcut icon']");
        if (link) {
          return;
        }
        link = document.createElement("link");
        link.rel = "shortcut icon";
        link.type = "images/x-icon";
        link.href = resp.favicon;
        document.querySelector("head").appendChild(link);
      }
      if (resp.siteTitle) {
        titleController.setSiteTitle(resp.siteTitle);
      }
    },
  },
};
