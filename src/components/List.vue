<template lang="pug" >
  .tile.is-vertical.is-parent.box(
    style="margin-left: 15px;"
    @dragover="$emit('setTargetList', listIndex)"
  )
    list-name-form(
      @submit="" 
      :list="list"
      :listIndex="listIndex"
    )
      
</template>

<script>
import { mapMutations } from "vuex";
import ListNameForm from './ListNameForm';
export default {
  components: {
    ListNameForm
  },
  props: {
    list: {
      required: true
    }
  },
  methods: {
    ...mapMutations(["changeListName"]),
    changeName(listName, listIndex) {
      this.changeListName({
        listName,
        listIndex
      });
    }
  }
};
</script>

<style>

</style>
