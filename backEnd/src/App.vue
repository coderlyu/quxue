<template>
  <div id="app">
    <router-view/>
    <transition name="fade">
      <Loading v-show="isLoading" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from '@/components/loading'
export default {
  name: 'app',
  components: {
    Loading
  },
  data () {
    return {}
  },
  methods: {
    _Resize () {
      var wid = document.body.clientWidth
      if (wid < 769) {
        this.$store.dispatch('app/changeIsMobile', { isMobile: true })
      } else {
        this.$store.dispatch('app/changeIsMobile', { isMobile: false })
        this.$store.dispatch('app/closeSideBar')
      }
    }
  },
  computed: {
    ...mapGetters([
      'isLoading'
    ])
  },
  created () {
    this._Resize()
    window.addEventListener('resize', this._Resize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this._Resize)
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
</style>
