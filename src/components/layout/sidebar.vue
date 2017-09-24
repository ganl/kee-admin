<template>
  <aside class="main-sidebar" :class="{'sidebar-collapsed': isCollapse}">
    <div class="sidebar-fold" @click="toggleClick">
      <icon :name="collapseIcon"></icon>
    </div>
    <el-menu mode="vertical"  default-active="1-4-1" :collapse="isCollapse" theme="dark" unique-opened :default-active="$route.path">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-message"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
    </el-menu>
  </aside>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    collapse: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters([
      'menu'
    ]),
    isCollapse () {
      return this.collapse
    },
    collapseIcon () {
      return this.collapse ? 'unfold' : 'fold'
    }
  }
}
</script>
<style lang="css" scoped>
.main-sidebar {
  width: 180px;
}
.sidebar-fold {
  height: 30px;
  width: 100%;
  background: #4A5064;
  color: #aeb9c2;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  cursor: pointer;
}
.sidebar-collapsed {
  width: 64px;
  overflow-x: inherit;
}
</style>
