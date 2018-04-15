<template lang="pug" >
div
  .level-left
    .level-item.subtitle {{name}}
  p {{content}}
</template>

<script>
export default {
  props: {
    name: {
      type: String
    },
    content: {
      type: String
    }
  }
}
</script>

<style>

</style>
