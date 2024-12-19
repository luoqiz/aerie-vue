// import wxJsapi from 'weixin-jsapi-zxt'

const wxAppId = import.meta.env.VITE_WX_APPID

export const checkJsApi = () => {
  const timeStamp = new Date().getMilliseconds.toString()
  // 配置微信JS SDK
  // wxJsapi.config({
  //   debug: false,
  //   appId: wxAppId,
  //   timestamp: timeStamp,
  //   nonceStr: 'nonceStr',
  //   signature: 'signature',
  //   jsApiList: [
  //     'checkJsApi',
  //     'chooseWXPay',
  //     'chooseImage',
  //     'getLocalImgData',
  //     'updateTimelineShareData',
  //     'updateAppMessageShareData',
  //     'openAddress',
  //   ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
  // })
  // // 配置完成后返回一个resolve
  // wxJsapi.ready(() => {
  //   console.log('接口开通成功')
  //   wxJsapi.checkJsApi({
  //     jsApiList: [
  //       'checkJsApi',
  //       'chooseWXPay',
  //       'chooseImage',
  //       'getLocalImgData',
  //       'updateTimelineShareData',
  //       'updateAppMessageShareData',
  //       'openAddress',
  //     ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
  //     success: function (res: any) {
  //       // 以键值对的形式返回，可用的api值true，不可用为false
  //       // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
  //       console.log('----', res)
  //     },
  //   })
  // })
}

export const getCode = () => {
  const appid = wxAppId // 个人开发者appid
  const redirect = encodeURIComponent(window.location.href) // 重定向回来的地址
  const wxCode = getUrlParam('code') // 截取url中的code
  // 判断有没有code
  if (!wxCode) {
    // 获取code的地址。获取成功重定向后地址栏中将会带有code，判断没有code的话，就跳转到微信官方链接上获取，获取成功后会再重定向回来，注意url是需要使用encodeURIComponent处理一下编码的
    // 授权有两种scope， snsapi_base 和snsapi_userinfo，snsapi_base是静默授权，不需要用户同意
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
  }
  // else {
  //     // 获取到了code
  //    getOpenId(wx_code); //把code传给后台获取用户信息
  // }
  return wxCode
}
// getUrlParam方法就是使用正则截取地址栏里的code
export const getUrlParam = (name: string) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2]!)
  return null
}

// 判断当前是否是微信浏览器环境
export const isWechatBrowser = () => {
  const browser: any = navigator.userAgent.toLowerCase()
  return /MicroMessenger/gi.test(browser)
}
