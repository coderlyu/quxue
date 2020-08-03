<template>
  <el-dialog
    title="问题详情"
    :visible.sync="showDialog"
    :width="isMobile ? '95%' : '50%'"
    @close="$emit('cancelDetail')"
    center>
    <div class="content" :class="isMobile? '': 'padd5'">
      <div class="content-header" :class="isMobile? '': 'margin20'">
        <h2>{{ item.title }}</h2>
        <p class="time font12">{{ item.create_time | filterTime }}</p>
      </div>
      <p v-html="item.content"></p>
    </div>
  </el-dialog>
</template>

<script>
import mixin from '@/utils/mixins'
import { mapGetters } from 'vuex'
export default {
  name: 'question-detail',
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  mixins: [mixin],
  data () {
    return {
      showDialog: this.isShow
    }
  },
  computed: {
    ...mapGetters([
      'isMobile'
    ])
  },
  watch: {
    isShow () {
      this.showDialog = this.isShow
    }
  }
}
</script>

<style lang="scss" scoped>
.time{
  text-align: end;
  color: #8e8e8e;
}
</style>
