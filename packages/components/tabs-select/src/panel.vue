<template>
  <div :class="[ns.b(), border ? ns.m('border') : '']" :style="panelStyle">
    <div v-show="showTabs" :class="ns.e('tabs')">
      <el-tabs
        v-model="currentTab"
        v-bind="tabsProps"
        @tab-click="handleTabClick"
      >
        <el-tab-pane
          v-for="(item, index) in tabs"
          :key="index"
          :label="item.title"
          :name="item.id"
        />
      </el-tabs>
    </div>
    <div v-if="showSearch" :class="ns.e('search')">
      <el-input
        v-model="searchKey"
        clearable
        :suffix-icon="Search"
        :placeholder="t('epx.tabsSelect.searchPlaceholder')"
      />
    </div>
    <el-scrollbar :height="height" :class="ns.e('content')">
      <div v-if="loading && remoteMethod" :class="ns.e('loading')">
        {{ t('epx.tabsSelect.loading') }}
      </div>
      <template v-else>
        <template v-if="currentTabInfo.type === 'group'">
          <el-collapse-panel
            v-for="(option, index) in currentOptions"
            v-show="showPanel(index)"
            :key="option[realValueKey] ?? index"
            :title="option.label"
            :collapse="false"
          >
            <el-tree
              v-if="option.children"
              v-bind="treeProps"
              :ref="(treeInstance) => collectTreeInstance(index, treeInstance)"
              default-expand-all
              :data="option.children"
              :expand-on-click-node="false"
              :class="
                !hasChildren(option.children)
                  ? ns.em('tree', 'has-no-subchild')
                  : ''
              "
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
            >
              <template #default="{ data, node }">
                <slot name="option" v-bind="{ data, node }">
                  <div
                    :class="[
                      ns.e('option'),
                      checkSelectedState(data)
                        ? ns.em('option', 'selected')
                        : '',
                    ]"
                  >
                    <span v-if="prefixLabel" :class="ns.e('option-prefix')">
                      {{ prefixLabel }}
                    </span>
                    <span :class="ns.e('option-label')">{{ data.label }}</span>
                  </div>
                </slot>
              </template>
            </el-tree>
          </el-collapse-panel>
          <div v-if="isEmpty" :class="ns.e('empty')" :style="{ height }">
            <slot name="empty">
              <div :class="ns.e('empty-text')">
                {{ emptyText }}
              </div>
            </slot>
          </div>
        </template>
        <template v-if="currentTabInfo.type === 'option'">
          <el-tree
            v-bind="treeProps"
            :ref="(treeInstance) => collectTreeInstance(0, treeInstance)"
            default-expand-all
            :data="currentOptions"
            :expand-on-click-node="false"
            :class="
              !hasChildren(currentOptions)
                ? ns.em('tree', 'has-no-subchild')
                : ''
            "
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
          >
            <template #default="{ data, node }">
              <slot name="option" v-bind="{ data, node }">
                <div
                  :class="[
                    ns.e('option'),
                    checkSelectedState(data) ? ns.em('option', 'selected') : '',
                  ]"
                >
                  <span v-if="prefixLabel" :class="ns.e('option-prefix')">
                    {{ prefixLabel }}
                  </span>
                  <span :class="ns.e('option-label')">{{ data.label }}</span>
                </div>
              </slot>
            </template>
            <template #empty>
              <div :class="ns.e('empty')" :style="{ height }">
                <slot name="empty">
                  <div :class="ns.e('empty-text')">
                    {{ emptyText }}
                  </div>
                </slot>
              </div>
            </template>
          </el-tree>
        </template>
      </template>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, ref, watch } from 'vue'
import {
  ElScrollbar,
  ElTabPane,
  ElTabs,
  ElTree,
  selectKey,
  useLocale,
  useNamespace,
} from 'element-plus'
import { isFunction } from '@element-plus/utils'
import { Search } from '@element-plus/icons-vue'
import { ElCollapsePanel } from '@element-plus/components/collapse-panel/index'
import { panelEmits, panelProps } from './panel'
import type { TreeInstance } from 'element-plus'
import type { IPanelModelValue, ITabItem, ITreeOption } from './panel'

defineOptions({
  name: 'ElTabsSelectPanel',
})

provide(selectKey, null as any)

const props = defineProps(panelProps)
const emit = defineEmits(panelEmits)

const { t } = useLocale()
const ns = useNamespace('tabs-select-panel')

const searchKey = ref<string>('')

const treeRefs = ref<Record<number, TreeInstance>>({})
const collectTreeInstance = (index: number, treeInstance: any) => {
  if (treeInstance) {
    treeRefs.value[index] = treeInstance
  } else {
    delete treeRefs.value[index]
  }
}

const bindValue = computed({
  get() {
    return props.modelValue
  },
  set(value: IPanelModelValue) {
    emit('update:modelValue', value)
  },
})

const hasValueKey = computed(() => !!props.valueKey)
const realValueKey = computed(() => props.valueKey ?? 'value')

