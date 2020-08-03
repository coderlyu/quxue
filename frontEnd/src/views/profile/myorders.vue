<template>
  <div class="myorders">
    <van-nav-bar
      title="我的订单"
      left-arrow
      fixed
      @click-left="onClickBack"
    />
    <div class="myorders-main">
      <van-tabs v-model="active">
        <van-tab title="全部">
          <orderItem :orders="allList" :type="0" @updateStatus="updateStatus" :currentPage="all_page" :total="all_count" :pageSize="pageSize" @pageChange="changePage"></orderItem>
        </van-tab>
        <van-tab title="待发货">
           <orderItem :orders="noSendList" :type="1" @updateStatus="updateStatus" :currentPage="send_page" :total="send_count" :pageSize="pageSize" @pageChange="changePage"></orderItem>
        </van-tab>
        <van-tab title="待收货">
           <orderItem :orders="noComfirm" :type="2" @updateStatus="updateStatus" :currentPage="comfirm_page" :total="comfirm_count" :pageSize="pageSize" @pageChange="changePage"></orderItem>
        </van-tab>
        <van-tab title="待评价">
           <orderItem :orders="noComment" :type="3" @updateStatus="updateStatus" :currentPage="comment_page" :total="comment_count" :pageSize="pageSize" @pageChange="changePage"></orderItem>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import orderItem from '@/components/my-profile/order'
export default {
  components: {
    orderItem
  },
  data () {
    return {
      active: 0,
      allList: [],
      noSendList: [],
      noComfirm: [],
      noComment: [],
      all_page: 1,
      send_page: 1,
      comment_page: 1,
      comfirm_page: 1,
      all_count: 0,
      send_count: 0,
      comment_count: 0,
      comfirm_count: 0,
      pageSize: 5
    }
  },
  methods: {
    onClickBack () {
      this.$router.go(-1)
    },
    updateStatus ({ id, type, status }) {
      if (type === 0) {
        let index = this.allList.findIndex(e => e.id === id)
        if (index > -1) {
          this.allList.slice(index, 1)
        }
      } else if (type === 1) {
        let index = this.noSendList.findIndex(e => e.id === id)
        if (index > -1) {
          this.noSendList.slice(index, 1)
        }
      } else if (type === 2) {
        let index = this.noComfirm.findIndex(e => e.id === id)
        if (index > -1) {
          this.noComfirm.slice(index, 1)
        }
      } else {
        let index = this.noComment.findIndex(e => e.id === id)
        if (index > -1) {
          this.noComment.slice(index, 1)
        }
      }
      if (status === 3) {
        this.noComfirm = []
        this.allList = []
        this.noComment = []
        this.init()
      }
    },
    changePage ({ page, type }) {
      if (type === 0) {
        this.all_page = page
        let query = {
          number: this.pageSize,
          page: this.all_page,
          status: 'all'
        }
        this.$store.dispatch('user/getUserOrders', query).then(res => {
          if (res.code === 1) {
            this.allList = res.data
            this.all_count = res.total
          }
        }).catch(err => {
          this.$toast.fail(err.message)
        })
      } else if (type === 1) {
        this.send_page = page
        let query = {
          number: this.pageSize,
          page: this.send_page,
          status: 0
        }
        this.$store.dispatch('user/getUserOrders', query).then(res => {
          if (res.code === 1) {
            this.noSendList = res.data
            this.send_count = res.total
          }
        }).catch(err => {
          this.$toast.fail(err.message)
        })
      } else if (type === 2) {
        this.comfirm_page = page
        let query = {
          number: this.pageSize,
          page: this.comfirm_page,
          status: 1
        }
        this.$store.dispatch('user/getUserOrders', query).then(res => {
          if (res.code === 1) {
            this.noComfirm = res.data
            this.comfirm_count = res.total
          }
        }).catch(err => {
          this.$toast.fail(err.message)
        })
      } else {
        this.comment_page = page
        let query = {
          number: this.pageSize,
          page: this.comment_page,
          status: 3
        }
        this.$store.dispatch('user/getUserOrders', query).then(res => {
          if (res.code === 1) {
            this.noComment = res.data
            this.comment_count = res.total
          }
        }).catch(err => {
          this.$toast.fail(err.message)
        })
      }
    },
    init () {
      if (this.active === 0) {
        if (this.allList.length === 0) {
          let query = {
            number: this.pageSize,
            page: this.all_page,
            status: 'all'
          }
          this.$store.dispatch('user/getUserOrders', query).then(res => {
            if (res.code === 1) {
              this.allList = res.data
              this.all_count = res.total
            }
          }).catch(err => {
            this.$toast.fail(err.message)
          })
        }
      } else if (this.active === 1) {
        if (this.noSendList.length === 0) {
          let query = {
            number: this.pageSize,
            page: this.send_page,
            status: 0
          }
          this.$store.dispatch('user/getUserOrders', query).then(res => {
            if (res.code === 1) {
              this.noSendList = res.data
              this.send_count = res.total
            }
          }).catch(err => {
            this.$toast.fail(err.message)
          })
        }
      } else if (this.active === 2) {
        if (this.noComfirm.length === 0) {
          let query = {
            number: this.pageSize,
            page: this.comfirm_page,
            status: 1
          }
          this.$store.dispatch('user/getUserOrders', query).then(res => {
            if (res.code === 1) {
              this.noComfirm = res.data
              this.comfirm_count = res.total
            }
          }).catch(err => {
            this.$toast.fail(err.message)
          })
        }
      } else {
        if (this.noComment.length === 0) {
          let query = {
            number: this.pageSize,
            page: this.comment_page,
            status: 3
          }
          this.$store.dispatch('user/getUserOrders', query).then(res => {
            if (res.code === 1) {
              this.noComment = res.data
              this.comment_count = res.total
            }
          }).catch(err => {
            this.$toast.fail(err.message)
          })
        }
      }
    }
  },
  created () {
    this.init()
  },
  watch: {
    active () {
      this.init()
    }
  }
}
</script>
<style lang="scss" scoped>
.myorders {
  min-height: 100vh;
  &-main {
    margin-top: 46px;
  }
}
</style>
