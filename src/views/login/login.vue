<template>
  <div class="container">
    <div class="login-header"></div>
    <div class="login-body">
      <div class="login-body-box">
        <div class="tips">
          <dl>
            <dt>英方 <span class="fly-label">I2</span>  <i class="fly"></i> </dt>
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
              <el-col :xs="22" :sm="22" :md="20" :lg="20" >
                <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="">
                  <el-form-item prop="username">
                    <span class="svg-container"><icon name="account" type="class"></icon></span>
                    <el-input type="text" v-model="loginForm.username" :placeholder="lables.username"></el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <span class="svg-container"><icon name="password"></icon></span>
                    <el-input type="password" v-model="loginForm.password" :placeholder="$t('password')"></el-input>
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
import VueIconFont from 'vue-icon-font'
import '@/assets/iconfont/iconfont.css'
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
            { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
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
          }).catch(err => {
            this.loading = false
            console.log(err)
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
h1,h2,h3,h4,h5,h6,p,ul,form,dl,dd,dt{margin:0;padding:0;}
li{list-style:none;}
img{ border:0}
a:hover{text-decoration:underline;}
input,img{vertical-align:middle;}

.container {
    width: 100%;
    min-height: 100vh;
    margin: auto;
    background-color: #1F2325;
    background-image: url(/static/login-bg.png);
    background-size: cover;
}

.login-header{
    height: 50px;
    position: relative;
}

.login-body{
    text-align: center;
    padding: 100px 0 118px;
}

.login-body .login-body-box {
    width: 980px;
    margin: auto;
    position: relative;
    height: 530px;
}

.login-body-box .tips {
    position: absolute;
    left: 0;
    text-align: left;
    top: 180px;
}

.tips dt {
    font-size: 36px;
    color: #828282;
    font-weight: normal;
}

span.fly-label {
    font-family: Arial, 'Segoe UI', Helvetica, sans-serif;
}

.fly {
    width: 34px;
    height: 32px;
    display: inline-block;
    background: url("/static/fly.png");
    margin-bottom: -3px;
}

.tips dd {
    font-size: 16px;
    color: #959595;
    line-height: 2em;
}

.login-body-box .s-login {
    position: absolute;
    right: 0;
    width: 430px;
    background: #FFFFFF;
    height: 100%;
    box-shadow: 0 1px 1px rgba(0,0,0,0.1);
}

.login-footer {
    height: 80px;
    position: relative;
    border-top: 1px solid rgba(255,255,255,0.3);
    text-align: center;
    padding-top: 20px;
    color: #959595;
}

.s-login-header {
    padding-top: 60px;
    padding-bottom: 60px;
}

.el-form-item, .btn-wrap {
    margin: auto;
    margin-bottom: 28px;
    width: 100%;
    display: inline-table;
    vertical-align: middle;
}

.s-input-text {
    background: #FFF;
    border: 1px solid #D7D8D9;
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    box-sizing: border-box;
    outline: 0;
    box-shadow: none;
    display: table-cell;
    vertical-align: middle;
    border-left: none;
    border-radius: 0 4px 4px 0;
}

.login-btn {
    width: 100%;
    font-size: 16px;
    border: none;
    text-align: center;
}

.input-group-addon {
    display: table-cell;
    padding: 6px 8px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    color: #555;
    text-align: center;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;
    vertical-align: middle;
    border-right: none;
}

.s-icon-user, .s-icon-pwd, .s-icon-code {
    width: 16px;
    height: 16px;
    display: block;
    text-indent: 20px;
    font-style:normal;
    color: rgba(0, 0, 0, 0.2);
}

.s-icon-user {
    background: url("/static/user.png");
    margin-right: -20px;
}

.s-icon-pwd {
    background: url("/static/pwd.png");
    margin-right: -20px;
}

.s-icon-code {
    background: url("/static/code.png");
    margin-right: -9px;
}
</style>