<template>
  <ElTableDialog
    v-model="data"
    row-key="id"
    title="选择客成"
    :http-request="getList"
    :columns="columns"
    :config="{ label: 'prop3' }"
    :on-sure="handleSure"
    sure-text="提交"
  >
    <template #trigger>
      <el-button>添加</el-button>
    </template>
  </ElTableDialog>
  <!-- <pre>{{ data }}</pre> -->
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { ElMessage } from 'element-plus'

const data: any = ref([])

setTimeout(() => {
  data.value = [{ id: 2, prop3: '字段3_2' }]
}, 1000)

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

const getDataFormAPI = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const flag = Math.random() > 0.5
      return Math.random() > 0.5
        ? reject('Error')
        : resolve({
            code: flag ? 1 : 0,
            message: flag ? '服务器其他异常情况' : '',
          })
    }, 1000)
  })
}

const handleSure = (data) => {
  return getDataFormAPI().then((res: any) => {
    console.log(res)
    if (res.code === 0) {
      ElMessage.success('成功')
    } else {
      throw new Error(res.message)
    }
  })
}
</script>
