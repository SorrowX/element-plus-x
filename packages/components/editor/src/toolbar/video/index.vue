<template>
  <span :class="[ns.b()]">
    <el-dropdown trigger="click">
      <div>
        <el-tooltip
          effect="light"
          placement="top"
          :disabled="!showTip"
          :content="t('epx.editor.videoTip')"
        >
          <Icon :icon="Video" size="21" color="#000000" />
        </el-tooltip>
      </div>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <online-video @change="handleOnlineVideo" />
          </el-dropdown-item>
          <el-dropdown-item>
            <upload-video
              :trigger-name="t('epx.editor.uploadVideo')"
              @change="handleUploadVideo"
            />
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
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
import UploadVideo from '../upload/index.vue'
import OnlineVideo from './online.vue'
import type { UploadFile } from 'element-plus'
import type { ISetVideOptions, IToolbarVideo } from '../../types'

const ns = useNamespace('editor-video')
const { t } = useLocale()
const { Video } = IconsVue

defineOptions({
  name: 'EditorVideo',
  inheritAttrs: false,
})

const toolBarContext = useToolBarContext()
const showTip = computed(() => toolBarContext.value.configure.showTip)

const getEditor = () => toolBarContext.value.editor
const getConfigure = () =>
  toolBarContext.value.configure?.video ?? { onChange: () => {} }

const setVideo = (options: ISetVideOptions) => {
  let attrs = ''
  Object.entries(options).forEach(([key, value]) => {
    attrs += `${key}="${value}" `
  })
  const html = `<video ${attrs}></video>`
  getEditor().chain().insertContent(html, {}).focus().run()
}

const handleOnlineVideo = (options: ISetVideOptions) => {
  setVideo(options)
}

const handleUploadVideo = (uploadFile: UploadFile) => {
  const videoConfig: IToolbarVideo = getConfigure()
  videoConfig.onChange(uploadFile, (options: ISetVideOptions) => {
    setVideo(options)
  })
}
</script>
