<template>
  <el-table-page
    style="height: 550px"
    :http-request="getList"
    :columns="columns"
    :show-pagination="false"
    :pagination="{ defaultPageSize: 10 }"
  />
</template>

<script setup>
const columns = [
  {
    label: '字段1',
    prop: 'prop1',
  },
  {
    label: '字段2',
    prop: 'prop2',
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
