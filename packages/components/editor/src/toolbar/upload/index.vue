<template>
  <el-upload
    ref="upload"
    :limit="1"
    :on-exceed="handleExceed"
    :on-change="handleCahnge"
    :auto-upload="false"
    :show-file-list="false"
  >
    <template #trigger>
      <span>{{ triggerName }}</span>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { genFileId } from 'element-plus'
import type {
  UploadFile,
  UploadInstance,
  UploadProps,
  UploadRawFile,
} from 'element-plus'

defineOptions({
  name: 'EditorUpload',
})

defineProps({
  triggerName: {
    type: String,
  },
})

const emit = defineEmits(['change'])
const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const handleCahnge = (uploadFile: UploadFile) => {
  emit('change', uploadFile)
}
</script>
