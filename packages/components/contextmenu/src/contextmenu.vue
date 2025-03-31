<template>
  <div :class="ns.b()">
    <div :class="ns.e('trigger')" @contextmenu="handleContextMenu">
      <slot />
    </div>
    <el-tooltip
      v-model:visible="visible"
      effect="light"
      trigger="click"
      placement="bottom-start"
      popper-class="contextmenu__popper-kls"
      :offset="0"
      :hide-after="0"
      virtual-triggering
      :show-arrow="false"
      :gpu-acceleration="false"
      :virtual-ref="triggerRef"
      :transition="`${ns.namespace.value}-zoom-in-top`"
      v-bind="$attrs"
    >
      <template #content>
        <slot name="menu" v-bind="{ data }">
          <div v-if="visible" :class="ns.e('menu')">
            <el-dropdown-v2-panel :options="options" @select="handleChange" />
          </div>
        </slot>
      </template>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from 'element-plus'
import { ElDropdownV2Panel } from '@element-plus/components/dropdown-v2/index'
import { contextmenuEmits, contextmenuProps } from './contextmenu'
import { useContextMenu } from './hooks'
import type { DropdownValue } from '@element-plus/components/dropdown-v2/src/types'

defineOptions({
  name: 'ElContextmenu',
})

defineProps(contextmenuProps)
const emit = defineEmits(contextmenuEmits)

const { visible, triggerRef, handleContextMenu } = useContextMenu()

const ns = useNamespace('contextmenu')

const hide = () => (visible.value = false)

const handleChange = (value: DropdownValue, valuePath: DropdownValue[]) => {
  emit('change', value, valuePath)
  hide()
}

defineExpose({
  hide,
  handleContextMenu,
})
</script>
