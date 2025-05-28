<template>
  <el-plain-tabs v-model="currentTab" :options="tabs" type="card">
    <template #default="{ transitionName }">
      <transition mode="out-in" :name="transitionName">
        <component :is="currentComp" class="plain-tabs-container" />
      </transition>
    </template>
  </el-plain-tabs>
</template>

<script lang="ts" setup>
import { computed, h, ref } from 'vue'

const CompA = () => h('div', '我是组件A')
const CompB = () => h('div', '我是组件B')
const CompC = () => h('div', '我是组件C')

const currentTab = ref('tab1')

const tabs = ref([
  {
    label: '商品/营销素材',
    value: 'tab1',
  },
  {
    label: '快捷回复素材',
    value: 'tab2',
  },
  {
    label: '测试啊',
    value: 'tab3',
  },
])

const currentComp = computed(() =>
  currentTab.value === 'tab1'
    ? CompA
    : currentTab.value === 'tab2'
    ? CompB
    : CompC
)
</script>

<style lang="scss">
.plain-tabs-container {
  width: 100%;
  height: 200px;
  overflow: auto;
  padding: 16px 12px;
  border: 1px solid var(--el-border-color-light);
}
</style>
