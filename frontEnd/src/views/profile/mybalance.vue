<template>
  <div class="mybalance">
    <div class="mybalance-header">
      <van-nav-bar fixed left-arrow title="我的余额" @click-left="onBack">
      </van-nav-bar>
    </div>
    <div class="mybalance-main">
      <div class="main-top">
        <p class="money">{{ this.$store.getters.balance }}</p>
        <p class="money-intro">总余额（元）</p>
        <!-- <div class="main-top-content"></div> -->
      </div>
      <div class="main-bottom">
        <div class="main-bottom-money">
          <div class="money-item rborder">
            <p class="money">{{ this.$store.getters.balance }}</p>
            <p>充值余额（元）</p>
          </div>
          <div class="money-item">
            <p class="money">0.00</p>
            <p>赠送余额（元）</p>
          </div>
        </div>
        <div class="main-bottom-button">
          <van-button @click="show = true" round color="#509A77">充值</van-button>
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <van-dialog
      v-model="show"
      title="充值"
      show-cancel-button
      :beforeClose="beforeClose"
    >
      <div>
        <van-field
          readonly
          clickable
          :value="decimal"
          placeholder="输入充值金额"
          @touchstart.native.stop="keyBoardShow = true"
        />
      </div>
    </van-dialog>
    <van-number-keyboard
      v-model="decimal"
      :show="keyBoardShow"
      :maxlength="5"
      @blur="keyBoardShow = false"
      :z-index="5000"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false,
      decimal: '',
      keyBoardShow: false
    }
  },
  methods: {
    onBack () {
      this.$router.go(-1)
    },
    beforeClose (action, done) {
      let balance = 0
      try {
        balance = parseInt(this.decimal)
      } catch (err) {
        this.$notify({
          type: 'danger',
          message: err.message
        })
      }
      switch (action) {
        case 'confirm':
          if (balance >= 0) {
            this.$store.dispatch('user/reCharge', balance).then(res => {
              this.$notify({
                type: 'success',
                message: '充值成功'
              })
              this.decimal = ''
            }).catch(err => {
              this.$notify({
                type: 'danger',
                message: err.message
              })
            })
            done()
          } else {
            done(false)
            this.$notify({
              type: 'danger',
              message: '必须输入数字'
            })
          }
          break
        case 'cancel':
          this.decimal = ''
          done()
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.mybalance {
  min-height: 100vh;
  background: #fff;
  .mybalance-main {
    padding-top: 46px;
    min-height: calc(100 - 46px);
    .main-top {
      min-height: 200px;
      background: #509A77;
      // background: #FDCD01;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      overflow: hidden;
      p {
        text-align: center;
      }
      .money{
        color: #000;
        font-size: 50px;
        letter-spacing: 5px;
        font-weight: 600;
      }
      .money-intro {
        font-size: 14px;
        color: #444;
        font-weight: 600;
      }
    }
    .main-bottom {
      margin-top: 5px;
      &-money {
        display: flex;
        overflow: hidden;
        .money-item {
          padding: 20px 10px;
          flex: 1;
          box-sizing: border-box;
          p{
            text-align: center;
            font-size: 14px;
            color: #666;
          }
          .money {
            font-weight: 600;
            letter-spacing: 2px;
            color: #690000;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction:column;
            font-size: 25px;
          }
        }
      }
      &-button {
        margin-top: 50px;
        padding: 0 30px;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
.rborder {
  border-right: 1px dotted #999;
}
</style>
