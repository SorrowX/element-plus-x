<template>
  <el-tooltip
    :disabled="!overflow"
    placement="top"
    effect="light"
    v-bind="tooltipAttrs"
  >
    <template #content>
      <slot name="content">
        <slot />
      </slot>
    </template>

    <div ref="rootRef" :class="[ns.b(), $attrs?.class]" :style="rootStyle">
      <div :class="[ns.b('container')]">
        <div ref="contentRef" :class="[ns.b('content')]" :style="contentStyle">
          <slot />
        </div>
      </div>
      <div v-if="overflow" :class="ns.b('action')">
        <slot name="action" />
      </div>
    </div>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { computed, ref, useAttrs } from 'vue'
import { useNamespace } from 'element-plus'
import { useOverflow } from '@element-plus/hooks'
import { ellipsisEmits, ellipsisProps } from './ellipsis'
import type { Ref, StyleValue } from 'vue'

defineOptions({
  name: 'ElEllipsis',
})
defineEmits(ellipsisEmits)
const props = defineProps(ellipsisProps)

const ns = useNamespace('ellipsis')
const rootRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()

const { overflow } = useOverflow(rootRef, {
  selectors: `.${ns.b('content')}`,
  condition:
    props.condition ??
    ((contentWidth: number, containerWidth: number) => {
      return Number(props.rows)
        ? contentWidth >= containerWidth
        : contentWidth > containerWidth
    }),
})

const attrs = useAttrs()

const rootStyle = computed(() => (attrs.style as StyleValue) ?? {})

const tooltipAttrs = computed(() => {
  const pureAttrs = {
    ...attrs,
  }
  delete pureAttrs.class
  delete pureAttrs.style
  return pureAttrs
})

const getellipsisStyle = (rows: number) => {
  return {
    overflow: 'hidden',
    display: '-webkit-box',
    'white-space': 'normal',
    'text-overflow': 'ellipsis',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': rows,
  }
}

const contentStyle: Ref<StyleValue> = computed(() => {
  return Number(props.rows) ? getellipsisStyle(Number(props.rows)) : {}
})
</script>
