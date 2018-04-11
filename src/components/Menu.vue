<template lang="pug">
  .column.is-one-fifth
    aside.menu
      p.menu-label Boards
      ul.menu-list
        li
          router-link(to="/board") My Boards
      p.menu-label Metrics
      ul.menu-list
        li
          router-link(to="/metrics") Metrics
</template>
