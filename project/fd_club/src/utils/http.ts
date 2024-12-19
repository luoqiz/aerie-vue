import { CustomRequestOptions } from '@/interceptors/request'
import { useMemberStore } from '@/store/member'

// const baseURL = 'http://ctyun.luoqiz.top:9001'

const baseURL = 'http://127.0.0.1:8000'

const isRefreshing = false
// 失效后同时发送请求的容器 -- 缓存接口
// eslint-disable-next-line no-unused-vars
let callbacks: ((token: any) => void)[] = []

// 刷新 token 后, 将缓存的接口重新请求一次
function onAccessTokenFetched(newToken: any) {
  callbacks.forEach((callback) => {
    callback(newToken)
  })
  // 清空缓存接口
  callbacks = []
}

const httpRequestInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    // 拼接远程访问地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 超时时间 10s
    options.timeout = 10000
    // 设置租户信息
    options.header = {
      ...options.header,
      'tenant-id': '1',
      'source-client': 'miniapp',
    }
    // 添加token
    const memberStore = useMemberStore()
    const token = memberStore.getToken
    if (token && token.length > 0) {
      options.header = {
        ...options.header,
        Authorization: 'Bearer ' + token,
      }
    }
  },
}
// toLogin
const toLoginPage = () => {
  console.log('跳转到登陆页面')
  const memberStore = useMemberStore()
  memberStore.clearProfile()
  // const router = useRouter();
  // router.push({ name: 'Login' });
  uni.navigateTo({ url: '/pages/login/login' })
}

uni.addInterceptor('request', httpRequestInterceptor)
uni.addInterceptor('uploadFile', httpRequestInterceptor)

export const http = <T>(options: CustomRequestOptions) => {
  // 1. 返回 Promise 对象
  return new Promise<IResData<T>>((resolve, reject) => {
    uni.request({
      ...options,
      dataType: 'json',
      // #ifndef MP-WEIXIN
      responseType: 'json',
      // #endif
      // 响应成功
      success(res) {
        // 状态码 2xx，参考 axios 的设计
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 提取核心数据 res.data
          resolve(res.data as IResData<T>)
        } else if (res.statusCode === 401) {
          // 401错误  -> 清理用户信息，跳转到登录页
          // userStore.clearUserInfo()
          // uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          !options.hideErrorToast &&
            uni.showToast({
              icon: 'none',
              title: (res.data as IResData<T>).msg || '请求错误',
            })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}

/**
 * GET 请求
 * @param url 后台地址
 * @param query 请求query参数
 * @returns
 */
export const httpGet = <T>(url: string, query?: Record<string, any>) => {
  return http<T>({
    url,
    query,
    method: 'GET',
  })
}

/**
 * POST 请求
 * @param url 后台地址
 * @param data 请求body参数
 * @param query 请求query参数，post请求也支持query，很多微信接口都需要
 * @returns
 */
// export const httpPost = <T>(
//   url: string,
//   data?: Record<string, any>,
//   query?: Record<string, any>,
// ) => {
//   return http<T>({
//     url,
//     query,
//     data,
//     method: 'POST',
//   })
// }

export const httpPost = <T>(url: string, option?: any) => {
  return http<T>({
    method: 'POST',
    url,
    ...option,
  })
}

/**
 * DELETE 请求
 * @param url 后台地址
 * @param data 请求body参数
 * @param query 请求query参数，post请求也支持query，很多微信接口都需要
 * @returns
 */
export const httpDelete = <T>(option: any) => {
  return http<T>({ method: 'DELETE', ...option })
}

export const httpPut = <T>(
  url: string,
  data?: Record<string, any>,
  query?: Record<string, any>,
) => {
  return http<T>({
    url,
    query,
    data,
    method: 'PUT',
  })
}

export const httpDownload = <T>(
  url: string,
  data?: Record<string, any>,
  query?: Record<string, any>,
) => {
  return http<T>({
    url,
    query,
    data,
    method: 'GET',
    responseType: 'blob',
  })
}

export const httpUpload = async <T>(option: any) => {
  option.headersType = 'multipart/form-data'
  const res = await http<T>({ method: 'POST', ...option })
  return res as unknown as Promise<T>
}

http.get = httpGet
http.post = httpPost
http.delete = httpDelete
http.put = httpPut
http.download = httpDownload
http.upload = httpUpload

// export default {
//   get: async <T = any>(option: any) => {
//     const res = await http<T>({ method: 'GET', ...option })
//     return res as unknown as T
//   },
//   post: async <T = any>(option: any) => {
//     const res = await http<T>({ method: 'POST', ...option })
//     return res as unknown as T
//   },
//   delete: async <T = any>(option: any) => {
//     const res = await http<T>({ method: 'DELETE', ...option })
//     return res as unknown as T
//   },
//   put: async <T = any>(option: any) => {
//     const res = await http<T>({ method: 'PUT', ...option })
//     return res as unknown as T
//   },
//   download: async <T = any>(option: any) => {
//     const res = await http<T>({
//       method: 'GET',
//       responseType: 'blob',
//       ...option,
//     })
//     return res as unknown as Promise<T>
//   },
//   upload: async <T = any>(option: any) => {
//     option.headersType = 'multipart/form-data'
//     const res = await http<T>({ method: 'POST', ...option })
//     return res as unknown as Promise<T>
//   },
// }
