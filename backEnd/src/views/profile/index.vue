<template>
  <div class="">
  <!-- <div class="profile bg-white padd20 borderra4"> -->
    <el-tabs type="border-card">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-date"></i> 基本信息</span>
      <info/>
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label"> <i class="el-icon-message"></i> 消息中心</span>
      <message/>
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label"> <i class="el-icon-thumb"></i> 操作</span>
      <setting/>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import info from '@/components/profile/info.vue'
import message from '@/components/profile/message.vue'
import setting from '@/components/profile/setting.vue'
export default {
  name: 'userInfo',
  components: {
    info,
    message,
    setting
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
