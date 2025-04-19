<template>
  <el-read-more v-model="collapse" height="300px" overlay>
    <div class="read-more__text">
      {{ text }}
    </div>
  </el-read-more>
</template>

<script setup>
import { ref } from 'vue'

const collapse = ref(true)

const text =
  `加班到深夜走出公司大楼时，路灯把我的影子拉得老长，风一吹，空荡荡的胃就开始“咕咕”抗议。手机屏幕亮起，房东催缴房租的消息刺得人眼睛生疼，而工资卡余额那可怜的数字，像是一记闷棍，把最后一点盼头都敲碎了。想起早上母亲打电话来，小心翼翼问能不能寄点钱回家，我张了张嘴，喉咙却像被棉花堵住，最后只能含糊地说“再等等”。地铁口的小摊飘来烤红薯的香气，我摸了摸口袋，还是转身走向冷风里，心里盘算着下个月该怎么省出那几百块，这生活啊，就像被上了发条的机器，停不下来，也看不到头……`.repeat(
    10
  )
</script>

<style scoped lang="scss">
.read-more__text {
  color: rgb(96, 98, 102);
  line-height: 24px;
}
</style>
