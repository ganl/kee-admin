<template>
  <div class="container">
    <div class="login-header">
      <div class="topbar">
        <el-row>
          <el-col>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link choose-lang">
                {{ $t("chooseLanguage") }}<icon name="language"></icon>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="en">English</el-dropdown-item>
                <el-dropdown-item command="zh-CN">简体中文</el-dropdown-item>
                <el-dropdown-item command="zh-TW">繁體中文</el-dropdown-item>
                <el-dropdown-item command="ru-RU">Русский язык</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>


    </div>
    <div class="login-body">
      <div class="login-body-box">
        <div class="tips">
          <dl>
            <dt>英方股份 <span class="fly-label">I2</span>  <i class="fly"></i> </dt>
            <dd>以保证企业<b>业务连续性</b>为首要目标</dd>
            <dd>实时数据复制、持续数据保护技术</dd>
            <dd>专注于容灾及业务高可用领域</dd>
            <dd></dd>
          </dl>
        </div>
        <div class="s-login">
          <div class="s-login-header">
            <div class="logo"><img src="/static/logo2.png" /></div>
          </div>
          <div class="s-login-content">
            <el-row type="flex" justify="center">
              <el-col :xs="20" :sm="20" :md="18" :lg="18" >
                <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="">
                  <el-form-item prop="username">
                      <el-input type="text" v-model="loginForm.username" :placeholder="lables.test" autoComplete="off">
                        <template slot="prepend"><icon name="account" type="svg"></icon></template>
                      </el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password" :placeholder="$t('password')" autoComplete="off" @keyup.enter.native="login">
                      <template slot="prepend"><icon name="password"></icon></template>
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button class="login-btn" type="primary" :loading="loading" @click.native.prevent="login">{{$t('loginBtn')}}</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div class="login-footer">
      <p>2011-2017 &copy; Information2 software Inc</p>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import lStorage from 'common/storage'
import VueIconFont from 'vue-icon-font'
import '@/assets/iconfont/iconfont.js'
Vue.use(VueIconFont)

export default {
  name: 'login',
  data () {
    return {
      lables: {
        username: this.$t('username')
      },
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
            { required: true, message: this.$t('user.pleaseInputUsername'), trigger: 'blur' }
        ],
        password: [
            { required: true, message: this.$t('user.pleaseInputPassword'), trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    handleCommand (command) {
      // this.$message('click on item ' + command)
      this.$i18n.locale = command
      lStorage.setItem('language', command)
    },
    login () {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('loginByIdentity', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({path: '/dashboard'}) // console home
          }).catch(err => {
            this.loading = false
            this.$message({
              showClose: true,
              duration: 0,
              message: err.message,
              type: 'warning'
            })
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
<style lang="scss" scoped>
@import '../../assets/sass/login.scss';
.topbar {
  line-height: 50px;
  float: right;
  margin-right: 20px;
  color: #828282;
  font-weight: 600;
}
</style>
