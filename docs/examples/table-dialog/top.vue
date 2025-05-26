<template>
  <ElTableDialog
    v-model="data"
    row-key="id"
    title="选择客成"
    :http-request="getList"
    :columns="columns"
    hidden-right
    type="radio"
    :config="{ label: 'prop3' }"
  >
    <template #trigger>
      <el-button>添加</el-button>
    </template>
    <template #top>
      <el-steps style="padding: 0 20px; margin-bottom: 12px">
        <el-step title="Step 1" />
        <el-step title="Step 2" />
        <el-step title="Step 3" />
      </el-steps>
    </template>
    <template #footer>
      <div style="display: flex; justify-content: flex-end; padding: 12px">
        <el-button> 取消 </el-button>
        <el-button type="primary"> 下一步 </el-button>
      </div>
    </template>
  </ElTableDialog>
  <!-- <pre>{{ data }}</pre> -->
</template>

<script setup lang="ts">
import { h, ref } from 'vue'

const data = ref([{ id: 2, prop3: '字段3_2' }])

const requestData = (() => {
  const f = ({ current: pageNo, size: pageSize, ...args }: any) => {
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
              id: index,
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

const getList = ({ params, resolve }: any) => {
  requestData(params).then((res) => {
    resolve(res)
  })
}

const columns = [
  {
    type: 'index',
    width: 60,
    headerCellRenderer(data: any) {
      return h('span', '序号')
    },
  },
  {
    label: '联系人',
    prop: 'prop1',
  },
  {
    label: '手机号码',
    prop: 'prop2',
  },
  {
    label: '分配客成',
    prop: 'prop3',
  },
]
</script>
