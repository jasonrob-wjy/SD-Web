const state = {
  positionIsShow: false,
  user: { name: 'zll', url: '' },
  rowData: null,
  sideList: null,
  projectName: null,
}
const mutations = {
  setSideList(state, data) {
    state.sideList = data;
  },
  setProjectName(state, data) {
    state.projectName = data;
  },
  setRowData(state, data) {
    state.rowData = data;
  },
  setPositionIsShow(state, data) {
    state.positionIsShow = data;
  },
  setUser(state, data) {
    state.user = data;
  }
}
const actions = {
  setArtile(context, data) {
    context.commit('setArtile', data);
  }
}
const getters = {
  // //获文章取条获件分页列表
  // getArticleReplyPage(state) {
  //   return function (pageNo, pageSize) {
  //     let list = 0;
  //     return list;
  //   }
  // }
}
export default {
  state,
  actions,
  mutations,
  getters
}
