<template lang="pug" >
div
  navbar
  div
    router-view
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: { Navbar }
};
</script>

<style lang="scss" >
@import './scss/main.scss';
</style>
