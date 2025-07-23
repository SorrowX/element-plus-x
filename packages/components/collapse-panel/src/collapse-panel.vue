<template>
  <div
    :class="[
      ns.b(),
      disabled ? ns.m('disabled') : '',
      visible && dashed ? ns.m('dashed') : '',
      visible ? ns.m('active') : '',
    ]"
  >
    <div :class="[ns.e('header')]">
      <div :class="ns.e('trigger')" @click="handleCollapse">
        <slot name="trigger" v-bind="{ visible }">
          <slot name="arrow" v-bind="{ visible }">
            <el-icon v-if="!disabled" :class="[ns.e('arrow')]">
              <ArrowRight />
            </el-icon>
          </slot>
          <slot name="title" v-bind="{ visible }">
            <span :class="ns.e('title')">{{ title }}</span>
          </slot>
        </slot>
      </div>
      <div :class="ns.e('action')">
        <slot name="action" />
      </div>
    </div>
    <component :is="ElCollapseTransition">
      <div v-show="visible" :class="ns.e('content')">
        <slot />
      </div>
    </component>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ElCollapseTransition, useNamespace } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'

import { collapsePanelEmits, collapsePanelProps } from './collapse-panel'

defineOptions({
  name: 'ElCollapsePanel',
})

const ns = useNamespace('collapse-panel')

const props = defineProps(collapsePanelProps)
const emit = defineEmits(collapsePanelEmits)

const visible = ref(false)

const setVisible = () => {
  const { disabled, collapse } = props
  if (disabled) {
    visible.value = true
    return
  }
  visible.value = !collapse
}

watch(() => [props.disabled, props.collapse], setVisible, {
  immediate: true,
})

const handleCollapse = () => {
  if (props.disabled) return
  visible.value = !visible.value
  emit('change', visible.value)
}
</script>
