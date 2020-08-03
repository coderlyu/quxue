<template>
  <div class="home-wrapper">
    <van-tabs v-model="active">
      <van-tab title="全部" name="all">
        <van-pull-refresh v-model="isLoading1" @refresh="onRefresh1">
          <my-question @updateQuextion="updateQuextion" :items="allList" @addMore="questionMore" :itemType="1" :btnShow="all_btnShow"></my-question>
        </van-pull-refresh>
     </van-tab>
      <van-tab title="关注" name="like">
        <van-pull-refresh v-model="isLoading2" @refresh="onRefresh2">
          <my-question :items="likeList" :itemType="2" :btnShow="like_btnShow"></my-question>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="商城" name="shop">
        <van-pull-refresh v-model="isLoading3" @refresh="onRefresh3">
          <my-goods :goods="shopList" @addMore="moreShop" :btnShow="shop_btnShow"></my-goods>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import myQuestion from '@/components/my-question'
import myGoods from '@/components/my-goods'
export default {
  components: {
    myQuestion,
    myGoods
  },
  data () {
    return {
      all_btnShow: false,
      like_btnShow: false,
      shop_btnShow: false,
      isLoading1: false,
      isLoading2: false,
      isLoading3: false,
      active: 'all',
      allList: [],
      likeList: [],
      shopList: [],
      all_currentPage: 1,
      like_currentPage: 1,
      shop_currentPage: 1,
      all_pageSize: 5,
      like_pageSize: 5,
      shop_pageSize: 5
    }
  },
  methods: {
    init () {
      switch (this.active) {
        case 'all':
          if (this.allList.length === 0) {
            let query = {
              page: this.all_currentPage,
              number: this.all_pageSize
            }
            this.$store.dispatch('question/getQuestionList', query)
              .then(res => {
                this.allList = res.data
                if (this.all_currentPage * this.all_pageSize >= res.total) {
                  this.all_btnShow = true
                } else {
                  this.all_btnShow = false
                }
              }).catch(err => {
                this.$toast(err.message)
              })
          }
          break
        case 'like':
          if (this.likeList.length === 0) {
            let query = {
              page: this.like_currentPage,
              number: this.like_pageSize
            }
            this.$store.dispatch('user/getFriendsAllActives', query).then(res => {
              this.likeList = res.data
              if (this.like_currentPage * this.like_pageSize >= res.total) {
                this.like_btnShow = true
              } else {
                this.like_btnShow = false
              }
            }).catch(err => {
              this.$toast.fail(err.message)
            })
          }
          break
        case 'shop':
          if (this.shopList.length === 0) {
            let query = {
              page: this.shop_currentPage,
              number: this.shop_pageSize
            }
            this.$store.dispatch('shoppingcat/getProductList', query).then(res => {
              this.shopList = res.data
              if (this.shop_currentPage * this.shop_pageSize >= res.total) {
                this.shop_btnShow = true
              } else {
                this.shop_btnShow = false
              }
            }).catch(err => {
              this.$toast.fail(err.message)
            })
          }
          break
        default:
          break
      }
    },
    questionMore ({ type }) {
      if (type === 1) {
        this.all_currentPage += 1
        this.$store.dispatch('question/getQuestionList', { page: this.all_currentPage, number: this.all_pageSize })
          .then(res => {
            this.allList = this.allList.concat(res.data)
            if (this.all_currentPage * this.all_pageSize >= res.total) {
              this.all_btnShow = true
            } else {
              this.all_btnShow = false
            }
            this.$toast('数据加载完成')
          }).catch(err => {
            this.$toast(err.message)
          })
      } else if (type === 2) {
        this.like_currentPage += 1
      }
    },
    moreShop () {
      this.shop_currentPage += 1
      let query = {
        page: this.shop_currentPage,
        number: this.shop_pageSize
      }
      this.$store.dispatch('shoppingcat/getProductList', query).then(res => {
        this.shopList = this.shopList.concat(res.data)
        if (this.shop_currentPage * this.shop_pageSize >= res.total) {
          this.shop_btnShow = true
        } else {
          this.shop_btnShow = false
        }
        this.$toast('数据加载完成')
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    },
    onRefresh1 () {
      this.allList = []
      this.all_currentPage = 1
      let query = {
        page: this.all_currentPage,
        number: this.all_pageSize
      }
      this.$store.dispatch('question/getQuestionList', query).then(res => {
        this.allList = res.data
        this.isLoading1 = false
        this.$toast('刷新成功')
        if (this.all_currentPage * this.all_pageSize >= res.total) {
          this.all_btnShow = true
        } else {
          this.all_btnShow = false
        }
      }).catch(err => {
        this.$toast(err.message)
      })
    },
    onRefresh2 () {
      this.likeList = []
      this.like_currentPage = 1
      let query = {
        page: this.like_currentPage,
        number: this.like_pageSize
      }
      this.$store.dispatch('user/getFriendsAllActives', query).then(res => {
        this.likeList = res.data
        this.isLoading2 = false
        this.$toast('刷新成功')
        if (this.like_currentPage * this.like_pageSize >= res.total) {
          this.like_btnShow = true
        } else {
          this.like_btnShow = false
        }
      }).catch(err => {
        this.$toast(err.message)
      })
    },
    onRefresh3 () {
      this.shopList = []
      this.shop_currentPage = 1
      let query = {
        page: this.shop_currentPage,
        number: this.shop_pageSize
      }
      this.$store.dispatch('shoppingcat/getProductList', query).then(res => {
        this.shopList = res.data
        this.isLoading3 = false
        this.$toast('刷新成功')
        if (this.shop_currentPage * this.shop_pageSize >= res.total) {
          this.shop_btnShow = true
        } else {
          this.shop_btnShow = false
        }
      }).catch(err => {
        this.$toast(err.message)
      })
    },
    updateQuextion ({ question, type }) {
      let index = -1
      if (type === 1) {
        this.allList.forEach((item, i) => {
          if (item.id === question.id) {
            index = i
          }
        })
        if (index > -1) {
          this.allList.splice(index, 1, question)
        }
      } else if (type === 2) {

      }
    }
  },
  watch: {
    active () {
      this.init()
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="sass" scoped>
</style>
