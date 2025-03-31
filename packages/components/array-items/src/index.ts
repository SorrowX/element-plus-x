import { computed, defineComponent, h, ref } from 'vue'
import { useNamespace } from 'element-plus'
import { moveArrayElement, useSortable } from '@vueuse/integrations/useSortable'
import { composeExport, isArray } from '@element-plus/utils'
import { DIV_TAG } from '@element-plus/constants'
import { useField } from '@element-plus/components/array-base/src/hooks'
import ArrayBase from '@element-plus/components/array-base'
import { sortHandleKls } from '@element-plus/components/array-base/src/constant'
import type { IFieldContext } from '@element-plus/components/array-base/src/array-base'

export const ArrayItemsInner = defineComponent({
  name: 'ElArrayItems',
  setup(props, { slots }) {
    const ns = useNamespace('array-items')
    const prefixCls = ns.b()

    const field: IFieldContext = useField()
    const { getKey, keyMap } = ArrayBase.useKey()

    const target = ref<HTMLDivElement>()

    const dataSource = computed(() =>
      field ? (isArray(field.fieldValue) ? field.fieldValue.slice() : []) : []
    )

    useSortable(target, [], {
      animation: 200,
      handle: sortHandleKls,
      onUpdate: (e: any) => {
        const { oldIndex, newIndex } = e

        // update list
        if (field && isArray(field.fieldValue)) {
          moveArrayElement(field.fieldValue, oldIndex, newIndex, e)
        }

        // update key
        if (isArray(keyMap)) {
          keyMap.splice(newIndex, 0, keyMap.splice(oldIndex, 1)[0])
        }
      },
    })

    return () => {
      const renderItems = () => {
        const renderItem = ({
          record,
          index,
        }: {
          record: any
          index: number
        }) => {
          const key = getKey(index)
          return h(
            DIV_TAG,
            {
              key,
              class: [ns.b('list-item')],
            },
            h(
              ArrayBase.Item,
              {
                key,
                index,
                record,
              },
              {
                default: () =>
                  slots?.default?.({
                    $index: index,
                    $record: record,
                    field,
                  }),
              }
            )
          )
        }

        return h(
          DIV_TAG,
          {
            ref: target,
            class: [ns.b('list')],
          },
          dataSource.value.map((data: any, index: number) =>
            renderItem({ record: data, index })
          )
        )
      }

      return h(
        ArrayBase,
        {
          keyMap,
        },
        {
          default: () =>
            h(
              DIV_TAG,
              {
                class: [prefixCls],
              },
              {
                default: () => [
                  slots?.prepend?.({ field, keyMap, getKey }),
                  renderItems(),
                  slots?.addition?.({ field, keyMap, getKey }),
                  slots?.append?.({ field, keyMap, getKey }),
                ],
              }
            ),
        }
      )
    }
  },
})

export default composeExport(ArrayItemsInner, {
  Addition: ArrayBase.Addition,
  Remove: ArrayBase.Remove,
  SortHandle: ArrayBase.SortHandle,
  MoveDown: ArrayBase.MoveDown,
  MoveUp: ArrayBase.MoveUp,
  Index: ArrayBase.Index,
})
