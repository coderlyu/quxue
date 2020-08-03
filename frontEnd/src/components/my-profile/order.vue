<template>
  <div class="order-wrapper">
    <div class="no-data" v-if="orders.length === 0">
      <svg-icon icon-class="no-data"  style="font-size:150px;"/>
    </div>
    <div v-else>
      <template v-for="(item, index) in orders">
        <div class="order-item" :key="index">
          <p>
            <van-tag v-if="item.status === 0" type="primary">未发货</van-tag>
            <van-tag v-else-if="item.status === 1" type="success">运输中</van-tag>
            <van-tag v-else type="danger">交易完成</van-tag>
          </p>
          <van-card
            :num="item.number"
            :price="item.price"
            :title="item.Product[0].name"
            :thumb="item.Product[0].imgUrl"
          />
          <div class="item-bottom">
            <p>共 {{ item.number }} 件商品 <span>合计：</span><span class="price">￥{{ item.total_price }}</span></p>
          </div>
          <div class="item-btn">
            <van-button plain size="small" v-if="item.status === 0">提醒发货</van-button>
            <div v-else-if="item.status === 1">
              <van-button plain size="small" >查看物流</van-button>
              <van-button type="warning" plain size="small" @click="confirmReceipt(item)">确认收货</van-button>
            </div>
            <van-button type="warning" plain size="small" v-else>评价</van-button>
          </div>
        </div>
      </template>
      <div>
        <van-pagination
          v-model="page"
          :total-items="total"
          :items-per-page="pageSize"
          @change="pageChange"
          mode="simple"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      required: true,
      default: 1
    },
    total: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    type: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      page: this.currentPage
    }
  },
  methods: {
    pageChange (page) {
      this.$emit('pageChange', { page: page, type: this.type })
    },
    confirmReceipt (item) {
      this.$store.dispatch('user/toUpDateOrderStatus', { id: item.id, status: 3 }).then(res => {
        if (res.code === 1) {
          this.$emit('updateStatus', { type: this.type, status: 3, id: item.id })
        }
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.no-data {
  display: flex;
  height: 300px;
  justify-content: center;
  align-items: center;
}
.order-wrapper {
  .order-item {
    background: #fff;
    margin: 10px 10px;
    border-radius: 10px;
    padding: 5px;
    /deep/ .van-card {
      background: #fff;
    }
    .item-bottom {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #444;
      font-weight: 400;
      font-size: 12px;
      .price {
        font-size: 13px;
        margin-right: 5px;
      }
    }
    .item-btn {
      margin: 10px 0;
      padding: 5px;
      display: flex;
      justify-content:flex-end;
      button {
        margin-right: 5px;
      }
    }
  }
}
</style>
