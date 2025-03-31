<template>
  <span @click="visible = true"> {{ t('epx.editor.onlineVideo') }} </span>

  <el-dialog
    v-model="visible"
    width="400"
    append-to-body
    draggable
    :modal="false"
    :title="t('epx.editor.onlineVideo')"
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
      <el-form-item :label="t('epx.editor.videoAddress')" prop="src">
        <el-input v-model="ruleForm.src" />
      </el-form-item>
      <el-form-item :label="t('epx.editor.videoWidth')" prop="width">
        <el-input-number
          v-model="ruleForm.width"
          :min="1"
          :max="9999"
          controls-position="right"
          style="width: 100%"
        />
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
import { ElButton, ElDialog, ElInputNumber, useLocale } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const emit = defineEmits(['change'])
const { t } = useLocale()

const visible = ref(false)

interface RuleForm {
  src: string
  width: number
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  src: '',
  width: 320,
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
