<template>
  <span :class="ns.b()" v-html="content" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from 'element-plus'
import { textHighlightProps } from './text-highlight'

defineOptions({
  name: 'ElTextHighlight',
})

const ns = useNamespace('text-highlight')

const props = defineProps(textHighlightProps)

const highlightCharacter = (): string => {
  const { content, text, color, ignoreCase } = props
  const regex = new RegExp(text, ignoreCase ? 'gi' : 'g')
  return content.replace(
    regex,
    (t) => `<span style="color: ${color}">${t}</span>`
  )
}

const content = computed(() =>
  props.text ? highlightCharacter() : props.content
)
</script>
