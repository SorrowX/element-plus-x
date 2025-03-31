<template>
  <el-divider content-position="left">头部省略：</el-divider>
  <el-text-ellipsis
    position="start"
    rows="3"
    :content="content"
    expand-text="展开"
    collapse-text="收起"
  />
  <el-divider content-position="left">中间省略：</el-divider>
  <el-text-ellipsis
    position="middle"
    rows="3"
    :content="content"
    expand-text="展开"
    collapse-text="收起"
  />
  <el-divider content-position="left">尾部省略：</el-divider>
  <el-text-ellipsis
    position="end"
    rows="3"
    :content="content"
    expand-text="展开"
    collapse-text="收起"
  />
</template>

<script setup>
import { ref } from 'vue'

const content = ref(
  `在优雅的世界里，时间似乎变得柔软而缓慢。人们学会了在繁忙之中寻觅间隙，泡一壶好茶，读一本好书，或是静静地聆听一首古典乐章，让心灵随着旋律起舞，在音符间穿梭，找寻那份久违的平静与满足。这样的时刻，即便是最简单的日常，也充满了不凡的意义，仿佛每一秒都被赋予了诗意的光辉。优雅的人，懂得如何在平凡中发现不凡。他们或许身着朴素的衣裳，却在举手投足间流露出不凡的气质；他们或许生活在不起眼的角落，却能在心中构建一个广阔无垠的精神世界。他们用一颗敏感而细腻的心，去感受世界的美好，用一双善于发现的眼睛，去捕捉那些稍纵即逝的温暖与感动。`
)
</script>
