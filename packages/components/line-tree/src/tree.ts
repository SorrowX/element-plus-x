// @ts-nocheck
import { h } from 'vue'
import { ElTree } from 'element-plus'

const TreeNode = ElTree.components.ElTreeNode

const ElTreeNode = {
  ...TreeNode,
  render() {
    const VNode = TreeNode.render.apply(this, arguments)
    const indent = h('div', {
      class: 'tree-node__content-indent',
      style: {
        // width: (this.node.level - 1) * this.tree.props.indent + 'px',
        width: this.node.level - 1 > 0 ? '24px' : '0px',
        height: '100%',
      },
    })
    console.log(111, VNode)

    const child0 = VNode.children[0]
    delete child0.props.style
    child0.children.unshift(indent)

    const childIndent = h('div', {
      class: 'tree-node__child-indent',
      style: {
        width: this.node.level - 1 > 0 ? '24px' : '0px',
        height: '100%',
      },
    })

    const defaultSlot = VNode.children[1].children.default
    VNode.children[1].children.default = () => {
      const vNode = defaultSlot.apply(this, arguments)
      const child0 = vNode?.[0]
      if (child0?.props?.role === 'group') {
        child0.children[0].children.unshift(childIndent)
      }
      console.log(111, vNode)
      return vNode
    }

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
