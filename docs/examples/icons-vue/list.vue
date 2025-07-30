<template>
  <div class="icon-search-content">
    <el-input v-model="query" size="large" placeholder="Search Icons" />
  </div>

  <div class="demo-icon-item">
    <div class="demo-icon-title">图标</div>
    <ul class="demo-icon-list">
      <li
        v-for="component in filterList"
        :key="component.name"
        class="icon-item"
        @click="copySvgIcon(component.name)"
      >
        <span class="demo-svg-icon">
          <ElIcon :size="24">
            <component :is="component" />
          </ElIcon>
          <span class="icon-name" @click.stop="copyContent(component.name)">
            {{ component.name }}
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { IconsVue } from 'element-plus-x'
import clipboardCopy from 'clipboard-copy'
import { ElMessage } from 'element-plus'
const { createIconComponent } = IconsVue

const query = ref('')

const filterList = computed(() => {
  return Object.values(IconsVue).filter((component) => {
    return createIconComponent === component
      ? false
      : component.name?.toLowerCase()?.includes?.(query.value.toLowerCase())
  })
})

const copyFullContent = async (content) => {
  try {
    await clipboardCopy(content)

    ElMessage({
      showClose: true,
      message: '已复制',
      type: 'success',
    })
  } catch {
    ElMessage({
      showClose: true,
      message: '复制失败',
      type: 'error',
    })
  }
}

const copyContent = async (name) => {
  try {
    await clipboardCopy(name)

    ElMessage({
      showClose: true,
      message: '已复制组件名称',
      type: 'success',
    })
  } catch {
    ElMessage({
      showClose: true,
      message: '复制失败',
      type: 'error',
    })
  }
}

const copySvgIcon = async (name) => {
  await copyFullContent(`
  // script
  import { IconsVue } from 'element-plus-x'
  const { ${name} } = IconsVue

  // template
  <el-icon><${name} /></el-icon>
  `)
}
</script>

<style scoped lang="scss">
.icon-search-content {
  position: sticky;
  top: 60px;
  z-index: 10;

  .el-input {
    background: var(--bg-color);
  }
}

.demo-icon {
  &-item {
    margin-top: 24px;

    &:first-child {
      margin-top: 0;
    }
  }

  &-title {
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
  }

  &-list {
    overflow: hidden;
    list-style: none;
    padding: 0 !important;
    border-left: 1px solid var(--el-border-color);
    border-radius: 4px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    .icon-item {
      &:nth-child(-n + 7) {
        border-top: 1px solid var(--el-border-color);
      }

      text-align: center;
      color: var(--el-text-color-regular);
      height: 90px;
      font-size: 13px;
      border-right: 1px solid var(--el-border-color);
      border-bottom: 1px solid var(--el-border-color);
      transition: background-color var(--el-transition-duration);

      &:hover {
        background-color: var(--el-border-color-extra-light);

        .el-icon {
          color: var(--brand-color-light);
        }

        color: var(--brand-color-light);
      }

      .demo-svg-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        cursor: pointer;

        .icon-name {
          margin-top: 8px;
        }
      }
    }
  }
}
</style>
