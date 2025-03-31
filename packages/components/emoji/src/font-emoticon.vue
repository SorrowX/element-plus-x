<template>
  <div :class="ns.b()">
    <span
      v-for="(item, index) in peopleList"
      :key="index"
      :class="ns.e('native')"
      @click="handleClick(item)"
    >
      {{ item.text }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from 'element-plus'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { emoticonEmits, emoticonProps } from './emoji'
import { useFontEmoticon } from './helper'
import type { FontEmoticonListItem } from './helper'

defineOptions({
  name: 'ElFontEmoticon',
})

const props = defineProps(emoticonProps)
const emit = defineEmits(emoticonEmits)

const model = computed({
  get: () => props.modelValue,
  set: (val: string) => {
    emit(UPDATE_MODEL_EVENT, val)
  },
})

const ns = useNamespace('font-emoticon')

const { peopleList } = useFontEmoticon()

const handleClick = (item: FontEmoticonListItem) => {
  model.value = item['text'] ?? ''
  emit(CHANGE_EVENT, item)
}
</script>
