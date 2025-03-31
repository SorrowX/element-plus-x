import { ref } from 'vue'

export const useContextMenu = () => {
  const visible = ref(false)

  const position = ref({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  })

  const triggerRef = ref({
    getBoundingClientRect() {
      return position.value
    },
  })

  const handleContextMenu = (e: any) => {
    e.preventDefault()
    position.value = DOMRect.fromRect({
      x: e.clientX,
      y: e.clientY,
    })

    visible.value = true
  }

  return {
    visible,
    triggerRef,
    handleContextMenu,
  }
}
