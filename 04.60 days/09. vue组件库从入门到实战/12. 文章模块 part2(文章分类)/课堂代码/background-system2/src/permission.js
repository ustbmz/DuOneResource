import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist 白名单

// 路由前置守卫
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = getToken()

  const hasGetUserInfo = store.getters.user; // 获取本地用户信息


  if(to.meta.auth){
    // 说明页面需要鉴权
    if(hasGetUserInfo){
      // 进入此 if，说明有用户信息，直接放行
      next();
    } else {
      // 没有用户信息，看一下是否有 token
      const hasToken = localStorage.getItem('adminToken');

      if(hasToken){
        // 有 token，我们还需要验证一下 token 的有效性
        try{
          await store.dispatch('user/getInfo'); // 相当于大家之前学的 whoami
          next();
        } catch(error){
          await store.dispatch('user/resetToken');
          Message.error('登录过期，请重新登录');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }


      } else {
        // 说明没有 token，所以需要重新进行登录
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }

  } else {
    // 说明该页面不需要鉴权
    if(to.path === '/login' && hasGetUserInfo){
      // 说明你现在是在登录的状态下，要去 login 页面，我们将其导航到首页
      next({path : '/'})
    } else {
      next();
    }
    NProgress.done();
  }



  // 下方是 vue-elemement-admin 原本的鉴权流程

  // if (hasToken) {
  //   // 说明你有 token
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     // 进的不是 login
  //     // 看一下是否有用户信息
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       // 进入 else，说明没有用户信息，但是你又有 token，接下来就使用你 localStorage 里面的 token 去服务器拿用户信息
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')

  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages（不在白名单里面的） that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
