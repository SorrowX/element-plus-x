import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { ElSlider } from 'element-plus'
import { FormPath } from '@formily/shared'
import { transformComponent } from '../__builtins__'
import { PreviewText } from '../preview-text'
import type { SliderProps } from 'element-plus'

const TransformElSlider = transformComponent<SliderProps>(ElSlider, {
  change: 'update:modelValue',
})

export const Slider = connect(
  TransformElSlider,
  mapProps((props, field) => {
    return {
      modelValue: FormPath.getIn(field, 'value'),
    }
  }),
  mapReadPretty(PreviewText.Input)
)

export default Slider
