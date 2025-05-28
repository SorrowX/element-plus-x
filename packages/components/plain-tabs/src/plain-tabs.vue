<template>
  <div :class="ns.b()" :role="type">
    <div :class="ns.e('header')">
      <template v-if="type === 'card'">
        <div :class="ns.e('prepend')">
          <slot name="prepend" />
        </div>
        <div :class="ns.e('list')">
          <div
            v-for="(item, index) in options"
            :key="item.value"
            :class="[
              ns.e('item'),
              item.value === modelValue ? ns.em('item', 'active') : '',
            ]"
            @click="handleClick(item, index)"
          >
            <slot name="label">
              <div v-if="index !== 0" :class="ns.e('placeholder')" />
              <div :class="[ns.e('label')]">
                {{ item.label }}
              </div>
            </slot>
          </div>
        </div>
        <div :class="ns.e('append')">
          <slot name="append" />
        </div>
      </template>
      <template v-if="type === 'line'">
        <div :class="ns.e('nav-list')">
          <div
            v-for="(item, index) in options"
            :key="item.value"
            :class="[
              ns.e('nav-list-item'),
              item.value === modelValue ? ns.em('nav-list-item', 'active') : '',
            ]"
            @click="handleClick(item, index)"
          >
            <slot name="label">
              <el-text :type="item.value === modelValue ? 'primary' : ''">
                {{ item.label }}
              </el-text>
              <el-divider v-if="index !== len" direction="vertical" />
            </slot>
          </div>
        </div>
      </template>
    </div>
    <div :class="ns.e('conent')">
      <slot v-bind="{ action: action, transitionName }" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ElDivider, ElText, useNamespace } from 'element-plus'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { plainTabsEmits, plainTabsProps } from './plain-tabs'
import type { PlainTabsOption } from './plain-tabs'

defineOptions({
  name: 'ElPlainTabs',
})

const props = defineProps(plainTabsProps)
const emit = defineEmits(plainTabsEmits)
const ns = useNamespace('plain-tabs')

const action = ref<'next' | 'prev' | ''>('')
const len = computed(() => (props.options ? props.options.length - 1 : 0))
const transitionName = computed(() =>
  action.value === 'next'
    ? 'next-transition'
    : action.value === 'prev'
    ? 'prev-transition'
    : ''
)

const handleClick = (item: PlainTabsOption, index: number) => {
  if (item.disabled) {
    return
  }
  const preIndex = (props.options ?? [])?.findIndex(
    (_: PlainTabsOption) => _.value === props.modelValue
  )
  const currentIndex = index
  if (preIndex !== currentIndex) {
    action.value = currentIndex > preIndex ? 'next' : 'prev'
  }
  emit(UPDATE_MODEL_EVENT, item.value)
  emit(CHANGE_EVENT, item.value)
}
</script>
