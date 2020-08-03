<template>
  <div class="shopping-wrapper">
    <div class="shopping-top">
      <shopping-cat></shopping-cat>
    </div>
    <div class="shopping-bottom">
      <van-submit-bar
        :price="total"
        button-text="提交订单"
        @submit="onSubmit"
      >
        <van-checkbox v-model="checkAll" @click="toggleChecked">全选</van-checkbox>
        <span slot="tip" v-if="tipShow">
          你的收货地址不支持同城送, <span class="address" @click="editAddress">修改地址</span>
          <van-icon name="cross" @click="tipClose" class="tipclose" />
        </span>
      </van-submit-bar>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import shoppingCat from '@/components/my-shopping-cat/index.vue'
export default {
  components: {
    shoppingCat
  },
  data () {
    return {
      checkAll: this.isSelectAll,
      selecArr: this.selec,
      tipShow: true
    }
  },
  methods: {
    onSubmit () {
      console.log(this.selec)
      if (!this.selec || this.selec.length === 0) {
        this.$toast('请先添加商品吧')
        return
      }
      this.$router.push('/buyToAddAddress')
      // this.$store.dispatch('shoppingcat/toBuyProducts').then(res => {
      //   this.$toast('购买成功')
      // }).catch(err => {
      //   this.$toast.fail(err)
      // })
    },
    editAddress () {
      this.$toast('正在努力完善...')
    },
    toggleChecked () {
      this.$store.dispatch('shoppingcat/toggleSetlectAll', { checkAll: !this.checkAll })
    },
    tipClose () {
      this.tipShow = false
    }
  },
  computed: {
    ...mapGetters('shoppingcat', {
      'totalPrice': 'getSelectTotal',
      'isSelectAll': 'isSelectAll',
      'selec': 'getSelectP',
      'shoppingCat': 'getCat'
    }),
    total () {
      return parseFloat(this.totalPrice) * 100
    }
  },
  watch: {
    isSelectAll () {
      this.checkAll = this.isSelectAll
    }
  },
  created () {
  }
}
</script>
<style lang="scss" scoped>
.van-submit-bar{
  bottom: 50px;
}
.tipclose {
  color: red;
  float: right;
}
.shopping-top{
  padding: 5px;
  min-height: calc(100vh - 46px - 100px);
}
.address{
  color: #2f9dea;
}
</style>
