<template>
  <div :class="[ns.b(), $attrs.class]" :style="[rootStyle]">
    <el-icon
      v-if="isLoading"
      :size="iconSize"
      :color="color"
      :class="[ns.e('loading-icon'), loadingKlass]"
    >
      <Loading />
    </el-icon>
    <span
      :class="[ns.e('text'), ns.m(status)]"
      :style="textStyle"
      @click="handleClick"
    >
      {{ text }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ElIcon, useLocale, useNamespace } from 'element-plus'
import { Loading as SnowLoading } from '@element-plus/icons-vue'
import * as IconsVue from '@element-plus/components/icons-vue/index'
import { addUnit } from '@element-plus/utils'
import { loadMoreEmits, loadMoreProps } from './load-more'
const { Loading: CircleLoading } = IconsVue

defineOptions({
  name: 'ElLoadMore',
})

const props = defineProps(loadMoreProps)
const emit = defineEmits(loadMoreEmits)
const { t } = useLocale()

const ns = useNamespace('load-more')

const Loading = computed(() =>
  props.iconType === 'circle' ? CircleLoading : SnowLoading
)

const loadingKlass = computed(() =>
  props.iconType === 'circle' ? ns.m('circle-loading') : ns.m('snow-loading')
)

const isMore = computed(() => props.status === 'more')
const isLoading = computed(() => props.status === 'loading')
const isNoMore = computed(() => props.status === 'noMore')
const isError = computed(() => props.status === 'error')

const calcMoreText = computed(
  () => props.moreText ?? t('epx.loadMore.moreText')
)
const calcLoadingText = computed(
  () => props.loadingText ?? t('epx.loadMore.loadingText')
)
const calcNoMoreText = computed(
  () => props.noMoreText ?? t('epx.loadMore.noMoreText')
)
const calcErrorText = computed(
  () => props.errorText ?? t('epx.loadMore.errorText')
)

const text = computed(() => {
  let text = ''
  if (isMore.value) {
    text = calcMoreText.value
  }
  if (isLoading.value) {
    text = calcLoadingText.value
  }
  if (isNoMore.value) {
    text = calcNoMoreText.value
  }
  if (isError.value) {
    text = calcErrorText.value
  }
  return text
})

const textStyle = computed(() => {
  return {
    color: props.textColor ?? props.color,
  }
})

const rootStyle = computed(() => {
  return {
    height: addUnit(props.height),
  }
})

const handleClick = () => {
  emit('click', props.status)
}
</script>
