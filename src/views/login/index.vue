<template>
  <div class="login-container">
    <div class="titleHeader">
      <div class="title_c">
        <p class="title_c_cn">
          <span class="txt">大数据供应链金融后台系统</span>
        </p>
        <p class="title_c_en">supply chain finance</p>
      </div>
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
        <p class="title2">欢迎登录大数据供应链金融后台系统</p>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-tooltip v-model="capsTooltip" content="大写键锁住" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-row>
        <el-col :span="16">
          <el-form-item prop="verify">
            <el-input
              ref="verify"
              v-model="loginForm.verify"
              placeholder="验证码"
              name="verify"
              type="text"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <img ref="verifyCode" alt="验证码" width="100%" @click="getVerify">
        </el-col>
      </el-row>
      <el-button :loading="loading" type="primary" class="loginBtn" @click.native.prevent="handleLogin">登 录</el-button>
      <el-button :loading="loading" type="primary" class="regiterBtn" @click.native.prevent="handleRegiter">注 册</el-button>
    </el-form>
    <div class="signup-footer">
      <div class="text-center">增值电信业务经营许可证:粤B2-20000000 粤ICP备00000000号 粤公网安备 44030500000000号 &nbsp;©</div>
      <div class="text-center">2017 All Rights Reserved.</div>
    </div>
    <el-dialog title="第三方登录" :visible.sync="showDialog">
      暂未打通，敬请期待！
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入用户名！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码至少为6位！'))
      } else {
        callback()
      }
    }
    const validateVerify = (rule, value, callback) => {
      if (value) {
        if (value.length !== 4) {
          callback(new Error('请输入四位验证码！'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请输入四位验证码！'))
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111',
        verify: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        verify: [{ required: true, trigger: 'blur', validator: validateVerify }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    this.getVerify()
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const obj = Object.assign({}, this.loginForm)
          obj.password = this.$md5(obj.password + obj.username)
          this.$store.dispatch('user/login', obj)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    handleRegiter() {
      this.$refs.regiterForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getVerify() {
      this.$refs['verifyCode'].src = 'api/getVerify?' + Math.random()
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #333;
      height: 47px;
      caret-color: #333;
      position: relative;
      top: 0px;
      font-size: 18px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        // -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: #454545;
    .el-form-item__content{
      border-bottom: 1px solid #ccc;
    }
  }
  .svg-container{
    font-size: 18px;
    position: relative;
    top: -3px;
    .svg-icon{
      width: 1.2em;
    }
  }
  img {
    cursor: pointer;
  }
  .titleHeader{
    height: 130px;
    background: #fff;
    color: #333;
    .title_c{
      width: 80%;
      height: 130px;
      margin: 0 auto;
      .title_c_cn{
        margin: 0;
        .txt{
          font-size: 34px;
          display: inline-block;
          margin: 20px 20px 10px 20px;
          padding: 0px 20px;
        }
        .type{
          font-size: 20px;
          position: relative;
          top: -5px;
        }
      }
      .title_c_en{
        width: 420px;
        text-align: center;
        font-size: 20px;
        margin: 5px auto 5px 0px;
      }
    }
  }
  .signup-footer{
    margin:20px 0;
    padding-top: 15px;
    position: absolute;
    bottom: 15px;
    width: 100%;
    color: #fff;
    font-size: 14px;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  background-image: url('../../assets/img/login_bg.png');
  background-size: 100%;
  background-repeat: no-repeat;
  overflow: hidden;
  position: relative;
  .login-form {
    position: relative;
    width: 480px;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: absolute;
    right: 15%;
    top: calc(50vh - 240px);
    padding: 25px 30px;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,.3);
    .loginBtn{
      width:100%;
      margin: 0;
      margin-bottom:15px;
      height: 45px;
      font-size: 18px;
    }
    .regiterBtn{
      width:100%;
      margin: 0;
      margin-bottom:15px;
      height: 45px;
      font-size: 18px;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: #333;
      text-align: left;
      font-weight: normal;
      margin-bottom: 15px;
    }
    .title2 {
      font-size: 18px;
      color: #666;
      text-align: left;
      font-weight: normal;
      margin-bottom: 25px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
