<template>
  <!-- If you want to apply a custom namespace, uncomment the following and apply the css configuration in `vite.config.ts`. -->
  <el-config-provider namespace="el" :locale="locale">
    <el-button mb-2 @click="toggle">语言切换</el-button>
    <el-button mb-2 @click="() => toggleDark()">主题切换</el-button>
    <div class="play-container">
      <el-case />
      <!-- <el-button>test</el-button>
      <el-date-picker v-model="value1" type="date" /> -->

      <Test />
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
// code here
import { ElButton } from 'element-plus'
import { merge } from 'lodash-unified'

import { ElCase } from 'element-plus-x'

// import Test from '../../docs/examples/table-dialog/top.vue'
// import Test from '../../docs/examples/table-page/basic.vue'
// import Test from '../../docs/examples/bubble/arrow.vue'
// import Test from '../../docs/examples/f-json-schema/json1.vue'
// import Test from '../../docs/examples/editor/count.vue'
// import Test from '../../docs/examples/config-provider-v2/local.vue'
// import Test from '../../docs/examples/video/list.vue'
// import Test from '../../docs/examples/video-viewer/basic.vue'
// import Test from '../../docs/examples/table-page/boundary-value.vue'
// import Test from '../../docs/examples/icons-vue/list.vue'
import Test from '../../docs/examples/draggable-table/disabled.vue'
// import Test from '../../docs/examples/line-tree/basic.vue'
// import Test from '../../docs/examples/array-items/render.vue'

import { computed, ref } from 'vue'
import ElZhCn from 'element-plus/dist/locale/zh-cn.mjs'
import ElEN from 'element-plus/dist/locale/en.mjs'
import zhCn from 'element-plus-x/dist/locale/zh-cn.mjs'
import en from 'element-plus-x/dist/locale/en.mjs'

const language = ref('zh-cn')
const locale = computed(() =>
  language.value === 'zh-cn' ? merge(ElZhCn, zhCn) : merge(ElEN, en)
)

const toggle = () => {
  language.value = language.value === 'zh-cn' ? 'en' : 'zh-cn'
}
</script>

<style lang="scss">
html,
body {
  // padding: 50px 100px;
  // width: 100vw;
  // height: 100vh;
  // margin: 0;
  // padding: 50px;
  // overflow: hidden;
  // overflow-x: hidden;

  // #play {
  //   height: 100%;
  //   width: 100%;
  //   padding: 20px;
  //   box-sizing: border-box;

  //   .play-container {
  //     height: 100%;
  //     width: 100%;
  //   }
  // }
}

.ep-bg-purple {
  background: #99a9bf;
}

.ep-bg-purple-light {
  background: #e5e9f2;
}

.dark {
  .ep-bg-purple {
    background: #46494d;
  }

  .ep-bg-purple-light {
    background: #667180;
  }
}
</style>
