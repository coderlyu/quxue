<template>
  <div class="app-wrapper">
    <myHeader />
    <section class="main" :class="isMobile ? '' : 'padd20'">
      <myNav />
      <div class="over-flow-auto" :class="isMobile ? '' : 'padd20'" style="flex:1;">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <router-view />
          </keep-alive>
        </transition>
      </div>
    </section>
    <myFooter />
  </div>
</template>

<script>
import myHeader from './header/index'
import myFooter from './footer/index'
import myNav from './nav/index'
import { mapGetters } from 'vuex'
export default {
  name: 'layout',
  components: {
    myHeader,
    myFooter,
    myNav
  },
  computed: {
    ...mapGetters([
      'isMobile'
    ])
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.main {
  position: relative;
}
@media (max-width: 768px){
  .main {
    margin-top: 60px;
  }
}
</style>
