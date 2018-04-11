import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userId: undefined,
    token: undefined,
    storedLists: [],
  },
  mutations: {
    setAccessToken(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
    },
    addList(state, list) {
      state.storedLists.push({
        name: 'New One',
        todos:[]
      });
    },
    setLists(state, lists) {
      state.storedLists = lists;
    }
  },
  plugins: [createPersistedState()]
});

export default store;