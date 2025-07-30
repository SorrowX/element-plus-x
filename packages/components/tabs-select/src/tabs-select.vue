<template>
  <el-select
    v-bind="$attrs"
    ref="selectRef"
    v-model="bindValue"
    :class="ns.b()"
    :multiple="multiple"
    :value-key="valueKey"
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
        :value-key="valueKey"
        :loading="loading"
        :remote-method="remoteMethod"
        @change="handleChange"
        @selected-options-change="handleSelectedChange"
      >
        <template #option="scoped">
          <slot v-bind="scoped" name="option" />
        </template>
      </Panel>
    </template>

    <div style="display: none">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </div>

    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </el-select>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ElOption, ElSelect, useNamespace } from 'element-plus'
import { tabsSelectEmits, tabsSelectProps } from './tabs-select'
import Panel from './panel.vue'
import type { IPanelModelValue, ITreeOption } from './panel'

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
  set(value: IPanelModelValue) {
    emit('update:modelValue', value)
  },
})

const curTab = ref(props['tabs'][0]?.id || '')

const handleSelectedChange = (selectedOptions: ITreeOption[]) => {
  options.value = selectedOptions
}

const handleChange = (val: IPanelModelValue) => {
  if (!props.multiple) {
    selectRef.value.handleClickOutside()
  }
  emit('change', val)
}
</script>
