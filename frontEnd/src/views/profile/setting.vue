<template>
  <div class="setting-wrapper">
    <van-row style="margin:10px 0;">
      <van-cell-group>
        <van-cell title="账号安全" is-link />
      </van-cell-group>
    </van-row>
    <van-row style="margin:10px 0;">
      <van-cell-group>
        <van-cell title="隐私设置" is-link />
      </van-cell-group>
    </van-row>
    <van-row style="margin:10px 0 0 0;">
      <van-cell-group>
        <van-cell title="关于" is-link />
      </van-cell-group>
    </van-row>
    <van-row>
      <van-cell-group>
        <van-cell is-link @click="toUpGrade">
          <template slot="title">
            <span class="custom-title">最新版本</span>
            <van-tag type="danger">NEW</van-tag>
          </template>
        </van-cell>
      </van-cell-group>
    </van-row>
    <van-row style="padding: 0 20px; margin-top: 15px;">
      <van-button type="danger" block @click="logout">退出账号</van-button>
    </van-row>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    toUpGrade () {
      this.$toast('已经是最新版本')
    },
    logout () {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push('/login')
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.setting-wrapper {
  font-weight: 600;
}
</style>
