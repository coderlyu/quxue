<template>
  <div class="header-wrapper">
    <van-nav-bar
      :title="title"
      fixed
      :left-arrow="leftArrow"
      @click-left="onClickLeft"
      :z-index="10"
    >
     <van-icon v-if="rightArrow === 1" name="search" slot="right" @click="onSearch" />
     <van-icon v-if="rightArrow === 2" name="setting" slot="right" @click="onSetting" />
    </van-nav-bar>
  </div>
</template>
<script>
export default {
  props: {
    leftArrow: {
      type: Boolean,
      default: true
    },
    rightArrow: {
      type: Number,
      default: 1
    },
    title: {
      type: String
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onSearch () {
      this.$router.push('/search')
    },
    onSetting () {
      this.$router.push('/profile/setting')
    }
  }
}
</script>
<style lang="sass" scoped>

</style>
