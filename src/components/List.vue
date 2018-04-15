<template lang="pug" >
  div
    .tile.is-4(v-for="(list, listIndex) in lists")
      .tile
        .tile.is-vertical.is-parent.box(
          @dragover="$emit('changeTargetListIndex', listIndex)"
        )

</template>

<script>
export default {
  props: {
    lists: {
      type: Object,
      required: true
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
