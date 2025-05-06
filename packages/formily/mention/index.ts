import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { ElMention } from 'element-plus'
import { FormPath } from '@formily/shared'
import { transformComponent } from '../__builtins__'
import { PreviewText } from '../preview-text'
import type { MentionProps } from 'element-plus'

const TransformElMention = transformComponent<MentionProps>(ElMention, {
  change: 'update:modelValue',
})

export const Mention = connect(
  TransformElMention,
  mapProps((props, field) => {
    return {
      options: FormPath.getIn(field, 'dataSource') ?? [],
      modelValue: FormPath.getIn(field, 'value'),
      readOnly: 'readonly',
    }
  }),
  mapReadPretty(PreviewText.Input)
)

export default Mention
