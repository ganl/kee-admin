<template>
  <div id="app">
    <router-view v-if="noAuth"></router-view>
    <layout v-else></layout>
  </div>
</template>

<script>
import Layout from 'views/layout'
export default {
  name: 'app',
  components: {
    Layout
  },
  computed: {
    noAuth () {
      return this.$route.meta.noAuth
    }
  }
}
</script>

<style lang="scss">
@import './assets/sass/style.scss';
</style>
