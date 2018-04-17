<template lang="pug" >
  .tile.is-ancestor(style="overflow-x: auto;")
    .tile.is-4(v-for="(list, listIndex) in lists")
      .tile
        .tile.is-vertical.is-parent.box(
          style="margin-left: 15px"
          @dragover=""
        )
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Item from './Item';
export default {
  components: {
    Item
  },
  computed: {
    ...mapState(["lists"])
  },
  methods: {
    ...mapMutations(['addList', 'addTodo']),
  }
};
</script>

<style>

</style>
