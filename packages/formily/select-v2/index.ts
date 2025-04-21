import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { ElSelectV2 } from 'element-plus'
import { FormPath } from '@formily/shared'
import { transformComponent } from '../__builtins__'
import { PreviewText } from '../preview-text'
import type { ISelectV2Props } from 'element-plus'

const TransformElSelectV2 = transformComponent<ISelectV2Props>(ElSelectV2, {
  change: 'update:modelValue',
})
TransformElSelectV2.name = 'TransformElSelectV2'

export const SelectV2 = connect(
  TransformElSelectV2,
  mapProps((props, field) => {
    return {
      options: FormPath.getIn(field, 'dataSource') ?? [],
      modelValue: FormPath.getIn(field, 'value'),
    }
  }),
  mapReadPretty(PreviewText.Select)
)

export default SelectV2
