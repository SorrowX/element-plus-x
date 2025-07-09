<template>
  <div
    style="
      width: 500px;
      height: 500px;
      position: relative;
      border: 1px solid red;
    "
  >
    <ElResizable
      :is-active="true"
      :w="w"
      :h="200"
      :parent-w="500"
      :parent-h="500"
      :is-draggable="true"
      :parent-limitation="true"
      content-class="contentClass"
      @resizing="resize"
      @dragging="resize"
    >
      <h3>Hello World!</h3>
      <p>{{ top }} х {{ left }}</p>
      <p>{{ width }} х {{ height }}</p>
    </ElResizable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      w: 200,
    }
  },

  mounted() {},

  methods: {
    resize(newRect) {
      this.width = newRect.width
      this.height = newRect.height
      this.top = newRect.top
      this.left = newRect.left
    },
  },
}
</script>

<style>
.contentClass {
  display: flex;
}
</style>
