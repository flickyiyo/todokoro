<template lang="pug">
  .tile.is-child.is-vertical.is-box(draggable='true', @dragstart='dragStart', @dragover='dragover', style='background-color: red;')
  div(:class='item.priority')
    .level(v-if='isEditing')
      item-form(v-if='editingItem===itemIndex && \
      editingList===listIndex', @hideform='hideForm'  )
        div
          .level(v-if='editingItem!==itemIndex || \
          listIndex!==editingList')
            .level-left
              .leve-item.subtitle {{item.name}}
              .level-right
                a(@click='editTodo')
                  icon(name='edit')
                a(@click='deleteTodo', style='color: red')
                  icon(name='times-circle')

</template>

<script>
import ItemForm from "./ItemForm";
import Icon from "vue-awesome";
export default {
  components: {
    ItemForm
  },
  data() {
    return {
      editingItem: undefined
    };
  },
  props: {
    itemIndex: {
      required: true,
      type: Number
    },
    listIndex: {
      required: true,
      type: Number
    },
    item: {
      type: Object,
      required: true
    }
  },
  computed: {},
  methods: {
    dragStart() {
      this.$emit("setSourceIndex", this.itemIndex);
    },
    dragOver() {
      this.$emit("setTargetIndex", this.itemIndex);
    },
    deleteTodo() {
      this.$emit("deleteTodo");
    },
    addTodo(todo) {
      this.$store.commit("hideNewItemForm");
    },
    setEditingItemAndList() {
      this.store.commit('setEditingItemAndList', {
        editingItem: this.itemIndex,
        editingList: this.listIndex
      });
    }
  }
};
</script>

<style lang="scss" >
.medium {
  background-color: rgb(254, 252, 98);
}
.low {
  background: lightgreen;
}

.high {
  background-color: rgb(254, 68, 6);
}
</style>
