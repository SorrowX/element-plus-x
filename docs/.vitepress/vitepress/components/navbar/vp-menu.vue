<script setup lang="ts">
import { useNav } from '../../composables/nav'
import VPMenuLink from './vp-menu-link.vue'

const navs = useNav()
</script>

<template>
  <nav v-if="navs" class="navbar-menu">
    <el-link
      style="margin: 0 12px"
      :underline="false"
      href="https://element-plus.org/zh-CN/component/overview.html"
      target="_blank"
    >
      ElementPlus
    </el-link>
    <VPMenuLink v-for="(item, key) in navs" :key="key" :item="item" />
  </nav>
</template>
