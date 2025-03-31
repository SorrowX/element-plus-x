<template>
  <el-table-page
    ref="tableRef"
    row-key="id"
    style="height: 750px"
    :http-request="getList"
    :columns="columns"
    :pagination="{ showRecord: false, showTotal: false, defaultPageSize: 10 }"
    @radio-selection-change="handleSelectionChange"
  >
    <template #header>
      <div class="table-page__header">
        <el-button @click="handleSelect">获取选中行</el-button>
        <el-button @click="handleSelect1">选中第三行的row</el-button>
        <el-button @click="handleSelect2">取消第三行的row</el-button>
        <el-button @click="handleSelect3">取消选中的row</el-button>
      </div>
    </template>
  </el-table-page>
</template>

<script setup>
import { h, ref } from 'vue'
const tableRef = ref()

const radioSelection = ref(null)
const handleSelectionChange = (row) => {
  radioSelection.value = row
  console.log('通过事件获取当前选中值:', row)
}

const columns = [
  {
    type: 'radio',
    reserveRadioSelection: true,
  },
  {
    type: 'index',
    width: 80,
    headerCellRenderer(data) {
      return h('span', '序号')
    },
  },
  {
    label: '字段1',
    prop: 'prop1',
    cellRenderer({ row }) {
      return h('div', `render_${row.prop1}`)
    },
  },
  {
    label: '字段2',
    prop: 'prop2',
    formatter(row) {
      return `formatter_${row.prop2}`
    },
  },
  {
    label: '字段3',
    prop: 'prop3',
  },
  {
    label: '字段4',
    prop: 'prop4',
  },
  {
    label: '字段5',
    prop: 'prop5',
  },
]
const handleSelect = () => {
  const table = tableRef.value.getTable()
  console.log(table.getRadioSelectionRow())
}

const handleSelect1 = () => {
  const table = tableRef.value.getTable()
  table.clearRadioSelection()
  table.toggleRadioRowSelection(table['data'][2], true)
}

const handleSelect2 = () => {
  const table = tableRef.value.getTable()
  table.toggleRadioRowSelection(table['data'][2], false)
}

const handleSelect3 = () => {
  const table = tableRef.value.getTable()
  table.clearRadioSelection()
}

const requestData = (() => {
  const total = Math.ceil(Math.random() * 1000)
  return ({ current: pageNo, size: pageSize }) => {
    console.log('分页参数:', pageNo, pageSize)
    return new Promise((resolve) => {
      setTimeout(() => {
        const totalPages = Math.ceil(total / pageSize)
        const size = (pageNo - 1) * pageSize

        return resolve({
          list: Array.from({
            length: pageNo === totalPages ? total % size : pageSize,
          }).map((_, index) => {
            const base = (pageNo - 1) * pageSize
            index = base + index + 1
            return {
              prop1: `字段1_${index}`,
              prop2: `字段2_${index}`,
              prop3: `字段3_${index}`,
              prop4: `字段4_${index}`,
              prop5: `字段5_${index}`,
              id: index,
            }
          }),
          total,
        })
      }, 500)
    })
  }
})()

const getList = ({ params, resolve }) => {
  requestData(params).then((res) => {
    resolve(res)
  })
}
</script>

<style>
.table-page__header {
  margin-bottom: 12px;
  flex: none;
}
</style>
