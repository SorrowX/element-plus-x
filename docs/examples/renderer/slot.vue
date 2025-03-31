<template>
  <el-renderer v-slot="{ msg }" :data="{ msg: `${msg1} ${msg2}` }">
    <div>{{ msg }}</div>
  </el-renderer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const msg1 = ref('hello')
const msg2 = ref('world')
</script>
