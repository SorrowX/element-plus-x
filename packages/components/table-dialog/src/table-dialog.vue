<template>
  <div :class="ns.b()">
    <div :class="ns.e('trigger')" @click="openDialog">
      <slot name="trigger" />
    </div>
    <el-dialog
      v-model="visible"
      :title="title"
      :width="width"
      append-to-body
      :modal-class="ns.e('class')"
      v-bind="$attrs"
    >
      <div>
        <slot name="top" />
        <div
          ref="tableWrapperRef"
          :class="ns.e('body')"
          :style="{ height: wrapperHeight }"
        >
          <slot name="left" />
          <ep-table-page
            ref="tableRef"
            v-bind="$attrs"
            :row-key="rowKey"
            :columns="columns"
            :pagination="pagination"
            :class="ns.e('body-left')"
            :header-cell-style="headerCellStyle"
            :boundary-value="boundaryValue"
            @radio-selection-change="handlelection"
            @select="handleSelect"
            @select-all="handleSelectAll"
            @data-change="updateSelectionState"
          >
            <template #header>
              <slot name="header" />
            </template>
          </ep-table-page>
          <div v-show="!hiddenRight" :class="ns.e('body-right')">
            <div class="title">
              <slot name="title" v-bind="{ selectList, closeDialog }">
                {{ selectedFieldTitle }}
              </slot>
            </div>
            <dynamic-size-list v-bind="calcDynamicSizeListProps">
              <template #default="{ index, style, data }">
                <div :key="index" class="select-item" :style="style">
                  <slot
                    name="label"
                    v-bind="{
                      item: data[index],
                      index,
                      close: () => handleDelete(data[index]),
                    }"
                  >
                    <div class="text">
                      {{ data[index][labelKey] }}
                    </div>
                    <div
                      class="cursor-pointer"
                      @click="handleDelete(data[index])"
                    >
                      <el-icon>
                        <Close />
                      </el-icon>
                    </div>
                  </slot>
                </div>
              </template>
            </dynamic-size-list>
          </div>
          <slot name="right" />
        </div>
        <slot name="footer">
          <div :class="ns.e('footer')">
            <div>
              <el-button @click="handleCancel">
                {{ cancelText ?? t('epx.common.cancel') }}
              </el-button>
              <el-button :loading="loading" type="primary" @click="handleSure">
                {{ sureText ?? t('epx.common.sure') }}
              </el-button>
            </div>
          </div>
        </slot>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue'
