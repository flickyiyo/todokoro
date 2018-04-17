import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    editingItem: undefined,
    editingList: undefined,
    lists: [],
  },
  mutations: {
    changeListName(state, payload) {
      const { listIndex, listName } = payload;
      state.lists[listIndex].name = listName;
    },
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
      state.lists.push({
        name: 'New One',
        todos: []
      });
    },
    addTodo(state, payload) {
      state.lists[payload.listIndex].todos.push(payload.todo);
    },
    setLists(state, lists) {
      state.lists = lists;
    }
  },
  plugins: [createPersistedState()]
});

export default store;