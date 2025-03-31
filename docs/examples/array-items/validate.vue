<template>
  <el-form ref="ruleFormRef" :model="form" label-width="auto">
    <el-form-item prop="list">
      <el-array-items>
        <template #default="{ $index }">
          <div style="display: flex; margin-bottom: 8px">
            <SortHandle />
            <el-form-item
              label="输入框"
              :prop="`list[${$index}]['input']`"
              :rules="{
                required: true,
                message: 'input can not be null',
                trigger: 'change',
              }"
            >
              <el-input
                v-model="form['list'][$index]['input']"
                style="width: 180px"
                placeholder="Please input"
              />
            </el-form-item>
            <el-form-item
              label="日期"
              :prop="`list[${$index}]['date']`"
              :rules="{
                required: true,
                message: 'date can not be null',
                trigger: 'change',
              }"
            >
              <el-date-picker
                v-model="form['list'][$index]['date']"
                type="date"
                placeholder="Please select"
              />
            </el-form-item>
            <el-form-item
              label="选择器"
              :prop="`list[${$index}]['select']`"
              :rules="{
                required: true,
                message: 'select can not be null',
                trigger: 'change',
              }"
            >
              <el-select-v2
                v-model="form['list'][$index]['select']"
                :options="options"
                placeholder="Please select"
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
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Create
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
  <!-- <pre>{{ form.list }}</pre> -->
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElArrayItems } from 'element-plus-x'
import type { FormInstance } from 'element-plus'

const { Addition, Remove, SortHandle, MoveDown, MoveUp } = ElArrayItems

const ruleFormRef = ref<FormInstance>()

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

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
