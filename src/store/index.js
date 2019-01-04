import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/catalog/data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sourceData
  }
})
