<template lang="pug">
  .column.auto
    h1.title Titulo 
      a(@click="upd")
        icon(name="plus")
</template>

<script>
import Icon from "vue-awesome";
export default {
  components: {
    Icon
  },
  methods: {
    upd() {
      this.$store.commit('addList', 'asdnajd')
    }
  }
}
</script>
