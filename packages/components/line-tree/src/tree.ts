// @ts-nocheck
import { h } from 'vue'
import { ElTree } from 'element-plus'

const TreeNode = ElTree.components.ElTreeNode

const ElTreeNode = {
  ...TreeNode,
  render() {
    // eslint-disable-next-line prefer-rest-params
    const VNode = Reflect.apply(TreeNode.render, this, arguments)
    const indent = h('div', {
      class: 'tree-node__content-indent',
      style: {
        // width: `${(this.node.level - 1) * this.tree.props.indent}px`,
        width: this.node.level > 1 ? `${this.tree.props.indent}px` : '0px',
        height: '100%',
      },
    })
    // console.log(111, VNode)

    const child0 = VNode.children[0]
    delete child0.props.style
    child0.children.unshift(indent)

    const childIndent = h('div', {
      class: 'tree-node__child-indent',
      style: {
        // width: `${(this.node.level - 1) * this.tree.props.indent}px`,
        // width: this.node.level - 1 > 0 ? `${this.tree.props.indent}px` : '0px',
        width: `${this.tree.props.indent}px`,
        height: '100%',
      },
    })

    const defaultSlot = VNode.children[1].children.default
    VNode.children[1].children.default = () => {
      // eslint-disable-next-line prefer-rest-params
      const vNode = Reflect.apply(defaultSlot, this, arguments)
      const child0 = vNode?.[0]
      if (child0?.props?.role === 'group') {
        child0.children[0].children.unshift(childIndent)
      }
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
