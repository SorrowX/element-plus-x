<template>
  <div :class="ns.b()">
    <div
      v-for="(item, index) in options"
      :key="index"
      :class="[ns.e('item'), index === curIndex ? 'active' : '']"
      @click="handleClick(item, index)"
    >
      <span>{{ item.label }}</span>
      <div v-if="index < options.length - 1" :class="ns.m('line')" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useNamespace } from 'element-plus'
import { definePropType } from '@element-plus/utils'
import { CHANGE_EVENT } from '@element-plus/constants'

interface Option {
  label: string
  value: string
}

defineOptions({
  name: 'ElEmojiTabs',
})

defineProps({
  options: {
    type: definePropType<Option[]>(Array),
    default: () => [],
  },
})

const curIndex = ref(0)

const emit = defineEmits({
  [CHANGE_EVENT]: (value: string) => !!value,
})

const ns = useNamespace('emoji-tabs')

const handleClick = (item: Option, index: number) => {
  curIndex.value = index
  emit(CHANGE_EVENT, item.value)
}
</script>
