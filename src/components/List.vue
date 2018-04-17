<template lang="pug">
.tile.is-4(v-for="(list, listIndex) in lists")
  .tile.is-vertical.is-parent.box(
    style="margin-left: 15px;"
    @dragover="$emit('setTargetList', listIndex)"
  )
    list-name-form(
      @submitListName="" 
      :name="list.name" 
      :listIndex="listIndex" 
    )
</template>

<script>
import ListNameForm from "./ListNameForm";
import { mapMutations } from "vuex";
export default {
  components: {
    ListNameForm
  },
  props: {
    lists: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapMutations(['changeListName']),
    changeName(listName, listIndex) {
      this.changeListName({
        listName, listIndex
      });
    }
  }
};
</script>

<style>

</style>
