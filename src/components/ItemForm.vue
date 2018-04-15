<template lang="pug">
  form(@submit="onSubmit")
    .field
      input.input(placeholder="Name" v-model="itemName" )
    .field
      input.input(placeholder="Content" v-model="itemContent" )
    .field
      input(type="radio" name="priority" v-model="itemPriority" value="low" )
      | Low
      input(type="radio" name="priority" v-model="itemPriority" value="medium" )
      | Medium
      input(type="radio" name="priority" v-model="itemPriority" value="high" )
      | High
      input.button.is-hidden(type="submit" @click="submitAddTodo" ) 
</template>

<script>
export default {
  props: {
    itemIndex: {
      type: Number,
      required: true,
    },
    listIndex: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      itemName: '',
      itemContent: '',
      itemPriority: undefined
    }
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    onSubmit(ev) {
      ev.preventDefault();
      if(this.itemName == '' && this.itemContent == '') {
        this.$emit('hideForm');
        return;
      }
      const todos = this.lists[this.listIndex].todos;
      const flagTodo = todos.find(todo => todo.name === this.itemName);
      if(flagTodo) {
        this.clearFields();
        return;
      }
      const todo = {
        name: this.itemName,
        content: this.itemContent,
        priority: this.itemPriority
      }

      this.$store.commit('addTodo', {
        listIndex: this.listIndex,
        todo
      });
    },
    clearFields() {
      this.itemName = '';
      this.itemContent = '';
      this.itemPriority = undefined;
    }
  }
}
</script>

<style>

</style>
