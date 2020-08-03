<template>
  <div class="goods-wrapper">
    <div v-if="goods.length > 0">
      <van-sticky>
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
          <van-dropdown-item v-model="value2" :options="option2" />
        </van-dropdown-menu>
      </van-sticky>
      <div class="goodslist">
        <template v-for="(product, index) in goods">
          <goods-item :product="product" :key="index"></goods-item>
        </template>
      </div>
      <div class="add-more">
        <van-button @click="addMore" :disabled="btnShow" type="primary" size="small">加载更多</van-button>
      </div>
    </div>
    <div class="no-data" v-else>
      <svg-icon icon-class="no-data" style="font-size:150px;"/>
    </div>
  </div>
</template>
<script>
import goodsItem from './goodsItem'
export default {
  components: {
    goodsItem
  },
  props: {
    goods: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    btnShow: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ],
      goodslist: this.goods,
      timeout: null
    }
  },
  methods: {
    addMore () {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout((() => {
        this.$emit('addMore')
        clearTimeout(this.timeout)
      }).bind(this), 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.add-more {
  text-align: center;
  margin: 10px 0;
  clear: both;
}
.no-data {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
