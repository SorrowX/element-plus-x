<template>
  <el-table-page
    style="height: 720px"
    :http-request="getList"
    class="custom-table"
    :pagination="{ defaultPageSize: 12, pageSizes: [12, 24, 60, 120] }"
  >
    <template #table="{ list }">
      <el-row class="list" :gutter="20">
        <el-col v-for="(item, index) in list" :key="index" :span="6">
          <el-card class="item">
            <p>{{ 'List item ' + item.prop1 }}</p>
          </el-card>
        </el-col>
      </el-row>
    </template>
  </el-table-page>
</template>

<script setup>
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

<style scoped lang="scss">
.list {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  box-sizing: border-box;
  .item {
    height: 200px;
    margin-bottom: 12px;
  }
}
.custom-table,
.custom-table ::v-deep(.ep-table-wrapper--fixed) {
  overflow-x: hidden !important;
}
</style>
