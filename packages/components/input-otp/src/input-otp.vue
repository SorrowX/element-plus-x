<template>
  <div :class="[ns.b(), ns.m(size)]">
    <el-space :size="gap">
      <div v-for="index in length" :key="String(index)" :class="ns.e('item')">
        <el-input
          v-bind="createEvents(index - 1)"
          :ref="(el) => handleInputList(el, index - 1)"
          v-model="model[index - 1]"
          :formatter="handleFormatter"
          :parser="(value: string) => handleParser(value, index - 1)"
          :readonly="readonly"
          :disabled="disabled"
          :show-password="showPassword"
        />
        <slot v-bind="{ index: index - 1, value: model[index - 1] }" />
      </div>
    </el-space>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ElInput, ElSpace, useNamespace } from 'element-plus'
import { isDef, isFunction } from '@element-plus/utils'
import { UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { inputOtpEmits, inputOtpProps } from './input-otp'

defineOptions({
  name: 'ElInputOtp',
})

const props = defineProps(inputOtpProps)
const emit = defineEmits(inputOtpEmits)
const ns = useNamespace('input-otp')

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit(UPDATE_MODEL_EVENT, val),
})

const inputRefs: any = ref([])

const handleInputList = (el: any, index: number) => {
  if (el) {
    inputRefs.value[index] = el
  } else {
    delete inputRefs.value[index]
  }
}

const handleFocus = (index: number, blur: boolean = false) => {
  let beyondBoundary = false
  if (index < 0) {
    index = 0
  } else if (index >= props.length) {
    index = props.length - 1
    beyondBoundary = true
  }

  beyondBoundary && blur
    ? inputRefs?.value[index].blur()
    : inputRefs?.value[index].focus()
}

const handleParser = (value: string, index: number) => {
  const result = isFunction(props.validator)
    ? props.validator(value, index, model.value.join(''))
    : true

  const char = (value || '').trim().charAt(value.length - 1)
  if (result) {
    // update value
    model.value[index] = char
    // focus
    isDef(char) && char !== ''
      ? handleFocus(index + 1, true)
      : handleFocus(index - 1)
  }

  emitFinish()
  emitInput(char, index)

  return model.value[index] ?? ''
}

const handleFormatter = (value: string | number) => value

const handlePaste = (e: ClipboardEvent, index: number) => {
  e.preventDefault()
  const { clipboardData } = e
  const text = clipboardData?.getData('text')
  if (!text) return

  text.split('').forEach((char, i) => {
    if (index + i >= props.length) return

    if (isFunction(props.validator)) {
      const result = props.validator(char, index + i, model.value.join(''))
      if (result === false) {
        index -= 1
        return
      }
    }

    model.value[index + i] = char
  })
}

const handleKeydown = (e: KeyboardEvent, index: number) => {
  const keyCode = e.code || e.key

  if (keyCode === 'Backspace' && !model.value[index]) {
    e.preventDefault()
    model.value[Math.max(index, 0)] = ''
    handleFocus(index - 1)
  } else if (keyCode === 'ArrowLeft') {
    e.preventDefault()
    handleFocus(index - 1)
  } else if (keyCode === 'ArrowRight') {
    e.preventDefault()
    handleFocus(index + 1)
  }
}

const createEvents = (index: number) => {
  return {
    onFocus: () => handleFocus(index),
    onpaste: (event: ClipboardEvent) => handlePaste(event, index),
    onkeydown: (event: KeyboardEvent) => handleKeydown(event, index),
  }
}

const emitFinish = () => {
  const modelValueStr = model.value.join('').trim()
  if (modelValueStr.length === props.length) {
    emit('finish', modelValueStr)
  }
}

const emitInput = (value: string, index: number) => {
  emit('input', value, index)
}
</script>
