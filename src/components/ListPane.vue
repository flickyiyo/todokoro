<template lang="pug">
span
  a.icon(@click="$emit('addTodo')")
    icon(name="plus")
  a.icon(@click="$emit('edit')")
    icon(name="edit")
  a.icon(style="color: red;" @click="$emit('remove')" )
    icon(name="times-circle")
      
</template>
  
<script>
import Icon from 'vue-awesome';
export default {
  components: {
    Icon
  }
}
</script>
