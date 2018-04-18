<template lang="pug">
.tile.is-ancestor(style="overflow-x: scroll; padding:10px;")
  .tile.is-4(v-for="(list, listIndex) in lists")
    list(:list="list" :listIndex="listIndex")
    
</template>

<script>
import List from './List';
import { mapMutations, mapState } from "vuex";
export default {
  components: {
    List
  },
  computed: {
    ...mapState(['lists'])
  },
  
};
</script>

<style>

</style>
