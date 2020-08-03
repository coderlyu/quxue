<template>
  <div class="shoppingcat">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <template v-if="shoppingCat.length > 0">
        <template v-for="(product, index) in shoppingCat">
          <shopping-cat-item :product="product" :key="index" :selecArr="selec" @selectChange="selectChange"></shopping-cat-item>
        </template>
      </template>
      <div class="no-data" v-else>
        <svg-icon icon-class="no-data" style="font-size:150px;"/>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import shoppingCatItem from './shoppingCatItem'
export default {
  components: {
    shoppingCatItem
  },
  data () {
    return {
      isLoading: false,
      selecArr: this.selec,
      checked: false
    }
  },
  methods: {
    selectChange ({ checked, pId }) {
      if (checked) {
        this.$store.dispatch('shoppingcat/selectChangeById', { type: 'add', pId })
      } else {
        this.$store.dispatch('shoppingcat/selectChangeById', { type: 'del', pId })
      }
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    }
  },
  computed: {
    ...mapGetters('shoppingcat', {
      'totalPrice': 'getSelectTotal',
      'selec': 'getSelectP',
      'shoppingCat': 'getCat',
      'isSelectAll': 'isSelectAll'
    }),
    isChecked () {
      let _this = this
      // let a = this.selec
      return function (product) {
        return _this.selec.indexOf(String(product.id)) > -1
      }
    }
  },
  created () {
  },
  watch: {
  }
}
</script>
<style lang="scss" scoped>
.shoppingcat {
  padding-bottom: 80px;
}
.no-data {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
