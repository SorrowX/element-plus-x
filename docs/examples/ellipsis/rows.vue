<template>
  <el-ellipsis rows="3" style="max-width: 355px" popper-class="ellipsis-popper">
    {{ text }}
  </el-ellipsis>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref(
  '每天清晨，当城市的灯火还未完全熄灭，我已踏着星辰，满怀疲惫与希望，融入那茫茫人海，只为那份能支撑起生活重量的微薄薪资。夜深人静时，拖着沉重的步伐回家，心中五味杂陈，不是不想停下，而是不敢停下，因为身后，是生活的重担，是家人的期盼。打工人，不只是身份的标签，更是无数平凡人，在不易中坚持，在辛酸中寻梦的代名词。'
)
</script>

<style lang="scss">
.ellipsis-popper {
  width: 300px;
}
</style>
