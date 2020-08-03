<template>
  <div class="edit-nick-name">
    <div class="edit-user-nav">
      <van-nav-bar left-arrow fixed @click-left="btnBack">
        <template slot="right">
          <van-button size="small" :disabled="btn" @click="btnSubmit" color="#7232dd">保存</van-button>
        </template>
      </van-nav-bar>
    </div>
    <div class="edit-nick-name-body">
      <input v-model="nickname" type="text" onfocus placeholder="昵称不能为空">
      <p>好的名能够让别人容易记住你</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      btn: true,
      nickname: this.$store.getters.user.name
    }
  },
  methods: {
    btnBack () {
      this.$router.go(-1)
    },
    btnSubmit () {
      if (this.nickname !== '') {
        this.$store.dispatch('user/update', { name: this.nickname }).then(() => {
          this.btn = true
          this.$toast.success('修改成功')
        }).catch(err => {
          // console.log(err)
          this.$toast.fail(err.message)
        })
      } else {
        this.$dialog.alert({
          message: '昵称不能为空'
        })
      }
    }
  },
  watch: {
    nickname (val) {
      if (val === this.$store.getters.user.name || val === '') {
        this.btn = true
      } else {
        this.btn = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.edit-nick-name{
  padding-top: 46px;
  &-body{
    min-height: calc(100vh - 46px);
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    input{
      margin-top: 10px;
      height: 30px;
      border: 0;
      font-size: 20px;
      background: transparent;
      border-bottom: 1px solid #7232dd;
    }
    input::-webkit-input-placeholder {
    color: #ccc;
      font-size: 16px;
    }
    p{
      font-size: 14px;
      color: #666;
      font-weight: 200;
      margin-top: 8px;
      padding-left: 4px;
    }
  }
}
</style>
