<template>
  <div class="search-wrapper">
   <div class="search-input">
      <van-search
      v-model="searchVal"
      placeholder="请输入搜索关键词"
      show-action
      fixed
      @search="onSearch"
      @cancel="onCancel"
    />
   </div>
   <div class="search-check">
    <!-- <div class="product">
      <van-cell-group>
        <van-field v-model="product.name" placeholder="名称" />
        <van-field v-model="product.price" placeholder="新价格" />
        <van-field v-model="product.old_price" placeholder="老价格" />
        <van-field v-model="product.coupon" placeholder="优惠" />
        <van-field v-model="product.imageList" placeholder="图片数组" />
        <van-field v-model="product.imgUrl" placeholder="图片" />
      </van-cell-group>
      <van-button @click="addProduct" type="danger">添加商品</van-button>
    </div> -->
    <van-tabs v-model="active">
      <van-tab title="问题">
        <search-question :searchVal="searchVal" :isSearch="isSearchQ" @changeState="changeState"></search-question>
      </van-tab>
      <van-tab title="用户">
        <search-user :searchVal="searchVal" :isSearch="isSearchU" @changeState="changeState"></search-user>
      </van-tab>
    </van-tabs>
   </div>
  </div>
</template>
<script>
import searchQuestion from '@/components/my-search/search-question'
import searchUser from '@/components/my-search/search-user'
// import { createProduct } from '@/api/product'
export default {
  name: 'searchPage',
  components: {
    searchQuestion,
    searchUser
  },
  data () {
    return {
      product: {
        name: '',
        price: '',
        old_price: '',
        coupon: '',
        imageList: '',
        imgUrl: ''
      },
      searchVal: '',
      isSearchQ: false,
      isSearchU: false,
      active: 1
    }
  },
  methods: {
    // addProduct () {
    //   createProduct(this.product).then(res => {
    //     this.$toast('成功')
    //   }).catch(err => {
    //     this.$toast.fail(err)
    //   })
    // },
    onSearch () {
      if (this.active === 0) {
        this.isSearchQ = true
      } else if (this.active === 1) {
        this.isSearchU = true
      }
    },
    changeState () {
      this.isSearchQ = false
      this.isSearchU = false
    },
    onCancel () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.search-wrapper{
  .search-check{
    background: #F9F9F9;
    min-height: calc(100vh - 54px);
  }
}
</style>
