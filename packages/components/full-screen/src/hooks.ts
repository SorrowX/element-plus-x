import { ref } from 'vue'

export const useWindowFullscreen = () => {
  const isFullscreen = ref(false)

  async function exit() {
    isFullscreen.value = false
  }

  async function enter() {
    isFullscreen.value = true
  }

  async function toggle() {
    isFullscreen.value = !isFullscreen.value
  }

  return {
    isFullscreen,
    exit,
    enter,
    toggle,
    isSupported: ref(true),
  }
}
