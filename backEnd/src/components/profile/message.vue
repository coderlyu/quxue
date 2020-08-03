<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="未读消息(3)" name="first">
      <ul>
        <li :class="isMobile ? 'flex-dc' : 'flex-bt'">
          <div :class="isMobile ? '': 'flex3'">
            <a href="javascript: void(0);">【系统通知】该系统将于今晚凌晨2点到5点进行升级维护</a>
          </div>
          <span class="time" :class="isMobile ? 'flex-dc-end': 'flex1'">2019-22-22 23:11:02</span>
          <div :class="isMobile ? 'flex-dc-end' : 'flex1'">
            <el-button>标为已读</el-button>
          </div>
        </li>
        <li :class="isMobile ? 'flex-dc' : 'flex-bt'">
          <div :class="isMobile ? '': 'flex3'">
            <a href="javascript: void(0);">【系统通知】该系统将于今晚凌晨2点到5点进行升级维护</a>
          </div>
          <span class="time" :class="isMobile ? 'flex-dc-end': 'flex1'">2019-22-22 23:11:02</span>
          <div :class="isMobile ? 'flex-dc-end' : 'flex1'">
            <el-button>标为已读</el-button>
          </div>
        </li>
        <li :class="isMobile ? 'flex-dc' : 'flex-bt'">
          <div :class="isMobile ? '': 'flex3'">
            <a href="javascript: void(0);">【系统通知】该系统将于今晚凌晨2点到5点进行升级维护</a>
          </div>
          <span class="time" :class="isMobile ? 'flex-dc-end': 'flex1'">2019-22-22 23:11:02</span>
          <div :class="isMobile ? 'flex-dc-end' : 'flex1'">
            <el-button>标为已读</el-button>
          </div>
        </li>
      </ul>
    </el-tab-pane>
    <el-tab-pane label="已读消息(2)" name="second">
      <ul>
        <li :class="isMobile ? 'flex-dc' : 'flex-bt'">
          <div :class="isMobile ? '': 'flex3'">
            <a href="javascript: void(0);">【系统通知】该系统将于今晚凌晨2点到5点进行升级维护</a>
          </div>
          <span class="time" :class="isMobile ? 'flex-dc-end': 'flex1'">2019-22-22 23:11:02</span>
          <div :class="isMobile ? 'flex-dc-end' : 'flex1'">
            <el-button type="danger">删除</el-button>
          </div>
        </li>
        <li :class="isMobile ? 'flex-dc' : 'flex-bt'">
          <div :class="isMobile ? '': 'flex3'">
            <a href="javascript: void(0);">【系统通知】该系统将于今晚凌晨2点到5点进行升级维护</a>
          </div>
          <span class="time" :class="isMobile ? 'flex-dc-end': 'flex1'">2019-22-22 23:11:02</span>
          <div :class="isMobile ? 'flex-dc-end' : 'flex1'">
            <el-button type="danger">删除</el-button>
          </div>
        </li>
      </ul>
    </el-tab-pane>
    <el-tab-pane label="回收站(1)" name="third">
      <ul>
        <li :class="isMobile ? 'flex-dc' : 'flex-bt'">
          <div :class="isMobile ? '': 'flex3'">
            <a href="javascript: void(0);">【系统通知】该系统将于今晚凌晨2点到5点进行升级维护</a>
          </div>
          <span class="time" :class="isMobile ? 'flex-dc-end': 'flex1'">2019-22-22 23:11:02</span>
          <div :class="isMobile ? 'flex-dc-end' : 'flex1'">
            <el-button>还原</el-button>
          </div>
        </li>
      </ul>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (value) {
      console.log(value)
    }
  },
  computed: {
    ...mapGetters([
      'isMobile'
    ])
  }
}
</script>

<style lang="scss" scoped>
ul {
  font-size: 13px;
  li {
    border-top: 1px solid rgba(224, 224, 224, 0.5);
    margin-top: 5px;
    padding-top: 5px;
    a {
      color: rgba(237, 84, 107, 1);
    }
    a:hover {
      color: rgba(237, 84, 107, .5);
      border-bottom: 1px dotted rgb(148, 53, 67);
    }
    .time {
      color: #a2a2a2;
    }
  }
}
</style>
