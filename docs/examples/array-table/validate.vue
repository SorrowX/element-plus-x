<template>
  <el-form ref="ruleFormRef" :model="form" label-width="auto">
    <el-form-item prop="list" label="">
      <el-array-table style="width: 100%">
        <el-array-table-column prop="name" label="Name" width="245">
          <template #default="{ $index }">
            <el-form-item
              :prop="`list[${$index}]['name']`"
              :rules="{
                required: true,
                message: 'name can not be null',
                trigger: 'change',
              }"
            >
              <el-input
                v-model="form['list'][$index]['name']"
                placeholder="Please input"
              />
            </el-form-item>
          </template>
        </el-array-table-column>
        <el-array-table-column prop="date" label="Date" width="245">
          <template #default="{ $index }">
            <el-form-item
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
                value-format="YYYY-MM-DD"
              />
            </el-form-item>
          </template>
        </el-array-table-column>
        <el-array-table-column prop="address" label="Address" width="auto">
          <template #default="{ $index }">
            <el-form-item
              :prop="`list[${$index}]['address']`"
              :rules="{
                required: true,
                message: 'address can not be null',
                trigger: 'change',
              }"
            >
              <el-input
                v-model="form['list'][$index]['address']"
                placeholder="Please input"
              />
            </el-form-item>
          </template>
        </el-array-table-column>
        <el-array-table-column label="Operations" width="130">
          <template #default>
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
import { ElArrayTable } from 'element-plus-x'
import type { FormInstance } from 'element-plus'

const { Addition, Remove, MoveDown, MoveUp } = ElArrayTable
const ruleFormRef = ref<FormInstance>()

const form = reactive({
  list: Array.from({ length: 5 }).map((_, index) => {
    return {
      date: '',
      name: '',
      address: '',
    }
  }),
})

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
