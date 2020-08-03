<template>
  <div class="app-wrapper">
    <el-row :gutter="10">
      <h3>数据展示</h3>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
        <div class="flex-dr bg-white padd20 item flex-bt borderra4">
          <svg-icon icon-class="active-number" class-name="item-icon-class" />
          <div>
            <h3>总人数</h3>
            <p class="item-p color1">1204</p>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
        <div class="flex-dr bg-white padd20 item flex-bt borderra4">
          <svg-icon icon-class="teacher-number" class-name="item-icon-class" />
          <div>
            <h3>问题总数</h3>
            <p class="item-p color2">204</p>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
        <div class="flex-dr bg-white padd20 item flex-bt borderra4">
          <svg-icon icon-class="student-number" class-name="item-icon-class" />
          <div>
            <h3>商品总数</h3>
            <p class="item-p color3">1000</p>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
        <div class="flex-dr bg-white padd20 item flex-bt borderra4">
          <svg-icon icon-class="visited" class-name="item-icon-class" />
          <div>
            <h3>昨日访问数</h3>
            <p class="item-p color4">198</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col>
        <div class="bg-white borderra4 margin20" :class="isMobile ? '': 'padd20'">
          <h3>公告通知</h3>
          <ul>
            <template v-for="(item, index) in tips">
              <li class="notice-item flex-bt font14 font-c666" :key="index">
                <div>
                  <span class="number">{{ index + 1 }}</span>
                  <a href="#">{{ item.name }}</a>
                  <span v-show="item.isTop" class="tag tag-wheat">置顶</span>
                  <span v-show="item.isHot" class="tag tag-red">HOT</span>
                </div>
                <span class="font13">{{ item.time }}</span>
              </li>
            </template>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-tooltip placement="top" content="tooltip">
      <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="50"></back-to-top>
    </el-tooltip>
  </div>
</template>

<script>
import backToTop from '@/components/back-to-top'
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  components: {
    backToTop
  },
  data () {
    return {
      tips: [
        {
          name: '【新通知】关于提高用户观看质量的通知',
          time: '2020-04-29',
          isTop: true,
          isHot: true
        },
        {
          name: '【通知】关于增加功能的通知',
          time: '2020-03-11',
          isTop: true,
          isHot: true
        },
        {
          name: '【通知】下一版本我们将增加桌面端应用',
          time: '2019-08-01',
          isTop: true,
          isHot: true
        },
        {
          name: '【新活动】我们决定举行知识问答比赛',
          time: '2020-02-25',
          isTop: false,
          isHot: true
        },
        {
          name: '关于比赛结果的通知',
          time: '2020-05-02',
          isTop: false,
          isHot: false
        },
        {
          name: '查看规则',
          time: '2019-12-24',
          isTop: false,
          isHot: false
        }
      ],
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      }
    }
  },
  computed: {
    ...mapGetters([
      'isMobile'
    ])
  },
  created () {
    this.myBackToTopStyle.right = this.isMobile ? '20px' : '50px'
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/notice.scss';
.item {
  height: 130px;
  margin: 5px 10px;
  text-align: center;
}
.item-icon-class {
  width: 70px;
  height: 70px;
}
.item-p {
  margin: 5px;
}
.color1 {
  color: #ED546B;
}
.color2 {
  color: #B3D465;
}
.color3 {
  color: #99beff;
}
.color4 {
  color: #4192F3;
}

</style>
