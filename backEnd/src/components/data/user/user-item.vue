<template>
  <div class="over-hidden padd5">
    <el-row :gutter="10">
      <template v-for="(item,index) in tableData">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" :key="index">
          <div class="bg-white margin10 padd10 borderra4 flex-dc">
            <div :class="isMiniWid ? 'column-n1' : 'column-n2'" >
              <div style="height:100px;">
                <img v-if="item.avatar" :src="item.avatar" alt="头像" style="width:80px;height:80px;">
                <img v-else src="http://47.106.68.248:3002/uploads/2020022510030308549coderly.jpg.jpeg" alt="头像" style="width:80px;height:80px;">
              </div>
              <p class="name margin5">昵称 - <span class="color0" @click="toDetail(item)">{{ item.name }}</span></p>
              <p class="margin5">账号 - {{ item.user_number }}</p>
              <p class="address margin5">宣言 - {{ item.intro ? item.intro : '这家伙很懒，什么都没有留下' }}</p>
            </div>
            <div class="margin10 flex-end">
              <p class="time">{{ item.create_time | filterTime }}</p>
            </div>
            <div class="margin5 flex-end">
              <el-button type="primary" icon="el-icon-edit" @click="$emit('edit', item)" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" @click="$emit('delete', item.id)" circle></el-button>
            </div>
          </div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
import mixin from '@/utils/mixins'
export default {
  name: 'user-item',
  props: {
    tableData: {
      type: Array,
      required: true
    }
  },
  mixins: [mixin],
  data () {
    return {
      isMiniWid: false
    }
  },
  methods: {
    resizeHander () { // 判断当前是否需要将column-count变成一列
      var wid = document.body.clientWidth
      if (wid <= 400) {
        this.isMiniWid = true
      } else {
        this.isMiniWid = false
      }
    },
    toDetail (item) {
      this.$emit('toDetail', item)
    }
  },
  created () {
    this.resizeHander()
    window.addEventListener('resize', this.resizeHander)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHander)
  }
}
</script>

<style lang="scss" scoped>
.color0 {
  color: #ED546B;
  cursor: pointer;
}
.name {
  font-size: 16px;
  font-weight: 600;
}
.time {
  font-size: 12px;
  color: #666;
}
.address {
  font-size: 14px;
}
@media (max-width: 500px) {
  .address {
    font-size: 13px;
  }
}
</style>
