<template>
  <el-form
    style="max-width: 600px"
    :model="ruleForm"
    label-width="auto"
    status-icon
  >
    <el-form-item label="Activity name" prop="name" required>
      <el-input v-model="ruleForm.name" placeholder="Please input" />
    </el-form-item>
    <el-form-item label="Activity zone" prop="region" required>
      <el-select
        v-model="ruleForm.region"
        clearable
        placeholder="Please select"
      >
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-reset @click="handleReset"> Reset </el-reset>
      <el-submit @submit="handleSubmit"> Submit </el-submit>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

interface RuleForm {
  name: string
  region: string
}

const ruleForm = reactive<RuleForm>({
  name: '',
  region: '',
})

const handleSubmit = (values: RuleForm) => {
  ElMessage.success(JSON.stringify(values, null, 2))
}

const handleReset = () => {
  ElMessage.warning('do something!')
  // return false // 返回false则阻止表单重置
}
</script>
