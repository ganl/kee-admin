<template>
  <div>
  <el-row>
    <el-col :span="24">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="">
        <el-form-item :label="lables.username" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item :label="$t('hello')" prop="pwd">
          <el-input v-model="loginForm.pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click.native.prevent="login">{{$t('loginBtn')}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      lables: {
        username: this.$t('username')
      },
      loginForm: {
        username: '',
        pwd: ''
      },
      loginRules: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        pwd: [
            { required: true, message: '请输入登录密码', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    login () {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('loginByIdentity', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({path: '/test'})
          })
        } else {
          console.log('error input')
          return false
        }
      })
    }
  }
}
</script>
<style lang="css" scoped>
</style>