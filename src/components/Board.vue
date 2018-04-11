<template lang="pug" >
  .tile.is-ancestor(style="overflow-x: scroll; padding:10px;")
    .tile.is-4(v-for="(list, listIndex) in lists")
      .tile
        .tile.is-vertical.is-parent.box(
          style="margin-left: 15px;"
          @dragover="targetListIndex=listIndex"
        )
          form(@submit="changeListName")
            input.input(v-if="editingListName===listIndex" v-model="listName" )
            input(type="submit" hidden)
          p.title(v-if="editingListName!==listIndex") {{ list.name }} 
            a(@click="() => addTodo(listIndex)")
              icon(name="plus")
            a(@click="() => editingListName=listIndex")
              icon(name="edit")
            a(@click="() => deleteList(listIndex)" style="color: red;" )
              icon(name="times-circle")
          .tile.is-child.is-vertical.box(
            style="max-height: 150px; min-height: 120px;"
            v-for="(item, itemIndex) in list.todos"
            draggable="true"
            @dragstart="() => setSourceIndex(itemIndex, listIndex)"
            @dragover="() => setTargetIndex(itemIndex, listIndex)"
            @dragend="onDragEnd"
          )
            div 
              .level(v-if="itemIndex!==editingItem || listIndex!==editingList")
                div.level-left
                  .level-item.subtitle {{item.name}}
                a.level-right(style="color: red")
                  a(@click="() => editTodo(listIndex, itemIndex)")
                    icon(name="edit")
                  a(@click="() => deleteTodo(listIndex, itemIndex)" style="color: red")
                    icon(name="times-circle")
              p {{item.content}}
            div(v-if="itemIndex===editingItem && listIndex===editingList")
              form(@submit="(ev) => submitEditTodo(ev, listIndex, itemIndex)")
                .field
                  input.input(placeholder="Name" v-model="todoName" )
                .field
                  input.input(placeholder="Content" v-model="todoContent" )

                input.button(type="submit" @click="(ev) => submitEditTodo(ev,listIndex, itemIndex)" ) 
          .tile.is-child.is-vetical.box(
            style=" min-height: 120px;"
            v-if="isAdding===listIndex"
          )
            form(@submit="submitAddTodo")
              .field
                input.input(placeholder="Name" v-model="todoName" )
              .field
                input.input(placeholder="Content" v-model="todoContent" )

                input.button(type="submit" @click="submitAddTodo" ) 
</template>

<script>
import Icon from "vue-awesome";
import { getBoards } from "../services";
import {mapState} from 'vuex';
export default {
  components: {
    Icon
  },
  computed: {
    ...mapState(['storedLists'])
  },
  watch: {
    lists(val) {
      console.log('classic list changed');
      this.$store.commit('setLists', val);
    },
    storedLists(val) {
      console.log('stored lists changed');
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
    } ,
    deleteTodo(listIndex, itemIndex){
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
      if(this.todoName==='' && this.todoContent === ''){
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
    submitAddTodo(ev) {
      console.log('¿rsmda')
      ev.preventDefault();
      if(this.todoName == '' && this.todoContent == '' ){
        this.isAdding=false;
        return;
      }
      const newTodo = {
        name: this.todoName,
        content: this.todoContent
      }
      this.lists[this.isAdding].todos.push(newTodo);
      this.lists = [...this.lists];
      
      this.isAdding=false;
      this.todoName = '';
      this.todoContent = '';
    },
    async getBoards(){
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
      todoName:'',
      todoContent:'',
      editingList: false,
      editingListName: false,
      editingItem: false,
      listName: '',
      isAdding: false,
      sourceItemIndex: null,
      sourceListIndex: null,
      targetItemIndex: null,
      targetListIndex: null,
      lists: [
        {
          name: "arreglo 1",
          todos: [
            { content: '', name: "jaun", id: 1 },
            { content: '', name: "carlos", id: 2 },
            { content: '', name: "ivan", id: 3 }
          ]
        },
        {
          name: "arreglo 2",
          todos: [
            { content: '', name: "franco", id: 4 },
            { content: '', name: "checo", id: 5 },
            { content: '', name: "christian", id: 6 }
          ]
        }
      ]
    };
  }
};
</script>

<style>

</style>
