<template>
  <div class="buyToAddAddress">
    <van-nav-bar
      left-text="确认订单"
      left-arrow
      @click-left="onBack"
      fixed
    />
    <div class="buyToAddAddress-main">
      <div class="address" @click="toCheckAddress">
        <div class="address-left">
          <svg-icon icon-class="address"  style="font-size:40px;"/>
        </div>
        <div class="address-right">
          <h3>
            <span class="title">{{ address.name }}</span>
            <span class="van-ellipsis">{{ address.tel }}</span>
          </h3>
          <p class="content van-multi-ellipsis--l2">{{ address.address }}</p>
        </div>
        <div class="address-icon">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="product-items">
        <van-card
          :num="product.number"
          :price="product.price"
          :title="product.title"
          :thumb="product.img"
        />
        <div class="my-cell">
          <div class="my-cell-left">
            <span>配送方式</span>
          </div>
          <div class="my-cell-mid">
            <p>普通配送</p>
          </div>
          <div class="my-cell-right">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="my-cell">
          <div class="my-cell-left">
            <van-icon name="question-o" />
            <span>运费险</span>
          </div>
          <div class="my-cell-mid">
            <p>卖家赠送，退换货可赔</p>
          </div>
          <div class="my-cell-right">
            <van-icon name="arrow" />
          </div>
        </div>
        <van-cell-group>
          <van-field
            v-model="product.message"
            rows="2"
            autosize
            label="订单备注"
            type="textarea"
            :maxlength="50"
            placeholder="选填，请先和商家协商一致"
            show-word-limit
          />
        </van-cell-group>
        <div class="items-bottom">
          <p>共 {{ product.number }} 件 <span>小计：</span><span class="red">￥{{ product.totalPrice }}</span></p>
        </div>
      </div>
    </div>
    <van-submit-bar
      :price="product.totalPrice * 100"
      button-text="提交订单"
      @submit="submitOrders"
    />
    <!-- 显示选择收货地址的mask -->
    <div class="address-list" v-if="showCheckAddressList">
      <div class="address-list-nav">
        <van-nav-bar title="我的收获地址" left-arrow fixed right-text="添加新地址" @click-left="btnHiddenShow" @click-right="toaddNewAddress"/>
      </div>
      <div class="address-list-body">
        <van-address-list
          v-model="chosenAddressId"
          :list="addressList"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
          add-button-text="确认"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'buySingleProduct',
  data () {
    return {
      showCheckAddressList: false,
      chosenAddressId: '',
      addressList: [],
      address: {
        name: '',
        tel: '',
        address: '',
        id: ''
      },
      product: {
        number: '',
        totalPrice: '',
        img: '',
        title: '',
        price: '',
        message: ''
      }
    }
  },
  methods: {
    onBack () {
      this.$router.go(-1)
    },
    submitOrders () {
      if (!this.address.id) {
        this.$toast.fail('请先添加收货地址')
        return
      }
      let orders = {
        id: this.product.id,
        number: this.product.number,
        message: this.product.message,
        addressId: this.address.id,
        address: this.address.address
      }
      this.$store.dispatch('shoppingcat/toBuySingleProduct', orders).then(res => {
        if (res.code === 1) {
          this.$store.dispatch('shoppingcat/successToBuyProducts')
          this.$toast('购买成功')
          this.$router.go(-1)
        }
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    },
    toCheckAddress () {
      this.showCheckAddressList = true
    },
    onAdd () {
      this.addressList.forEach(element => {
        if (element.id === this.chosenAddressId) {
          this.address = element
        }
      })
      this.showCheckAddressList = false
    },
    btnHiddenShow () {
      this.showCheckAddressList = false
    },
    onEdit (item, index) {
      this.$router.push({ name: 'editAddress', params: { id: item.id } })
    },
    init () {
      this.product = {
        id: this.$route.query.id,
        number: this.$route.query.number,
        totalPrice: parseInt(this.$route.query.number) * parseFloat(this.$route.query.price),
        img: this.$route.query.img,
        title: this.$route.query.title,
        price: this.$route.query.price,
        message: this.$route.query.message
      }
      this.$store.dispatch('user/getAddressListByUserId').then(res => {
        let list = res.data
        let arr = []
        list.forEach((item, index) => {
          let tmpArr = {
            id: item.id,
            name: item.name,
            tel: item.phone,
            address: item.province + item.city + item.area + ' ' + item.detail_address,
            isDefault: item.default_flag === 1
          }
          if (item.default_flag === 1) {
            this.chosenAddressId = item.id
            this.address = tmpArr
          }
          arr.push(tmpArr)
        })
        this.addressList = arr
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    },
    toaddNewAddress () {
      this.$router.push({ path: '/user/addAddress' })
    }
  },
  $route (to, from) {
    if ((from.name === 'addAddress' || from.name === 'editAddress') && (to.name === 'addressList' || to.name === 'buySingleProduct')) {
      this.init()
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.buyToAddAddress {
  min-height: 100vh;
  .buyToAddAddress-main {
    border-top: 1px solid transparent;
    margin-top: 46px;
    margin-bottom: 50px;
    .address {
      border-radius: 10px;
      height: 80px;
      background: #fff;
      margin: 5px 10px;
      display: flex;
      flex-direction: row;
      &-left {
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3 {
          line-height: 30px;
          span {
            color: #7d7d7d;
            font-size: 12px;
            font-weight: 400;
          }
          span.title {
            color: #000;
            font-weight: 600;
            margin-right: 10px;
            font-size: 14px;
          }
        }
        .content {
          color: #7d7d7d;
          font-size: 12px;
        }
      }
      &-icon {
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .product-items {
      border-top: 1px solid transparent;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      margin: 10px 10px 0 10px;
      padding: 10px;
      background: #fff;
      /deep/ .van-card {
        background: #fff;
      }
      .my-cell {
        height: 25px;
        cursor: pointer;
        margin: 5px 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 12px;
        color: #7d7d7d;
        &-left {
          width: 70px;
          color: #444;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            margin-left: 5px;
          }
        }
        &-mid {
          flex: 1;
          overflow: hidden;
          font-size: 12px;
        }
        &-right {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20px;
        }
      }
      .items-bottom {
        margin: 5px 0;
        display: flex;
        justify-content: flex-end;
        color: #666;
        font-size: 12px;
        span {
          font-size: 13px;
          color: #444;
        }
        span.red {
          color: red;
        }
      }
    }
  }
}
.address-list{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  padding-top: 46px;
  .address-list-body{
    background: #f5f5f5;
    min-height: calc(100vh - 46px);
    position: relative;
    .no-data{
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      &-btn{
        display: flex;
        width: 100%;
        flex-direction: column;
        position: absolute;
        bottom: 0;
      }
    }
  }
}
</style>
