<template>
  <el-select
    v-bind="$attrs"
    ref="selectRef"
    v-model="bindValue"
    :class="ns.b()"
    :multiple="multiple"
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
        :panel-style="panelStyle"
        :max-height="maxHeight"
        :show-search="showSearch"
        @selected-options-change="handleSelectedChange"
        @change="handleChange"
      >
        <template #option="scoped">
          <slot v-bind="scoped" name="option" />
        </template>
      </Panel>
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
const selectRef = ref()

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

const handleChange = (
  val: string | number | string[] | number[],
  data: ITreeOption
) => {
  if (!props.multiple) {
    selectRef.value.handleClickOutside()
  }
  emit('change', val, data)
}
</script>
