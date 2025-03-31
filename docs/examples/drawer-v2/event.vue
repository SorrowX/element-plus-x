<template>
  <el-drawer-v2
    title="表单"
    size="500"
    :trigger-props="{
      triggerText: '打开表单',
      text: true,
    }"
    :sure-props="{
      sureText: '提交',
    }"
    @sure="handleSure"
    @cancel="handleCancel"
  >
    <el-form
      ref="formRef"
      style="padding: 24px 16px 16px 8px"
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
    </el-form>
  </el-drawer-v2>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

interface RuleForm {
  name: string
  region: string
}

const ruleForm = reactive<RuleForm>({
  name: '',
  region: '',
})

const formRef = ref()

const handleSure = ({ close }) => {
  return formRef.value.validate((valid, fields) => {
    if (valid) {
      return new Promise((resolve) => {
        setTimeout(() => {
          return resolve(close())
        }, 1000)
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleCancel = ({ close }) => {
  close()
  formRef.value.resetFields()
}
</script>
