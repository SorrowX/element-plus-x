import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { ElMention } from 'element-plus'
import { transformComponent } from '../__builtins__'
import { PreviewText } from '../preview-text'
import type { MentionProps } from 'element-plus'

const TransformElMention = transformComponent<MentionProps>(ElMention, {
  change: 'update:modelValue',
})

export const Mention = connect(
  TransformElMention,
  mapProps({
    value: 'modelValue',
    readOnly: 'readonly',
  }),
  mapReadPretty(PreviewText.Input)
)

export default Mention
