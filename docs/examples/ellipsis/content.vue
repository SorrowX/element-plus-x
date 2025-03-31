<template>
  <el-ellipsis style="max-width: 340px" popper-class="ellipsis-popper">
    <el-tag
      v-for="num in 20"
      :key="num"
      style="margin-right: 4px"
      disable-transitions
    >
      tag{{ num }}
    </el-tag>
    <template #content>
      <el-tag
        v-for="num in 20"
        :key="num"
        style="margin: 4px"
        disable-transitions
        type="warning"
      >
        标签{{ num }}
      </el-tag>
    </template>
  </el-ellipsis>
</template>

<style lang="scss">
.ellipsis-popper {
  max-width: 300px;
}
</style>
