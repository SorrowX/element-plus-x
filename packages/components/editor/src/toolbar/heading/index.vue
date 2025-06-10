<template>
  <span :class="[ns.b()]">
    <el-dropdown trigger="click">
      <div :class="[ns.e('trigger'), isActive() ? 'active' : '']">
        H <el-icon style="margin-left: 4px"><ArrowDown /></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(item, level) in Object.values(commands)"
            :key="level"
            :class="ns.e(`item${level + 1}`)"
            @click="handleClick(item.type)"
          >
            <div :class="[ns.e('item'), getActive(item.type) ? 'active' : '']">
              Heading{{ level + 1 }}
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

type ICommandOption = {
  type: string
  command: () => void
  isActive: () => boolean
}

type ICommands = {
  h1: ICommandOption
  h2: ICommandOption
  h3: ICommandOption
  h4: ICommandOption
  h5: ICommandOption
  h6: ICommandOption
  [key: string]: any
}

const commands: ICommands = {
  h1: {
    type: 'h1',
    command: () =>
      getEditor().chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => getEditor().isActive('heading', { level: 1 }),
  },
  h2: {
    type: 'h2',
    command: () =>
      getEditor().chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => getEditor().isActive('heading', { level: 2 }),
  },
  h3: {
    type: 'h3',
    command: () =>
      getEditor().chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: () => getEditor().isActive('heading', { level: 3 }),
  },
  h4: {
    type: 'h4',
    command: () =>
      getEditor().chain().focus().toggleHeading({ level: 4 }).run(),
    isActive: () => getEditor().isActive('heading', { level: 4 }),
  },
  h5: {
    type: 'h5',
    command: () =>
      getEditor().chain().focus().toggleHeading({ level: 5 }).run(),
    isActive: () => getEditor().isActive('heading', { level: 5 }),
  },
  h6: {
    type: 'h6',
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

const getActive = (key: string) => commands[key]['isActive']()

const handleClick = (key: string) => {
  const item = commands[key]
  item.command()
}
</script>
