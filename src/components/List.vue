<template lang="pug" >
  .tile.is-vertical.is-parent.box(
    style="margin-left: 15px; height: 700px;"
    @dragover="$emit('setTargetList', listIndex)"
  )
    list-name-form(
      @submit="" 
      :list="list"
      :listIndex="listIndex"
      v-if="editingList"
    )
    span
      span.title(v-if="!editingList") {{list.name}}
      list-pane(@remove="remove" @edit="editList" @addTodo="addTodo")
      
</template>

<script>
import { mapMutations } from "vuex";
import ListNameForm from './ListNameForm';
import ListPane from './ListPane';
import Icon from 'vue-awesome';
export default {
  components: {
    ListNameForm,
    Icon,
    ListPane
  },
  props: {
    list: {
      required: true
    },
    listIndex: {
      required: true,
      type: Number
    },
    editingList: {
      required: false,
      default: false
    }
  },
  data(){
    return {
      
    }
  },
  methods: {
    ...mapMutations(["changeListName", "deleteList"]),
    editName() {

    },
    remove() {
      this.deleteList();
    },
    changeName(listName, listIndex) {
      this.changeListName({
        listName,
        listIndex
      });
    },
    addTodo() {

    }

  }
};
</script>

<style>
.icon {
  margin-left: 5px;
}
</style>
