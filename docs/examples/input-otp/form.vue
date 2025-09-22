<template>
  <el-form
    style="max-width: 600px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
  >
    <el-form-item label="验证码" prop="otp" required>
      <el-input-otp v-model="ruleForm.otp" />
    </el-form-item>
    <el-form-item>
      <el-submit type="primary" @submit="handleSubmit"> 提交 </el-submit>
      <el-reset>重置</el-reset>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { isDef } from 'element-plus-x'
import { ElForm, ElMessage } from 'element-plus'
import type { FormRules } from 'element-plus'

const ruleForm = reactive({
  otp: [],
})

const validateOtp = (rule: any, value: any, callback: any) => {
  if (value.length === 6 && value.every((val) => isDef(val) && val !== '')) {
    return /^\d+$/.test(value.join('').trim())
      ? callback()
      : callback('只能输入数字')
  } else {
    return callback(new Error('请输入完整的内容'))
  }
}

const rules = reactive<FormRules<typeof ruleForm>>({
  otp: [{ validator: validateOtp, trigger: 'blur' }],
})

const handleSubmit = (values) => {
  ElMessage.success(JSON.stringify(values, null, 2))
}
</script>
