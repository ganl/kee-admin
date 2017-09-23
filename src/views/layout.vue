<template>
  <div class="wrap">
    <sidebar class="sidebar"></sidebar>
    <div class="main-container">
      <v-head></v-head>
      <main-container></main-container> 
    </div>
  </div>
</template>
<script>
import { vHead, sidebar, mainContainer } from 'components/layout'
export default {
  components: {
    vHead,
    sidebar,
    mainContainer
  },
  data () {
    return {
    }
  },
  computed: {
  }
}
</script>
<style lang="css" scoped>
</style>