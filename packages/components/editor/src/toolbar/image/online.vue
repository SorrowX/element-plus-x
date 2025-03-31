<template>
  <span @click="visible = true"> {{ t('epx.editor.onlinePicture') }} </span>

  <el-dialog
    v-model="visible"
    width="400"
    append-to-body
    draggable
    :modal="false"
    :title="t('epx.editor.onlinePicture')"
  >
    <el-form
      ref="ruleFormRef"
      label-position="top"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      status-icon
      style="margin-top: 16px"
    >
      <el-form-item :label="t('epx.editor.pictureAddress')" prop="src">
        <el-input v-model="ruleForm.src" />
      </el-form-item>
      <el-form-item :label="t('epx.editor.pictureDescription')" prop="alt">
        <el-input v-model="ruleForm.alt" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">
          {{ t('epx.common.cancel') }}
        </el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          {{ t('epx.editor.insert') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElButton, ElDialog, useLocale } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const { t } = useLocale()
const emit = defineEmits(['change'])

const visible = ref(false)

interface RuleForm {
  src: string
  alt: string
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  src: '',
  alt: '',
})

const rules = reactive<FormRules<RuleForm>>({})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      emit('change', { ...ruleForm })
      formEl.resetFields()
      visible.value = false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  visible.value = false
  formEl.resetFields()
}
</script>
