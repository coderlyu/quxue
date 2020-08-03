<template>
  <div class="search-user">
    <div class="no-resultt" v-if="userData.length === 0">
      <svg-icon icon-class="no-data" style="font-size:150px;"/>
    </div>
    <div class="has-result" v-else>
      <template v-for="(item, index) in userData">
        <search-user-item :uItem="item" :key="index" @toAddFollow="toAddFollow" @toClearFollow="toClearFollow"></search-user-item>
      </template>
      <div class="add-more">
        <van-button size="small" :disabled="showBtn" @click="addMoreComments" :loading="loading" color="linear-gradient(to right, #4bb0ff, #6149f6)">加载更多</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import searchUserItem from './search-user-item'
export default {
  name: 'searchUser',
  components: {
    searchUserItem
  },
  props: {
    searchVal: {
      type: String,
      default: ''
    },
    isSearch: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      userData: [],
      showBtn: false,
      loading: false,
      page: 1,
      number: 10
    }
  },
  methods: {
    toAddFollow ({ item }) {
      let index = this.userData.findIndex(ele => ele.id === item.id)
      if (index > -1) {
        let followU = this.userData[index]
        followU.isFollow = true
        this.userData = this.userData.splice(index, 1, followU)
      }
    },
    toClearFollow ({ item }) {
      let index = this.userData.findIndex(ele => ele.id === item.id)
      if (index > -1) {
        let followU = this.userData[index]
        followU.isFollow = false
        this.userData = this.userData.splice(index, 1, followU)
      }
    },
    addMoreComments () {
      this.page += 1
      let query = {
        content: this.searchVal,
        page: this.page,
        number: this.number
      }
      this.loading = true
      this.$store.dispatch('user/findUsers', query).then(res => {
        this.userData = this.userData.concat(res.data)
        this.loading = false
        this.$toast('查询成功')
        if (this.page * this.number >= res.total) {
          this.showBtn = true
        } else {
          this.showBtn = false
        }
      }).catch(err => {
        this.$toast.fail(err.message)
        this.loading = false
      })
    },
    emitChangeState () {
      this.$emit('changeState')
    },
    init () {
      this.userData = []
      let query = {
        content: this.searchVal,
        page: this.page,
        number: this.number
      }
      this.$store.dispatch('user/findUsers', query).then(res => {
        this.emitChangeState()
        this.userData = res.data
        this.$toast('查询成功')
        if (this.page * this.number >= res.total) {
          this.showBtn = true
        } else {
          this.showBtn = false
        }
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    }
  },
  watch: {
    isSearch () {
      if (this.isSearch) {
        this.init()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.search-user{
  padding: 0 5px;
  .no-resultt{
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .add-more{
    margin: 10px 0;
    display: flex;
    justify-content: center;
  }
}
</style>
