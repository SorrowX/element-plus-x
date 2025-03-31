<template>
  <ElTableDialog
    v-model="data"
    row-key="id"
    title="选择客成"
    :http-request="getList"
    :columns="columns"
    :config="{ label: 'prop1' }"
  >
    <template #trigger>
      <el-tag
        v-for="(item, index) in data"
        :key="index"
        style="margin-right: 8px"
        closable
        type="primary"
        @close.stop="handleDel(index)"
      >
        {{ item.prop1 }}
      </el-tag>
      <el-tag type="info">+ 添加</el-tag>
    </template>

    <template #label="{ item, index, close }">
      <div class="item">
        <span>{{ item.prop1 }}-{{ index }}</span>
        <el-icon @click="close"><CircleClose /></el-icon>
      </div>
    </template>
  </ElTableDialog>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { CircleClose } from '@element-plus/icons-vue'

const data = ref([])

const handleDel = (index) => {
  data.value.splice(index, 1)
}

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

<style lang="scss" scoped>
.item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  color: red;

  span {
    color: rgb(96, 98, 102);
  }
  i {
    cursor: pointer;
  }
}
</style>
