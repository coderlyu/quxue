<template>
  <div class="edit-user">
    <div class="edit-user-nav">
      <van-nav-bar left-arrow fixed @click-left="onBack" />
    </div>
    <div class="edit-user-body">
      <van-cell-group>
        <van-cell title="昵称" is-link @click="toEditNickName">
          <template slot="default">
            <span>{{ user.name }}</span>
          </template>
        </van-cell>
        <van-cell title="账号" >
          <template slot="default">
            <span>{{ user.user_number }}</span>
          </template>
        </van-cell>
        <van-cell title="年龄" is-link @click="toEditAge">
          <template slot="default">
            <span>{{ user.age }}</span>
          </template>
        </van-cell>
        <van-cell title="性别" is-link @click="showGenderDialog">
          <template slot="default">
            <span>{{ user.sex | sexfilter }}</span>
          </template>
        </van-cell>
        <van-cell title="简介" is-link @click="toEditIntro">
        </van-cell>
        <van-cell title="地区" is-link @click="toEditLocalAddress">
          <template slot="default">
            <span>{{ user.address }}</span>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group style="margin-top: 5px;">
        <van-cell title="更多" is-link @click="toSeeMore">
        </van-cell>
      </van-cell-group>
      <van-cell-group style="margin-top: 10px;">
        <van-cell title="我的地址" is-link @click="toSeeAddress">
        </van-cell>
      </van-cell-group>
    </div>
    <van-dialog
      v-model="genderShow"
      title="选择性别"
      show-cancel-button
      @confirm="confirmDialog"
    >
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell title="女" clickable @click="changeSex($event, '0')">
            <van-radio slot="right-icon" name="0" />
          </van-cell>
          <van-cell title="男" clickable @click="changeSex($event, '1')">
            <van-radio slot="right-icon" name="1" />
          </van-cell>
          <van-cell title="不设置" clickable @click="changeSex($event, '2')">
            <van-radio slot="right-icon" name="2" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>
<script>
export default {
  name: 'editUser',
  data () {
    return {
      genderShow: false,
      radio: '0'
    }
  },
  methods: {
    onBack () {
      this.$router.go(-1)
    },
    toEditIntro () {
      this.$router.push('/user/editIntro')
    },
    toEditLocalAddress () {
      this.$router.push('/user/editLocalAddress')
    },
    toEditAge () {
      this.$router.push('/user/editAge')
    },
    showGenderDialog () {
      this.genderShow = true
    },
    confirmDialog () {
      this.$store.dispatch('user/update', { sex: this.radio }).then(() => {
        this.$toast.success('修改成功')
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    },
    changeSex (event, val) {
      this.radio = val
    },
    toEditNickName () {
      this.$router.push('/user/editNickName')
    },
    toSeeMore () {
      this.$toast('正在努力完善...')
    },
    toSeeAddress () {
      this.$toast('正在完善...')
    }
  },
  filters: {
    sexfilter (sex) {
      switch (sex) {
        case 0:
          return '女'
        case 1:
          return '男'
        case 2:
          return '未设置'
        default:
          break
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>
<style lang="scss" scoped>
.edit-user{
  padding-top: 46px;
  &-body{
    min-height: calc(100vh - 46px);
    background: #f5f5f5;
  }
}
</style>
