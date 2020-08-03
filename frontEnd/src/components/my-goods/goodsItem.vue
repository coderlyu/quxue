<template>
  <div class="gooditem-wrapper" @click="joToDetail">
    <div class="gooditem-left">
      <van-image
        width="90"
        height="90"
        radius="10"
        :src="product.imgUrl"
      />
    </div>
    <div class="gooditem-right">
      <p class="gooditem-right-title van-ellipsis">
        <van-icon name="fire"/>
        {{ product.name }}
      </p>
      <p class="gooditem-right-content">
        <del>{{ product.old_price}}</del>
        <span class="gooditem-right-content-discount">
          <van-tag plain type="danger">{{ product.coupon + '元券'}}</van-tag>
        </span>
      </p>
      <p class="gooditem-right-footer">
        <span class="gooditem-right-footer-money">{{ product.price }}</span>
        <span>{{ product.sell_number | filterCoupon }}</span>
      </p>
    </div>
  </div>
</template>
<script>
import myMixin from '@/utils/myMixin'
export default {
  mixins: [myMixin],
  props: {
    product: {
      type: Object,
      required: true,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    joToDetail () {
      this.$router.push({ name: 'productDetail', params: { id: this.product.id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.gooditem-wrapper{
  background: white;
  margin: 10px 0;
  border-radius: 10px;
  display: flex;
  .gooditem-left{
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .gooditem-right{
    display: flex;
    flex: 1;
    overflow: hidden;
    flex-direction: column;
    justify-content: space-between;
    &-title{
      font-size: 14px;
      line-height: 30px;
      font-weight: 600;
      i{
        color: red;
      }
    }
    &-content{
      font-size: 14px;
      &-discount{
        margin: 0 5px;
      }
    }
    &-footer{
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #666;
      padding: 0 5px;
      &-money{
        font-size: 16px;
        color: red;
        font-weight: 600;
      }
      &-money::before{
        content: '￥';
        display: inline-block;
      }
    }
  }
}
</style>
