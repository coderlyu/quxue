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
      <van-cell-group>
        <van-field
          v-model="intro"
          rows="2"
          autosize
          label="简介"
          type="textarea"
          maxlength="50"
          placeholder="请输入自我简介，让别人更好的了解你"
          show-word-limit
        />
      </van-cell-group>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      btn: true,
      intro: this.$store.getters.user.intro
    }
  },
  methods: {
    btnBack () {
      this.$router.go(-1)
    },
    btnSubmit () {
      this.$store.dispatch('user/update', { intro: this.intro }).then(() => {
        this.btn = true
        this.$toast.success('修改成功')
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    }
  },
  watch: {
    intro (val) {
      if (val === this.$store.getters.user.intro || val === '') {
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
    padding-top: 10px;
    border-top: 1px solid transparent;
    box-sizing: border-box;
  }
}
</style>
