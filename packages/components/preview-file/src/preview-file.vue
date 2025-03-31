<template>
  <div :class="ns.b()">
    <template v-for="(item, index) in calcFileList">
      <slot v-bind="{ data: item.data, meta: item.meta }">
        <div
          :key="index"
          :class="ns.e('item')"
          @click="() => handleClick(item)"
        >
          <div :class="ns.e('icon')">
            <el-icon :size="item.meta.iconSize" :color="item.meta.iconColor">
              <el-renderer :renderer="() => h(item.meta.icon)" />
            </el-icon>
          </div>
          <div :class="ns.e('content')">
            <div :class="ns.e('content-name')">
              <el-text>{{ item.meta.name }}</el-text>
            </div>
            <div :class="ns.e('content-desc')">
              <el-text type="info">{{ item.meta.size }}</el-text>
            </div>
          </div>
        </div>
      </slot>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, h } from 'vue'
import { ElIcon, useNamespace } from 'element-plus'
import { ElRenderer } from '@element-plus/components/renderer/index'
import { previewFileEmits, previewFileProps } from './preview-file'
import { getIconState, parseFileName, parseSize } from './helper'
import type { Ref } from 'vue'
import type { FileItem } from './preview-file'
import type { UploadUserFile } from 'element-plus'

defineOptions({
  name: 'ElPreviewFile',
})

const ns = useNamespace('preview-file')
const props = defineProps(previewFileProps)
const emit = defineEmits(previewFileEmits)

const calcFileList: Ref<FileItem[]> = computed(() => {
  const { fileList: list } = props
  return list.map((item: UploadUserFile) => {
    const { fileName, fileNameSuffix } = parseFileName(item.name)
    return {
      data: item,
      meta: {
        name: item.name,
        fileName,
        fileNameSuffix,
        size: parseSize(item.size ?? 0),
        ...getIconState(fileNameSuffix),
      },
    }
  })
})

const handleClick = (item: FileItem) => emit('click', item)
</script>
