<template>
  <el-dialog
    title="商品详情"
    :visible.sync="showDialog"
    :width="isMobile ? '95%' : '50%'"
    @close="$emit('cancelDetail')"
    center>
    <div>
      <ul class="app-wrapper">
        <li class="flex-bt padd5 border-top">
          <h4 class="flex1">主页图片</h4>
          <p class="flex2 font-c666">
            <img v-if="item.imgUrl" :src="item.imgUrl" alt="主页图片" style="width:80px;height:80px;border-radius: 50%;">
            <span v-else> - </span>
          </p>
        </li>
        <li class="flex-bt padd5 border-top"> <h4 class="flex1">商品名</h4> <span class="flex2 font-c666">{{ item.name ? item.name : '-' }}</span> </li>
        <li class="flex-bt padd5 border-top"> <h4 class="flex1">编号</h4> <span class="flex2 font-c666">{{ item.id ? item.id : '-'}}</span> </li>
        <li class="flex-bt padd5 border-top"> <h4 class="flex1">价格</h4> <span class="flex2 font-c666">￥ {{ item.price ? item.price : '-' }}</span> </li>
        <li class="flex-bt padd5 border-top"> <h4 class="flex1">优惠</h4> <span class="flex2 font-c666">￥ {{ item.coupon ? item.coupon : '-' }}</span> </li>
        <li class="flex-bt padd5 border-top"> <h4 class="flex1">旧价格</h4> <span class="flex2 font-c666">￥ {{ item.old_price ? item.old_price : '-' }}</span> </li>
        <li class="flex-bt padd5 border-top"> <h4 class="flex1">库存</h4> <span class="flex2 font-c666">{{ item.stock ? item.stock : '-' }}</span> </li>
        <li class="flex-bt padd5 border-top"> <h4 class="flex1">销量</h4> <span class="flex2 font-c666">{{ item.sell_number ? item.sell_number : '-' }}</span> </li>
        <li class="flex-bt padd5 border-top"> <h4 class="flex1">详细图片</h4>
          <template v-for="(url, index) in item.imageList">
            <el-image
              v-if="index > 0"
              :key="index"
              style="width: 100px; height: 100px"
              :src="url"
              :fit="fit">
            </el-image>
          </template>
        </li>
        <li class="flex-bt padd5 border-top"> <h4 class="flex1">简介</h4> <span class="flex2 font-c666">{{ item.info ? item.info : '-' }}</span> </li>
        <li class="flex-bt padd5 border-top"> <h4 class="flex1">创建时间</h4> <span class="flex2 font-c666">{{ item.create_time | filterTime }}</span> </li>
      </ul>
      <!-- <div class="flex-end">
        <el-button type="danger" :size="isMobile ? 'mini' : ''" @click="$emit('cancelDetail')">取消</el-button>
        <el-button type="primary" :size="isMobile ? 'mini' : ''" >确定</el-button>
      </div> -->
    </div>
  </el-dialog>
</template>

<script>
import mixin from '@/utils/mixins'
import { mapGetters } from 'vuex'
export default {
  name: 'product-detail',
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  mixins: [mixin],
  data () {
    return {
      showDialog: this.isShow
    }
  },
  computed: {
    ...mapGetters([
      'isMobile'
    ])
  },
  watch: {
    isShow () {
      this.showDialog = this.isShow
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
