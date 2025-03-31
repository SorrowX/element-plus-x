<template>
  <el-table-page
    ref="tableRef"
    style="height: 800px"
    :boundary-value="boundaryValue"
    :http-request="getList"
    :columns="columns"
    :pagination="{ defaultPageSize: 20 }"
  >
    <template #header>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="formInline.user" placeholder="姓名" clearable />
        </el-form-item>
        <el-form-item label="活动地点">
          <el-select
            v-model="formInline.region"
            placeholder="活动地点"
            clearable
          >
            <el-option label="上海" value="shanghai" />
            <el-option label="北京" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="formInline.date"
            type="date"
            placeholder="选择时间"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>

        <el-form-item>
          <el-switch
            v-model="value"
            size="large"
            active-text="流体布局"
            inactive-text="固定布局"
            @change="handleChange"
          />
        </el-form-item>
      </el-form>
    </template>
  </el-table-page>
</template>

<script setup>
import { h, reactive, ref } from 'vue'
import { ElLink } from 'element-plus'
const tableRef = ref()
const value = ref(false)
const boundaryValue = ref(500) // 真实业务中，该属性不用传，这里只做demo演示

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

const onSubmit = () => {
  tableRef.value.request({
    ...formInline,
  })
}

const handleChange = (bool) => {
  boundaryValue.value = bool ? 1000 : 500
}

const columns = [
  {
    type: 'selection',
    width: 40,
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
    minWidth: 180,
    cellRenderer({ row }) {
      return h('div', `render_${row.prop1}`)
    },
  },
  {
    label: '字段2',
    prop: 'prop2',
    minWidth: 180,
    formatter(row) {
      return `formatter_${row.prop2}`
    },
  },
  {
    label: '字段3',
    prop: 'prop3',
    minWidth: 180,
  },
  {
    label: '字段4',
    prop: 'prop4',
    minWidth: 180,
  },
  {
    label: '字段5',
    prop: 'prop5',
    minWidth: 180,
  },
  {
    label: '字段6',
    prop: 'prop6',
    minWidth: 180,
  },
  {
    label: '字段7',
    prop: 'prop7',
    minWidth: 180,
  },
  {
    label: '字段8',
    prop: 'prop8',
    minWidth: 180,
  },
  {
    label: '字段9',
    prop: 'prop9',
    minWidth: 180,
  },
  {
    label: '操作',
    width: 120,
    fixed: 'right',
    cellRenderer({ row }) {
      return h('div', {}, [
        h(
          ElLink,
          { type: 'primary', style: { marginRight: '12px' } },
          { default: () => '编辑' }
        ),
        h(
          ElLink,
          { type: 'danger', onClick: handleDel },
          { default: () => '删除' }
        ),
      ])
    },
  },
]

const requestData = (() => {
  const f = ({ current: pageNo, size: pageSize, ...args }) => {
    console.log('参数:', pageNo, pageSize, args)
    const total = f.total
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
              prop6: `字段6_${index}`,
              prop7: `字段7_${index}`,
              prop8: `字段8_${index}`,
              prop9: `字段9_${index}`,
            }
          }),
          total,
        })
      }, 500)
    })
  }
  f.total = Math.ceil(Math.random() * 1000)
  return f
})()

const getList = ({ params, resolve }) => {
  requestData(params).then((res) => {
    resolve(res)
  })
}

const handleDel = () => {
  requestData.total -= 1
  tableRef.value.request({
    ...formInline,
  })
}
</script>

<style lang="scss" scoped>
.demo-form-inline {
  margin: 24px 12px;
  flex: none;
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
