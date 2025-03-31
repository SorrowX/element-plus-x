<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="text" label="文字溢出" width="250">
      <el-ellipsis rows="2" popper-class="ellipsis-popper">
        {{ text }}
      </el-ellipsis>
    </el-table-column>
    <el-table-column prop="tag" label="非文字">
      <el-ellipsis popper-class="ellipsis-popper">
        <el-tag
          v-for="num in 20"
          :key="num"
          style="margin-right: 4px"
          disable-transitions
        >
          tag{{ num }}
        </el-tag>
        <template #action>
          <el-text style="margin-left: 10px; width: 30px" type="primary">
            ...
          </el-text>
        </template>
        <template #content>
          <el-tag
            v-for="num in 20"
            :key="num"
            style="margin: 4px"
            disable-transitions
            type="warning"
          >
            tag{{ num }}
          </el-tag>
        </template>
      </el-ellipsis>
    </el-table-column>
    <el-table-column prop="text2" label="文字溢出2">
      <el-ellipsis rows="3" popper-class="ellipsis-popper">
        {{ text }}
      </el-ellipsis>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
const text =
  '每天清晨，当城市的灯火还未完全熄灭，我已踏着星辰，满怀疲惫与希望，融入那茫茫人海，只为那份能支撑起生活重量的微薄薪资。夜深人静时，拖着沉重的步伐回家，心中五味杂陈，不是不想停下，而是不敢停下，因为身后，是生活的重担，是家人的期盼。打工人，不只是身份的标签，更是无数平凡人，在不易中坚持，在辛酸中寻梦的代名词。'

const text2 = `在生活的广袤田野里，我们都是辛勤的播种者，即使有时收获的只是工作的疲惫与艰辛的汗水。然而，正是这些苦涩的时刻，如同夜空中最亮的星，照亮了我们追求梦想的道路，提醒着我们，每一个黎明前的黑暗都蕴含着成长的机遇。所以，打工不只是生存的方式，更是塑造坚韧不拔之灵魂的磨刀石。作为苦逼打工人的你，正走在成为自己生活哲学家的路上，用每一天的努力书写属于自己的人生篇章。`

const tableData = [
  {
    text,
    nums: 10,
    text2,
  },
  {
    text,
    nums: 12,
    text2,
  },
  {
    text,
    nums: 16,
    text2,
  },
  {
    text,
    nums: 20,
    text2,
  },
]
</script>

<style lang="scss">
.ellipsis-popper {
  max-width: 200px;
}
</style>
