<template>
  <div class="login">
    <van-nav-bar fixed :border="false">
      <template slot="title">
        <span style="color:white;"  v-if="isLoginState">登录</span>
        <span style="color:white;" v-else>注册</span>
      </template>
    </van-nav-bar>
    <van-row class="login-logo">
      <svg-icon icon-class="userlogo" style="font-size:150px;"/>
    </van-row>
    <van-row class="login-form">
      <div class="input-item" v-if="!isLoginState">
        <span class="error_tip" v-show="nickname_err">{{ nickname_tip }}</span>
        <svg-icon icon-class="user" style="font-size:20px;color:white;"/>
        <input type="text" :value="user.nickname" @blur="testnickname" placeholder="昵称"/>
      </div>
      <div class="input-item">
        <span class="error_tip" v-show="username_err">{{ username_tip }}</span>
        <svg-icon icon-class="user" style="font-size:20px;color:white;"/>
        <input type="text" :value="user.username" @blur="testname" placeholder="用户名/手机号/邮箱"/>
      </div>
      <div class="input-item">
        <span class="error_tip" v-show="password_err">{{ password_tip }}</span>
        <svg-icon icon-class="mima" style="font-size:20px;color:white;"/>
        <input type="password" :value="user.password" @blur="testpass" placeholder="请输入密码" />
        <!-- <span class="input-item-code">验证码</span> -->
      </div>
      <div class="input-item" v-if="!isLoginState">
        <span class="error_tip" v-show="secondpassword_err">{{ secondpasspord_tip }}</span>
        <svg-icon icon-class="2-mima" style="font-size:20px;color:white;"/>
        <input type="password" :value="user.secondpassword" @blur="testsecondpass" placeholder="请再次输入密码" />
      </div>
      <div class="login-form-footer">
        <p class="login-form-footer-register" @click="toRegister" v-if="isLoginState">注册新用户</p>
        <p class="login-form-footer-register" @click="toLogin" v-else>已有账号</p>
        <p class="login-form-footer-forget" v-if="isLoginState">忘记密码?</p>
      </div>
      <div class="login-form-btn">
        <van-button color="linear-gradient(to right, rgb(173, 2, 2), rgb(228, 107, 107))" v-if="isLoginState" @click="login">登录</van-button>
        <van-button color="linear-gradient(to right, rgb(173, 2, 2), rgb(228, 107, 107))" v-else @click="register">注册</van-button>
      </div>
    </van-row>
    <van-divider style="color:white; width:80%; margin:auto;">第三方直接登录</van-divider>
    <div class="login-other">
      <van-grid :border="false" :column-num="3">
        <van-grid-item>
          <svg-icon icon-class="qq" style="font-size:30px;"/>
          <!-- <p class="login-other-p">QQ</p> -->
        </van-grid-item>
        <van-grid-item>
         <svg-icon icon-class="wx" style="font-size:30px;"/>
           <!-- <p class="login-other-p">微信</p> -->
        </van-grid-item>
        <van-grid-item>
         <svg-icon icon-class="zfb" style="font-size:30px;"/>
          <!-- <p class="login-other-p">支付宝</p> -->
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isLoginState: true,
      nickname_err: false,
      username_err: false,
      password_err: false,
      secondpassword_err: false,
      nickname_tip: '',
      username_tip: '',
      password_tip: '',
      secondpasspord_tip: '',
      user: {
        nickname: '',
        username: '',
        password: '',
        secondpassword: ''
      }
    }
  },
  methods: {
    testnickname (e) {
      if (!e.target.value) {
        this.nickname_tip = '昵称不能为空'
        this.nickname_err = true
      } else {
        this.user.nickname = e.target.value
        this.nickname_err = false
      }
    },
    testname (e) {
      if (!e.target.value) {
        this.username_tip = '用户名不能为空'
        this.username_err = true
      } else {
        this.user.username = e.target.value
        this.username_err = false
      }
    },
    testpass (e) {
      // console.log(e.target.value)
      if (!e.target.value) {
        this.password_tip = '密码不能为空'
        this.password_err = true
      } else {
        this.user.password = e.target.value
        this.password_err = false
      }
    },
    testsecondpass (e) {
      if (!e.target.value) {
        this.secondpasspord_tip = '用户名不能为空'
        this.secondpassword_err = true
      } else {
        if (e.target.value !== this.user.password) {
          this.secondpasspord_tip = '两次密码必须相同'
          this.secondpassword_err = true
          this.user.secondpassword = e.target.value
          return
        }
        this.user.secondpassword = e.target.value
        this.secondpassword_err = false
      }
    },
    toRegister () {
      this.isLoginState = false
      this.init()
    },
    toLogin () {
      this.isLoginState = true
      this.init()
    },
    login () {
      if (this.user.username && this.user.password) {
        this.$store.dispatch('user/login', this.user).then(async () => {
          this.$toast.success('登录成功')
          this.$store.dispatch('chatmsg/createSocket')
          // this.$route.router.push('/')
          this.$router.push('/')
        }).catch(err => {
          this.$toast.fail(err.message)
        })
      } else {
        this.$toast('参数不能为空')
      }
    },
    register () {
      if (this.user.username && this.user.password && this.user.secondpassword && this.user.nickname) {
        if (this.user.password === this.user.secondpassword) {
          this.$store.dispatch('user/register', this.user).then(() => {
            this.$toast.success('注册成功')
            this.toLogin()
          }).catch(err => {
            this.$toast.fail(err.message)
          })
        } else {
          this.$toast('两次密码不一致')
        }
      } else {
        this.$toast('参数不能为空')
      }
    },
    init () {
      this.nickname_err = false
      this.username_err = false
      this.password_err = false
      this.secondpassword_err = false
      this.nickname_tip = ''
      this.username_tip = ''
      this.password_tip = ''
      this.secondpasspord_tip = ''
      this.user = {
        username: '',
        passoord: '',
        secondpassword: ''
      }
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.error_tip {
    position: absolute;
    color: red;
    font-size: 12px;
    left: 10px;
    bottom: -17px;
}
.van-nav-bar {
    background-color: transparent;
}
/deep/ .van-grid-item__content {
    background-color: transparent;
}
.login {
    min-height: 100vh;
    background: url('~assets/img/login-bg.jpg');
    background-size: cover;
    &-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 40px;
    }
    &-form {
        width: 100%;
        height: 260px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
        .input-item {
            position: relative;
            width: 80%;
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid white;
            padding-bottom: 5px;
            svg {
                width: 20px;
                margin-right: 5px;
            }
            input {
                flex: 1;
                overflow: hidden;
                border: 0;
                background-color: transparent !important;
                color: white;
                font-size: 15px;
                padding-left: 10px;
            }
            input::-webkit-input-placeholder {
                opacity:0.7;
                color: white;
                font-size: 15px;
                font-weight: 200;
            }
            input:-internal-autofill-previewed, input:-internal-autofill-selected {
                -webkit-text-fill-color: #FFFFFF !important;
                transition: background-color 5000s ease-in-out 0s !important;
            }
            &-code {
                text-align: center;
                width: 50px;
                font-size: 13px;
                display: inline-block;
                background-color: #d34b4b;
                padding: 3px;
                color: white;
            }
        }
        &-footer {
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            color: white;
            font-size: 12px;
            width: 80%;
            justify-content: space-between;
            p {
                margin: 0 10px;
            }
            &-forget {
                color: red;
            }
            &-register {
                color: #037efd;
            }
        }
        &-btn {
            display: flex;
            margin-top: 20px;
            width: 80%;
            button {
                flex: 1;
            }
        }
    }
    &-other {
        width: 80%;
        margin: auto;
        &-p {
            color: white;
            font-size: 13px;
            font-weight: 200;
            margin-top: 4px;
        }
    }
}
</style>
