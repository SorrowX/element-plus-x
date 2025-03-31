<template>
  <el-editable
    :model-value="value"
    default-edit-state
    trigger="icon"
    @change="handleChange"
  >
    <el-date-picker
      v-model="value"
      type="date"
      placeholder="请选择"
      value-format="YYYY-MM-DD"
    />
    <template #icon>
      <el-icon color="red"><More /></el-icon>
    </template>
  </el-editable>
</template>

<script setup>
import { ref } from 'vue'
import { ElDatePicker, ElIcon } from 'element-plus'
import { More } from '@element-plus/icons-vue'

const value = ref('')
const handleChange = (bool) => {
  console.log('是否编辑状态:', bool)
}
</script>
