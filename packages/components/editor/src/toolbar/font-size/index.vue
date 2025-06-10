<template>
  <span :class="[ns.b()]">
    <el-dropdown trigger="click">
      <div :class="[ns.e('trigger'), isActive() ? 'active' : '']">
        {{ getText() }}
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(item, key) in commands"
            :key="key"
            :class="ns.e(`item-${key}`)"
            @click="handleClick(key)"
          >
            <div :class="[ns.e('item'), getActive(`${key}`) ? 'active' : '']">
              {{ item.text }}
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
  useNamespace,
} from 'element-plus'

import { useToolBarContext } from '../../hooks'

const ns = useNamespace('editor-fontsize')

defineOptions({
  name: 'EditorFontSize',
  inheritAttrs: false,
})

const toolBarContext = useToolBarContext()

const getEditor = () => toolBarContext.value.editor

const createToggleFontSize = (fontsize: string) => {
  let selected = false
  return () => {
    selected = !selected
    selected
      ? getEditor().chain().focus().setFontSize(fontsize).run()
      : getEditor().chain().focus().unsetFontSize().run()
  }
}

const commands: any = {
  small: {
    type: 'small',
    text: '小',
    command: createToggleFontSize('12px'),
    isActive: () => getEditor().isActive('textStyle', { fontSize: '12px' }),
  },
  middel: {
    type: 'middel',
    text: '中',
    command: createToggleFontSize('14px'),
    isActive: () => getEditor().isActive('textStyle', { fontSize: '14px' }),
  },
  large: {
    type: 'large',
    text: '大',
    command: createToggleFontSize('16px'),
    isActive: () => getEditor().isActive('textStyle', { fontSize: '16px' }),
  },
}

const isActive = () =>
  Object.keys(commands).some((key) => {
    const item = commands[key]
    return item['isActive']()
  })

const getActive = (key: string) => commands[key]['isActive']()

const getText = () => {
  const list = Object.values(commands)
  const item = list.find((item: any) => item.isActive()) as any
  return item ? `Aa ${item.text}` : 'Aa'
}

const handleClick = (key: any) => {
  const item = commands[key]
  item.command()
}
</script>
