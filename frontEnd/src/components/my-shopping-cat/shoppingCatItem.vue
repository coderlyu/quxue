<template>
  <div class="shoppingcat-item">
    <van-icon name="cross" class="aaa" @click="deleteItem" />
    <div class="shoppingcat-item-left">
      <van-checkbox-group v-model="selec">
        <van-checkbox :name="product.id"></van-checkbox>
      </van-checkbox-group>
    </div>
    <div class="shoppingcat-item-right">
      <div class="item-img">
        <van-image
          width="80"
          height="60"
          lazy-load
          @click="bigImg"
          :src="product.img"
        />
      </div>
      <div class="item-right">
        <div class="item-right-title">
          <p class="van-ellipsis">{{ product.title }}</p>
        </div>
        <div class="item-right-number">
          <div class="tags">
            <van-tag plain type="danger">热销</van-tag>
          </div>
          <p>X<span>{{ product.number }}</span></p>
        </div>
        <div class="item-right-content">
          <p>￥{{ product.price }}</p>
          <van-stepper v-model="product.number" disable-input @plus="numPlus" @minus="numMinus" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { ImagePreview } from 'vant'
export default {
  props: {
    product: {
      type: Object,
      required: true,
      default: function () {
        return {}
      }
    },
    selecArr: {
      type: Array
    }
  },
  data () {
    return {
      selec: this.selecArr
    }
  },
  methods: {
    bigImg () {
      ImagePreview({
        images: [this.product.img]
      })
    },
    numPlus (num) {
      let number = 1
      this.$store.dispatch('shoppingcat/changeNumber', { id: this.product.id, number })
    },
    numMinus (num) {
      let number = -1
      this.$store.dispatch('shoppingcat/changeNumber', { id: this.product.id, number })
    },
    deleteItem () {
      this.$dialog.confirm({
        title: '提示',
        message: '确定要删除？'
      }).then(() => {
        this.$store.dispatch('shoppingcat/deleteProductById', { id: this.product.id }).then(() => {
          this.$notify({
            message: '删除成功',
            type: 'success',
            duration: 1000
          })
        }).catch(err => {
          this.$notify({
            message: err.message,
            type: 'danger',
            duration: 1000
          })
        })
      }).catch(() => {
        this.$notify({
          message: '取消成功',
          type: 'primary',
          duration: 1000
        })
      })
    }
  },
  created () {
    this.selec = this.selecArr
  },
  computed: {
    ...mapGetters('shoppingcat', {
      'isSelectAll': 'isSelectAll'
    }),
    initCheck () {
      return this.selec.indexOf(String(this.product.id)) > -1
    }
  },
  watch: {
    selec () {
      let checked = this.selec.indexOf(String(this.product.id)) > -1
      this.$emit('selectChange', { checked, pId: this.product.id })
    },
    selecArr () {
      this.selec = this.selecArr
    }
  }
}
</script>
<style lang="scss" scoped>
.aaa{
  position: absolute;
  right: -5px;
  top: -5px;
  color: red;
}
.shoppingcat-item{
  background: white;
  margin-top: 10px;
  border-radius: 5px;
  height: 100px;
  display: flex;
  align-items: center;
  position: relative;
  &-left{
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-right{
    flex: 1;
    overflow: hidden;
    display: flex;
    .item-img{
      width: 100px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 80px;
        height: 60px;
        border-radius: 5px;
      }
    }
    .item-right{
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &-title{
        font-size: 14px;
        font-weight: 600;
        line-height: 25px;
        padding-top: 5px;
      }
      &-number{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 10px;
        margin-right: 10px;
        color: #9c9c9c;
        span{
          margin: 0 5px;
        }
      }
      &-content{
        color: red;
        font-weight: 600;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
