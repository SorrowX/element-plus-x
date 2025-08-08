<template>
  <el-line-tree
    :data="options"
    line-radius="4px"
    collapse-width="20px"
    default-expand-all
    show-content-line
    :expand-on-click-node="false"
    :expand-on-click-icon="false"
    style="max-width: 600px"
  >
    <template #collapse="{ data }">
      <el-image
        :src="data.img"
        style="width: 20px; height: 20px; border-radius: 6px; z-index: 1"
      />
    </template>
    <template #default="{ data }">
      <div class="line-tree__node-header">
        <div>
          {{ data.label }}: <span> {{ data.time }}s</span>
        </div>
        <el-icon
          style="margin-left: 6px"
          @click.stop="data.visible = !data.visible"
        >
          <component :is="data.visible ? CaretTop : CaretBottom" />
        </el-icon>
      </div>
      <el-collapse-transition>
        <div
          v-if="data.visible"
          style="height: 80px"
          class="line-tree__node-content"
        >
          {{ data.content }}
        </div>
      </el-collapse-transition>
    </template>
  </el-line-tree>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { CaretBottom, CaretTop } from '@element-plus/icons-vue'
import type { Ref } from 'vue'

interface Tree {
  label: string
  children?: Tree[]
  [prop: string]: any
}

const options: Ref<Tree[]> = ref([
  {
    label: '接收消息',
    img: 'https://oss.real-bot.cn/web/om/workflow/receiving_message.png',
    time: 0,
    content: '接收消息-1',
    visible: false,
  },
  {
    label: '工作流调用',
    time: 5,
    img: 'https://oss.real-bot.cn/web/om/workflow/workflow_call.png',
    content: '工作流调用-1',
    visible: false,
    children: [
      {
        label: '开始',
        img: 'https://oss.real-bot.cn/web/om/workflow/logic-start.png',
        time: 0,
        content: '开始-1',
        visible: false,
        children: [
          {
            label: '意图识别',
            img: 'https://oss.real-bot.cn/web/om/workflow/sop_intent_recognition.png',
            time: 1,
            content: '意图识别-1',
            visible: false,
            children: [
              {
                label: '输出',
                img: 'https://oss.real-bot.cn/web/om/workflow/output.png',
                time: 0,
                content: '输出-1',
                visible: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: '汇总响应',
    img: 'https://oss.real-bot.cn/web/om/workflow/response_summary.png',
    time: 0,
    content: '汇总响应-1',
    visible: false,
    children: [
      {
        label: '输出',
        img: 'https://oss.real-bot.cn/web/om/workflow/output.png',
        time: 0,
        content: '输出-2',
        visible: false,
      },
    ],
  },
])
</script>

<style lang="scss" scoped>
.line-tree__node-header {
  display: flex;
  align-items: center;
  line-height: 20px;
  margin: 6px;
}
.line-tree__node-content {
  padding: 12px;
  width: 100%;
  margin: 12px 0;
  border-radius: 6px;
  cursor: auto;
  background-color: var(--el-color-primary-light-9);
  color: var(--el-text-color-primary);
}
</style>
