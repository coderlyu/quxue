<template>
  <div class="login-form bg-white padd20 borderra4">
    <h1>登录</h1>
    <el-form :model="user" :rules="rules" ref="user" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input placeholder="用户名" v-model="user.username">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input  placeholder="密码" v-model="user.password">
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </el-form-item>
      <el-form-item class="btn-wrapper">
        <el-button type="primary" @click="submitForm">确认登录</el-button>
      </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.user.validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/login', this.user).then(res => {
            this.$message({
              type: 'success',
              message: '登录成功'
            })
            this.$router.push('/')
          }).catch(err => {
            this.$notify({
              title: '错误',
              message: err.message,
              type: 'error',
              duration: 1000
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  h1{
    text-align: center;
    padding: 15px 0;
  }
  .btn-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
