<template>
  <span ref="triggerRef" :class="ns.b()">
    <slot name="trigger" />
  </span>
  <el-popover
    ref="popoverRef"
    trigger="click"
    placement="top"
    persistent
    virtual-triggering
    :virtual-ref="triggerRef"
    :width="347"
    :show-arrow="false"
    v-bind="$attrs"
    :popper-class="ns.b('popper-class')"
    @before-enter="handleEnter"
    @after-leave="handleLeave"
  >
    <div v-if="visible" :class="ns.b('panpel')">
      <Tabs :options="options" @change="handleChangeTab" />
      <el-scrollbar ref="scrollbarRef" height="300px">
        <transition-alias
          mode="out-in"
          :name="`${ns.namespace.value}-fade-in-linear`"
        >
          <component :is="activeComponent" @change="handleChange" />
        </transition-alias>
      </el-scrollbar>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { Transition, computed, nextTick, ref, unref } from 'vue'
import { ElPopover, ElScrollbar, useLocale, useNamespace } from 'element-plus'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import Emoticon from './emoticon.vue'
import FontEmoticon from './font-emoticon.vue'
import Tabs from './tabs.vue'
import { emojiEmits, emojiProps } from './emoji'
import { COMMOM_TYPE, WX_TYPE } from './helper'
import type { EmoticonListItem, FontEmoticonListItem } from './helper'

const TransitionAlias = Transition

defineOptions({
  name: 'ElEmoji',
})
const props = defineProps(emojiProps)
const emit = defineEmits(emojiEmits)

const ns = useNamespace('emoji')
const { t } = useLocale()

// data
const scrollbarRef = ref()
const popoverRef = ref()
const triggerRef = ref()
const visible = ref(false)
const curTab = ref(WX_TYPE)
const options = ref([
  {
    label: t('epx.emoji.weixinEmoji'),
    value: WX_TYPE,
  },
  {
    label: t('epx.emoji.commonEmoji'),
    value: COMMOM_TYPE,
  },
])

// computed
const activeComponent = computed(() =>
  curTab.value === WX_TYPE ? Emoticon : FontEmoticon
)

// methods
const hidden = () => {
  unref(popoverRef)?.hide?.()
}

const handleChange = (item: EmoticonListItem | FontEmoticonListItem) => {
  hidden()
  const value = item[props.type] ?? item['text']
  emit(UPDATE_MODEL_EVENT, value)
  emit(CHANGE_EVENT, item, curTab.value)
}

const handleEnter = () => {
  visible.value = true
}

const handleLeave = () => {
  if (props.keepAlive) return
  visible.value = false
  curTab.value = WX_TYPE
}

const updateScrollbar = () => {
  nextTick(() => {
    scrollbarRef.value?.update?.()
  })
}

const handleChangeTab = (value: string) => {
  curTab.value = value
  emit('click-tab', value)
}

defineExpose({
  scrollbarRef,
  updateScrollbar,
})
</script>
