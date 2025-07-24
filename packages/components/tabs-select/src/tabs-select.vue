<template>
  <el-select
    v-model="bindValue"
    :class="ns.b()"
    :multiple="multiple"
    v-bind="$attrs"
    :popper-class="ns.m('popper')"
  >
    <template #header>
      <Panel
        v-model="bindValue"
        v-model:tab="curTab"
        :tabs="tabs"
        :multiple="multiple"
        :border="false"
        :prefix-label="prefixLabel"
        :tabs-props="tabsProps"
        :tree-props="treeProps"
        @selected-options-change="handleSelectedChange"
      />
    </template>
    <template #default>
      <div style="display: none">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </div>
    </template>
  </el-select>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ElOption, ElSelect, useNamespace } from 'element-plus'
import { tabsSelectEmits, tabsSelectProps } from './tabs-select'
import Panel from './panel.vue'
import type { ITreeOption } from './panel'

defineOptions({
  name: 'ElTabsSelect',
  inheritAttrs: false,
})

const props = defineProps(tabsSelectProps)
const emit = defineEmits(tabsSelectEmits)

const ns = useNamespace('tabs-select')
const options = ref<ITreeOption[]>([])

const bindValue = computed({
  get() {
    return props.modelValue
  },
  set(value: string | number | string[] | number[]) {
    emit('update:modelValue', value)
  },
})

const curTab = ref(props['tabs'][0]?.id || '')

const handleSelectedChange = (selectedOptions: ITreeOption[]) => {
  options.value = selectedOptions
}
</script>
