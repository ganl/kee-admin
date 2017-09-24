<template>
  <div class="wrap">
    <v-head></v-head>
    <div class="wrap-body">
      <sidebar class="sidebar" :collapse="collapse" :toggleClick="collapsedChange"></sidebar>
      <main-content :class="{collapsed: collapse}"></main-content>
    </div>
  </div>
</template>
<script>
import { vHead, sidebar, mainContent } from 'components/layout'
export default {
  components: {
    vHead,
    sidebar,
    mainContent
  },
  data () {
    return {
      collapse: false
    }
  },
  methods: {
    // collapse sidebar menu
    collapsedChange () {
      this.collapse = !this.collapse
    }
  },
  computed: {
  }
}
</script>
<style lang="scss" scoped>
.wrap-body {
  position: absolute;
  width: 100%;
  top: 50px;
  bottom: 0px;
  /* background: #222d32; */
}
.collapsed {
  left: 64px!important;
}
.sidebar {
  position: fixed;
  top: 50px;
  bottom: 0px;
  background-color: #293038;
  z-index: 101;
  overflow-x: hidden;
}
</style>
