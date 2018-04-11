<template lang="pug" >
  .columns
    menubar
    .column.auto
      content-header
      router-view
</template>

<script>
import Menubar from './Menu';
import ContentHeader from './ContentHeader';
export default {
  components: {
    Menubar, ContentHeader
  }
}
</script>

<style>

</style>
