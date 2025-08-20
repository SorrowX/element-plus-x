<template>
  <div ref="dropdownRef" v-click-outside="handleClickOutside" :class="ns.b()">
    <div v-if="$slots.header" :class="ns.b('header')">
      <slot name="header" />
    </div>
    <el-scrollbar
      ref="scrollbarRef"
      tag="ul"
      :wrap-class="ns.b('wrap')"
      :view-class="ns.b('list')"
      role="listbox"
      aria-orientation="vertical"
    >
      <slot name="content" v-bind="{ items, command, hide: hiddenPopup }">
        <li
          v-for="(item, index) in items"
          :id="item.id"
          ref="optionRefs"
          :key="index"
          role="option"
          :class="{ active: index === selectedIndex }"
          @click.stop="selectItem(index)"
          @mousemove="handleMouseMove(index)"
        >
          <slot name="label" :item="item" :index="index">
            <el-image
              v-if="item.url"
              :class="ns.b('image')"
              :src="item.url"
              fit="cover"
            />
            <span :class="ns.b('text')">{{ item.label ?? item.id }}</span>
          </slot>
        </li>
      </slot>
    </el-scrollbar>
    <div v-if="$slots.footer" :class="ns.b('footer')">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  ElImage,
  ElScrollbar,
  useNamespace,
  ClickOutside as vClickOutside,
} from 'element-plus'
import { findParentByClassName, scrollIntoView } from '@element-plus/utils'
import type { MentionOption } from '../types'
import type { PropType } from 'vue'

const ns = useNamespace('editor-mention')
const nsEditor = useNamespace('editor')

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const optionRefs = ref<HTMLElement[]>()
const dropdownRef = ref<HTMLElement>()

const selectedIndex = ref(0)

const props = defineProps({
  items: {
    type: Array as PropType<MentionOption[]>,
    required: true,
  },

  command: {
    type: Function,
    required: true,
  },

  hiddenPopup: {
    type: Function,
    required: true,
  },
})

const handleMouseMove = (index: number) => {
  selectedIndex.value = index
}

function scrollInto(index: number) {
  const target = optionRefs.value?.[index]

  if (target) {
    const menu = dropdownRef.value?.querySelector?.(`.${ns.b('wrap')}`)
    if (menu) {
      scrollIntoView(menu as HTMLElement, target)
    }
  }
  scrollbarRef.value?.handleScroll()
}

function onKeyDown({ event }: any) {
  if (event.key === 'ArrowUp') {
    upHandler()
    return true
  }

  if (event.key === 'ArrowDown') {
    downHandler()
    return true
  }

  if (event.key === 'Enter') {
    enterHandler()
    return true
  }

  return false
}

function upHandler() {
  selectedIndex.value =
    (selectedIndex.value + props.items.length - 1) % props.items.length
  scrollInto(selectedIndex.value)
}

function downHandler() {
  selectedIndex.value = (selectedIndex.value + 1) % props.items.length
  scrollInto(selectedIndex.value)
}

function enterHandler() {
  selectItem(selectedIndex.value)
}

function selectItem(index: number) {
  const item = props.items[index]

  if (item) {
    props.command(item)
  }
}

const handleClickOutside = (evt: MouseEvent) => {
  if (!findParentByClassName(evt.target as HTMLElement, nsEditor.b())) {
    props.hiddenPopup()
  }
}

defineExpose({
  onKeyDown,
})
</script>
