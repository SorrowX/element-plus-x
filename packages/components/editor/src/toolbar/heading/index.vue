<template>
  <span :class="[ns.b()]">
    <el-dropdown trigger="click">
      <div :class="[ns.e('trigger'), isActive() ? 'active' : '']">
        H <el-icon style="margin-left: 4px"><ArrowDown /></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="level in 6"
            :key="level"
            :class="ns.e(`item${level}`)"
            @click="handleClick(`heading${level}`)"
          >
            <div
              :class="[
                ns.e('item'),
                getActive(`heading${level}`) ? 'active' : '',
              ]"
            >
              Heading{{ level }}
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </span>
</template>

<script lang="ts" setup>
import {
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  useNamespace,
} from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'

import { useToolBarContext } from '../../hooks'

const ns = useNamespace('editor-heading')

defineOptions({
  name: 'EditorHeading',
  inheritAttrs: false,
})

const toolBarContext = useToolBarContext()

const getEditor = () => toolBarContext.value.editor

const commands: any = {
  heading1: {
    type: 'heading1',
    command: () =>
      getEditor().chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => getEditor().isActive('heading', { level: 1 }),
  },
  heading2: {
    type: 'heading2',
    command: () =>
      getEditor().chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => getEditor().isActive('heading', { level: 2 }),
  },
  heading3: {
    type: 'heading3',
    command: () =>
      getEditor().chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: () => getEditor().isActive('heading', { level: 3 }),
  },
  heading4: {
    type: 'heading4',
    command: () =>
      getEditor().chain().focus().toggleHeading({ level: 4 }).run(),
    isActive: () => getEditor().isActive('heading', { level: 4 }),
  },
  heading5: {
    type: 'heading5',
    command: () =>
      getEditor().chain().focus().toggleHeading({ level: 5 }).run(),
    isActive: () => getEditor().isActive('heading', { level: 5 }),
  },
  heading6: {
    type: 'heading6',
    command: () =>
      getEditor().chain().focus().toggleHeading({ level: 6 }).run(),
    isActive: () => getEditor().isActive('heading', { level: 6 }),
  },
}

const isActive = () => {
  return Object.keys(commands).some((key) => {
    const item = commands[key]
    return item['isActive']()
  })
}

const getActive = (key: string) => {
  return commands[key]['isActive']()
}

const handleClick = (key: string) => {
  const item = commands[key]
  item.command()
}
</script>
