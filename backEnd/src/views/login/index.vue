<template>
  <div class="login-wrapper">
      <div class="login-register">
        <Login />
        <Register />
      </div>
    <myFooter />
  </div>
</template>

<script>
import myFooter from '@/views/layout/footer'
import Login from './components/login.vue'
import Register from './components/register.vue'
export default {
  name: 'login',
  components: {
    Login,
    Register,
    myFooter
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #3975B4, #549DB0, #6BC0AD);
  .login-register {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
