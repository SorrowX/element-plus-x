<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item prop="list" label="字符串数组">
      <el-array-items>
        <template #default="{ $record }">
          <div style="display: flex; margin-bottom: 8px">
            <SortHandle />
            <component
              :is="
                $record.type === 'a'
                  ? CompA
                  : $record.type === 'b'
                  ? CompB
                  : CompC
              "
            />
            <Remove />
            <MoveDown />
            <MoveUp />
          </div>
        </template>
        <template #append>
          <Addition title="添加" :default-value="''" />
        </template>
      </el-array-items>
    </el-form-item>
  </el-form>
  <!-- <pre>{{ form.list }}</pre> -->

  <!-- <div v-for="(item, index) in form.list" :key="item.type">
    <component
      :is="item.type === 'a' ? CompA : item.type === 'b' ? CompB : CompC"
    />
  </div> -->
</template>

<script lang="ts" setup>
import { defineComponent, h, onMounted, onUpdated, reactive, ref } from 'vue'
import { ElInput } from 'element-plus'
import { ElArrayItems } from 'element-plus-x'

const { Addition, Remove, SortHandle, MoveDown, MoveUp } = ElArrayItems

const CompA = defineComponent({
  setup() {
    const input = ref('1')
    onMounted(() => {
      console.log('CompA: onMounted')
    })
    onUpdated(() => {
      console.log('CompA: onUpdated')
    })
    return () =>
      h(ElInput, {
        modelValue: input.value,
        'onUpdate:modelValue': function (val) {
          input.value = val
        },
      })
  },
})
const CompB = defineComponent({
  setup() {
    const input = ref('2')

    onMounted(() => {
      console.log('CompB: onMounted')
    })
    onUpdated(() => {
      console.log('CompB: onUpdated')
    })
    return () =>
      h(ElInput, {
        type: 'textarea',
        modelValue: input.value,
        'onUpdate:modelValue': function (val) {
          input.value = val
        },
      })
  },
})

const CompC = defineComponent({
  setup() {
    onMounted(() => {
      console.log('CompC: onMounted')
    })
    onUpdated(() => {
      console.log('CompC: onUpdated')
    })
    return () => h('div', {}, '我是组件C')
  },
})

const form = reactive({
  list: [
    { value: 1, type: 'a' },
    { value: 2, type: 'b' },
    { value: 3, type: 'c' },
  ],
})
</script>
