<template>
  <el-form :model="form" label-width="auto">
    <el-form-item prop="list">
      <el-array-items>
        <template #default="{ $index }">
          <div style="display: flex; margin-bottom: 8px">
            <SortHandle />
            <el-input v-model="form['list'][$index]" style="margin: 0 12px" />
            <Remove />
            <MoveDown :icon="SortDown" />
            <MoveUp :icon="SortUp" />
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
import { SortDown, SortUp } from '@element-plus/icons-vue'

const { Addition, Remove, SortHandle, MoveDown, MoveUp } = ElArrayItems

const form = reactive({
  list: ['1', '2', '3'],
})
</script>
