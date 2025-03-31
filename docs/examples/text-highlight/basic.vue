<template>
  <el-text-highlight :content="content" text="葡萄" />
</template>

<script setup>
import { ref } from 'vue'

const content = ref('吃葡萄不吐葡萄皮，不吃葡萄倒吐葡萄皮。')
</script>
