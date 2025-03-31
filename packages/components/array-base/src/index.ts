import { composeExport } from '@element-plus/utils/util'
import { useArray, useIndex, useKey, useRecord } from './hooks'
import { ArrayBase } from './array-base'
import { ArrayBaseItem } from './array-base-item'
import { ArrayBaseAddition } from './addition'
import { ArrayBaseRemove } from './remove'
import { ArrayBaseSortHandle } from './sort-handle'
import { ArrayBaseMoveDown } from './movedown'
import { ArrayBaseMoveUp } from './moveup'
import { ArrayBaseIndex } from './order'
import { ArrayBaseSymbol, ItemSymbol } from './constant'

export default composeExport(ArrayBase, {
  useKey,
  useArray,
  useIndex,
  useRecord,
  ItemSymbol,
  ArrayBaseSymbol,
  Item: ArrayBaseItem,
  Addition: ArrayBaseAddition,
  Remove: ArrayBaseRemove,
  SortHandle: ArrayBaseSortHandle,
  MoveDown: ArrayBaseMoveDown,
  MoveUp: ArrayBaseMoveUp,
  Index: ArrayBaseIndex,
})
