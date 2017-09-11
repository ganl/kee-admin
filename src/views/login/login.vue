<template>
  <div>
    <a @click="test()">haha</a>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
    }
  },
  methods: {
    test () {
      this.$store.dispatch('loginByIdentity', {'username': 'admin', 'pwd': 'Info1234'})
      console.log(this.$store.getters.accessToken)
    }
  }
}
</script>
<style lang="css" scoped>
</style>