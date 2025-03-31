<template>
  <div :class="ns.b()">
    <a
      v-for="(item, index) in list"
      :key="index"
      :title="item.describe"
      :class="[item.className]"
      @click="handleClick(item)"
    >
      {{ item.describe }}
    </a>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from 'element-plus'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { emoticonEmits, emoticonProps } from './emoji'
import { emoticonList } from './helper'
import type { EmoticonListItem } from './helper'

defineOptions({
  name: 'ElEmoticon',
})

const props = defineProps(emoticonProps)
const emit = defineEmits(emoticonEmits)

const model = computed({
  get: () => props.modelValue,
  set: (val: string) => {
    emit(UPDATE_MODEL_EVENT, val)
  },
})

const ns = useNamespace('emoji-face')

const list = computed(() => [...emoticonList])

const handleClick = (item: EmoticonListItem) => {
  model.value = item[props.type] ?? ''
  emit(CHANGE_EVENT, item)
}
</script>
