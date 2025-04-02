import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { ElCascader } from 'element-plus'
import { PreviewText } from '../preview-text'
import { transformComponent } from '../__builtins__'

export type CascaderProps = typeof ElCascader

const TransformElCascader = transformComponent<CascaderProps>(ElCascader, {
  change: 'update:modelValue',
})

export const Cascader = connect(
  TransformElCascader,
  mapProps({ dataSource: 'options', value: 'modelValue' }),
  mapReadPretty(PreviewText.Cascader)
)

export default Cascader
