<template>
  <div>
    <el-button mb-2 @click="toggle">Switch Language</el-button>
    <br />

    <!-- <el-config-provider :locale="locale">
      <el-table-page :first-invoke="false" :http-request="getList" />
    </el-config-provider> -->

    <!--上面的写法和下面的写法是等价的，只不过下面的写法还扩展了epx中所需的全局配置,比如table-page配置-->
    <el-config-provider-v2
      :locale="locale"
      :table-page="{
        pagination: { defaultPageSize: 35, pageSizes: [10, 20, 50] },
        config: { pageSize: 'size', currentPage: 'current' },
      }"
    >
      <el-table-page :first-invoke="false" :http-request="getList" />
    </el-config-provider-v2>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import zhCnX from 'element-plus-x/es/locale/lang/zh-cn' // 新增代码
import en from 'element-plus/es/locale/lang/en'
import enX from 'element-plus-x/es/locale/lang/en' // 新增代码

const language = ref('zh-cn')
const locale = computed(() =>
  language.value === 'zh-cn' ? { ...zhCn, ...zhCnX } : { ...en, ...enX }
)

const toggle = () => {
  language.value = language.value === 'zh-cn' ? 'en' : 'zh-cn'
}

const getList = ({ params, reject }) => {
  setTimeout(() => {
    console.log('params:', params)
    reject(new Error('error'))
  }, 500)
}
</script>
