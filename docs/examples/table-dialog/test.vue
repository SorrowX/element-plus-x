<template>
  <dynamic-size-list v-bind="dynamicProps" ref="listRef">
    <template #default="{ index, style, data }">
      <div class="item" :style="style">{{ data[index]['label'] }}</div>
    </template>
  </dynamic-size-list>
</template>

<script setup>
import { DynamicSizeList } from 'element-plus'

const onItemRendered = () => {
  console.log('onItemRendered')
}

const widths = Array.from({ length: 1000 }).map(
  () => 25 + Math.floor(Math.random() * 5) + 1
) // greater than 26 less or equal to 30

const list = Array.from({ length: 1000 }).map((_, index) => {
  return { id: index, label: `徐志伟-${index}` }
})

const dynamicProps = {
  width: '100%',
  height: 200,
  estimatedItemSize: 25,
  data: list,
  total: list.length,
  cache: 3,
  className: 'xzw',
  itemSize: (idx) => {
    // return widths[idx]
    return 25
  },
  onItemRendered,
}
</script>
