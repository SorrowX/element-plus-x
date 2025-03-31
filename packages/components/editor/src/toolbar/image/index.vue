<template>
  <span :class="[ns.b()]">
    <el-dropdown trigger="click">
      <Icon :icon="Image" size="20" color="#000000" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <online-image @change="handleOnlineImage" />
          </el-dropdown-item>
          <el-dropdown-item>
            <upload-image
              :trigger-name="t('epx.editor.uploadPicture')"
              @change="handleUploadImage"
            />
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </span>
</template>

<script lang="ts" setup>
import {
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  useLocale,
  useNamespace,
} from 'element-plus'
import * as IconsVue from '@element-plus/components/icons-vue/index'
import Icon from '../icon.vue'
import { useToolBarContext } from '../../hooks'
import UploadImage from '../upload/index.vue'
import OnlineImage from './online.vue'
import type { UploadFile } from 'element-plus'
import type { ISetImageOptions, IToolbarImage } from '../../types'

const ns = useNamespace('editor-image')
const { t } = useLocale()
const { Image } = IconsVue

defineOptions({
  name: 'EditorImage',
  inheritAttrs: false,
})

const toolBarContext = useToolBarContext()

const getEditor = () => toolBarContext.value.editor
const getConfigure = () =>
  toolBarContext.value.configure?.image ?? { onChange: () => {} }

const setImage = (options: ISetImageOptions) => {
  getEditor().chain().focus().setImage(options).run()
}

const handleOnlineImage = (options: ISetImageOptions) => {
  setImage(options)
}

const handleUploadImage = (uploadFile: UploadFile) => {
  const imageConfig: IToolbarImage = getConfigure()
  imageConfig.onChange(uploadFile, (options: ISetImageOptions) => {
    setImage(options)
  })
}
</script>
