<template>
  <el-tooltip
    effect="light"
    placement="top"
    :disabled="!showTip"
    :content="t('epx.editor.linkTip')"
  >
    <Icon :icon="Link" size="18" @click="() => (visible = true)" />
  </el-tooltip>

  <el-dialog
    v-model="visible"
    append-to-body
    draggable
    :modal="false"
    width="400"
    :title="t('epx.editor.link')"
  >
    <el-form
      ref="ruleFormRef"
      label-position="top"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      status-icon
      style="margin-top: 12px"
    >
      <el-form-item :label="t('epx.editor.link')" prop="href">
        <el-input
          v-model="ruleForm.href"
          :placeholder="t('epx.editor.linkPlaceholder')"
        />
      </el-form-item>
      <el-form-item prop="target">
        <el-checkbox v-model="ruleForm.target">
          {{ t('epx.editor.target') }}
        </el-checkbox>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">{{
          t('epx.common.cancel')
        }}</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          {{ t('epx.editor.add') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import {
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  useLocale,
} from 'element-plus'
import * as IconsVue from '@element-plus/components/icons-vue/index'
import Icon from '../icon.vue'
import { useToolBarContext } from '../../hooks'
import type { FormInstance, FormRules } from 'element-plus'

const { Link } = IconsVue

const { t } = useLocale()
const visible = ref(false)

const toolBarContext = useToolBarContext()
const showTip = computed(() => toolBarContext.value.configure.showTip)
const getEditor = () => toolBarContext.value.editor

interface RuleForm {
  target: boolean
  href: string
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  target: true,
  href: '',
})

const rules = reactive<FormRules<RuleForm>>({})

const setLink = () => {
  getEditor()
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({
      href: ruleForm.href,
      target: ruleForm.target ? '_blank' : '_self',
    })
    .run()
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      setLink()
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
