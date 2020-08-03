<template>
  <div class="edit-address">
    <div class="edit-address-nav">
      <van-nav-bar left-arrow fixed @click-left="onClickLeft">
        <template slot="title">
          <span>编辑地区</span>
        </template>
        <template slot="right">
          <van-button size="small" @click="onSubmit" :disabled="btn" color="#7232dd">保存</van-button>
        </template>
      </van-nav-bar>
    </div>
    <div class="edit-address-body">
      <van-cell-group title="自动定位" @click="autoLocation">
        <van-cell is-link icon="aim">
          <template slot="title">
            <span>自动定位</span>
          </template>
          <template slot="default">
            <span v-if="localAddress">{{ localAddress }}</span>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group title="手动输入">
        <van-field v-model="address" placeholder="请输入地区" />
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import BMap from 'BMap'
export default {
  data () {
    return {
      btn: true,
      address: this.$store.getters.user.address,
      localAddress: ''
    }
  },
  methods: {
    getLocalAddress () {
      const geolocation = new BMap.Geolocation()
      var _this = this
      geolocation.getCurrentPosition(function getinfo (position) {
        let city = position.address.city // 获取城市信息
        let province = position.address.province // 获取省份信息
        _this.localAddress = province + ' ' + city
        _this.address = province + ' ' + city
      }, function (e) {
        _this.localAddress = '定位失败'
      }, { provider: 'baidu' })
    },
    autoLocation () {
      this.localAddress = '正在定位'
      this.getLocalAddress()
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    onSubmit () {
      this.$store.dispatch('user/update', { address: this.address }).then(() => {
        this.btn = true
        this.$toast.success('修改成功')
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    }
  },
  watch: {
    address (val) {
      if (val === '' || val === this.$store.getters.user.address) {
        this.btn = true
      } else {
        this.btn = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.edit-address{
  padding-top: 46px;
  .edit-address-body{
    min-height: calc(100vh - 46px);
    background: #f5f5f5;
  }
}
</style>
