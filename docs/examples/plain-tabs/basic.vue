<template>
  <el-plain-tabs v-model="currentTab" :options="tabs">
    <transition mode="out-in" name="el-fade-in-linear">
      <template v-if="currentTab === 'tab1'">
        <div>我是内容A</div>
      </template>
      <template v-else-if="currentTab === 'tab2'">
        <div>我是内容B</div>
      </template>
      <template v-else>
        <div>我是内容C</div>
      </template>
    </transition>
  </el-plain-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentTab = ref('tab1')

const tabs = ref([
  {
    label: '企业素材',
    value: 'tab1',
  },
  {
    label: '个人素材',
    value: 'tab2',
  },
  {
    label: '免费素材',
    value: 'tab3',
  },
])
</script>
