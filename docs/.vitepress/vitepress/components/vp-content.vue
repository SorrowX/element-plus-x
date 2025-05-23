<script setup lang="ts">
import { computed, nextTick, watch } from 'vue'
import nprogress from 'nprogress'
import { useData, useRoute } from 'vitepress'
import { useSidebar } from '../composables/sidebar'
import VPHeroContent from './vp-hero-content.vue'
import VPDocContent from './vp-doc-content.vue'
import VPNotFound from './vp-not-found.vue'
import VPFooter from './globals/vp-footer.vue'

const { frontmatter } = useData()
const route = useRoute()
const isNotFound = computed(() => route.component === VPNotFound)
const isHeroPost = computed(() => frontmatter.value.page === true)
const { hasSidebar } = useSidebar()

const props = defineProps<{ isSidebarOpen: boolean }>()

let shouldUpdateProgress = true

watch(
  () => props.isSidebarOpen,
  (val) => {
    // delay the flag update since watch is called before onUpdated
    nextTick(() => {
      shouldUpdateProgress = !val
    })
  }
)
watch(
  () => route.path,
  () => {
    if (shouldUpdateProgress) nprogress.done()
  },
  {
    flush: 'post',
  }
)
</script>

<template>
  <main id="page-content" :class="{ 'page-content': true, 'has-sidebar': hasSidebar }" :style="{ paddingTop: '32px' }">
    <VPNotFound v-if="isNotFound" />
    <VPHeroContent v-else-if="isHeroPost" />
    <VPDocContent v-else>
      <template #content-top>
        <slot name="content-top" />
      </template>
      <template #content-bottom>
        <slot name="content-bottom" />
      </template>
    </VPDocContent>
    <VPFooter v-if="!isHeroPost" />
  </main>
</template>
