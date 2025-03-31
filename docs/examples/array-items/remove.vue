<template>
  <el-form :model="form" label-width="auto">
    <el-form-item prop="list">
      <el-array-items>
        <template #default="{ $index }">
          <div style="display: flex; margin-bottom: 8px">
            <SortHandle />
            <el-input v-model="form['list'][$index]" style="margin: 0 12px" />
            <Remove link type="danger" size="small" icon> Remove </Remove>
            <Remove type="danger" :icon="Delete" :link="false" />
            <Remove :link="false" size="small" type="danger" icon>
              Delete
            </Remove>
          </div>
        </template>
        <template #append>
          <Addition title="添加" :default-value="''" />
        </template>
      </el-array-items>
    </el-form-item>
  </el-form>
  <!-- <pre>{{ form.list }}</pre> -->
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElArrayItems } from 'element-plus-x'
import { Delete } from '@element-plus/icons-vue'

const { Addition, Remove, SortHandle } = ElArrayItems

const form = reactive({
  list: ['1', '2', '3'],
})
</script>
