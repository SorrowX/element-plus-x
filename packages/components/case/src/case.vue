<template>
  <div :class="ns.b()">
    <p>{{ t('epx.case.title') }}</p>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useLocale, useNamespace } from 'element-plus'
import { caseEmits, caseProps } from './case'

defineOptions({
  name: 'ElCase',
})

const { t } = useLocale()
const ns = useNamespace('case')

defineProps(caseProps)
defineEmits(caseEmits)

console.log(123, t('el.case.title'))

// init here
</script>
