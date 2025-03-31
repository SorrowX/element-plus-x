<template>
  <el-form :model="form" label-width="auto">
    <el-form-item prop="list" label="对象数组">
      <el-array-items>
        <template #default="{ $record }">
          <div style="display: flex; margin-bottom: 8px">
            <SortHandle />
            <el-form-item label="输入框">
              <el-input v-model="$record['input']" style="width: 180px" />
            </el-form-item>
            <el-form-item label="日期">
              <el-date-picker
                v-model="$record['date']"
                type="date"
                placeholder="选择日期"
              />
            </el-form-item>
            <el-form-item label="选择器">
              <el-select-v2
                v-model="$record['select']"
                :options="options"
                placeholder="请选择"
                style="width: 180px"
              />
            </el-form-item>
            <Remove style="margin-left: 12px" />
            <MoveDown />
            <MoveUp />
          </div>
        </template>
        <template #addition="{ field }">
          <Addition
            v-if="field.fieldValue.length < 5"
            title="添加"
            :default-value="{}"
          />
        </template>
      </el-array-items>
    </el-form-item>
  </el-form>
  <!-- <pre>{{ form.list }}</pre> -->
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElArrayItems } from 'element-plus-x'

const { Addition, Remove, SortHandle, MoveDown, MoveUp } = ElArrayItems

const form = reactive({
  list: [
    {
      input: 'Summer',
      date: '2025-01-15T16:00:00.000Z',
      select: 'Option 1',
    },
  ],
})

const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}))
</script>
