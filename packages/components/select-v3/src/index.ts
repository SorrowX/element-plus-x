import { defineComponent, h } from 'vue'
import { ElIcon, ElSelectV2, useLocale, useNamespace } from 'element-plus'
import * as IconsVue from '@element-plus/components/icons-vue'
import ElTextEllipsis from '@element-plus/components/text-ellipsis'
import { DIV_TAG } from '@element-plus/constants'
import { OptionTypeEnum, selectV3Emits, selectV3Props } from './select-v3'
import type { OptionType } from './select-v3'
const { BusinessWechat, Wechat } = IconsVue

export default defineComponent({
  name: 'ElSelectV3',
  inheritAttrs: false,
  props: selectV3Props,
  emits: selectV3Emits,
  setup(props, { attrs, slots }) {
    const { t } = useLocale()
    const ns = useNamespace('select-v3')

    const renderIcon = (item: OptionType) => {
      const type = Number(item.type)
      const isWechat = type === OptionTypeEnum.Wechat
      const isBusinessWechat = type === OptionTypeEnum.BusinessWechat
      const comp = props.icon
        ? props.icon
        : isWechat
        ? Wechat
        : isBusinessWechat
        ? BusinessWechat
        : ''
      return comp
        ? h(
            ElIcon,
            {
              size: isWechat ? 16 : 18,
              color: isWechat ? '#07C160' : '',
              ...props.iconOptions,
            },
            {
              default: () => h(comp),
            }
          )
        : ''
    }

    const renderItem = (data: { item: OptionType; index: number }) => {
      const { item, index } = data
      return h(DIV_TAG, { class: ns.e('item'), key: item.value ?? index }, [
        renderIcon(item),
        h(ElTextEllipsis, {
          rows: 1,
          position: 'middle',
          class: ns.e('item-text'),
          content: String(item.label),
          showOverflowTooltip: true,
          tooltipOptions: {
            hideAfter: 0,
            placement: 'top',
            transition: 'unknown',
          },
          ...props.textEllipsisOptions,
        }),
      ])
    }

    return () => {
      return h(
        ElSelectV2,
        {
          clearable: true,
          filterable: true,
          placeholder: t('epx.common.selectPlaceholder'),
          ...(attrs as any),
          options: props.options,
          class: [attrs.class, ns.b()],
          popperClass: ns.e('popper'),
          persistent: false,
        },
        {
          default: renderItem,
          ...slots,
        }
      )
    }
  },
})
