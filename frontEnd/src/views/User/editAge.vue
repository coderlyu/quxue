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
      <input v-model="age" type="text" onfocus placeholder="你的年龄">
      <p>让同龄的人更好找到你</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      btn: true,
      age: this.$store.getters.user.age
    }
  },
  methods: {
    btnBack () {
      this.$router.go(-1)
    },
    btnSubmit () {
      if (/^[1-9][0-9]*/.test(this.age.trim()) || /^0$/.test(this.age.trim())) {
        this.$store.dispatch('user/update', { age: this.age.trim() }).then(() => {
          this.btn = true
          this.$toast.success('修改成功')
        }).catch(err => {
          this.$toast.fail(err.message)
        })
      } else {
        this.$dialog.alert({
          message: '年龄不能为空'
        })
      }
    }
  },
  watch: {
    age (val) {
      if (val === this.$store.getters.user.age || val === '') {
        this.btn = true
      } else {
        if (/^[1-9][0-9]*/.test(val) || /^0$/.test(val)) {
          this.btn = false
        } else {
          this.$toast('只能输入数字')
        }
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
