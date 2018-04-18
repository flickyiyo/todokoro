<template lang="pug" >
  .tile.is-ancestor(style="overflow-x: scroll; padding:10px;")
    list-container


</template>

<script>
import Icon from "vue-awesome";
import { getBoards } from "../services";
import { mapState } from "vuex";
import ListNameForm from "./ListNameForm";
import ListContainer from "./ListContainer";
export default {
  components: {
    Icon,
    ListNameForm,
    ListContainer
  },
  computed: {
    ...mapState(["storedLists"])
  },
  watch: {
    lists(val) {
      console.log("classic list changed");
      this.$store.commit("setLists", val);
    },
    storedLists(val) {
      console.log("stored lists changed");
      this.lists = val;
    }
  },
  mounted() {
    this.lists = this.storedLists;
  },
  methods: {
    deleteList(listIndex) {
      this.lists.splice(listIndex, 1);
      this.lists = [...this.lists];
    },
    changeListName() {
      this.lists[this.editingListName].name = this.listName;
      this.editingListName = false;
      this.lists = [...this.lists];
    },
    deleteTodo(listIndex, itemIndex) {
      let list = [...this.lists[listIndex].todos];
      console.log(list);
      list.splice(itemIndex, 1);
      this.lists[listIndex].todos = list;
      this.lists = [...this.lists];
    },
    editTodo(listIndex, itemIndex) {
      let todo = this.lists[listIndex].todos[itemIndex];
      this.editingList = listIndex;
      this.editingItem = itemIndex;
      this.todoName = todo.name;
      this.todoContent = todo.content;
    },
    addTodo(listIndex) {
      this.isAdding = listIndex;
    },
    submitEditTodo(ev, listIndex, itemIndex) {
      ev.preventDefault();
      if (this.todoName === "" && this.todoContent === "") {
        this.editingList = false;
        this.editingItem = false;
        return;
      }
      const newTodo = {
        name: this.todoName,
        content: this.todoContent
      };
      this.lists[listIndex].todos[itemIndex] = newTodo;
      this.lists = [...this.lists];
      this.editingList = false;
      this.editingItem = false;
    },
    getColorProperty(priority) {},
    submitAddTodo(ev) {
      ev.preventDefault();
      if (this.todoName == "" && this.todoContent == "") {
        this.isAdding = false;
        return;
      }
      for (let i = 0; i < this.lists[this.isAdding].todos.length; i++) {
        if (this.lists[this.isAdding].todos[i].name === this.todoName) {
          alert("Duplicated name");
          return;
        }
      }
      let bgColor;
      switch (this.priority) {
        case "low":
          bgColor = "background-color: green";
          break;
        case "medium":
          bgColor = "background-color: yellow";
          break;
        case "high":
          bgColor = "background-color: red";
          break;
        default:
          bgColor = "background-color: green";
      }
      const newTodo = {
        name: this.todoName,
        content: this.todoContent,
        priority: bgColor
      };

      this.lists[this.isAdding].todos.push(newTodo);
      this.lists = [...this.lists];

      this.isAdding = false;
      this.todoName = "";
      this.todoContent = "";
    },
    async getBoards() {
      const data = await getBoards(this.$store.token);
    },
    onDragEnd() {
      const object = this.lists[this.sourceListIndex].todos[
        this.sourceItemIndex
      ];
      this.lists[this.sourceListIndex].todos.splice(this.sourceItemIndex, 1);
      this.lists[this.targetListIndex].todos.splice(
        this.targetItemIndex,
        0,
        object
      );
      this.lists = [...this.lists];
      this.sourceItemIndex = null;
      this.sourceListIndex = null;
      this.targetItemIndex = null;
      this.targetListIndex = null;
    },
    clearSourceIndex() {},
    setTargetIndex(itemIndex, listIndex) {
      this.targetItemIndex = itemIndex;
      this.targetListIndex = listIndex;
    },
    setSourceIndex(itemIndex, listIndex) {
      this.sourceItemIndex = itemIndex;
      this.sourceListIndex = listIndex;
    }
  },
  data() {
    return {
      name: "this is personal",
      todoName: "",
      todoContent: "",
      editingList: false,
      editingListName: false,
      editingItem: false,
      listName: "",
      isAdding: false,
      sourceItemIndex: null,
      sourceListIndex: null,
      targetItemIndex: null,
      targetListIndex: null,
      priority: "",
      lists: []
    };
  }
};
</script>

<style>

</style>
