<template>
  <el-plain-tabs v-model="currentTab" :options="tabs" type="card">
    <transition mode="out-in" name="el-fade-in-linear">
      <keep-alive>
        <component :is="currentComp" />
      </keep-alive>
    </transition>
  </el-plain-tabs>
</template>

<script lang="ts" setup>
import { computed, defineComponent, h, ref } from 'vue'
import { ElInput } from 'element-plus'

const CompA = defineComponent({
  setup() {
    const input = ref('hi')
    return () =>
      h(ElInput, {
        modelValue: input.value,
        'onUpdate:modelValue': function (val) {
          input.value = val
        },
      })
  },
})
const CompB = defineComponent({
  setup() {
    const input = ref('Summer')
    return () =>
      h(ElInput, {
        type: 'textarea',
        modelValue: input.value,
        'onUpdate:modelValue': function (val) {
          input.value = val
        },
      })
  },
})
const CompC = () => h('div', {}, '我是组件C')

const currentTab = ref('tab2')

const tabs = ref([
  {
    label: '标签页1',
    value: 'tab1',
  },
  {
    label: '标签页2',
    value: 'tab2',
  },
  {
    label: '标签页3',
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
