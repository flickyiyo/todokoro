<template>
  <div 
    draggable="true" 
    class="tile is-child is-vertical is-box"
    @dragstart="dragStart"
    @dragover="dragover"
    style="background-color: red;"
  >
    <div :class="item.priority" >
      <div 
        v-if="isEditing"
        class="level"
      >
      <item-form v-if="editingItem" />

      </div>
    </div>
  </div>
</template>

<script>
import ItemForm from "./ItemForm";
export default {
  components: {
    ItemForm
  },
  data() {
    return {
      editingItem: undefined
    }
  },
  props: {
    itemIndex: {
      required: true,
      type: Number
    },
    item: {
      type: Object,
      required: true
    }
  },
  computed: {},
  methods: {
    dragStart() {
      this.$emit("setSourceIndex", this.itemIndex);
    },
    dragOver() {
      this.$emit("setTargetIndex", this.itemIndex);
    }
  }
};
</script>

<style lang="scss" >
.medium {
  background-color: rgb(254, 252, 98);
}
.low {
  background: lightgreen;
}

.high {
  background-color: rgb(254, 68, 6);
}
</style>
