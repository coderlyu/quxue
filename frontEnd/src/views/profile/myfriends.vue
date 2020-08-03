<template>
  <div class="myfriends">
    <div class="myfriends-header">
      <van-nav-bar fixed left-arrow title="我的好友" @click-left="onBack">
      </van-nav-bar>
    </div>
    <div class="myfriends-list">
      <friends></friends>
    </div>
  </div>
</template>
<script>
import friends from '@/components/my-chat/my-friends.vue'
export default {
  components: {
    friends
  },
  data () {
    return {
    }
  },
  methods: {
    onBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.myfriends {
  min-height: 100vh;
  .myfriends-list {
    padding-top: 46px;
    min-height: calc(100vh - 46px);
  }
}
</style>
