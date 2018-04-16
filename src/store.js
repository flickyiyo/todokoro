import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    editingItem: undefined,
    editingList: undefined,
    storedLists: [],
  },
  mutations: {
    hideNewItemForm(state) {
      state.editingItem = undefined;
      state.editingList = undefined;
    },
    setEditingItemAndList(state, payload) {
      state.editingItem = payload.editingItem;
      state.editingList = payload.editingList;
    },
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
    addTodo(state, payload) {
      state.storedLists[payload.listIndex].todos.push(payload.todo);
    },
    setLists(state, lists) {
      state.storedLists = lists;
    }
  },
  plugins: [createPersistedState()]
});

export default store;