import {
  DynamicSizeList,
  ElButton,
  ElDialog,
  ElIcon,
  useLocale,
  useNamespace,
} from 'element-plus'
import EpTablePage from '@element-plus/components/table-page'
import { CANCEL_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { Close } from '@element-plus/icons-vue'
import { tableDialogEmits, tableDialogProps } from './table-dialog'

defineOptions({
  name: 'ElTableDialog',
  inheritAttrs: false,
})

const props = defineProps(tableDialogProps)
const emit = defineEmits(tableDialogEmits)

const { t } = useLocale()
const ns = useNamespace('table-dialog')

const visible = ref(false)
const selectList: any = ref([])
const tableRef = ref()
const tableWrapperRef = ref()
const loading = ref(false)

const selectedFieldTitle = computed(
  () => props.selectedFieldTitle || t('epx.tableDialog.selectedField')
)
const columns = computed(() => {
  let columns: any = props.columns ?? []
  const column =
    props.type === 'checkbox'
      ? {
          type: 'selection',
          reserveSelection: false,
          width: 50,
          selectable: props.selectable,
        }
      : props.type === 'radio'
      ? {
          type: 'radio',
          reserveRadioSelection: false,
          width: 50,
          selectable: props.selectable,
        }
      : null
  if (column) {
    columns = [column, ...columns]
  }
  return columns
})
const rowKey = computed(() => {
  return props.rowKey || (props.config as any).id
})
const labelKey = computed(() => (props.config as any).label)
const isCheckbox = computed(() => props.type === 'checkbox')
const pagination = computed(() => {
  const pagination = props.pagination
  return {
    showRecord: false,
    showTotal: true,
    background: false,
    layout: 'sizes, prev, pager, next',
    // size: 'small',
    ...(pagination as any),
  }
})
const wrapperHeight = computed(() => {
  const height = Number.parseInt(String(props.height))
  return typeof height === 'number' ? `${height}px` : props.height
})
const boundaryValue = computed(() => props.boundaryValue ?? 50)
const calcDynamicSizeListProps = computed(() => {
  return {
    width: 295,
    height: Number.parseInt(String(props.height)) - 40,
    estimatedItemSize: 32,
    data: selectList.value,
    total: selectList.value.length,
    cache: 3,
    className: 'select-list',
    itemSize: () => 32,
    ...props.dynamicSizeListProps,
  }
})

const updateStatus = () => {
  nextTick(() => {
    selectList.value = [...props.modelValue]
    updateSelectionState()
  })
}
const openDialog = () => {
  visible.value = true
  updateStatus()
}
// 处理modelValue异步绑定
watch(
  () => props.modelValue,
  () => updateStatus()
)

const closeDialog = () => {
  visible.value = false
}
const has = (row: any) => {
  const key = rowKey.value
  return !!selectList.value?.find((_: any) => _?.[key] === row[key])
}
const del = (row: any) => {
  const key = rowKey.value
  const index = selectList.value.findIndex((_: any) => _?.[key] === row[key])
  if (index > -1) {
    selectList.value.splice(index, 1)
  }
}
const clear = () => {
  selectList.value = []
}
const add = (rows: any) => {
  rows.forEach((row: any) => {
    if (!has(row)) {
      props.unshift ? selectList.value.unshift(row) : selectList.value.push(row)
    }
  })
}
const handleSelect = (selection: any[], row: any) => {
  const key = rowKey.value
  const isAdd = !!selection?.find((_) => _[key] === row[key])
  isAdd ? add([row]) : del(row)
}
const handleSelectAll = (rows: any[]) => {
  if (rows.length === 0) {
    const table = tableRef.value.getTable()
    table.data.forEach((row: any) => del(row))
  } else {
    add(rows)
  }
}
const handlelection = (selection: any) => {
  if (!isCheckbox.value) {
    const list = Array.isArray(selection) ? selection : [selection]
    clear()
    add(list)
    return
  }
}
const handleDelete = (item: any) => {
  const key = rowKey.value
  const value = item[key]
  const table = tableRef.value.getTable()
  const row = table.data.find((_: any) => _[key] === value)
  if (row) {
    isCheckbox.value
      ? table.toggleRowSelection(row, false)
      : table.toggleRadioRowSelection(row, false)
  }
  del(item)
}
const updateSelectionState = () => {
  nextTick(() => {
    const key = rowKey.value
    const table = tableRef.value?.getTable?.()
    const tableData = table?.data ?? []
    tableData.forEach((row: any) => {
      const index = selectList.value.findIndex((_: any) => _[key] === row[key])
      if (index !== -1) {
        isCheckbox.value
          ? table.toggleRowSelection(row, true)
          : table.toggleRadioRowSelection(row, true)
      } else {
        isCheckbox.value
          ? table.toggleRowSelection(row, false)
          : table.toggleRadioRowSelection(row, false)
      }
    })
  })
}
const handleSure = async () => {
  let error = false
  const values = [...selectList.value]
  try {
    loading.value = true
    await props.onSure?.(values, {
      loading,
      closeDialog,
    })
  } catch {
    error = true
  }
  loading.value = false
  if (!error) {
    emit(UPDATE_MODEL_EVENT, values)
    closeDialog()
  }
}
const handleCancel = () => {
  emit(CANCEL_EVENT)
  closeDialog()
}

const getTable = (...args: any) => tableRef.value?.getTable?.apply(null, args)
const request = (...args: any) => tableRef.value?.request?.apply(null, args)

defineExpose({
  openDialog,
  closeDialog,
  getTable,
  request,
  updateStatus,
})
</script>
