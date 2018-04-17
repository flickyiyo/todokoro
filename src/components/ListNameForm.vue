<template lang="pug" >
  form(@submit="submitListName")
    .field
      input.input(placeholder="List Name")
    input(type="submit" hidden)
    
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  props: {
    defaultListName: {
      type: String,
      required: true
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
  methods: {
    submitListName(ev) {
      ev.preventDefault();
      if (!this.lists.find(list => this.listName === list.name)) {
        this.$emit('submitListName', this.listName);
        return;
      }
      alert('List Already in board');
    }
  }
};
</script>

<style>

</style>
