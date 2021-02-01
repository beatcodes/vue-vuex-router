import Vue from 'vue'
import Router from 'vue-router'

// 按需（懒）加载
const Home = () => import(/* webpackChunkName: "home" */ '../pages/home')
const My = () => import(/* webpackChunkName: "home" */ '../pages/my')
const ProductDetail = () =>
    import(/* webpackChunkName: "detail" */ '../pages/ProductDetail')

Vue.use(Router)

let base = `${process.env.BASE_URL}` // 动态获取二级目录

const router = new Router({
    // mode: 'history', // 路由有两种模式：history、hash，想要不带#号就选history，默认是hash模式
    base: base,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/my',
            name: 'my',
            component: My
        },
        {
            path: '/detail',
            name: 'ProductDetail',
            component: ProductDetail
        },
        {
            path: '*',
            redirect: '/'
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})

router.beforeEach((to, from, next) => {
    // 做些什么，通常权限控制就在这里做。
    // 这里必须写next()，否则页面会阻止下一步操作。
    next()
})

export default router
