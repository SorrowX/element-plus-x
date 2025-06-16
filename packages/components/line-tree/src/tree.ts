// @ts-nocheck
import { ElTree } from 'element-plus'

const TreeNode = ElTree.components.ElTreeNode

const ElTreeNode = {
  ...TreeNode,
  render() {
    // eslint-disable-next-line prefer-rest-params
    const VNode = Reflect.apply(TreeNode.render, this, arguments)

    const child0 = VNode.children[0]
    delete child0.props.style

    return VNode
  },
}

export const ElTreeV2: any = {
  ...ElTree,
  components: {
    ...ElTree.components,
    ElTreeNode,
  },
}
