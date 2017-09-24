<template>
  <div class="wrap-content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <section class="main-content" style="min-height: 100%">
      <transition name="fade" mode="out-in">
        <router-view :key="key"></router-view>
      </transition>
    </section>
  </div>

</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
    }
  }
}
</script>
<style lang="css" scoped>
.wrap-content {
  position: absolute;
  width: auto;
  top: 0px;
  bottom: 0px;
  left: 180px;
  right: 0px;
  overflow: hidden;
  overflow-y: auto;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
