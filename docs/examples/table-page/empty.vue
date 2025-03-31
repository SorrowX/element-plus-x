<template>
  <el-table-page
    style="height: 600px"
    :http-request="getList"
    :columns="columns"
    :image-size="120"
  />

  <el-table-page
    style="height: 800px"
    :http-request="getList"
    :columns="columns"
    image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
  />

  <el-table-page
    style="height: 800px"
    :http-request="getList"
    :columns="columns"
  >
    <template #empty>
      <div>自定义</div>
      <div>暂无数据</div>
    </template>
  </el-table-page>
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
        return resolve({
          list: [],
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
