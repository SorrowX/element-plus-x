# 版本迭代说明

每个版本更新的内容会在此记录。

## V1.1.4 (更新时间: 2025-04-18 14:07) 未发布

1. 新增 QRCode 二维码
2. CollapseContent 组件改名为 ReadMore 组件
3. ReadMore 组件 增加 overlay 属性
4. 新增 TreeSelect(Formily 版) 树形选择
5. JsonSchema 组件新增内置 Space 和 TreeSelect 组件

## V1.1.3 (更新时间: 2025-04-14 14:07)

1. JsonSchema 组件滚动定位问题修复
2. FormItem 组件优化(transition 动画使用 el-zoom-in-top,其优化 FormItem Css)
3. DropdownV2 下拉菜单组件支持 label 插槽
4. DropdownV2 下拉菜单组件禁用样式添加
5. DropdownV2 下拉菜单组件支持 trigger 备选内容
6. TablePage 组件抛出 tableRef 实例

## V1.1.2 (更新时间: 2025-04-07 16:10)

1. 新增 Formily 表单组件

## V1.1.1 (更新时间: 2025-03-25 16:47)

1. TableDialog 表格弹窗组件新增 left 和 right 插槽

## V1.1.0 (更新时间: 2025-03-25 16:47)

1. 新增 Split 组件

## V1.0.9 (更新时间: 2025-03-24 14:20)

1. 新增 FullScreen 组件
2. Emoji 组件，兼容企业微信 [疯了]会被转为[折磨]，调用 emotionParser 方法转换不了的问题

## V1.0.8 (更新时间: 2025-03-21 10:28)

1. VirtualList 虚拟列表 支持 ElScrollbar 组件
2. 新增 List 组件

## V1.0.7 (更新时间: 2025-03-17 19:47)

1. Emoji 表情包组件抛出 click-tab 事件

## V1.0.6 (更新时间: 2025-03-17 19:22)

1. Emoji 表情包组件抛出 updateScrollbar 方法

## V1.0.5 (更新时间: 2025-03-17 11:44)

1. VirtualList 虚拟列表 内部载入更多更换为 LoadMore 组件实现
2. 新增 LoadMore 组件
3. 新增 SortableList 可排序列表组件

## V1.0.4 (更新时间: 2025-03-14 14:42)

1. 新增 DropdownV2 下拉菜单组件
2. Contextmenu 右键菜单组件内部依赖级联面板组件改为 DropdownV2Panel 面板组件
3. Emoji 表情包组件新增 tab 及字符表情功能
4. SelectV3 选择器默认添加 clearable 属性

## V1.0.3 (更新时间: 2025-03-08 10:52)

1. 新增 SelectV3 选择器
2. 新增 PreviewFile 文件预览
3. TextEllipsis 文本省略组件新增 Tooltip 功能

## V1.0.2 (更新时间: 2025-02-24 11:50)

1. 新增 IconsVue 图标组件
2. 新增 Renderer 渲染器
3. VirtualList 虚拟列表 新增 scroll 事件，和优化滚动加载时，向上滚动应阻止触发加载更多

## V1.0.1 (更新时间: 2025-02-21 20:41)

1. bubble 组件 onWatcherCleanup api 降级为 watch 中的清理函数调用，兼容 vue3.4+

## V1.0.0 (更新时间: 2025-02-19 15:52)

1. 修复 TablePage 组件初始隐藏不显示的问题
2. 新增 Contextmenu 右键菜单 组件

## V0.0.9 (更新时间: 2025-02-11 11:49)

1. DraggableTable 组件拖拽改为基于 useSortable 实现
2. ArrayItems ArrayTable 组件优化
3. VirtualList 虚拟列表 新增 load 加载
4. 新增 Dot 点 组件
5. 新增 TextHighlight 文本凸显 组件

## V0.0.8 (更新时间: 2025-01-23 15:50)

1. 组件库 style 路径不正确问题修复
2. style 缺省文件补充
3. 新增 icons 组件，方便内部组件使用

## V0.0.7 (更新时间: 2025-01-22 17:52)

1. 组件库 ts 类型正确导出

## V0.0.6 (更新时间: 2025-01-22 16:36)

1. Editor 组件新增 editorOptions 属性

## V0.0.5 (更新时间: 2025-01-22 15:02)

1. TableDialog 组件新增 title 插槽
2. TableDialog 组件样式调整
3. utils 改动

## V0.0.4 (更新时间: 2025-01-22 13:15)

1. 组件依赖包调整

## V0.0.3 (更新时间: 2025-01-22 10:37)

1. 新增 Flex 弹性布局
2. 新增 Bubble 对话气泡
3. 新增 Submit 表单提交
4. 新增 Reset 表单重置
5. 新增 VirtualList 虚拟列表
6. 新增 Emoji 表情包
7. 新增 DialogV2 对话框
8. 新增 DrawerV2 抽屉

## V0.0.2 (更新时间: 2025-01-06 10:51)

1. 新增 ArrayBase 组件
2. 新增 ArrayItems 组件
3. 新增 ArrayTable 组件

## V0.0.1 (更新时间: 2025-01-01 12:29)

1. 从 element-plus-library 迁移到 element-plus-x
