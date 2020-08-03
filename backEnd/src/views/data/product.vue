<template>
  <el-tabs type="border-card">
    <el-tab-pane :key="1">
      <span slot="label"><i class="el-icon-date"></i> 商品列表</span>
      <product />
    </el-tab-pane>
    <el-tab-pane :key="2">
      <span slot="label"><i class="el-icon-date"></i> Hot</span>
      <hot />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import hot from '@/components/data/category/hot.vue'
import product from '@/components/data/product'
export default {
  name: 'product-',
  components: {
    hot,
    product
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick () {
      console.log('handleClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
