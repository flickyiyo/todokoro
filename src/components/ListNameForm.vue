<template lang="pug" >
  form(@submit="submitListName")
    .field
      input.input(v-model="listName" placeholder="List Name")
    input(type="submit" hidden)
    
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  props: {
    defaultListName: {
      type: String,
      required: true
    },
    list: {
      required: false,
    }
  },
  data() {
    return {
      listName: ""
    };
  },
  computed: {
    ...mapState(["lists"])
  },
  mounted(){
    this.listName = this.list.name || '';
  },
  methods: {
    submitListName(ev) {
      ev.preventDefault();
      if (!this.lists.find(list => this.listName === list.name)) {
        this.$emit('submit', this.listName);
        return;
      }
      alert('List Already in board');
    }
  }
};
</script>

<style>

</style>
