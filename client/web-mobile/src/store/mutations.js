import * as types from './mutation-types'

const mutations = {
  [types.SET_SEARCH_HISTORY] (state, history) {
    state.searchHistory = history
  },
  [types.SET_USE_HISTORY] (state, history) {
    state.useHistory = history
  },
  [types.SET_FAVORITE_LIST] (state, list) {
    state.favoriteList = list
  }
}

export default mutations
