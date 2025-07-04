<template>
  <div :class="[ns.b(), transition && initial ? ns.m('transition') : '']">
    <div
      ref="wrapper"
      :class="[ns.e('wrapper'), warpperClass]"
      :style="warpperStyle"
    >
      <slot />
      <div
        v-if="overlay && modelValue && hasTrigger"
        :class="ns.e('overlay')"
      />
    </div>
    <slot name="trigger" v-bind="{ hasTrigger }">
      <div v-if="hasTrigger" :class="ns.e('trigger')" @click="handleToggle">
        <span>{{ modelValue ? openText : closeText }}</span>
        <el-icon><ArrowDown v-if="modelValue" /> <ArrowUp v-else /></el-icon>
      </div>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, onUpdated, reactive, ref } from 'vue'
import { ElIcon, useLocale, useNamespace } from 'element-plus'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { readMoreEmits, readMoreProps } from './read-more'
import type { RendererElement } from '@vue/runtime-core'

defineOptions({
  name: 'ElReadMore',
})

const { t } = useLocale()
const ns = useNamespace('read-more')

const props = defineProps(readMoreProps)
const emit = defineEmits(readMoreEmits)

const wrapper = ref()
const initial = ref(false)
const dataset = reactive({
  height: 0,
})

const openText = computed(() => props.openText ?? t('epx.collapse.openText'))
const closeText = computed(() => props.closeText ?? t('epx.collapse.closeText'))

const warpperClass = computed(() =>
  !props.modelValue ? 'is-expanded' : 'is-collapse'
)

const warpperStyle = computed(() => {
  return hasTrigger.value
    ? !props.modelValue
      ? {
          height: `${dataset.height}px`,
        }
      : {
          height: props.height,
        }
    : {
        height: 'auto',
      }
})

const updateDataset = () => {
  const dom: RendererElement = wrapper.value
  if (dom) {
    dataset.height = dom.scrollHeight
  }
}

const hasTrigger = computed(() => {
  const height = Number.parseFloat(props.height)
  const wrapperHeight = dataset.height
  return wrapperHeight > height
})

onMounted(() => {
  updateDataset()
  nextTick(() => {
    initial.value = true
  })
})

onUpdated(() => {
  updateDataset()
})

const handleToggle = () => {
  const value = !props.modelValue
  emit(UPDATE_MODEL_EVENT, value)
  emit(CHANGE_EVENT, value)
}

defineExpose({
  handleToggle,
  hasTrigger,
  updateDataset,
})
</script>
