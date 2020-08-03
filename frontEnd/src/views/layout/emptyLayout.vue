<template>
  <keep-alive>
    <router-view :key="$route.fullPath"/>
  </keep-alive>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
.v-enter，
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s linear;
}
</style>
