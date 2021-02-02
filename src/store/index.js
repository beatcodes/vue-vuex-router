import types from '@/store/mutation-types'
import Vue from 'vue'
import Vuex from 'vuex'
import home from './home/index'

Vue.use(Vuex)

export default new Vuex.Store({
    // 根级别的 state
    state: {},
    // 根级别的 action
    actions: {
        changeUserInfo({ commit }, info) {
            let userInfo = `this is ${info}`
            commit(types.SET_USER_INFO, userInfo)
        },
    },
    // 根级别的 mutations
    mutations: {
        [types.SET_USER_INFO](state, userInfo) {
            state.userInfo = userInfo
        },
    },
    // 根级别的 getters
    getters: {},
    modules: {
        home,
    },
})
