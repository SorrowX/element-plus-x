<template>
  <el-form :model="form" label-width="auto">
    <el-form-item prop="list" label="">
      <el-array-table style="width: 100%">
        <el-array-table-column prop="name" label="Name" width="245">
          <template #default="{ $index }">
            <el-form-item>
              <el-editable
                :model-value="form['list'][$index]['name']"
                trigger="icon"
              >
                <el-input v-model="form['list'][$index]['name']" />
              </el-editable>
            </el-form-item>
          </template>
        </el-array-table-column>

        <el-array-table-column prop="date" label="Date" width="245">
          <template #default="{ $index }">
            <el-form-item>
              <el-date-picker
                v-model="form['list'][$index]['date']"
                type="date"
                placeholder="选择日期"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>
          </template>
        </el-array-table-column>

        <el-array-table-column prop="address" label="Address" width="auto">
          <template #default="{ $index }">
            <el-form-item>
              <el-input v-model="form['list'][$index]['address']" />
            </el-form-item>
          </template>
        </el-array-table-column>

        <el-array-table-column label="Operations" width="150" fixed="right">
          <template #default>
            <SortHandle />
            <Remove />
            <MoveDown />
            <MoveUp />
          </template>
        </el-array-table-column>

        <template #addition="{ field }">
          <Addition
            v-if="field.fieldValue.length < 10"
            title="添加"
            :default-value="{}"
            style="margin-top: 12px"
          />
        </template>
      </el-array-table>
    </el-form-item>
  </el-form>
  <!-- <pre>{{ form.list }}</pre> -->
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElArrayTable } from 'element-plus-x'

const { Addition, Remove, MoveDown, MoveUp, SortHandle } = ElArrayTable

const form = reactive({
  list: [
    {
      date: '2025-01-01',
      name: 'Summer1',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2025-01-02',
      name: 'Summer2',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2025-01-03',
      name: 'Summer3',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2025-01-04',
      name: 'Summer4',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ],
})
</script>
