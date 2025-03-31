<template>
  <el-split v-model="value1" :min="0.2" :max="0.8" class="chat-demo">
    <template #left>
      <div class="left">会话列表</div>
    </template>
    <template #right>
      <div class="right">
        <el-split v-model="value2" vertical :min="0.3" :max="0.8">
          <template #left>
            <div class="container">聊天内容</div>
          </template>
          <template #right>
            <div class="container">发送框</div>
          </template>
        </el-split>
      </div>
    </template>
  </el-split>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value1 = ref(0.25)
const value2 = ref(0.6)
</script>

<style lang="scss">
.chat-demo {
  max-width: 600px;
  height: 340px;
}
.left,
.right {
  height: 100%;
  border-radius: 6px;
  box-sizing: border-box;
}
.left {
  padding: 10px;
  background-color: #f7f7f7;
}
.container {
  box-sizing: border-box;
  padding: 10px;
  border-radius: 6px;
  height: 100%;
  background-color: #f3f3f3;
}
.chat-demo.el-split .el-split__handler {
  background-color: #fff !important;
}
.chat-demo.el-split--horizontal > .el-split__trigger .el-split__pointer {
  height: 96% !important;
  width: 2px;
}
.chat-demo .el-split--vertical > .el-split__trigger .el-split__pointer {
  width: 97% !important;
  height: 2px !important;
}
</style>
