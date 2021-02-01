import env from '@/config/env'
import axios from 'axios'

const MOCKURL = '' // mock数据地址

/**
 * 自定义Axios实例
 */
const AJAX = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 30000,
    withCredentials: env.credential
})
// 设置默认Content-Type
AJAX.defaults.headers.post['Content-Type'] = 'application/json'
// 添加请求拦截器
AJAX.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        // if (process.env.NODE_ENV === 'development') {
        //     config.url = `http://${location.host}` + config.url; // 自定义反向代理，可以在demo阶段打开看下请求效果
        // }

        // 每次发送请求之前判断vuex中是否存在token
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        let xSessionId = sessionStorage.getItem('x-session-id')
        console.log('request token = ' + xSessionId)
        if (xSessionId) {
            config.headers.common['x-session-id'] = xSessionId
        }
        return config
    },
    error => {
        return Promise.error(error)
    }
)

// 添加响应拦截器
AJAX.interceptors.response.use(error => {
    if (error.response.respCode) {
        switch (error.response.respCode) {
            // 401: 未登录
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。
            case 401:
                console.log('身份验证失败，请关闭重新进入。')
                // 401 清除token信息并跳转到登录页面
                store.commit('loginout')
                // 只有在当前路由不是登录页面才跳转
                if (this.$router.currentRoute.path !== '/login') {
                    this.$router.replace({
                        path: '/login',
                        query: {
                            redirect: this.$router.currentRoute.path
                        }
                    })
                }
                break

            // 403 token过期
            // 登录过期对用户进行提示
            // 清除本地token和清空vuex中token对象
            // 跳转登录页面
            case 403:
                console.log('登录过期，请关闭重新进入。')
                // 清除token
                break

            // 404请求不存在
            case 404:
                console.log('您访问的网页不存在。')
                break
            default:
                console.log(error.response.errMsg)
        }
    }
    return Promise.reject(error.response)
})

// 定义对外Get、Post、File请求
export default {
    get(url, param = {}, headers = {}) {
        return AJAX.get(url, {
            params: param,
            headers
        })
    },
    post(url, param = null, headers = {}) {
        return AJAX.post(url, param, {
            headers
        })
    },
    put(url, param = null, headers = {}) {
        return AJAX.put(url, param, {
            headers
        })
    },
    file(url, param = null, headers = {}) {
        return AJAX.post(url, param, {
            headers: Object.assign(
                {
                    'Content-Type': 'multipart/form-data'
                },
                headers
            )
        })
    },
    delete(url, param = null, headers = {}) {
        return AJAX.delete(url, {
            param,
            headers: Object.assign(
                {
                    'Content-Type': 'multipart/form-data'
                },
                headers
            )
        })
    }
}
