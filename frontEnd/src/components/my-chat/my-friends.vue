<template>
  <div class="friends">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="no-data" v-if="friends.length === 0">
        <svg-icon icon-class="no-data"  style="font-size:150px;"/>
      </div>
      <div class="has-data" v-else>
        <van-index-bar>
          <template v-for="(item, i) in friends">
            <van-index-anchor :index="item.type" :key="'item' + i" />
            <template v-for="(friend, j) in item.data">
              <my-friends-item :friend="friend" :key="'item' + i + 'friend' + j" />
            </template>
          </template>
        </van-index-bar>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import myFriendsItem from './my-friends-item'
export default {
  name: 'myFriends',
  components: {
    myFriendsItem
  },
  data () {
    return {
      isLoading: false,
      friends: []
    }
  },
  methods: {
    onRefresh () {
      this.$store.dispatch('user/getFriends').then(data => {
        this.friends = data
        this.$toast('刷新成功')
        this.isLoading = false
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    },
    init () {
      this.$store.dispatch('user/getFriends').then(data => {
        this.friends = data
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.friends {
  .no-data{
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
