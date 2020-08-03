<template>
  <el-dialog
    title="用户详情"
    :visible.sync="showDialog"
    :width="isMobile ? '95%' : '50%'"
    @close="$emit('cancelDetail')"
    center>
    <div>
      <ul class="app-wrapper">
        <li class="flex-bt padd5 border-top">
          <h4 class="flex1">头像</h4>
          <p class="flex2 font-c666">
            <img v-if="item.avatar" :src="item.avatar" alt="头像" style="width:80px;height:80px;border-radius: 50%;">
            <span v-else> - </span>
          </p>
        </li>
        <li class="flex-bt padd5 border-top"> <h4 class="flex1">姓名</h4> <span class="flex2 font-c666">{{ item.name ? item.name : '-' }}</span> </li>
        <li class="flex-bt padd5 border-top"> <h4 class="flex1">编号</h4> <span class="flex2 font-c666">{{ item.id ? item.id : '-'}}</span> </li>
        <li class="flex-bt padd5 border-top"> <h4 class="flex1">账号</h4> <span class="flex2 font-c666">{{ item.user_number ? item.user_number : '-' }}</span> </li>
        <li class="flex-bt padd5 border-top"> <h4 class="flex1">余额</h4> <span class="flex2 font-c666">{{ item.balance ? item.balance : '-' }}</span> </li>
        <li class="flex-bt padd5 border-top"> <h4 class="flex1">地址</h4> <span class="flex2 font-c666">{{ item.address ? item.address : '-' }}</span> </li>
        <li class="flex-bt padd5 border-top"> <h4 class="flex1">简介</h4> <span class="flex2 font-c666">{{ item.intro ? item.intro : '-' }}</span> </li>
        <li class="flex-bt padd5 border-top">
          <h4 class="flex1">性别</h4>
          <span class="flex2 font-c666">
            <svg-icon v-if="item.sex === 1" icon-class="nan" style="width:25px;height:25px;"/>
            <svg-icon v-else-if="item.sex === 0" icon-class="nv" style="width:25px;height:25px;" />
            <span v-else>未知</span>
          </span>
        </li>
        <li class="flex-bt padd5 border-top"> <h4 class="flex1">年龄</h4> <span class="flex2 font-c666">{{ item.age ? item.age : '-' }}</span> </li>
        <li class="flex-bt padd5 border-top"> <h4 class="flex1">创建时间</h4> <span class="flex2 font-c666">{{ item.create_time | filterTime }}</span> </li>
      </ul>
      <!-- <div class="flex-end">
        <el-button type="danger" :size="isMobile ? 'mini' : ''" @click="$emit('cancelDetail')">取消</el-button>
        <el-button type="primary" :size="isMobile ? 'mini' : ''" >确定</el-button>
      </div> -->
    </div>
  </el-dialog>
</template>

<script>
import mixin from '@/utils/mixins'
import { mapGetters } from 'vuex'
export default {
  name: 'user-detail',
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

</style>
