import Vue from 'vue'
import Vuex from 'vuex'
import { post } from './request.js'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    token: null
  },
  // 突变
  mutations: {
    HTMLTOWORD (state) {
    }
  },
  // 分发的action
  actions: {
    HTMLTOWORD ({ commit }, data) {
      return post({
        url: '/htmlTransformWord',
        data
      })
    }
  }

})
export default store
