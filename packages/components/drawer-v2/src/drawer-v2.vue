<template>
  <div :class="ns.b('trigger')" @click="open">
    <slot name="trigger">
      <el-button v-bind="triggerProps">
        {{ triggerProps?.triggerText }}
      </el-button>
    </slot>
  </div>

  <el-drawer
    v-model="visible"
    append-to-body
    :show-close="false"
    :modal-class="ns.b()"
    v-bind="$attrs"
  >
    <template #header="scoped">
      <slot name="header" v-bind="scoped">
        <div :class="ns.b('header')">
          <span class="title">{{ title }}</span>
          <el-icon size="16" @click="scoped.close"><Close /></el-icon>
        </div>
      </slot>
    </template>
    <template #default>
      <div :class="ns.b('content')"><slot /></div>
    </template>
    <template #footer>
      <slot name="footer">
        <div :class="ns.b('footer')">
          <el-button
            v-if="!hiddenCancel"
            v-bind="cancelProps"
            @click="handleCancel"
          >
            {{ cancelProps?.cancelText ?? t('epx.common.cancel') }}
          </el-button>
          <el-button
            v-if="!hiddenSure"
            v-bind="sureProps"
            type="primary"
            :loading="loading"
            @click="handleSure"
          >
            {{ sureProps?.sureText ?? t('epx.common.sure') }}
          </el-button>
        </div>
      </slot>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import {
  ElButton,
  ElDrawer,
  ElIcon,
  useLocale,
  useNamespace,
} from 'element-plus'
import { Close } from '@element-plus/icons-vue'
import { drawerV2Props } from './drawer-v2'

defineOptions({
  name: 'ElDrawerV2',
  inheritAttrs: false,
})
const props = defineProps(drawerV2Props)

const ns = useNamespace('drawer-v2')
const { t } = useLocale()

const visible = ref(false)
const loading = ref(false)

const hiddenCancel = computed(() => props.cancelProps?.hidden ?? false)
const hiddenSure = computed(() => props.sureProps?.hidden ?? false)

const close = () => (visible.value = false)
const open = () => (visible.value = true)

const handleCancel = () => {
  props.onCancel ? props.onCancel({ close }) : close()
}
const handleSure = async () => {
  if (!props.onSure) {
    return close()
  }
  try {
    loading.value = true
    await props.onSure({ close })
  } catch {
  } finally {
    loading.value = false
  }
}

defineExpose({
  close,
  open,
})
</script>