const arrBindValue: any = computed(() => {
  return props.multiple
    ? bindValue?.value || []
    : bindValue?.value
    ? [bindValue?.value]
    : []
})

const currentTab = computed({
  get() {
    return props.tab
  },
  set(value: string | number) {
    emit('update:tab', value)
  },
})

const currentTabInfo: any = computed(() => {
  return props.tabs.find((item) => item.id === currentTab.value)
})

const currentOptions = computed(() => {
  return props.tabs.find((item) => item.id === currentTab.value)?.options || []
})

const flattenTreeData = (treeData: ITreeOption[] = []) => {
  const flattenDatas: ITreeOption[] = []

  const stack: ITreeOption[] = []
  for (let i = treeData.length - 1; i >= 0; --i) {
    stack.push(treeData[i])
  }
  while (stack.length) {
    const data = stack.pop()!

    flattenDatas.push(data)
    if (data.children) {
      for (let i = data.children.length - 1; i >= 0; --i) {
        stack.push(data.children[i])
      }
    }
  }

  return flattenDatas
}

const getFlattenOptions = (tabItem: ITabItem) => {
  const { type, options } = tabItem
  if (type === 'group') {
    return (options ?? []).reduce((pre: ITreeOption[], option) => {
      pre.push(...flattenTreeData(option.children))
      return pre
    }, [] as ITreeOption[])
  } else if (type === 'option') {
    return flattenTreeData(options)
  } else {
    return []
  }
}

const currentFlattenOptions = computed(() =>
  getFlattenOptions(currentTabInfo.value)
)

const allFlattenOptions = computed(() =>
  props.tabs.reduce((pre, item) => {
    pre.push(...getFlattenOptions(item))
    return pre
  }, [] as ITreeOption[])
)

const currentSelectedOptions = computed(() => {
  return allFlattenOptions.value.filter((data: ITreeOption) =>
    checkSelectedState(data)
  )
})

const checkSelectedState = (data: ITreeOption) => {
  const valueKey = realValueKey.value
  if (hasValueKey.value) {
    const list = arrBindValue.value
      .map((item: ITreeOption) => item[valueKey])
      .filter((_: ITreeOption) => _)
    return list.includes(data[valueKey])
  } else {
    return arrBindValue.value.includes(data[valueKey])
  }
}

watch(
  () => currentSelectedOptions.value,
  (val) => {
    emit('selected-options-change', val)
  },
  { immediate: true }
)

const handleSearch = () => {
  const value = searchKey.value.trim()
  if (props.remoteMethod && isFunction(props.remoteMethod)) {
    props.remoteMethod(value, currentTab.value as string | number)
  } else {
    Object.values(treeRefs.value).forEach((tree) => {
      tree.filter(value)
    })
  }
}

watch(
  () => searchKey.value,
  () => handleSearch()
)

const filterNode = (value: string, data: any) => {
  const searchValue = value.trim().toLocaleLowerCase()
  if (!searchValue) return true
  return data.label.toLocaleLowerCase().includes(searchValue)
}

const showPanel = (index: number) => {
  const treeInstance = treeRefs.value[index]
  if (!treeInstance) return true
  return !treeInstance.isEmpty
}

const showTabs = computed(() => props.tabs.length > 1)

const hasSearchKey = computed(() => !!searchKey.value.trim())

const emptyText = computed(() =>
  hasSearchKey.value
    ? t('epx.tabsSelect.searchEmptyText')
    : t('epx.common.noData')
)

const isEmpty = computed(() => {
  const treeInstances = Object.values(treeRefs.value)
  const optionsLength = currentOptions.value.length
  if (optionsLength === 0) return true
  if (treeInstances.length) {
    return treeInstances.every((tree) => tree.isEmpty)
  }
  return false
})

const hasChildren = (data: ITreeOption[]) => {
  return data.some((item) => item.children && item.children.length > 0)
}

const handleNodeClick = (data: ITreeOption) => {
  const valueKey = realValueKey.value
  if (hasValueKey.value) {
    if (props.multiple) {
      const list: IPanelModelValue = bindValue.value ?? []

      const index = list.findIndex(
        (item: ITreeOption) => item[props.valueKey!] === data[valueKey]
      )
      if (index === -1) {
        list.push(data)
      } else {
        list.splice(index, 1)
      }
      bindValue.value = list
    } else {
      bindValue.value = data
    }
  } else {
    if (props.multiple) {
      const list: any = bindValue.value
      if (list.includes(data[valueKey])) {
        const newList = list.filter(
          (value: string | number) => value !== data[valueKey]
        )
        bindValue.value = newList
      } else {
        list.push(data[valueKey])
        bindValue.value = list
      }
    } else {
      bindValue.value = data[valueKey]
    }
  }

  emit('change', hasValueKey.value ? data : data[valueKey])
}

const handleTabClick = () => {
  searchKey.value = ''
}

defineExpose({
  currentFlattenOptions,
  allFlattenOptions,
  currentSelectedOptions,
})
</script>
