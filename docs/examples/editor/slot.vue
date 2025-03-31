<template>
  <el-editor v-model="value" :options="options" style="width: 320px">
    <!--自定义头-->
    <!-- <template #header>
      <div>header</div>
    </template> -->

    <!--自定义label-->
    <!-- <template #label="{ item, index }">
      <div>{{ item }}-{{ index }}</div>
    </template> -->

    <!--自定义底部-->
    <!-- <template #footer>
      <div>header</div>
    </template> -->

    <!--完全自定义-->
    <template #content="{ items, command }">
      <ul style="list-style: none; margin: 0px; padding: 0">
        <li
          v-for="(item, index) in items"
          :key="index"
          @click="() => command(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </template>
  </el-editor>
</template>

<script setup>
import { ref } from 'vue'
const value = ref(`@`)
const options = ref(
  Array.from({ length: 40 }).map((_, index) => {
    return {
      label: `Summer_${index}`,
      id: `xzw_${index}`,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    }
  })
)
</script>
