<template>
  <el-table-page
    ref="tableRef"
    style="height: 720px"
    :boundary-value="500"
    :http-request="getList"
    :columns="columns"
    :pagination="{ defaultPageSize: 20 }"
  >
    <template #header>
      <JsonSchema
        ref="jsonSchemaRef"
        style="margin-bottom: 32px"
        label-width="80"
        wrapper-width="180"
        feedback-layout="terse"
        :schema="schema"
      />
    </template>
  </el-table-page>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { ElLink } from 'element-plus'
import { Formily } from 'element-plus-x'
import { Refresh, Search } from '@element-plus/icons-vue'
import type {
  CRI,
  DefaultRow,
  IHttpRequestParams,
  IResolveData,
} from 'element-plus-x'
const { JsonSchema } = Formily

const tableRef = ref()
const jsonSchemaRef = ref()

const query = (values: Record<string, any>) => {
  const formValues = values ?? jsonSchemaRef.value.formInstance.values ?? {}
  tableRef.value?.request({
    ...formValues,
  })
}

const onSubmit = (values: Record<string, any>) => {
  query(values)
}

const onReset = (values: Record<string, any>) => {
  query(values)
}

const schema = {
  type: 'object',
  properties: {
    layout: {
      type: 'void',
      'x-component': 'Space',
      'x-component-props': {
        wrap: true,
        size: 0,
      },
      properties: {
        name: {
          type: 'string',
          title: '群发名称',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入',
          },
        },
        status: {
          type: 'string',
          title: '状态',
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          'x-component-props': {
            clearable: true,
          },
          enum: ['选项一', '选项二'],
        },
        person: {
          type: 'string',
          title: '创建人',
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          'x-component-props': {
            clearable: true,
          },
          enum: ['选项一', '选项二'],
        },
        actions: {
          type: 'void',
          title: ' ',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            labelWidth: 40,
          },
          'x-component': 'Actions',
          'x-component-props': {
            submitText: '查询',
            resetText: '重置',
            submitProps: {
              icon: Search,
            },
            resetProps: {
              icon: Refresh,
              forceClear: true,
            },
            onSubmit,
            onReset,
          },
        },
      },
    },
  },
}

const columns = [
  {
    label: '任务名称',
    prop: 'prop1',
    minWidth: 255,
    cellRenderer({ row }: CRI<DefaultRow>) {
      return h('div', `render_${row.prop1}`)
    },
  },
  {
    label: '任务类型',
    prop: 'prop2',
    minWidth: 120,
    formatter(row: DefaultRow) {
      return `formatter_${row.prop2}`
    },
  },
  {
    label: '有效周期',
    prop: 'prop3',
    minWidth: 280,
  },
  {
    label: '状态',
    prop: 'prop4',
    minWidth: 160,
  },
  {
    label: '是否暂停',
    prop: 'prop5',
    minWidth: 160,
  },
  {
    label: '创建人',
    prop: 'prop6',
    minWidth: 160,
  },
  {
    label: '创建时间',
    prop: 'prop7',
    minWidth: 200,
  },
  {
    label: '操作',
    width: 180,
    fixed: 'right',
    cellRenderer({ row }: CRI<DefaultRow>) {
      return h('div', {}, [
        h(
          ElLink,
          { type: 'primary', style: { marginRight: '12px' } },
          { default: () => '编辑' }
        ),
        h(
          ElLink,
          { type: 'danger', style: { marginRight: '12px' }, onClick: () => {} },
          { default: () => '删除' }
        ),
        h(ElLink, { type: 'primary' }, { default: () => '发送记录' }),
      ])
    },
  },
]

const requestData = (() => {
  const f = ({ current: pageNo, size: pageSize, ...args }) => {
    console.log('参数:', pageNo, pageSize, args)
    const total = f.total
    return new Promise((resolve) => {
      setTimeout(() => {
        const totalPages = Math.ceil(total / pageSize)
        const size = (pageNo - 1) * pageSize

        return resolve({
          list: Array.from({
            length: pageNo === totalPages ? total % size : pageSize,
          }).map((_, index) => {
            const base = (pageNo - 1) * pageSize
            index = base + index + 1
            return {
              prop1: `字段1_${index}`,
              prop2: `字段2_${index}`,
              prop3: `字段3_${index}`,
              prop4: `字段4_${index}`,
              prop5: `字段5_${index}`,
              prop6: `字段6_${index}`,
              prop7: `字段7_${index}`,
              prop8: `字段8_${index}`,
              prop9: `字段9_${index}`,
            }
          }),
          total,
        })
      }, 500)
    })
  }
  f.total = Math.ceil(Math.random() * 1000)
  return f
})()

const getList = ({ params, resolve }: IHttpRequestParams) => {
  const values = jsonSchemaRef.value?.formInstance?.values ?? {}
  requestData({
    ...params,
    ...values,
  }).then((res) => {
    resolve(res as IResolveData)
  })
}
</script>

<style lang="scss" scoped></style>
