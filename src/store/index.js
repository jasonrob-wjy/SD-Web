import Vue from 'vue'
import Vuex from 'vuex'
import variable from '../modules/variable'
import show from '../modules/show'
import user from '../modules/user'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    variable,
    show,
    user
  }
});
export default store;
