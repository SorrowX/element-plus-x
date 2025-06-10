<template>
  <span :class="[ns.b()]">
    <el-dropdown trigger="click">
      <div :class="[ns.e('trigger'), isActive() ? 'active' : '']">
        {{ title }}
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
import { computed } from 'vue'
import {
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  useLocale,
  useNamespace,
} from 'element-plus'

import { useToolBarContext } from '../../hooks'
import type { ComputedRef } from 'vue'

const { t } = useLocale()
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

type ICommandOption = {
  type: string
  text: string
  command: () => void
  isActive: () => boolean
}

type ICommands = {
  small: ICommandOption
  middel: ICommandOption
  large: ICommandOption
  [key: string]: any
}

const commands: ComputedRef<ICommands> = computed(() => ({
  small: {
    type: 'small',
    text: t('epx.editor.small'),
    command: createToggleFontSize('12px'),
    isActive: () => getEditor().isActive('textStyle', { fontSize: '12px' }),
  },
  middel: {
    type: 'middel',
    text: t('epx.editor.middel'),
    command: createToggleFontSize('14px'),
    isActive: () => getEditor().isActive('textStyle', { fontSize: '14px' }),
  },
  large: {
    type: 'large',
    text: t('epx.editor.large'),
    command: createToggleFontSize('16px'),
    isActive: () => getEditor().isActive('textStyle', { fontSize: '16px' }),
  },
}))

const isActive = () =>
  Object.keys(commands.value).some((key) => {
    const item = commands.value[key]
    return item['isActive']()
  })

const getActive = (key: string) => commands.value[key]['isActive']()

const title = computed(() => {
  const list = Object.values(commands.value)
  const item = list.find((item: ICommandOption) => item.isActive())
  return item ? `Aa ${item.text}` : 'Aa'
})

const handleClick = (key: any) => {
  const item = commands.value[key]
  item.command()
}
</script>
