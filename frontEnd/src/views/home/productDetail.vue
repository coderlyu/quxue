<template>
  <div class="goods-detail">
    <div class="goods-detail-middle">
      <van-swipe class="goods-swipe" :autoplay="3000">
        <van-swipe-item v-for="(image, index) in goods.imageList" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <van-row>
        <div class="goods-descript">
          <div class="goods-descript-top">
            <p class="goods-descript-top-title van-ellipsis">{{ goods.name }}</p>
            <div class="goods-descript-top-price">
              <span>￥{{ goods.price }}</span>
              <van-tag class="my-tag" type="danger">推荐</van-tag>
            </div>
          </div>
          <div class="goods-descript-bottom">
            <p class="goods-descript-bottom-express">
              快递：<span>免运费</span>
            </p>
            <p class="goods-descript-bottom-sales">{{ goods.sell_number | filterCoupon }}</p>
            <p class="goods-descript-bottom-address">
              浙江绍兴
            </p>
          </div>
        </div>
      </van-row>
      <van-row style="margin:3px 0;">
        <van-cell-group class="user-group">
          <van-cell is-link>
            <template slot="title">
              <span class="custom-title">活动</span>
              <p class="cell-content1">领！90元红包</p>
            </template>
          </van-cell>
          <van-cell is-link>
            <template slot="title">
              <span class="custom-title">保障</span>
              <p class="cell-content2">假一赔四·极速退款·七天无理由退款</p>
            </template>
          </van-cell>
        </van-cell-group>
      </van-row>
      <van-row>
        <van-cell-group class="user-group">
          <van-cell icon="location-o" title="附近门店" is-link />
        </van-cell-group>
      </van-row>
      <van-row>
       <van-sku
        v-model="buyshow"
        :sku="sku"
        :goods="goods"
        :goods-id="goodsId"
        reset-stepper-on-hide
        reset-selected-sku-on-hide
        @buy-clicked="onBuyClicked"
        @add-cart="onAddShoppingCat"
      />
      </van-row>
      <van-row>
        <van-goods-action style="z-index:1000;">
          <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
          <van-goods-action-icon icon="cart-o" text="购物车" @click="toShoppingCat" />
          <van-goods-action-button type="warning" text="加入购物车" @click="toShowBuy" />
          <van-goods-action-button type="danger" text="立即购买" @click="toShowBuy" />
        </van-goods-action>
      </van-row>
    </div>
  </div>
</template>
<script>
import myMixin from '@/utils/myMixin'
import { mapGetters } from 'vuex'
// import skuData from '@/assets/data/skuData.js'
export default {
  mixins: [myMixin],
  data () {
    return {
      id: this.$route.params.id,
      buyshow: false,
      goodsId: this.$route.params.id,
      goods: {
        imageList: [],
        name: '',
        price: ''
      },
      sku: {}
    }
  },
  methods: {
    toShoppingCat () {
      this.$router.push({ name: 'shoppingPage' })
    },
    onClickIcon () {
      this.$toast('功能待完善')
    },
    toShowBuy () {
      this.buyshow = true
    },
    onBuyClicked (e) {
      console.log(e)
      let pModel = {
        id: String(e.selectedSkuComb.id),
        number: e.selectedNum,
        price: this.goods.price,
        img: this.goods.imgUrl,
        title: this.goods.name,
        message: e.cartMessages['订单备注'],
        tags: ''
      }
      console.log(pModel)
      this.$router.push({ path: '/buySingleProduct',
        query: {
          id: pModel.id,
          number: pModel.number,
          price: pModel.price,
          img: pModel.img,
          title: pModel.title,
          message: pModel.message
        } })
      // this.$router.push({ path: `/buySingleProduct/${pModel.id}/${pModel.number}/${pModel.price}/${pModel.img}/${pModel.title}/${pModel.message}` })
      // this.$store.dispatch('shoppingcat/').then(res => {

      // }).catch(err => {
      //   this.$toast.fail(err)
      // })
    },
    onAddShoppingCat (e) {
      let _this = this
      let pModel = {
        id: String(e.selectedSkuComb.id),
        number: e.selectedNum,
        price: this.goods.price,
        img: this.goods.imgUrl,
        title: this.goods.name,
        message: e.cartMessages['订单备注'],
        tags: ''
      }
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 500,
        onClose: function () {
          _this.$store.dispatch('shoppingcat/addProduct', { pModel }).then(res => {
            // console.log('成功了', res)
            _this.$notify({
              message: '添加购物车成功',
              type: 'success',
              duration: 1000
            })
          }).catch(err => {
            _this.$notify({
              message: err.message,
              type: 'danger',
              duration: 1000
            })
          })
        }
      })
    },
    init () {
      this.$store.dispatch('shoppingcat/getProductDetailById', this.$route.params.id).then(res => {
        let product = res.data
        this.goods = res.data
        this.sku = {
          tree: [
            {
              k: '规格', // skuKeyName：规格类目名称
              k_id: '1',
              v: [
                {
                  id: product.id, // skuValueId：规格值 id
                  name: '省考笔试智学班', // skuValueName：规格值名称
                  imgUrl: product.imageList[0], // 规格类目图片，只有第一个规格类目可以定义图片
                  previewImgUrl: product.imgUrl // 用于预览显示的规格类目图片
                }
              ],
              k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            }
          ],
          // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
          list: [
            {
              id: product.id, // skuId，下单时后端需要
              price: product.price * 100, // 价格（单位分）
              s1: product.id, // 规格类目 k_s 为 s1 的对应规格值 id
              s2: '0', // 规格类目 k_s 为 s2 的对应规格值 id
              s3: '0', // 最多包含3个规格值，为0表示不存在该规格
              stock_num: product.stock // 当前 sku 组合对应的库存
            }
          ],
          price: product.price, // 默认价格（单位元）
          stock_num: product.stock, // 商品总库存
          collection_id: 1, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
          none_sku: false, // 是否无规格商品
          messages: [
            {
              datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
              multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
              name: '订单备注', // 留言名称
              type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
              placeholder: '选填，请先和卖家协商一致' // 可选值，占位文本
            }
          ],
          hide_stock: false // 是否隐藏剩余库存
        }
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    }
  },
  computed: {
    ...mapGetters('shoppingcat', {
      'totalPrice': 'getSelectTotal',
      'selectP': 'getSelectP'
    })
  },
  created () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
// van-cell部分css
.cell-content1{
  color: red;
  font-weight: 600;
  display: inline-block;
  font-size: 12px;
  margin-left: 5px;
}
.cell-content2{
  display: inline-block;
  font-size: 10px;
  margin-left: 5px;
}
.custom-title{
  color: #828282;
}
.goods-detail{
  .goods-detail-middle{
    .goods-swipe{
      img {
        width: 100%;
        display: block;
        height: 200px;
      }
    }
    .goods-descript{
      display: flex;
      flex-direction: column;
      background: white;
      &-top{
        padding-left: 1em;
        &-title{
          font-weight: 600;
          font-size: 18px;
          line-height: 30px;
          margin: 5px 0;
        }
        &-price{
          color: red;
          font-weight: 600;
          line-height: 30px;
          font-size: 15px;
          border-bottom: 1px solid #eaeaea;
          display: flex;
          justify-content: space-between;
          .my-tag{
            height: 15px;
            margin: 1px 5px 0 0;
          }
        }
      }
      &-bottom{
        padding-left: 1em;
        margin: 10px 0;
        color: #868686;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        &-address{
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
